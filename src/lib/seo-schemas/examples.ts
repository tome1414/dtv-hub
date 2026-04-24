/**
 * DTV Club - JSON-LD スキーマ 使用例
 * 各記事でこのファイルを参考にスキーマを実装してください
 */

import {
  generateBlogWithHowToSchema,
  generateBlogWithFAQSchema,
  generateBreadcrumbSchema,
} from './blog-posting'

// ── 例1：DTV申請ガイド記事（BlogPosting + HowTo） ────────

export const dtvApplicationGuideSchema = generateBlogWithHowToSchema(
  {
    title: 'DTV ビザ申請の全ステップ【2026年・e-visa完全対応】',
    description: 'Thai e-visaシステムを使ったDTVビザ申請を図解で解説。必要書類・審査期間・よくある失敗まで網羅。',
    slug: 'dtv-visa-application-steps',
    locale: 'ja',
    publishedAt: '2026-05-04',
    updatedAt: '2026-05-04',
    coverImage: '/images/blog/dtv-visa-application-steps/cover.jpg',
  },
  [
    {
      name: 'Thai e-Visa サイトにアクセス',
      text: 'thaievisa.go.th にアクセスし、アカウントを作成します。メールアドレスとパスワードを登録してください。',
      image: '/images/blog/dtv-visa-application-steps/step-01.jpg',
    },
    {
      name: 'DTV を選択して申請フォームを記入',
      text: 'ビザ種別から「Destination Thailand Visa（DTV）」を選択し、パスポート情報・渡航目的などを入力します。',
      image: '/images/blog/dtv-visa-application-steps/step-02.jpg',
    },
    {
      name: '必要書類をアップロード',
      text: 'パスポートのコピー・残高証明書・在職証明書などをPDF形式でアップロードします。',
      image: '/images/blog/dtv-visa-application-steps/step-03.jpg',
    },
    {
      name: '申請費用を支払う',
      text: 'クレジットカードで申請費用（10,000バーツ）を支払います。',
      image: '/images/blog/dtv-visa-application-steps/step-04.jpg',
    },
    {
      name: '審査結果を待つ',
      text: '通常5〜10営業日で審査結果がメールで届きます。追加書類の依頼が来ることもあります。',
    },
    {
      name: '承認メールを受け取り・ビザを印刷',
      text: '承認メールに添付されたビザを印刷し、入国時に提示します。',
    },
  ]
)

// ── 例2：DTV ビザとは？記事（BlogPosting + FAQ） ──────────

export const dtvBasicsWithFAQSchema = generateBlogWithFAQSchema(
  {
    title: 'DTV ビザとは？【2026年最新版】デジタルノマドの完全ガイド',
    description: 'DTV（Destination Thailand Visa）は、デジタルノマドやリモートワーカー向けのタイ長期滞在ビザです。',
    slug: 'dtv-visa-complete-guide',
    locale: 'ja',
    publishedAt: '2026-04-27',
    updatedAt: '2026-04-27',
    coverImage: '/images/blog/dtv-visa-complete-guide/cover.jpg',
  },
  [
    {
      question: 'DTV ビザの有効期限はどのくらいですか？',
      answer: 'DTV（Destination Thailand Visa）は5年間有効なマルチプルビザです。1回の入国で最長180日間タイに滞在でき、出国すれば滞在期間がリセットされ再び180日間滞在可能です。',
    },
    {
      question: 'DTV ビザの申請費用はいくらですか？',
      answer: 'DTV ビザの申請費用は10,000バーツ（日本から申請の場合、約52,000円）です。滞在期間を延長する場合も同額の10,000バーツが必要です。',
    },
    {
      question: '50万バーツの残高証明は日本の銀行でも使えますか？',
      answer: '日本の銀行口座の残高証明書でも申請可能ですが、英語による証明書、または公式な翻訳が必要な場合があります。タイの大使館によって要件が異なることがあるため、申請前に確認することをお勧めします。',
    },
    {
      question: 'DTV ビザはどのような人が申請できますか？',
      answer: 'デジタルノマド・リモートワーカー・フリーランサーのほか、ムエタイ・タイ料理・スポーツの長期学習者、医療目的の長期滞在者、セミナー・芸術・音楽活動への長期参加者なども対象です。',
    },
    {
      question: 'DTV ビザとタイランドエリート（タイランドプリビレッジ）はどちらがおすすめですか？',
      answer: 'デジタルノマドやリモートワーカーで要件を満たす方はDTVが圧倒的にお得です（約52,000円 vs 約360万円〜）。タイランドエリートは就労・ビジネス活動に特典が欲しい富裕層向けです。',
    },
  ]
)

// ── 例3：パンくずリスト ─────────────────────────────────

export const blogBreadcrumb = generateBreadcrumbSchema([
  { name: 'DTV Club', url: '/ja' },
  { name: 'ブログ', url: '/ja/blog' },
  { name: 'DTV ビザとは？完全ガイド', url: '/ja/blog/dtv-visa-complete-guide' },
])
