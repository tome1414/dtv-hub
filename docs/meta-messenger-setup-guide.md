# 韓国Messengerリード連携：Meta側の準備ガイド（初心者向け）と Webhook 安全設計

ステータス: 準備資料（最新の手順は kr-messenger-leads-phase3-runbook.md を優先）。**Metaアプリはまだ作成していない。本番スプレッドシート・Meta・広告には未接続。**
原則: 現在配信予定の **広告A/C・メッセージテンプレートは一切編集しない**。検証は必ず「テスト用の別広告／別環境」で行う。

## 0. 全体像

```
お客様 → Meta広告A/C（Messenger自動チャット）
          └ 回答完了 → Meta が Webhook(messaging_referrals / LEAD_COMPLETE) を送信
                          → 中継サーバー（dtvclub.com の新規API。署名検証）
                              → 新しい Apps Script(別Webアプリ) → 既存スプレッドシートの KR_Messenger_Leads タブ
```
- 既存LP問い合わせ用のWebhook/Apps Script/タブとは完全に分離。
- 中継APIはまだ作らない（承認後。サンプルは末尾）。

## 1. 公式仕様で確認済みのこと／未確認のこと

| 項目 | 状態 | 根拠・備考 |
|---|---|---|
| リード回答が `messaging_referrals` で届く | **公式記載あり（確認済み）** | Lead Generation Ads in Messenger。`referral.type` = `LEAD_COMPLETE` / `LEAD_INCOMPLETE`、`lead.data[]` に `question` と `answer` |
| 含まれる項目 | 確認済み | `sender.id`（ユーザーID）, `recipient.id`（ページID）, `timestamp`, `referral.source="ADS"`, `referral.ad_id`, `ads_context_data{ad_title, post_id, photo_url}`, `entry[].time`, `entry[].id` |
| Meta発行の安定したイベントID | **referral通知にはない**（公式サンプルに `mid` / `lead_id` なし） | 要約メッセージ（"Send lead summary to connected app"）には `message.mid` があるが、広告への「アプリ接続」設定が必要（広告の編集になる） |
| 重複判定キー | 確認済みの設計 | `sender.id｜ad_id｜Metaのイベント時刻(timestamp)｜種別`。Metaが付けたイベント時刻であり、受信時刻ではない。再送は同一ペイロード＝同一キー |
| 再送ポリシー | 公式記載あり | 失敗時は直ちに数回再試行。15分継続失敗でアラート、**1時間継続失敗でアプリのWebhook購読が解除（Webhooks Disabled）** |
| 応答期限 | 公式記載にばらつき | Webhooks文書「5秒以内に200」／App Review文書「20秒以内」→ **5秒以内**で設計 |
| 署名 | 公式記載あり | `X-Hub-Signature-256`＝`sha256=`＋HMAC-SHA256(生ボディ, App Secret)。非ASCIIは `\uXXXX`(小文字)でエスケープされた状態で署名される |
| 並び順・重複 | 公式記載あり | 重複配信・順不同があり得る。サーバー側で重複排除し、`timestamp` で順序判断 |
| 回答文字列の実際の形式（韓国語の選択肢が表示文のまま届くか） | **未確認（実テスト必須）** | 公式は `answer` を文字列と記載するのみ。実データで確認して変換表を確定 |
| 表示名の取得 | 条件付き | User Profile API。`first_name/last_name/name` は **Business Asset User Profile Access（Advanced Access）** が必要。広告経由は返信まで取得できない場合あり。取れなければ空欄 |
| 広告A/Cの識別 | ほぼ確認済み | `referral.ad_id` で識別。ad_id ↔ A/C の対応表は運用側で作成（`AD_MAP`） |
| 広告へのアプリ接続（Connect an App）が**必須か** | **未確認** | 公式は「`messaging_referrals` を購読したアプリに送信」と記載。接続の有無で届くかをテストで確認 |
| Business Verification の要否 | 未確認 | Messenger側の文書には記載なし。ダッシュボードの審査画面で確認 |
| 審査（Advanced Access） | 公式記載あり（一部） | 一般ユーザーの会話データには Advanced Access が必要（Conversations API の記載）。リード通知で必要かはテストで確認 |

## 2. あなたがMeta管理画面で行う操作（順番に）

> 画面の名称はMeta側の更新で変わることがあります。違う場合はスクリーンショットを送ってください。

**事前準備**
- Facebookページ「（韓国向けGolf DTVのページ）」の**管理者**であるFacebookアカウントでログイン。
- Meta Business Suite（business.facebook.com）でそのページが「ビジネスポートフォリオ」に紐づいていると手順が楽です。

**Step 1: 開発者登録**
1. https://developers.facebook.com/ を開き、「Get Started／始める」→ 画面の指示で開発者登録（メール・電話認証）。

**Step 2: アプリを作成**
1. https://developers.facebook.com/apps を開き「**アプリを作成 / Create App**」。
2. ユースケースの選択: 公式ドキュメントの名称は「**Engage with customers on Messenger from Meta**」。これを選びます。
   （見つからない場合: 「その他 / Other」→ アプリタイプ「**ビジネス / Business**」）
3. アプリ名（例: `GolfDTV KR Leads`）、連絡先メール、ビジネスポートフォリオ（あれば）を入力して作成。
4. **ここではまだ本番モードにしない**（開発モードのまま）。

**Step 3: 機能と権限を設定**
1. ダッシュボード左メニュー「Dashboard」→ ユースケース「Engage with customers on Messenger」→「**Customize**」。
2. 権限一覧が出ます。必須（削除不可）の `pages_messaging` / `pages_show_list` / `page_manage_metadata` / `business_management` / `public_profile` はそのまま。
3. 今回は**追加の任意権限は不要**（表示名取得を後で行う場合のみ「Business Asset User Profile Access」を検討）。

**Step 4: Facebookページと連携（Messenger API Setup）**
1. 同じ画面の「**Generate access tokens**」で「**Connect**」→ Facebookにログイン →「続行」。
2. 連携する**ページ（韓国向けGolf DTV）だけ**を選んで「続行」→「保存」→「Got it」。
3. 「**Add Subscriptions**」で購読するフィールドを選択: **`messages`** と **`messaging_referrals`**（必要に応じて `messaging_postbacks`）→「Confirm」。
   ※ トークンは**絶対に他人に共有しない／チャットに貼らない**。

**Step 5: Webhook の設定（← コード準備と承認の後に実施）**
1. 「**Configure webhooks**」に **コールバックURL**（中継APIのURL。承認後にこちらから連絡）と **確認トークン**（こちらで用意するランダム文字列）を入力。
2. 「Verify and save」で成功することを確認（Metaが GET で確認リクエストを送ります）。
3. アプリのシークレットは「設定 → ベーシック → App Secret」。こちらも**チャットに貼らず**、Vercelの環境変数にあなたが登録します（登録手順は別途案内）。

**Step 6: テスト（広告A/Cは編集しない）**
1. 別の**テスト用広告**を新規作成（A/Cを複製せず、新しいキャンペーン）:
   - 目的「リード獲得」→ 連絡方法「Messenger」→ 質問形式「自動チャット」。質問は本番と同じ3問・選択肢を同じ文言で作成。
   - 配信対象はあなた自身（アプリの管理者／テスター）のみ、予算は最小、またはプレビューのみ。公開配信しない。
2. 広告の「メッセージテンプレート → 詳細設定」で「**アプリを接続**」を**オフとオン**の2パターンで試す（どちらで通知が届くかが未確認事項）。
3. 公式のデモ広告でも確認可能: https://www.facebook.com/ads/experience/confirmation/?experience_id=1638275386654488 （自分のフィードにデモ広告が出ます。自分のページ/アプリに通知が来るかは要確認）。
4. 質問に**最後まで回答**（→ `LEAD_COMPLETE`）と、**途中でやめる／対象外の回答**（→ `LEAD_INCOMPLETE`）の両方を試す。
5. 確認すること（結果を共有してください）:
   - [ ] アプリが `messaging_referrals` を受信（こちらのログで確認。個人情報は伏せる）
   - [ ] `lead.data` の `question` と `answer` の**実際の文字列**（韓国語表記）
   - [ ] `referral.ad_id` の値（テスト広告のID）
   - [ ] `sender.id`
   - [ ] ページ受信箱（リード専用フォルダ）と Ads Manager のダウンロードにも同じ回答が出るか（バックアップ経路）
   - [ ] 表示名が取得できるか（取れなくても問題なし）
6. 実データの文字列が `scripts/test-kr-apps-script.ts` の変換表と違う場合は、変換表を実データに合わせて更新します（実データ優先）。

**Step 7: 本番運用（ライブモード）とアプリ審査**
- 開発モードのままだと、通常は**アプリに役割（管理者・開発者・テスター）を持つ人**の会話しかWebhookに流れません（一般的な挙動。要確認）。一般のお客様の回答を自動取得するには、アプリを**ライブモード**にし、必要な権限の **Advanced Access（アプリ審査）** を通す必要がある可能性が高いです。
- 審査の公式条件（Messenger文書）: Facebookページが**公開済み**／Webhookが**200 OK**を返す（時間制限は5秒または20秒と文書により異なる）／審査担当者がテストできる手順（ログイン情報または起動フレーズ）を提出／プラットフォームポリシー・コミュニティ規定の遵守。
- 手順: ダッシュボード「Review → App Review」→「Edit」→ 設定確認・レビュアー向け説明・使用目的への同意 →「Submit for Review」。所要期間は公式文書に記載なし。
- **審査が通るまでの代替運用**: Ads Manager／ページ受信箱からリードをCSV/XLSXでダウンロード（90日以内。第三者情報のため要確認）。

## 3. Apps Script（別プロジェクト）の準備手順（承認後・手動）

1. https://script.google.com で「新しいプロジェクト」（**既存LP用のスクリプトとは別**）。名前例: `GolfDTV KR Messenger Leads`。
2. `apps-script/kr-messenger-leads/Code.gs` の中身を貼り付け。
3. 「プロジェクトの設定 → スクリプト プロパティ」に登録: `SPREADSHEET_ID`（既存スプレッドシートのID）、`RELAY_SECRET`（長いランダム文字列）、`AD_MAP`（テスト広告のIDを含む JSON。広告ID↔A/C）。
4. 関数 `setupSheet` を**一度だけ手動実行** → 既存スプレッドシートに `KR_Messenger_Leads` タブが追加されます（既存タブは変更されません）。
5. 「デプロイ → 新しいデプロイ → ウェブアプリ」: 実行ユーザー＝自分、アクセス＝全員（認証は `RELAY_SECRET` で行う）。表示されるURLを中継APIの環境変数に設定。
※ 上記はすべてあなたの操作です（私はスプレッドシートに接続しません）。

## 4. Webhook 安全設計（中継API）

| 項目 | 設計 |
|---|---|
| 確認（GET） | `hub.mode=subscribe` かつ `hub.verify_token` が一致したときだけ `hub.challenge` を返す。不一致は403。タイミング攻撃対策に `timingSafeEqual` |
| 署名（POST） | 生のボディ文字列で `X-Hub-Signature-256` を検証（`verifySignature`）。不一致は403で何も処理しない。`JSON.parse` 後の再シリアライズ文字列では検証しない |
| 認証（中継→Apps Script） | 本文に `RELAY_SECRET`（Apps Scriptはヘッダーを読めないため）。未設定なら全拒否。Apps Script URLは秘匿 |
| 応答時間 | Meta は5秒以内を要求。署名検証→パース→Apps Script呼び出し（タイムアウト約3.5秒）→応答。時間内に完了できなければ 5xx を返し、Meta の再送に任せる |
| 再送・重複 | Metaの再送は同一ペイロード。`eventKey`（送信者ID｜広告ID｜Metaのイベント時刻｜種別）でApps Script側が重複排除（`duplicate` を返し、行は増えない）。**受信時刻は使わない** |
| 同時受信 | Apps Script の `LockService` で重複確認→追記を一括排他。ロック取得失敗は `busy` を返し、中継が5xx→Metaが再送 |
| エラー処理 | 対象外イベント（リード以外）は200で無視。不正署名は403。Apps Script失敗は5xx。**1時間連続で失敗するとMetaが購読を解除するため**、失敗通知（メール等）を設ける |
| バッチ | 1リクエストに複数の `entry`/`messaging` があり得る。すべて処理し、1件でも失敗したら5xx（成功分は重複排除で再送に耐える） |
| ログ | 個人情報（回答・ユーザーID・名前）をログに出さない。件数・ステータスのみ |
| 秘密情報 | App Secret／確認トークン／ページトークン／`RELAY_SECRET` は環境変数のみ。コード・チャットに載せない |
| バックアップ | 取りこぼし時は、ページ受信箱／Ads ManagerのCSVから `KR_Messenger_Leads` へ再取り込み可能（同じ変換ロジック） |
| 順不同 | `timestamp` で並べ替え可能（シートの受付日時はMetaのイベント時刻） |

### 中継API
実装済み（ローカル・未デプロイ）: `src/app/api/messenger-webhook/route.ts`、`src/lib/messenger-webhook-handler.ts`。応答と再送の分類は `docs/kr-messenger-leads-phase3-runbook.md` の3章、設定手順は同4章を参照（この章の以前のサンプルコードは破棄）。

## 5. 本番接続までに残る作業

1. （あなた）Metaアプリ作成・ページ連携・購読フィールド設定（Step 1〜4）。
2. （あなた）テスト広告の作成と回答の実データ確認（Step 6）。**実データの文字列が変換表と一致するか**を確認。
3. （私）実データに合わせた変換表の更新、中継APIの実装（承認後）、ローカルテスト。
4. （あなた）Apps Script の作成・`setupSheet` 実行・デプロイ、Vercel環境変数の登録。
5. （あなた）Webhook URL の登録と検証（Step 5）、アプリ審査／ライブモード化（Step 7）。
6. （あなた）広告A/Cの `ad_id` を `AD_MAP` に登録。
7. （事業者）プライバシーポリシーの追記改訂（取得方法、Googleスプレッドシート保存、Metaアプリ経由の取得、削除運用）— 自動保存の稼働前に。
8. 失敗通知・監視（1時間連続失敗でMetaが購読解除するため）。
