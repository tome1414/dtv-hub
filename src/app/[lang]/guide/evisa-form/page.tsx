import type { Metadata } from 'next'
import type { Locale } from '@/middleware'
import { locales } from '@/middleware'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  const isJa = lang === 'ja'
  return {
    title: isJa
      ? 'タイe-Visa（DTV）申請フォームの入力方法を全項目解説'
      : 'Thailand e-Visa DTV Application Form: Every Field Explained',
    description: isJa
      ? 'thaievisa.go.th のDTV申請フォームを画面ごとに全項目解説。各入力欄の意味・入力例・よくあるミスを日本語で丁寧に説明します。'
      : 'A complete field-by-field walkthrough of the Thailand e-Visa DTV application form on thaievisa.go.th, with input examples and warnings.',
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
  gold: '#C9A030', goldDim: 'rgba(201,160,48,0.10)',
}

export default async function EvisaFormPage({ params }: PageProps) {
  const { lang } = await params
  const locale = (locales.includes(lang as Locale) ? lang : 'en') as Locale
  const isJa = locale === 'ja'

  if (!isJa) {
    // English version – abbreviated for now, full JA below
    return (
      <div style={{ minHeight: '100vh', background: C.bg, paddingTop: 64, paddingBottom: 96 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 1.25rem' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 12 }}>
            Thailand e-Visa (DTV) Application Form — Complete Guide
          </h1>
          <p style={{ fontSize: 14, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            A detailed walkthrough of every field in the thaievisa.go.th DTV application form, with input examples and notes on common mistakes.
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>English version coming soon. Please refer to the Japanese guide for now.</p>
          <div style={{ marginTop: 24 }}>
            <Link href={`/ja/guide/evisa-form`} className="btn-richb-primary" style={{ padding: '11px 22px', fontSize: 13, fontFamily: 'inherit' }}>
              日本語版を見る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, paddingTop: 64, paddingBottom: 96 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 1.25rem' }}>

        {/* ── ヘッダー ── */}
        <div style={{ padding: '40px 0 32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 100, padding: '3px 12px 3px 8px', marginBottom: 14 }}>
            <span style={{ fontSize: 15 }}>📋</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              thaievisa.go.th 入力ガイド
            </span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 27, fontWeight: 700, color: C.text, margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
            タイe-Visa（DTV）申請フォームの<br />入力方法を全項目解説
          </h1>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, margin: 0, maxWidth: 640 }}>
            公式サイト（thaievisa.go.th）のDTV申請フォームは全て英語表記です。このページでは、各入力欄に何を・どう入力するかを画面ごとに丁寧に説明します。フォームを開きながらこのページを参照してください。
          </p>
        </div>

        {/* ── 目次 ── */}
        <nav style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>このページの内容</p>
          <ol style={{ margin: 0, padding: '0 0 0 18px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              ['step1', 'STEP 1：ビザ種別の選択'],
              ['step2', 'STEP 2：個人情報の入力'],
              ['step3', 'STEP 3：パスポート情報'],
              ['step4', 'STEP 4：連絡先情報'],
              ['step5', 'STEP 5：渡航情報・申請目的（最重要）'],
              ['step6', 'STEP 6：書類のアップロード'],
              ['checklist', '提出前の最終チェックリスト'],
            ].map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} style={{ fontSize: 13, color: C.green, textDecoration: 'none' }}>
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ════════════════════════════════════════
            STEP 1
        ════════════════════════════════════════ */}
        <section id="step1" style={{ marginBottom: 40 }}>
          <StepHeading num={1} title="ビザ種別の選択" screen="SCREEN 1" />
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            申請を開始すると最初に表示される基本設定画面です。ここでDTVを選択することで、以降の入力項目がDTV向けに切り替わります。入力内容は少ないですが、ここで設定を誤ると正しい申請フォームが表示されないため、順番通りに確認してください。
          </p>

          <FieldBlock
            label="Document issuing country/region"
            ja="旅行書類（パスポート）の発行国"
            example="Japan"
          >
            パスポートを発行した国を選択します。日本のパスポートをお持ちの方は「Japan」を選択してください。この項目は「国籍」ではなく「パスポートを発行した国」を指します。日本に住んでいる外国籍の方が自国のパスポートで申請する場合は、そのパスポートを発行した国を選択してください。
          </FieldBlock>

          <FieldBlock
            label="Current location"
            ja="現在地（申請時に生活・居住している国）"
            example="Japan"
          >
            申請時点で実際に生活・居住している国を選択します。観光旅行中などで一時的に別の国にいる場合ではなく、「現在住んでいる国」を選択します。日本に住んでいる方は「Japan」を選択してください。
          </FieldBlock>

          <FieldBlock
            label="Place of application"
            ja="申請場所（管轄のタイ大使館・領事館）"
            example="Royal Thai Embassy, Tokyo（東京のタイ王国大使館）など管轄の公館"
            warn="居住地の管轄外の公館を選択することは推奨されていません。日本在住の方は、居住地を管轄するタイ大使館または総領事館を選んでください。"
          >
            申請を行うタイ大使館または総領事館を選択します。DTVはe-Visaによるオンライン申請のため、通常は現在地を管轄する公館が選択肢に表示されます。日本在住の方は「Royal Thai Embassy, Tokyo（タイ王国大使館・東京）」「Royal Thai Consulate-General, Osaka（タイ王国総領事館・大阪）」などから、お住まいの地域を管轄する公館を選択してください。
          </FieldBlock>

          <FieldBlock
            label="Visa type"
            ja="ビザの種類"
            example='Destination Thailand Visa (DTV)'
            warn="プルダウンに「DTV」「Destination Thailand Visa」など複数の表記がある場合は、「Destination Thailand Visa (DTV)」を選択してください。この選択によって以降の入力項目がDTV向けに切り替わります。"
          >
            申請するビザの種類を選択します。このガイドはDTV（Destination Thailand Visa）の申請を前提としているため、プルダウンから「Destination Thailand Visa (DTV)」を選択してください。タイには観光ビザ・就労ビザなど複数の種類があるため、必ずDTVを選択していることを確認してから次に進んでください。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            STEP 2
        ════════════════════════════════════════ */}
        <section id="step2" style={{ marginBottom: 40 }}>
          <StepHeading num={2} title="個人情報の入力" screen="SCREEN 2" />
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            パスポートに記載されている情報をそのまま入力します。スペルや生年月日の形式ミスが最も発生しやすいステップです。パスポートを手元に置いた状態で入力してください。入力内容は残高証明書・雇用契約書など他の書類の名前表記と一致している必要があります。
          </p>

          <FieldBlock
            label="Title"
            ja="敬称"
            example="男性：Mr. ／ 既婚女性：Mrs. ／ 未婚女性：Miss ／ 指定しない：Ms."
          >
            申請者の敬称を選択します。男性は「Mr.」、既婚女性は「Mrs.」、未婚女性は「Miss」、敬称を指定しない場合は「Ms.」を選ぶのが一般的です。パスポートに敬称が記載されている場合は、それに合わせて選択してください。
          </FieldBlock>

          <FieldBlock
            label="Surname (Family Name)"
            ja="姓（ファミリーネーム）"
            example="YAMADA（パスポートの英字表記と完全一致）"
            warn="他の提出書類（残高証明書・雇用契約書など）の氏名表記と一致していることも必ず確認してください。書類間で氏名の表記が食い違うと、審査で追加確認が入ることがあります。"
          >
            パスポートに記載されているローマ字表記の姓を入力します。パスポートの英字表記（例：YAMADA）と完全に一致するよう、大文字・小文字・スペルを確認してください。日本のパスポートはすべて大文字（ALL CAPS）で記載されています。
          </FieldBlock>

          <FieldBlock
            label="Given Name (First Name)"
            ja="名（ファーストネーム）"
            example="TARO（パスポートの英字表記と完全一致）"
            warn="ミドルネームがパスポートに記載されている場合は、ファーストネームとの間にスペースを入れて一緒に入力します。パスポートに記載されていないミドルネームは入力しないでください。"
          >
            パスポートに記載されているローマ字表記の名（ファーストネーム）を入力します。姓と同様に、パスポートの表記と完全に一致させてください。
          </FieldBlock>

          <FieldBlock
            label="Date of Birth"
            ja="生年月日"
            example="例：1985年3月15日生まれ → 15 / 03 / 1985（DD / MM / YYYY）"
            warn="日本では「年/月/日」の順が一般的ですが、このフォームは「日/月/年」の逆順です。最も入力ミスが多い項目のひとつです。入力後は必ず「15/03/1985」のように日・月・年の順になっていることを確認してください。"
          >
            生年月日を「DD/MM/YYYY」形式で入力します。「DD」が日、「MM」が月、「YYYY」が西暦年を表します。例えば1985年3月15日生まれの場合は「15/03/1985」と入力します。
          </FieldBlock>

          <FieldBlock
            label="Place of Birth (City)"
            ja="出生地（市区町村）"
            example="東京生まれ：TOKYO ／ 大阪生まれ：OSAKA ／ 横浜生まれ：YOKOHAMA"
          >
            出生した市区町村をローマ字（英語）で入力します。出生地が不明な場合は、戸籍謄本などで確認するか、出生県の県庁所在地（例：愛知県なら「NAGOYA」）を入力する方法もあります。
          </FieldBlock>

          <FieldBlock
            label="Place of Birth (Country)"
            ja="出生地（国）"
            example="Japan"
          >
            出生した国をプルダウンから選択します。日本で生まれた方は「Japan」を選択してください。
          </FieldBlock>

          <FieldBlock
            label="Nationality"
            ja="国籍"
            example="Japanese"
            warn="二重国籍の場合は、今回の申請に使用するパスポートの国籍を選択してください。"
          >
            国籍をプルダウンから選択します。日本国籍の方は「Japanese」を選択してください。
          </FieldBlock>

          <FieldBlock
            label="Gender"
            ja="性別"
            example="Male（男性）または Female（女性）"
          >
            「Male（男性）」または「Female（女性）」を選択します。パスポートの性別記載と一致させてください。
          </FieldBlock>

          <FieldBlock
            label="Marital Status"
            ja="婚姻状況"
            example="未婚：Single ／ 既婚：Married ／ 離婚：Divorced ／ 死別：Widowed"
          >
            現在の婚姻状況をプルダウンから選択します。未婚の方は「Single」、既婚の方は「Married」、離婚経験がある方は「Divorced」、配偶者と死別した方は「Widowed」を選択します。
          </FieldBlock>

          <FieldBlock
            label="Religion"
            ja="宗教"
            example="特定の宗教を信仰していない場合：No Religion または None"
            warn="この項目は審査の可否を直接左右するものではありませんが、正確な情報を記載してください。入力が必須でない場合や「Prefer not to say」の選択肢がある場合もあります。"
          >
            信仰している宗教をプルダウンから選択します。仏教は「Buddhism」、キリスト教は「Christianity」、イスラム教は「Islam」などが選択肢にあります。特定の宗教を信仰していない場合は「No Religion」または「None」を選択するのが一般的です。
          </FieldBlock>

          <FieldBlock
            label="Current Occupation / Profession"
            ja="現在の職業・職種"
            example="会社員：Company Employee ／ エンジニア：Software Engineer ／ フリーランス：Freelancer / Self-employed ／ 無職：Unemployed ／ 専業主婦・主夫：Homemaker"
            warn="フリーランスや個人事業主の場合は「Freelancer」または「Self-employed」と入力します。DTVのWorkcationルートで申請する場合は、実際の職種（例：Web Designer, Marketing Consultant）を具体的に書くと申請内容との整合性が高まります。"
          >
            現在の職業を英語で入力します。テキスト入力欄またはプルダウンで選択する形式になっています。
          </FieldBlock>

          <FieldBlock
            label="Name and Address of Employer / School"
            ja="勤務先・学校の名称と住所"
            example="会社員：勤務先の英語社名と住所 ／ フリーランス：Self-employed ／ 学生：学校名と所在地"
            warn="勤務先名称は英語の正式名称を入力してください。日本語社名しかない場合は、ローマ字またはヘボン式表記で入力します。フリーランスや個人事業主で特定の勤務先がない場合は「Self-employed」と入力して構いません。"
          >
            現在の勤務先または在籍している学校の名称と住所を入力します。会社員の方は会社名と所在地（英語）を記入します。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            STEP 3
        ════════════════════════════════════════ */}
        <section id="step3" style={{ marginBottom: 40 }}>
          <StepHeading num={3} title="パスポート情報" screen="SCREEN 3" />
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            パスポートの記載情報を転記します。パスポートを手元に置き、番号・発行日・有効期限を一字一句正確に入力してください。このステップでの転記ミスは、書類間の不一致として審査で指摘される原因になります。
          </p>

          <FieldBlock
            label="Type of Travel Document"
            ja="渡航書類の種類"
            example="一般のパスポート：Ordinary Passport"
            warn="外交旅券（赤いパスポート）をお持ちの方は「Diplomatic Passport」を選択します。通常の青いパスポートをお持ちの方は「Ordinary Passport」で間違いありません。"
          >
            所持しているパスポートの種類をプルダウンから選択します。日本で一般的に発行される青色・赤色のパスポートは「Ordinary Passport（通常旅券）」に該当します。
          </FieldBlock>

          <FieldBlock
            label="Passport Number"
            ja="パスポート番号（旅券番号）"
            example="例：TK1234567（英字2文字＋数字7桁）"
            warn="「1（数字のイチ）」と「I（アルファベットのアイ）」、「0（ゼロ）」と「O（オー）」を間違えやすいので注意してください。また、残高証明書・雇用契約書など他の書類に記載したパスポート番号と一致していることも確認してください。"
          >
            パスポートに記載されている旅券番号を入力します。日本のパスポートは英字2文字＋数字7桁の形式です（例：TK1234567）。アルファベットの大文字と数字を正確に転記してください。パスポートの顔写真ページ右上付近に記載されています。
          </FieldBlock>

          <FieldBlock
            label="Date of Issue"
            ja="パスポート発行日（交付年月日）"
            example="例：2022年6月10日発行 → 10 / 06 / 2022（DD / MM / YYYY）"
            warn="「Date of Issue（発行日）」と「Date of Expiry（有効期限）」を混同しないよう注意してください。パスポートの顔写真ページに両方の日付が記載されています。"
          >
            パスポートの発行（交付）年月日を「DD/MM/YYYY」形式で入力します。パスポート内側の「Date of Issue（発行日）」欄に記載されている日付を転記してください。
          </FieldBlock>

          <FieldBlock
            label="Date of Expiry"
            ja="パスポート有効期限"
            example="例：2032年6月9日まで → 09 / 06 / 2032（DD / MM / YYYY）"
            warn="DTVの申請には、パスポートの残存有効期間が申請時点から6ヶ月以上必要です。有効期限が6ヶ月を切っている場合は、先にパスポートを更新してから申請してください。審査中に有効期限が近づいた場合も、追加確認が入ることがあります。"
          >
            パスポートの有効期限を「DD/MM/YYYY」形式で入力します。パスポート内側の「Date of Expiry（有効期限）」欄の日付を転記してください。
          </FieldBlock>

          <FieldBlock
            label="Issuing Authority / Office"
            ja="発行機関（パスポートを発行した機関）"
            example="日本国パスポート：Ministry of Foreign Affairs, Japan"
          >
            パスポートを発行した機関名を入力します。日本国パスポートの場合は「Ministry of Foreign Affairs, Japan（外務省）」と入力します。パスポートの裏表紙付近に発行機関が記載されている場合があります。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            STEP 4
        ════════════════════════════════════════ */}
        <section id="step4" style={{ marginBottom: 40 }}>
          <StepHeading num={4} title="連絡先情報" screen="SCREEN 4" />
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            審査結果・追加書類の依頼・承認通知はすべてここで入力したメールアドレスに届きます。スペルミスなく正確に入力することが最重要です。
          </p>

          <FieldBlock
            label="Email Address"
            ja="メールアドレス"
            example="普段使っているメールアドレスを正確に入力"
            warn="メールアドレスを1文字でも間違えると、審査結果・追加書類の依頼・ビザ承認通知を受け取れなくなります。入力後は必ず確認してください。また、タイe-Visaからのメールが迷惑メールフォルダに振り分けられないよう、受信設定も確認しておくことをおすすめします。"
          >
            審査結果や追加確認の連絡が届くメールアドレスを入力します。申請後も定期的に確認できるアドレスを使用してください。GmailやYahooメールなど一般的なメールサービスで問題ありません。
          </FieldBlock>

          <FieldBlock
            label="Confirm Email Address"
            ja="メールアドレス（確認入力）"
            example="上で入力したアドレスをもう一度入力"
            warn="コピー＆ペーストではなく、手で再入力することをおすすめします。コピペではスペルミスがある場合もそのままコピーされてしまいます。"
          >
            入力したメールアドレスの確認欄です。同じアドレスをもう一度入力します。
          </FieldBlock>

          <FieldBlock
            label="Mobile Phone Number"
            ja="携帯電話番号（国際番号形式）"
            example="090-1234-5678 の場合 → +81-90-1234-5678（先頭の0を除いて+81を付ける）"
            warn="日本の電話番号は先頭の「0」を取り除き、国番号「+81」を付けた国際形式で入力します。例えば「090-1234-5678」は「+81-90-1234-5678」と入力します。"
          >
            携帯電話番号を国際形式で入力します。日本の番号の場合は先頭の「0」を除き、国番号「+81」を付けて入力します。
          </FieldBlock>

          <FieldBlock
            label="Address in Country of Residence"
            ja="現住所（日本の住所を英語で）"
            example="東京都新宿区新宿1-2-3 → 1-2-3 Shinjuku, Shinjuku-ku, Tokyo, 160-0022, Japan"
          >
            現在住んでいる日本の住所を英語（ローマ字）で入力します。番地・町名・区市町村・都道府県・郵便番号・国名の順で記載するのが一般的です。マンションや建物名がある場合は、建物名と部屋番号も含めると丁寧です。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            STEP 5（最重要）
        ════════════════════════════════════════ */}
        <section id="step5" style={{ marginBottom: 40 }}>
          <StepHeading num={5} title="渡航情報・申請目的" screen="SCREEN 5" important />

          {/* 重要バナー */}
          <div style={{ background: C.tealDim, border: `2px solid ${C.tealMid}`, borderRadius: 10, padding: '14px 18px', marginBottom: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: C.green, margin: '0 0 6px' }}>
              ⭐ このステップがDTV申請の核心です
            </p>
            <p style={{ fontSize: 13, color: C.sub, margin: 0, lineHeight: 1.7 }}>
              「Purpose of Visit（渡航目的）」の選択によって、必要な書類が大きく変わります。選択を間違えると書類と申請内容が合わず、審査で追加確認や却下につながる可能性があります。フォームを進める前に必ず自分のルートを確認してください。
            </p>
          </div>

          <FieldBlock
            label="Purpose of Visit"
            ja="渡航目的（DTVルートの選択）"
            example={
              'フリーランス・リモートワーカー → 「Workcation」\nゴルフ・料理・武道など文化活動 → 「Soft Power Activities」'
            }
            warn="この選択を間違えると、アップロードした書類と申請根拠が合わず審査で問題が生じます。「Workcation」を選ぶと雇用契約書・リモートワーク許可書が必要になります。「Soft Power Activities」を選ぶとタイ施設からの受入レター（Acceptance Letter）が必要になります。どちらか迷う場合は、まずルートの比較記事を確認してください。"
          >
            DTVには2つのルートがあり、この項目でどちらで申請するかを選択します。<br /><br />
            <strong>Workcation（ワーケーション）</strong>は、タイ国外の雇用主またはクライアントのためにタイからリモートで働くことを目的とする申請です。日本の会社に在籍したままタイで仕事をする会社員、海外クライアントと契約しているフリーランサーなどが該当します。<br /><br />
            <strong>Soft Power Activities（ソフトパワー活動）</strong>は、タイが政策として推進している文化活動（ゴルフ・タイ料理・ムエタイ・伝統工芸など）に参加することを目的とする申請です。仕事の証明書類が不要なため、リモートワークの書類を準備しにくい方に向いています。
          </FieldBlock>

          <FieldBlock
            label="Expected Date of Arrival"
            ja="タイへの予定入国日"
            example="例：2025年9月1日入国予定 → 01 / 09 / 2025（DD / MM / YYYY）"
            warn="まだ航空券を購入していない場合は、おおよその予定日を入力して構いません。ただし、審査完了まで数日〜数週間かかることがあるため、余裕を持った日程を設定することをおすすめします。審査中に予定が変わっても、入国日の変更が可能なケースがあります。"
          >
            タイへの入国予定日を「DD/MM/YYYY」形式で入力します。
          </FieldBlock>

          <FieldBlock
            label="Expected Period of Stay (days)"
            ja="滞在予定日数"
            example="最長180日（例：90日間滞在なら「90」と入力）"
            warn="DTVの1回の入国あたりの滞在上限は180日（約6ヶ月）です。180を超える数値は入力できません。「180日＝5年間ずっと滞在できる」という意味ではなく、1回の入国で滞在できる最大日数が180日という意味です。"
          >
            タイでの滞在予定日数を数字で入力します。長期滞在を希望する場合でも上限の180を超えることはできません。短期の予定であれば実際の滞在日数を入力してください。
          </FieldBlock>

          <FieldBlock
            label="Expected Address in Thailand"
            ja="タイでの滞在先住所（最初の宿泊先）"
            example="例：Novotel Bangkok Sukhumvit 20, 19 Sukhumvit Soi 20, Khlong Toei, Bangkok 10110"
            warn="まだ宿泊先が決まっていない場合は、バンコク中心部のホテルを仮入力するケースがよく見られます。入力した住所が実際と異なっても申請段階では大きな問題になりにくいですが、入国審査で滞在先を確認された際にスムーズに答えられるよう、実際の宿泊先を把握しておくことが重要です。"
          >
            タイ到着後に最初に宿泊する場所の住所を英語で入力します。ホテルの場合はホテル名と住所、コンドミニアムや知人宅の場合はその住所を入力します。
          </FieldBlock>

          <FieldBlock
            label="Have you previously visited Thailand?"
            ja="タイへの訪問歴"
            example="訪問歴がある場合：Yes ／ ない場合：No"
            warn="「Yes」を選択すると過去の訪問回数・滞在期間を入力する欄が表示される場合があります。正直に申告してください。過去の訪問歴があっても申請に不利になるわけではありません。"
          >
            タイへの過去の訪問歴があるかどうかを「Yes」または「No」で回答します。
          </FieldBlock>

          <FieldBlock
            label="Port of Entry"
            ja="入国予定空港（入国地点）"
            example="バンコク：Suvarnabhumi International Airport（スワンナプーム国際空港）またはDon Mueang International Airport（ドンムアン国際空港）"
          >
            タイへの入国予定空港をプルダウンから選択します。バンコクへ入国する方はスワンナプーム国際空港またはドンムアン国際空港のいずれかを選択します。チェンマイ・プーケットなど他の都市へ直接入国する場合は、該当する空港を選択してください。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            STEP 6
        ════════════════════════════════════════ */}
        <section id="step6" style={{ marginBottom: 40 }}>
          <StepHeading num={6} title="書類のアップロード" screen="SCREEN 6" />
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 24 }}>
            必要書類をPDFまたはJPEG形式でアップロードします。ファイルサイズの上限（目安1〜5MB）と文字の鮮明さを確認してからアップロードしてください。アップロード後は各ファイルが正しく表示・閲覧できることを確認してから次のステップに進んでください。
          </p>

          <FieldBlock
            label="Passport Bio-data Page"
            ja="パスポート顔写真ページのスキャン"
            example="PDF または JPEG ／ 文字・顔・MRZ（機械読取帯）がすべて鮮明に読めること"
            warn="スキャンの品質が低い（暗い・傾いている・文字が読めない・四隅が切れている）と差し戻しの原因になります。明るい場所でフラットにスキャンし、氏名・生年月日・パスポート番号・顔写真・MRZ（パスポート下部の機械読取帯）がすべて鮮明に読めることを確認してください。"
          >
            パスポートの顔写真・個人情報が記載されているページ（顔写真ページ）をスキャンまたは撮影してアップロードします。スマートフォンで撮影する場合は明るい場所で真上から撮影し、書類全体が収まっていることを確認してください。
          </FieldBlock>

          <FieldBlock
            label="Photo of Applicant"
            ja="申請者の顔写真"
            example="白または薄い無地の背景・正面向き・最近撮影した写真（JPEG）"
            warn="スマートフォンで撮影した写真を使用する場合は、システムが指定するピクセル数・縦横比の要件を事前に確認してください。背景が要件を満たしていない、または画像サイズが不適切な場合はアップロード時にエラーが出ることがあります。証明写真機の利用が確実です。"
          >
            申請者本人の顔写真をアップロードします。白または薄い無地の背景、正面向き、最近撮影した写真が必要です。
          </FieldBlock>

          <FieldBlock
            label="Bank Statement / Balance Certificate"
            ja="残高証明書（英語・500,000タイバーツ以上）"
            example="英語発行の残高証明書（申請直前1〜2週間以内に発行したもの）"
            warn="残高証明書は申請直前（1〜2週間以内）に発行したものを使用してください。発行から時間が経った書類は、審査時点での残高を証明できないと判断されることがあります。また、口座名義（英語表記）がパスポートの氏名表記と一致していることを確認してください。日本円で残高証明を取得した場合は、500,000タイバーツ以上に相当する額であることが分かるよう、換算額を明示した書類を添付することをおすすめします。"
          >
            500,000タイバーツ（約200万円、為替レートによって変動）以上の残高を証明する銀行発行の残高証明書をアップロードします。英語で発行されたものが必要です。日本の主要銀行では英語の残高証明書の発行サービスを提供しています（申請から発行まで数日〜1週間程度かかる場合があります）。
          </FieldBlock>

          <FieldBlock
            label="Supporting Documents（ルート別書類）"
            ja="申請根拠となる書類（選択したルートによって異なる）"
            example={'Workcationの場合 → 雇用契約書（英語）＋リモートワーク許可書\nSoft Powerの場合 → タイ施設からの受入レター（Acceptance Letter）'}
            warn="書類は英語での提出が基本です。日本語の書類しかない場合は、英語の概要説明や翻訳を添付することをおすすめします。ただし、認定翻訳が必要かどうかは申請先の公館によって異なります。"
          >
            STEP 5で選択した「Purpose of Visit（渡航目的）」に対応する書類をアップロードします。<br /><br />
            <strong>Workcationを選択した場合</strong>は、雇用契約書（英語）および雇用主からのリモートワーク許可書が主要書類です。フリーランスの場合は業務委託契約書と過去数ヶ月分の請求書が主要書類になります。<br /><br />
            <strong>Soft Power Activitiesを選択した場合</strong>は、タイ国内のゴルフ場・料理学校・武術ジムなどの施設が発行した受入レター（Acceptance Letter）が主要書類です。受入レターには申請者氏名・活動内容・活動期間・施設情報が明記されている必要があります。
          </FieldBlock>
        </section>

        {/* ════════════════════════════════════════
            最終チェックリスト
        ════════════════════════════════════════ */}
        <section id="checklist" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: C.text, margin: '0 0 12px', paddingTop: 8, borderTop: `2px solid ${C.tealMid}` }}>
            提出前の最終チェックリスト
          </h2>
          <p style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.8, marginBottom: 20 }}>
            「送信」ボタンを押す前に、以下の項目を必ず確認してください。書類間の不一致や入力ミスはここで防ぐことができます。
          </p>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px' }}>
            {[
              ['全書類のフルネーム・パスポート番号が一致しているか', '残高証明書・雇用契約書・受入レターなど全書類の氏名・パスポート番号をパスポートと照合する'],
              ['生年月日・有効期限の日付形式は正しいか（DD/MM/YYYY）', '日本式（YYYY/MM/DD）ではなく「日→月→年」の順になっているか再確認する'],
              ['残高証明書は最近（1〜2週間以内）発行されたものか', '発行日が古すぎる書類は現時点の残高を証明できないと判断される場合がある'],
              ['メールアドレスのスペルミスはないか', '審査結果・追加書類依頼・承認通知はこのアドレスに届く'],
              ['Purpose of Visitの選択と、アップロードした書類は一致しているか', 'Workcationを選んだなら雇用契約書、Soft Powerを選んだなら受入レターがアップロードされているか'],
              ['すべてのファイルが正常に表示・閲覧できるか', 'アップロード後に各ファイルをクリックして開き、文字が読めることを確認する'],
              ['パスポートの残存有効期間は6ヶ月以上あるか', '申請時点から6ヶ月未満の場合は申請前にパスポートを更新する必要がある'],
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
          <Link href={`/${locale}/blog/dtv-common-document-mistakes`} className="btn-richb-sub" style={{ padding: '12px 24px', fontSize: 13, fontFamily: 'inherit' }}>
            よくある書類ミスを確認する
          </Link>
        </div>

        <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.7 }}>
          ※ フォームの画面構成・項目名はthaievisa.go.thの仕様変更により変わる場合があります。申請時は公式サイトの最新表示を優先してください。本ページの内容は一般的な情報提供を目的としており、個別の申請を保証するものではありません。
        </p>

      </div>
    </div>
  )
}

// ────────────────────────────────────────────────────
// 共通コンポーネント
// ────────────────────────────────────────────────────

function StepHeading({ num, title, screen, important }: { num: number; title: string; screen: string; important?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      marginBottom: 20,
      paddingBottom: 14,
      borderBottom: `2px solid ${important ? C.tealMid : C.border}`,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        background: important ? C.green : C.tealDim,
        border: `2px solid ${important ? C.green : C.tealMid}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, fontWeight: 900,
        color: important ? '#fff' : C.green,
        boxShadow: important ? '0 2px 10px rgba(10,122,106,0.25)' : 'none',
      }}>
        {num}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: important ? C.green : C.text, margin: 0 }}>
            STEP {num}：{title}
          </h2>
          {important && (
            <span style={{ fontSize: 10, fontWeight: 700, background: C.green, color: '#fff', padding: '2px 8px', borderRadius: 100 }}>
              最重要
            </span>
          )}
        </div>
        <span style={{ fontSize: 11, color: C.muted, fontFamily: 'monospace' }}>{screen}</span>
      </div>
    </div>
  )
}

function FieldBlock({
  label, ja, example, warn, children,
}: {
  label: string
  ja: string
  example: string
  warn?: string
  children: React.ReactNode
}) {
  const multiLine = example.includes('\n')
  return (
    <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: `1px solid ${C.border}` }}>
      {/* フィールド名 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px', marginBottom: 8 }}>
        <code style={{ fontSize: 12, fontWeight: 700, color: C.green, background: C.tealDim, border: `1px solid ${C.tealMid}`, padding: '2px 8px', borderRadius: 5 }}>
          {label}
        </code>
        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{ja}</span>
      </div>

      {/* 説明文 */}
      <div style={{ fontSize: 13.5, color: C.sub, lineHeight: 1.85, marginBottom: 12 }}>
        {children}
      </div>

      {/* 入力例 */}
      <div style={{ background: C.tealDim, border: `1px solid ${C.tealMid}`, borderRadius: 8, padding: '10px 14px', marginBottom: warn ? 10 : 0 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: C.green, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          入力例
        </p>
        {example.split('\n').map((line, i) => (
          <p key={i} style={{ fontSize: 13, fontWeight: 600, color: '#0A5A4E', margin: i > 0 ? '4px 0 0' : 0, lineHeight: 1.6 }}>
            {line}
          </p>
        ))}
      </div>

      {/* 注意書き */}
      {warn && (
        <div style={{ background: '#FFFBF0', border: '1px solid #E8D5A0', borderLeft: `4px solid ${C.gold}`, borderRadius: '0 8px 8px 0', padding: '10px 14px', marginTop: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ⚠ 注意
          </p>
          <p style={{ fontSize: 12.5, color: '#6B4F1A', margin: 0, lineHeight: 1.7 }}>{warn}</p>
        </div>
      )}
    </div>
  )
}
