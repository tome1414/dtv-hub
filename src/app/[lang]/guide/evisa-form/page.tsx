import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import Link from 'next/link'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  return {
    title: isJa
      ? 'タイe-Visa（DTV）申請フォームの入力方法を全項目解説 | thaievisa.go.th'
      : 'Thailand e-Visa (DTV) Application Form: Complete Field-by-Field Guide',
    description: isJa
      ? 'thaievisa.go.th のDTV申請フォームを画面ごとに全項目解説。各入力欄の意味・入力例・よくあるミスを実際の画面画像つきで日本語で丁寧に説明します。'
      : 'A complete walkthrough of every field in the Thailand e-Visa DTV application form with screenshots and examples.',
    alternates: {
      canonical: `https://dtvclub.com/${lang}/guide/evisa-form`,
    },
  }
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const C = {
  bg: '#F5F8FA', bgCard: '#FFFFFF', bgSection: '#EDF1F5',
  text: '#1A2435', sub: '#4A5A6E', muted: '#7E8EA4',
  border: 'rgba(26,36,53,0.10)',
  green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.08)', tealMid: 'rgba(10,122,106,0.18)',
  gold: '#C9A030',
}

export default async function EvisaFormPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const isJa = locale === 'ja'

  if (!isJa) {
    return (
      <div style={{ minHeight: '100vh', background: C.bg, paddingTop: 64, paddingBottom: 96 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 1.25rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 12 }}>
            Thailand e-Visa (DTV) Application Form — Complete Guide
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            A detailed, screenshot-by-screenshot walkthrough of the thaievisa.go.th DTV application form. English version coming soon.
          </p>
          <Link href="/ja/guide/evisa-form" className="btn-richb-primary" style={{ padding: '11px 22px', fontSize: 13, fontFamily: 'inherit' }}>
            日本語版を見る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── ヘッダー ── */}
        <div style={{ padding: '40px 0 28px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 100, padding: '3px 12px 3px 8px', marginBottom: 14 }}>
            <span style={{ fontSize: 15 }}>📋</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              thaievisa.go.th 入力ガイド
            </span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 26, fontWeight: 700, color: C.text, margin: '0 0 14px', lineHeight: 1.35 }}>
            タイe-Visa（DTV）申請フォームの<br />入力方法を全画面・全項目解説
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, margin: 0 }}>
            公式サイト（thaievisa.go.th）のDTV申請フォームは全て英語です。このページでは、実際の入力画面の画像をもとに各欄の意味・入力内容・注意点を日本語で丁寧に解説します。フォームを開きながら参照してください。
          </p>
          <div style={{ marginTop: 16, padding: '12px 16px', background: '#FFFBF0', border: `1px solid #E8D5A0`, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 8px 8px 0' }}>
            <p style={{ fontSize: 12.5, color: '#6B4F1A', margin: 0, lineHeight: 1.65 }}>
              ⚠ このガイドはタイ外務省公式マニュアル（2025年版）をもとに作成しています。フォームの仕様は随時変更される場合があります。申請時は公式サイトの最新表示を優先してください。
            </p>
          </div>
        </div>

        {/* ── 目次 ── */}
        <nav style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 36 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: C.muted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>このページの内容</p>
          <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[
              ['step1', 'STEP 1：適格確認（国籍・現在地・申請公館・ビザタイプ）'],
              ['step2', 'STEP 2：申請者情報（パスポート・個人情報・住所・職業）'],
              ['step3', 'STEP 3：渡航情報（入国日・滞在先・訪問歴）'],
              ['step4', 'STEP 4：書類のアップロード'],
              ['checklist', '提出前の最終チェックリスト'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} style={{ fontSize: 13, color: C.green, textDecoration: 'none' }}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ════════════════ STEP 1 ════════════════ */}
        <section id="step1" style={{ marginBottom: 48 }}>
          <StepHeading num={1} title="適格確認" subtitle="Check your eligibility" />

          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, marginBottom: 20 }}>
            申請フォームの最初の画面です。ここで入力した「国籍・現在地・申請公館」によって、その後の申請内容が決まります。入力ミスをするとDTVのフォームが表示されない場合もあるため、確実に確認しながら進めてください。
          </p>

          <ScreenShot src="/evisa-manual/evisa-manual-p21.png" alt="STEP1 適格確認フォーム画面" caption="STEP1 – Check your eligibility（適格確認）" />

          <FieldBlock label="Country/Territory of Passport/TD" ja="パスポート発行国">
            所持しているパスポートを発行した国を選択します。日本のパスポートをお持ちの方は <strong>Japan</strong> を選択してください。「国籍」ではなく「パスポートを発行した国」です。外国籍で日本在住の方は、自国のパスポート発行国を選択します。
          </FieldBlock>

          <FieldBlock label="Current Location" ja="現在地（申請時に住んでいる国）">
            申請時点で実際に居住している国を選択します。旅行中に別の国から申請する場合は注意が必要です。日本在住の方は <strong>Japan</strong> を選択してください。
          </FieldBlock>

          <FieldBlock label="Apply at" ja="申請公館（管轄のタイ大使館・領事館）" warn="居住地の管轄外公館への申請は推奨されていません。日本在住の方は、居住地を管轄するタイ大使館または総領事館を選択してください（東京・大阪・福岡・名古屋等）。">
            申請を行うタイ大使館または総領事館を選択します。日本在住の方は「Royal Thai Embassy, Tokyo（東京）」「Royal Thai Consulate-General, Osaka（大阪）」などから管轄公館を選択します。
          </FieldBlock>

          <div style={{ height: 1, background: C.border, margin: '28px 0' }} />

          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, marginBottom: 16 }}>
            上記3項目を入力後、「渡航目的（Purpose of Visit）」の選択画面に移ります。<strong>ここがDTV申請で最も重要な選択です。</strong>
          </p>

          <ScreenShot src="/evisa-manual/evisa-manual-p22.png" alt="渡航目的・ビザタイプ選択画面" caption="Purpose of Visit（渡航目的）選択画面" />

          <FieldBlock label="Travel Document Type" ja="渡航書類の種類">
            パスポートの種類を選択します。日本の一般旅券（青・赤）は <strong>PASSPORT</strong>。選択肢は「PASSPORT」「TRAVEL DOCUMENT」「SEAMAN'S BOOK」「CERTIFICATE OF IDENTITY-C.I」の4種類です。
          </FieldBlock>

          <FieldBlock label="Visa Type" ja="ビザの種類">
            申請するビザの種類を選択します。このガイドの対象は <strong>Destination Thailand Visa (DTV)</strong> です。プルダウンから必ずDTVを選択してください。観光ビザや就労ビザなど他の種類が表示されますが、DTVを選択します。
          </FieldBlock>

          <FieldBlock
            label="Purpose of Visit"
            ja="渡航目的（DTVルートの選択）★最重要★"
            warn="ここで選んだルートによって、Step 4でアップロードする書類が変わります。Workcationを選んだのにSoft Powerの書類をアップロードしても審査が通りません。事前にどちらのルートで申請するか必ず決めてから進んでください。"
          >
            DTV申請で最も重要な選択です。以下の3つのいずれかを選びます：
            <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 2 }}>
              <li><strong>Workcation (digital nomad/remote worker/foreign talent/freelancer)</strong> — 海外の雇用主・クライアントへのリモートワークが目的の方</li>
              <li><strong>Thai soft power-related activities</strong> — ゴルフ・タイ料理・ムエタイ等タイの文化活動が目的の方</li>
              <li><strong>Spouse and children under 20 years old of DTV visa holders</strong> — すでにDTVを持つ配偶者・20歳未満の子どもとして同伴する方</li>
            </ul>
          </FieldBlock>

          <FieldBlock label="Number of Entries" ja="入国回数">
            DTVは <strong>Multiple（マルチプルエントリー）</strong> が自動選択されます。5年間で何度でも入国可能です。
          </FieldBlock>
        </section>

        {/* ════════════════ STEP 2 ════════════════ */}
        <section id="step2" style={{ marginBottom: 48 }}>
          <StepHeading num={2} title="申請者情報" subtitle="Applicant Information" />

          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, marginBottom: 20 }}>
            このステップは3つのセクションに分かれています。①パスポートの顔写真ページのアップロード、②申請者写真のアップロード、③個人情報の手入力です。パスポートを手元に用意してから進めてください。
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>3.1 パスポート顔写真ページのアップロード</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p23.png" alt="パスポートアップロード画面" caption="Upload Biodata Page of Passport（パスポート顔写真ページのアップロード）" />

          <FieldBlock label="Upload Biodata Page of Passport" ja="パスポート顔写真ページ（必須）" warn="アップロード後、氏名・生年月日・パスポート番号などの個人情報フィールドが自動入力されます。自動入力の内容を必ず手動で確認・修正してください。文字認識エラーで誤入力される場合があります。">
            パスポートの顔写真・個人情報が記載されているページをスキャンまたは撮影してアップロードします。ファイル形式はJPG/JPEGまたはPDF、上限3MBです。<br /><br />
            ポイント：明るい場所でフラットに撮影し、四隅が収まっていること。MRZ（パスポート下部の機械読取帯）が鮮明に読めること。
          </FieldBlock>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '20px 0 12px' }}>3.2 申請者写真のアップロード</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p24.png" alt="申請者写真アップロード画面" caption="Upload a photograph（申請者写真のアップロード）" />

          <FieldBlock label="Upload a photograph" ja="申請者の顔写真（必須）" warn="6ヶ月以内に撮影した写真が必要です。背景が白または薄い無地でない場合や、サングラス・帽子着用の写真は不適切として差し戻される可能性があります。">
            申請者本人の顔写真をアップロードします。ファイル形式はJPG/JPEG、上限3MBです。証明写真（白背景・正面向き・6ヶ月以内）が推奨されます。
          </FieldBlock>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '20px 0 12px' }}>3.3 個人情報の入力</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p25.png" alt="個人情報入力フォーム" caption="Personal Information（個人情報の入力）" />

          <FieldBlock label="Title / Sex" ja="敬称・性別">
            Titleは「Mr.」「Mrs.」「Miss」「Ms.」などから選択。Sexは「Male」「Female」。いずれもパスポートの記載と一致させてください。
          </FieldBlock>

          <FieldBlock label="First name / Middle name / Family name" ja="名・ミドルネーム・姓" warn="パスポートに記載されているローマ字表記と完全一致させてください。1文字でも違うと書類間の不一致になります。ミドルネームはパスポートに記載がある場合のみ入力します。">
            パスポートの英字表記（ALL CAPS）をそのまま入力します。日本のパスポートは全て大文字表記です。Family nameが姓（例：YAMADA）、First nameが名（例：TARO）です。
          </FieldBlock>

          <FieldBlock label="Contact No." ja="電話番号（国際形式）">
            携帯電話番号を国際形式で入力します。日本の番号は先頭の「0」を除いて国番号「+81」を付けます。例：090-1234-5678 → +81-90-1234-5678。国旗のプルダウンで国番号を選択できます。
          </FieldBlock>

          <FieldBlock label="E-mail" ja="メールアドレス" warn="審査結果・追加書類依頼・ビザ承認通知はすべてこのアドレスに届きます。1文字でもミスがあると通知を受け取れません。入力後に必ずスペルを確認してください。">
            申請後も定期的に確認できるメールアドレスを入力します。
          </FieldBlock>

          <FieldBlock label="Nationality / Nationality at birth" ja="国籍・出生時の国籍">
            「Nationality」は現在の国籍（日本国籍の方はJapanese）。「Nationality at birth」は生まれた時の国籍です。通常は同じですが、帰化等で変わっている場合は出生時の国籍を入力します。
          </FieldBlock>

          <FieldBlock label="Do you hold any other nationality?" ja="他の国籍を持っているか">
            二重国籍の場合は「Yes」を選択します。日本国籍のみの方は「No」。
          </FieldBlock>

          <FieldBlock label="Place of birth (Country) / City of birth" ja="出生地（国・都市）">
            生まれた国と都市を入力します。日本生まれの方はCountryで「Japan」を選択し、City of birthに出生都市のローマ字（例：TOKYO、OSAKA）を入力します。
          </FieldBlock>

          <FieldBlock label="Date of birth" ja="生年月日" warn="日本では「年/月/日」の順が一般的ですが、このフォームは「日/月/年（DD/MM/YYYY）」の逆順です。最も入力ミスが多い項目です。入力後に必ず確認してください。">
            カレンダーアイコンをクリックして日付を選択するか、直接入力します。形式はDD/MM/YYYY（日・月・年）です。例：1985年3月15日 → 15/03/1985。
          </FieldBlock>

          <FieldBlock label="Marital status" ja="婚姻状況">
            選択肢は「Single（未婚）」「Married（既婚）」「Common Law Marriage（事実婚）」「Civil Union/Domestic Partnership」「Widowed（死別）」「Divorced（離婚）」「Separated（別居）」の7種類です。
          </FieldBlock>

          <div style={{ height: 1, background: C.border, margin: '24px 0' }} />

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>渡航書類（Travel Document）</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p26.png" alt="渡航書類情報入力フォーム" caption="Travel Document（渡航書類情報）" />

          <FieldBlock label="Type of Travel Document" ja="渡航書類の種類">
            選択肢は「PASSPORT」「TRAVEL DOCUMENT」「SEAMAN'S BOOK」「CERTIFICATE OF IDENTITY-C.I」の4種類。日本の通常パスポートは <strong>PASSPORT</strong> を選択してください。
          </FieldBlock>

          <FieldBlock label="Travel Document No." ja="パスポート番号" warn="「1（数字のイチ）」と「I（アルファベット）」、「0（ゼロ）」と「O（オー）」を間違えやすいです。残高証明書など他の書類に記載したパスポート番号と必ず一致させてください。">
            パスポートの旅券番号を入力します。日本のパスポートは英字2文字＋数字7桁です（例：TK1234567）。
          </FieldBlock>

          <FieldBlock label="Place of Issue" ja="発行地（発行機関）">
            パスポートを発行した機関を入力します。日本国パスポートは「Ministry of Foreign Affairs, Japan」と入力します。
          </FieldBlock>

          <FieldBlock label="Date of Issue / Date of Expiry" ja="発行日・有効期限" warn="「Date of Issue（発行日）」と「Date of Expiry（有効期限）」を混同しないよう注意。DTVの申請にはパスポートの残存有効期間が6ヶ月以上必要です。">
            パスポートに記載されている発行日と有効期限を「DD/MM/YYYY」形式で入力します。
          </FieldBlock>

          <div style={{ height: 1, background: C.border, margin: '24px 0' }} />

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>住所・職業情報</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p27.png" alt="住所・職業情報入力フォーム" caption="Address Information & Employment Details（住所・職業情報）" />

          <FieldBlock label="Home address / Country / City" ja="自宅住所">
            現在住んでいる日本の住所を英語（ローマ字）で入力します。番地・町名・区市町村の順で記載します。例：1-2-3 Shinjuku, Shinjuku-ku, Tokyo。
          </FieldBlock>

          <FieldBlock label="Is your permanent address same as your current address?" ja="現住所と常住所が同じか">
            通常は「Yes」を選択します。日本で住民票がある住所と異なる場所に住んでいる場合は「No」を選択して別途入力します。
          </FieldBlock>

          <FieldBlock label="Occupation" ja="職業" warn="フリーランス・個人事業主の方は「Freelance」を選択。Workcationルートで申請する場合、職業の選択は雇用契約書・業務委託契約書との整合性が重要です。">
            プルダウンから選択します。選択肢：Business owner / Employee / Freelance / Government Official / Retired / Student / Unemployed / Other の8種類。
          </FieldBlock>

          <FieldBlock label="Annual Income" ja="年収">
            年収の範囲をプルダウンから選択します。正確な金額ではなく、収入帯（レンジ）を選択する形式です。
          </FieldBlock>
        </section>

        {/* ════════════════ STEP 3 ════════════════ */}
        <section id="step3" style={{ marginBottom: 48 }}>
          <StepHeading num={3} title="渡航情報" subtitle="Travel Information" />

          <ScreenShot src="/evisa-manual/evisa-manual-p29.png" alt="渡航情報入力フォーム" caption="Travel Information（渡航情報の入力）" />

          <FieldBlock label="Intended date of arrival / departure" ja="タイへの入国予定日・出国予定日" warn="申請は入国予定日の3ヶ月前以内から可能です。まだ航空券を購入していない場合はおおよその予定日を入力して構いません。審査中に日程が変わっても対応できる場合があります。">
            タイへの入国予定日と出国予定日をカレンダーで選択します。入力後に「Duration of stay」（滞在日数）が自動計算されます。
          </FieldBlock>

          <FieldBlock label="Last port of embarkation – Country/Territory" ja="最終出発地（国）">
            タイへ向かう直前に出発する国を選択します。日本から直行便でタイへ向かう場合は「Japan」を選択。経由地がある場合は最後に乗り継いだ国を入力します。
          </FieldBlock>

          <FieldBlock label="Port of arrival" ja="入国方法（空路・陸路・海路）">
            <strong>AIR（空路）</strong>・<strong>LAND（陸路）</strong>・<strong>SEA（海路）</strong> の3種類から選択します。日本からタイへ飛行機で入国する方はAIRを選択。AIRを選ぶと空港のプルダウンが表示されるので、入国予定空港（例：Suvarnabhumi International Airport）を選択します。
          </FieldBlock>

          <FieldBlock label="Schedule (Commercial) / Flight No." ja="フライトスケジュール・便名">
            航空会社の定期便の場合は「Schedule (Commercial)」を選択し、便名（例：TG641）を入力します。まだ航空券を購入していない場合は空欄または仮入力で構いません。
          </FieldBlock>

          <FieldBlock label="Have you ever visited Thailand?" ja="タイ訪問歴">
            タイへの過去の訪問経験を「Yes」または「No」で回答します。「Yes」の場合は過去の訪問回数・最後の訪問日を入力する欄が追加表示されます。正直に申告してください（訪問歴が多くても不利にはなりません）。
          </FieldBlock>

          <FieldBlock label="Have you ever applied for Thai visa?" ja="タイビザの申請歴">
            過去にタイのビザを申請したことがあるかを「Yes」または「No」で回答します。
          </FieldBlock>

          <FieldBlock label="Are you travelling as part of a tour group?" ja="ツアーグループでの渡航か">
            個人申請の場合は「No」を選択します。
          </FieldBlock>

          <div style={{ height: 1, background: C.border, margin: '24px 0' }} />

          <h3 style={{ fontSize: 15, fontWeight: 700, color: C.text, margin: '0 0 12px' }}>タイでの滞在先情報</h3>
          <ScreenShot src="/evisa-manual/evisa-manual-p30.png" alt="タイ滞在先情報入力フォーム" caption="Accommodation in Thailand（タイでの滞在先情報）" />

          <FieldBlock label="Accommodation Type" ja="滞在先の種類">
            「Hotel（ホテル）」「Private Property（賃貸・知人宅）」「Own Property（自己所有物件）」の3種類から選択します。バンコクのホテルに滞在する場合は「Hotel」を選択します。
          </FieldBlock>

          <FieldBlock label="Accommodation Name / Street Address" ja="滞在先の名称・住所" warn="まだ宿泊先が決まっていない場合は、バンコク中心部のホテル（例：Novotel Bangkok Sukhumvit）などを仮入力するケースが多く見られます。入国審査で聞かれることもあるため、実際の滞在先を把握しておくことが重要です。">
            ホテルや滞在先の名称と住所を英語で入力します。City（都市）・District（区）・Subdistrict（サブ区）・Postcode（郵便番号）も必要です。
          </FieldBlock>

          <FieldBlock label="Duration of stay (Days)" ja="滞在日数">
            その滞在先での宿泊予定日数を入力します。複数の滞在先がある場合は「Additional accommodation in Thailand」を「Yes」に設定して追加入力できます。
          </FieldBlock>
        </section>

        {/* ════════════════ STEP 4 ════════════════ */}
        <section id="step4" style={{ marginBottom: 48 }}>
          <StepHeading num={4} title="書類のアップロード" subtitle="Supporting Documents" />

          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, marginBottom: 20 }}>
            アップロードする書類はStep 1で選択した渡航目的（Workcation / Soft Power）によって異なります。ファイル形式はJPG・JPEG・PDF、1ファイルの上限は3MBです。アップロード後は各ファイルが正常に表示されることを確認してから「Done」ボタンを押してください。
          </p>

          <ScreenShot src="/evisa-manual/evisa-manual-p31.png" alt="書類アップロード画面" caption="Supporting Documents（書類のアップロード）" />

          <FieldBlock label="1. Biodata page of Passport or Travel Document" ja="パスポート顔写真ページ（必須）">
            Step 2でアップロード済みのものが自動反映されます。ファイル名（Document-1.jpg等）が表示されていれば完了です。
          </FieldBlock>

          <FieldBlock label="2. Photograph taken within the last six months" ja="6ヶ月以内に撮影した顔写真（必須）">
            Step 2でアップロード済みの写真が反映されます。
          </FieldBlock>

          <FieldBlock label="3. Document indicating current location" ja="現在地証明（必須）" warn="現在地証明として認められやすいのは、住民票（英語版または英訳付き）、銀行の明細書、公共料金の領収書などです。日本語書類の場合は英語の説明を添付することが推奨されます。">
            現在住んでいる国を証明する書類をアップロードします。
          </FieldBlock>

          <FieldBlock label="4. Supporting documents（ルート別）" ja="申請根拠書類（Workcation or Soft Power）" warn="書類の内容とStep 1で選んだ渡航目的が一致していない場合、審査で問題になります。Workcationなら雇用契約書・業務委託契約書等、Soft Powerなら受入レターをアップロードします。">
            <strong>Workcationの場合：</strong>雇用主または海外クライアントとの契約書（英語）。会社員の方はリモートワーク許可書も有効。フリーランスの方は業務委託契約書＋請求書。
            <br /><br />
            <strong>Soft Power Activitiesの場合：</strong>タイのゴルフ場・料理学校・ムエタイジム等の施設が発行した受入レター（Acceptance Letter）。氏名・活動内容・期間・施設名が明記されたもの。
          </FieldBlock>
        </section>

        {/* ════════════════ チェックリスト ════════════════ */}
        <section id="checklist" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: '0 0 12px', paddingTop: 8, borderTop: `2px solid ${C.tealMid}` }}>
            提出前の最終チェックリスト
          </h2>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
            {[
              ['全書類の氏名・パスポート番号が一致しているか', 'パスポート・残高証明・雇用契約書・受入レター等すべての氏名・番号を照合する'],
              ['Purpose of Visitの選択と書類が一致しているか', 'Workcation選択→雇用契約書等、Soft Power選択→受入レター'],
              ['日付形式はDD/MM/YYYYになっているか', '日本式（YYYY/MM/DD）ではなく日→月→年の順になっているか確認'],
              ['メールアドレスのスペルミスはないか', '審査結果・追加依頼・承認通知はこのアドレスにのみ届く'],
              ['パスポートの残存有効期間は6ヶ月以上あるか', '申請時点から6ヶ月未満の場合は先にパスポートを更新する'],
              ['残高証明書は1〜2週間以内に発行されたものか', '発行が古すぎると現時点の残高を証明できないと判断される場合がある'],
              ['全ファイルが正常にアップロードされているか', 'Doneを押す前に各ファイルをクリックして内容が閲覧できることを確認'],
            ].map(([title, detail], i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 6 ? 14 : 0, paddingBottom: i < 6 ? 14 : 0, borderBottom: i < 6 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${C.tealMid}`, flexShrink: 0, marginTop: 1 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.text, margin: '0 0 3px' }}>{title}</p>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.55 }}>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
          <Link href={`/${locale}/requirements`} className="btn-richb-primary" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            必要書類チェックリストを見る
          </Link>
          <Link href={`/${locale}/contact`} className="btn-richb-sub" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            申請について相談する
          </Link>
        </div>

        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.7, marginBottom: 80 }}>
          ※ 本ガイドはタイ外務省公式マニュアル（English-Manual.pdf）の画面をもとに作成しています。フォームの仕様は随時変更される場合があります。館差・時期差により手続きが異なる場合があるため、申請先公館の最新案内を必ず確認してください。本ページの内容は一般的な情報提供を目的としており、個別の申請結果を保証するものではありません。
        </p>

      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// 共通コンポーネント
// ────────────────────────────────────────────────────

function StepHeading({ num, title, subtitle }: { num: number; title: string; subtitle: string }) {
  const C2 = { green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.08)', tealMid: 'rgba(10,122,106,0.18)', text: '#1A2435', muted: '#7E8EA4', border: 'rgba(26,36,53,0.10)' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20, paddingBottom: 16, borderBottom: `2px solid ${C2.tealMid}` }}>
      <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, background: C2.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: '#fff', boxShadow: '0 2px 10px rgba(10,122,106,0.25)' }}>
        {num}
      </div>
      <div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: C2.green, margin: 0, lineHeight: 1.2 }}>
          STEP {num}：{title}
        </h2>
        <span style={{ fontSize: 11, color: C2.muted, fontFamily: 'monospace' }}>{subtitle}</span>
      </div>
    </div>
  )
}

function ScreenShot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const C2 = { border: 'rgba(26,36,53,0.10)', muted: '#7E8EA4', bgSection: '#EDF1F5' }
  return (
    <div style={{ margin: '0 0 24px', border: `1px solid ${C2.border}`, borderRadius: 10, overflow: 'hidden', background: C2.bgSection }}>
      <div style={{ position: 'relative', width: '100%' }}>
        <Image
          src={src}
          alt={alt}
          width={980}
          height={680}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          priority={src.includes('p21') || src.includes('p22')}
        />
      </div>
      <p style={{ fontSize: 11, color: C2.muted, margin: 0, padding: '6px 12px', textAlign: 'center', borderTop: `1px solid ${C2.border}` }}>
        {caption}（出典：タイ外務省公式e-Visaマニュアル）
      </p>
    </div>
  )
}

function FieldBlock({
  label, ja, warn, children,
}: {
  label: string
  ja: string
  warn?: string
  children: React.ReactNode
}) {
  const C2 = { green: '#0A7A6A', tealDim: 'rgba(10,122,106,0.08)', tealMid: 'rgba(10,122,106,0.18)', text: '#1A2435', sub: '#4A5A6E', border: 'rgba(26,36,53,0.10)', gold: '#C9A030' }
  return (
    <div style={{ marginBottom: 22, paddingBottom: 22, borderBottom: `1px solid ${C2.border}` }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px', marginBottom: 8 }}>
        <code style={{ fontSize: 12, fontWeight: 700, color: C2.green, background: C2.tealDim, border: `1px solid ${C2.tealMid}`, padding: '2px 8px', borderRadius: 5 }}>
          {label}
        </code>
        <span style={{ fontSize: 13, fontWeight: 700, color: C2.text }}>{ja}</span>
      </div>
      <div style={{ fontSize: 13.5, color: C2.sub, lineHeight: 1.85 }}>
        {children}
      </div>
      {warn && (
        <div style={{ background: '#FFFBF0', border: '1px solid #E8D5A0', borderLeft: `4px solid ${C2.gold}`, borderRadius: '0 8px 8px 0', padding: '10px 14px', marginTop: 10 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C2.gold, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚠ 注意</p>
          <p style={{ fontSize: 12.5, color: '#6B4F1A', margin: 0, lineHeight: 1.7 }}>{warn}</p>
        </div>
      )}
    </div>
  )
}
