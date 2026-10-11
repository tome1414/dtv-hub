// GolfDTV プライバシーポリシー本文（LP内アコーディオンと専用ページで共用）。
// 本文の変更は法務承認後に行うこと。

export type PrivacyPolicy = { intro: string; sections: string[][]; date: string }

export const PRIVACY_POLICY_JA: PrivacyPolicy = {
  intro: '当社は、お客様の個人情報の保護を重要な責務と認識し、以下のプライバシーポリシーを定めます。',
  sections: [
    ['1. 収集する個人情報', 'お問い合わせフォームを通じて、お名前、メールアドレス、ご希望プラン、ご紹介コード、お問い合わせ内容等の情報をお預かりします。'],
    ['2. 利用目的', 'お問い合わせへの回答およびサービスのご案内\nDTVビザ申請サポートサービスの提供\nサービス改善および新サービスのご案内\n法令に基づく対応'],
    ['3. 第三者への提供', '当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。\n・お客様の同意がある場合\n・法令に基づく場合\n・サービス提供に必要な業務委託先（厳格な守秘義務を課します）'],
    ['4. 個人情報の管理', '当社は、個人情報の漏洩・紛失・不正アクセスを防止するため、適切なセキュリティ措置を講じます。'],
    ['5. 開示・訂正・削除', 'お客様は、当社が保有するご自身の個人情報の開示、訂正、削除を要求する権利を有します。ご要望はお問い合わせフォームよりご連絡ください。'],
    ['6. Cookieの使用', '当社ウェブサイトでは、サービス向上のためCookieを使用することがあります。ブラウザの設定によりCookieを無効化することができますが、一部機能が制限される場合があります。'],
    ['7. プライバシーポリシーの変更', '本ポリシーは、必要に応じて改定することがあります。重要な変更がある場合は、ウェブサイト上でお知らせします。'],
    ['8. お問い合わせ', '個人情報に関するお問い合わせはお問い合わせフォームよりご連絡ください。'],
  ],
  date: '制定日：2024年1月1日',
}

export const PRIVACY_POLICY_EN: PrivacyPolicy = {
  intro: 'The Company recognizes the protection of customer personal information as an important responsibility and establishes this privacy policy.',
  sections: [
    ['1. Information We Collect', 'We collect your name, email address, preferred plan, referral code, and inquiry message through the contact form on this website.'],
    ['2. Use of Information', 'To respond to inquiries and provide service information • To provide DTV visa application support services • To improve services and inform about new offerings • To comply with applicable laws'],
    ['3. Third Party Disclosure', 'We do not disclose customer personal information to third parties except in the following cases: With your consent • When required by law • To business partners necessary for service provision (under strict confidentiality obligations)'],
    ['4. Information Security', 'We implement appropriate security measures to prevent unauthorized access, loss, or leakage of personal information.'],
    ['5. Access, Correction, Deletion', 'You have the right to request disclosure, correction, or deletion of your personal information held by us. Please submit requests through the contact form.'],
    ['6. Cookies', 'Our website may use cookies to improve service. You can disable cookies in your browser settings, though some features may be limited.'],
    ['7. Privacy Policy Changes', 'We may revise this policy as necessary. Significant changes will be announced on our website.'],
    ['8. Contact', 'For inquiries regarding personal information, please contact us through the contact form.'],
  ],
  date: 'Established: January 1, 2024',
}

