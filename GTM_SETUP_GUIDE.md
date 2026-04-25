# 🏷️ Google Tag Manager 設定ガイド

**GTM コンテナ ID**: GT-T9B83QQ5  
**GA4 測定 ID**: G-FNC897EGPG  
**サイト**: dtvclub.com（ja/en）

---

## 📋 GTM コンソールで設定する内容

### 1️⃣ **GA4 タグを作成**（未設定の場合）

**タグ タイプ**: Google アナリティクス: GA4 イベント  
**測定 ID**: G-FNC897EGPG  
**イベント名**: page_view（ページビュー自動送信）

---

### 2️⃣ **トリガー設定**

#### **トリガー A: Golf DTV クリック**
```
タイプ: クリック - リンクのみ
イベント: golf_dtv_click

条件：
  リンク URL → 「含む」 → /golf-dtv
```

#### **トリガー B: Discord クリック**
```
タイプ: クリック - リンクのみ
イベント: discord_click

条件：
  リンク URL → 「含む」 → discord.gg
```

#### **トリガー C: 記事リンククリック**
```
タイプ: クリック - リンクのみ
イベント: blog_article_click

条件：
  リンク URL → 「含む」 → /blog/
```

#### **トリガー D: 内部リンククリック（一般）**
```
タイプ: クリック - リンクのみ
イベント: internal_link_click

条件：
  リンク URL → 「含まない」 → discord.gg
  リンク URL → 「含まない」 → golf-dtv
```

---

### 3️⃣ **GA4 イベントタグを設定**

**各トリガーに対して 1 つずつタグを作成：**

```
【タグ 1: Golf DTV イベント】
タグ タイプ: Google アナリティクス: GA4 イベント
測定 ID: G-FNC897EGPG
イベント名: golf_dtv_click
トリガー: トリガー A

【タグ 2: Discord イベント】
タグ タイプ: Google アナリティクス: GA4 イベント
測定 ID: G-FNC897EGPG
イベント名: discord_click
トリガー: トリガー B

【タグ 3: ブログ記事イベント】
タグ タイプ: Google アナリティクス: GA4 イベント
測定 ID: G-FNC897EGPG
イベント名: blog_article_click
トリガー: トリガー C

【タグ 4: 内部リンクイベント】
タグ タイプ: Google アナリティクス: GA4 イベント
測定 ID: G-FNC897EGPG
イベント名: internal_link_click
トリガー: トリガー D
```

---

## 📊 GA4 コンソールで設定すべき項目

### **目標（コンバージョン）設定**

#### **目標 1: Golf DTV クリック**
```
イベント名: golf_dtv_click
説明: ホームページから Golf DTV ページへのクリック
```

#### **目標 2: Discord 参加**
```
イベント名: discord_click
説明: Discord 招待リンククリック
```

#### **目標 3: ブログ記事読了**
```
イベント名: blog_article_click
説明: ブログ記事へのクリック
```

---

## 🔗 データレイヤー（dataLayer）の内容

アプリケーション側から送信される data：

```javascript
// Golf DTV クリック
{
  event: 'golf_dtv_click',
  source_page: 'homepage-premium-card',
  timestamp: '2026-04-20T12:00:00Z'
}

// Discord クリック
{
  event: 'discord_click',
  source_page: 'community-section',
  timestamp: '2026-04-20T12:00:00Z'
}

// ブログ記事クリック
{
  event: 'blog_article_click',
  article_title: '...',
  article_url: '/ja/blog/dtv-visa',
  timestamp: '2026-04-20T12:00:00Z'
}
```

---

## ✅ チェックリスト

- [ ] GTM コンテナ（GT-T9B83QQ5）がサイトに埋め込まれている
- [ ] GA4 タグが GTM 内に作成されている（測定 ID: G-FNC897EGPG）
- [ ] 4 つのトリガー（Golf DTV, Discord, Blog, Internal Link）が設定されている
- [ ] 各トリガーに対応する GA4 イベントタグが作成されている
- [ ] GA4 コンソールで 3 つの目標（コンバージョン）が設定されている
- [ ] GTM 変更が「公開」されている

---

## 🧪 テスト方法

1. **ブラウザの開発者ツール**（F12）を開く
2. **コンソール タブ**で以下を実行：
   ```javascript
   window.dataLayer
   ```
3. クリックイベント（Golf DTV, Discord など）を確認

---

## 📖 参考リンク

- [Google Tag Manager ヘルプ](https://support.google.com/tagmanager)
- [GA4 イベント設定ガイド](https://support.google.com/analytics/answer/9267744)

---

**設定完了後、本番環境で動作確認してください。**
