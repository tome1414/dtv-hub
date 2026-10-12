# 韓国Messengerリード → Googleスプレッドシート連携 準備メモ（調査・設計のみ／未実装）

ステータス: ローカルのロジックとモックテストのみ。スプレッドシート・Meta・本番には一切接続していない。

## 1. 既存のシート連携構成（コードから確認）

- `src/app/api/contact/route.ts`: メール送信（Gmail）成功後、`GOOGLE_SHEETS_WEBHOOK_URL` が設定されている場合のみ `fetch(POST, JSON)` で転記。失敗してもメール送信は成功扱い。
- 送信JSON: receiptNumber, timestamp, name, email, nationality, plan, agencyService, dependentVisa, fiveYearPlan, annualRenewal, sources, referral, message。
- 受け側（Apps Script等）のコードは**リポジトリに存在しない**。Webhook URL・スプレッドシートIDも不明（環境変数のみ）。→ 既存の受け口は再利用せず、**別デプロイの新規Webアプリ**を推奨（既存LP問い合わせの `doPost` に触れないため）。

## 2. KR_Messenger_Leads タブ

列（`src/lib/kr-messenger-leads.ts` の `KR_MESSENGER_LEADS_HEADER`）:
A 受付日時（タイ時間） / B MessengerユーザーID / C 表示名 / D 居住国 / E 関心事項 / F 申請希望時期 / G 流入広告 / H 対応優先度 / I 対応ステータス / J 最終対応日時 / K 備考 / **L イベントキー（重複防止）**←依頼のA〜Kに追加する提案列。

追加方法（承認後・手動 or 初回受信時に自動作成）:
1. 既存スプレッドシートを開く → 「+」でシート追加 → 名前を `KR_Messenger_Leads` にする。
2. 1行目に上記12列の見出しを貼り付ける（またはApps Scriptが空シートなら自動で見出しを書く）。
3. I列に「未対応／対応中／完了」のプルダウン（データの入力規則）、L列は非表示にする。
既存シートのデータ・構造は変更しない。

## 3. 回答の取得可否（公式仕様 / 実テスト）

| 項目 | 公式ドキュメントの記載 | 実テスト |
|---|---|---|
| 3問の回答をWebhookで取得 | **可能と記載**。Lead Gen Ads in Messenger の「Lead Referral Webhook」: `messaging_referrals` を購読したアプリに、`referral.type = LEAD_COMPLETE / LEAD_INCOMPLETE` と `lead.data[] = {question, answer}` が送られる | **未実施**（アプリ未作成） |
| 形式 | 質問文＋回答文字列のペア。選択肢の回答は表示テキスト（韓国語）で届く想定 → 実データで確認要 | 未実施 |
| 広告A/Cの識別 | `referral.ad_id` が含まれる → 広告IDとA/Cの対応表で判定可能 | 未実施 |
| ユーザーID | `sender.id`（ページスコープID, PSID） | 未実施 |
| 表示名 | User Profile API（PSID → `first_name/last_name`）。**Business Asset User Profile Access（Advanced Access）が必要**。Click to Messenger広告は返信するまでプロフィールにアクセスできない場合あり。取得不可なら空 | 未実施 |
| 途中離脱 | `LEAD_INCOMPLETE` でも届く（離脱・対象外回答） | 未実施 |
| 会話履歴 | Conversations API（`pages_messaging` 等、Advanced Access、直近20件まで） | 未実施 |
| 標準のダウンロード | Ads Manager / ページ受信箱から XLSX・CSV でリードをダウンロード可能（公式）。保存90日（第三者情報・要確認） | 未実施 |

出典: Meta for Developers「Lead Generation Ads in Messenger」「messaging_referrals」「User Profile API」「Conversations API」、Meta Business Help「Lead Generation in Messenger」。

## 4. 連携方式の比較

| 方式 | 内容 | 長所 | 短所 |
|---|---|---|---|
| **A. Webhook自動連携（推奨）** | Meta Webhook → `/api/messenger-webhook`（Next.js）→ 新規Apps Script Webアプリ → `KR_Messenger_Leads` | 追加費用なし、既存LP系統に非干渉、重複防止・日本語変換を自前制御 | Metaアプリ作成・権限（審査の可能性）・Webhook検証が必要 |
| B. CSV手動取り込み | Ads Managerからダウンロード → 同ロジックでシートに取り込み | Meta審査不要、すぐ使える | 手動、90日以内に取得が必要 |
| C. ページ受信箱を目視 | スタッフが受信箱で確認し手入力 | 設定不要 | 手間・抜け漏れ |
| D. n8n/Zapier等 | ノーコード連携 | 実装が少ない | 月額費用、同じMeta権限が必要、個人情報が外部SaaSを経由 |

**推奨**: 広告配信開始は現状設定のまま進め（広告・テンプレートに変更を加えない）、当面は B/C で運用。並行して A を構築し、テスト広告で実データを確認してから切替。

## 5. Metaの設定（Aの場合・要承認）

1. Meta for Developers でアプリ作成（種別: Business）、Messenger製品を追加。
2. FacebookページをアプリにリンクしPageアクセストークンを発行（`pages_messaging`, `pages_manage_metadata`, `pages_read_engagement`）。
3. Webhook設定: コールバックURL `https://dtvclub.com/api/messenger-webhook`、確認トークン、フィールド `messages` と `messaging_referrals` を購読。
4. 署名検証: `X-Hub-Signature-256`（App Secret）。
5. 公開（Live）モードでは一般ユーザーのデータに **Advanced Access（アプリ審査）** が必要となる見込み（開発モードはアプリのロール保持者のみ）。Business Verification の要否は未確認。
6. 広告へのアプリ接続（「Connect app」）が必要かは**テストで確認**。公式は「`messaging_referrals` を購読したアプリにLead Referralが送られる」と記載、接続は要約メッセージとスレッド制御に関わる。広告編集になるため、稼働中の広告を編集せず、テスト用の別広告で検証する。

## 6. 必要な環境変数（案・未設定）

`META_MESSENGER_APP_SECRET`, `META_MESSENGER_VERIFY_TOKEN`, `META_MESSENGER_PAGE_TOKEN`（表示名を取る場合のみ）, `KR_LEADS_SHEET_WEBHOOK_URL`, `KR_LEADS_SHEET_SECRET`, `KR_MESSENGER_AD_MAP`（例 `{"<広告ID>":"A","<広告ID>":"C"}`）。既存の変数は変更しない。

## 7. 重複防止の設計

- キー = `PSID|ad_id|timestamp|referral.type`（`eventKey()`）。Metaの再送は同一キー。
- Apps Script側: LockService で排他し、L列を走査して既存キーなら追記しない。
- 同一ユーザーが別日・別広告で再回答した場合は別行（キーが異なる）。

## 8. Apps Script 下書き（未デプロイ・別Webアプリとして新規作成する場合）

```javascript
const SHEET = 'KR_Messenger_Leads';
const HEADER = ['受付日時（タイ時間）','MessengerユーザーID','表示名','居住国','関心事項','申請希望時期','流入広告','対応優先度','対応ステータス','最終対応日時','備考','イベントキー（重複防止）'];
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (body.secret !== PropertiesService.getScriptProperties().getProperty('SECRET')) return out({ok:false,error:'forbidden'});
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActive(); // コンテナバインド
    let sh = ss.getSheetByName(SHEET);
    if (!sh) { sh = ss.insertSheet(SHEET); sh.appendRow(HEADER); }
    const key = body.row[11];
    const keys = sh.getRange(2, 12, Math.max(sh.getLastRow() - 1, 1), 1).getValues().flat();
    if (keys.includes(key)) return out({ok:true,duplicate:true});
    sh.appendRow(body.row);
    return out({ok:true});
  } finally { lock.releaseLock(); }
}
function out(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
```
※ 既存のLP問い合わせ用スクリプトとは別のスクリプト/デプロイにする。シート書き込み権限はスクリプト所有者の権限。

## 9. 追加費用

Vercel・Apps Script・Meta API とも追加費用なし（既存プラン内の想定）。n8n/Zapier等を使う場合のみ月額が発生。アプリ審査・Business Verification の手数料はなし（書類提出は必要な場合あり）。

## 10. 手動で必要な操作（承認後）

Metaアプリ作成・ページ連携・Webhook登録、Advanced Accessの申請、Vercelの環境変数登録、スプレッドシートのタブ追加と入力規則、Apps Scriptのデプロイ、広告ID↔A/Cの対応表の確定、テスト広告でのリード送信。

## 11. 本番反映前に承認が必要な変更

1. `/api/messenger-webhook` ルートの追加（新規ファイル。既存ルートは無変更）
2. Metaアプリ作成・Webhook購読・（必要なら）広告へのアプリ接続
3. スプレッドシートへのタブ追加と、新規Apps Scriptのデプロイ
4. Vercel環境変数の追加
5. プライバシーポリシー: 自動保存開始時に、取得方法・Googleスプレッドシート保存・Metaアプリ経由の取得を明記する改訂が必要
