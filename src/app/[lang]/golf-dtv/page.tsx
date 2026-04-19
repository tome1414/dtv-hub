'use client'

export default function GolfDTVPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
        .golf-root { font-family: 'Noto Sans JP', sans-serif; color: #1a1a1a; background: #fff; }
        .hero-bg {
          background: linear-gradient(160deg, #082d21 0%, #0d4f3c 40%, #1a6b52 70%, #0a3d2e 100%);
          position: relative; overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .hero-circle {
          position: absolute; border-radius: 50%;
          background: rgba(201,168,76,0.07);
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .badge-green {
          display: inline-block;
          background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4);
          color: #e2c46e; padding: 4px 16px; border-radius: 999px;
          font-size: 0.75rem; letter-spacing: 0.1em; font-weight: 500;
        }
        .hero-stat { text-align: center; padding: 16px 24px; border-right: 1px solid rgba(255,255,255,0.15); }
        .hero-stat:last-child { border-right: none; }
        .section-label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: #0d4f3c; font-weight: 600; }
        .section-title { font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 900; line-height: 1.3; color: #0a2e1f; }
        .section-body { color: #4a4a4a; line-height: 1.9; font-size: 0.95rem; }
        .card-feature { background: #fff; border: 1px solid #e5e0d5; border-radius: 16px; padding: 28px 24px; transition: all 0.3s; }
        .card-feature:hover { box-shadow: 0 8px 32px rgba(13,79,60,0.12); border-color: #0d4f3c; transform: translateY(-2px); }
        .plan-card { border-radius: 20px; overflow: hidden; transition: all 0.3s; }
        .plan-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.12); }
        .plan-popular { position: relative; box-shadow: 0 8px 32px rgba(13,79,60,0.2); }
        .accordion-item { border-bottom: 1px solid #e5e0d5; }
        .accordion-btn {
          width: 100%; text-align: left; padding: 20px 0; font-weight: 600; font-size: 0.95rem;
          color: #1a1a1a; display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; background: none; border: none;
        }
        .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.35s ease; }
        .accordion-content.open { max-height: 400px; }
        .accordion-icon {
          width: 24px; height: 24px; border-radius: 50%; background: #0d4f3c; color: #fff;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
          transition: transform 0.3s; font-size: 1.1rem; line-height: 1;
        }
        .accordion-icon.open { transform: rotate(45deg); }
        .form-input {
          width: 100%; padding: 12px 16px; border: 1px solid #d5d0c5; border-radius: 10px;
          font-size: 0.9rem; font-family: 'Noto Sans JP', sans-serif; outline: none; transition: border 0.2s; background: #fff;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: #0d4f3c; box-shadow: 0 0 0 3px rgba(13,79,60,0.08); }
        .form-label { font-size: 0.85rem; font-weight: 600; color: #333; margin-bottom: 6px; display: block; }
        .required { color: #e05a5a; font-size: 0.7rem; margin-left: 4px; }
        .btn-primary {
          background: linear-gradient(135deg, #0d4f3c, #1a6b52); color: #fff; padding: 14px 32px;
          border-radius: 999px; font-weight: 700; font-size: 0.95rem; display: inline-flex;
          align-items: center; gap: 8px; transition: all 0.3s; border: none; cursor: pointer; text-decoration: none;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(13,79,60,0.3); filter: brightness(1.05); }
        .btn-gold {
          background: linear-gradient(135deg, #c9a84c, #e2c46e); color: #fff; padding: 14px 32px;
          border-radius: 999px; font-weight: 700; font-size: 0.95rem; display: inline-flex;
          align-items: center; gap: 8px; transition: all 0.3s; border: none; cursor: pointer; text-decoration: none;
        }
        .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.4); }
        .btn-outline {
          background: transparent; color: #0d4f3c; padding: 13px 32px; border-radius: 999px;
          font-weight: 700; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.3s; border: 2px solid #0d4f3c; cursor: pointer; text-decoration: none;
        }
        .btn-outline:hover { background: #0d4f3c; color: #fff; }
        .testimonial-card { background: #fff; border: 1px solid #e5e0d5; border-radius: 16px; padding: 28px; }
        .stars { color: #c9a84c; font-size: 1rem; letter-spacing: 2px; }
        .ticker-wrap { overflow: hidden; background: #0d4f3c; }
        .ticker { display: flex; animation: ticker-scroll 30s linear infinite; white-space: nowrap; }
        @keyframes ticker-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-item { display: inline-flex; align-items: center; gap: 12px; padding: 10px 32px; color: rgba(255,255,255,0.9); font-size: 0.82rem; font-weight: 500; flex-shrink: 0; }
        .ticker-dot { width: 5px; height: 5px; border-radius: 50%; background: #c9a84c; flex-shrink: 0; }
        .floating-cta { position: fixed; bottom: 24px; right: 24px; z-index: 100; box-shadow: 0 8px 32px rgba(13,79,60,0.4); border-radius: 999px; animation: float 3s ease-in-out infinite; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .nav-link { font-size: 0.85rem; color: rgba(255,255,255,0.85); text-decoration: none; transition: color 0.2s; font-weight: 500; }
        .nav-link:hover { color: #e2c46e; }
        .divider { height: 2px; background: linear-gradient(90deg, transparent, #0d4f3c, transparent); }
        .highlight { color: #0d4f3c; font-weight: 700; }
        .gold-text { color: #c9a84c; }
        .tag { display: inline-block; background: rgba(13,79,60,0.08); color: #0d4f3c; padding: 4px 12px; border-radius: 999px; font-size: 0.78rem; font-weight: 600; }
        .counter { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; }
        @media (max-width: 768px) {
          .hero-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); }
          .hero-stat:last-child { border-bottom: none; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="golf-root">

        {/* FLOATING CTA */}
        <a href="#consultation" className="floating-cta btn-gold" style={{fontSize: '0.875rem'}}>
          無料相談する
        </a>

        {/* NAVIGATION */}
        <nav style={{background: '#082d21', position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
          <div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <div style={{width: 32, height: 32, background: 'linear-gradient(135deg, #0d4f3c, #c9a84c)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{color: '#fff', fontWeight: 900, fontSize: '0.9rem'}}>G</span>
              </div>
              <span style={{color: '#fff', fontWeight: 700, fontSize: '1rem'}}>Golf<span style={{color: '#c9a84c'}}>DTV</span></span>
            </div>
            <div style={{display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap'}}>
              <a href="#plans" className="nav-link">プラン</a>
              <a href="#process" className="nav-link">申込の流れ</a>
              <a href="#faq" className="nav-link">よくある質問</a>
              <a href="#consultation" className="btn-gold" style={{padding: '8px 20px', fontSize: '0.82rem'}}>無料相談</a>
            </div>
          </div>
        </nav>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{display: 'contents'}}>
                <span className="ticker-item"><span className="ticker-dot" />タイDTVビザ申請サポート実績 500名突破</span>
                <span className="ticker-item"><span className="ticker-dot" />審査通過率 99.2%</span>
                <span className="ticker-item"><span className="ticker-dot" />5年間 × 最大180日/回 滞在可能</span>
                <span className="ticker-item"><span className="ticker-dot" />完全オンライン完結</span>
                <span className="ticker-item"><span className="ticker-dot" />ゴルフ経験不問</span>
                <span className="ticker-item"><span className="ticker-dot" />家族同行ビザにも対応</span>
              </span>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="hero-bg" style={{padding: '80px 24px 64px', minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative'}}>
          <div className="hero-circle" style={{width: 500, height: 500, top: -100, right: -100}} />
          <div className="hero-circle" style={{width: 300, height: 300, bottom: -50, left: 100, animationDelay: '3s'}} />
          <div style={{maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1}}>
            <div style={{marginBottom: 20}}>
              <span className="badge-green">Thailand DTV Visa × Golf</span>
            </div>
            <h1 style={{fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 24, letterSpacing: '-0.02em'}}>
              タイでゴルフしながら、<br />
              <span style={{color: '#e2c46e'}}>5年ビザ</span>を取る。
            </h1>
            <p style={{color: 'rgba(255,255,255,0.82)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', lineHeight: 1.9, maxWidth: 680, margin: '0 auto 16px'}}>
              タイ政府が認定した<strong style={{color: '#e2c46e'}}>DTV（デスティネーション・タイランド・ビザ）</strong>は、<br />
              ゴルフなどのアクティビティへの参加を根拠に申請できる、5年間有効の長期ビザ。<br />
              もう毎年のビザ更新に追われる生活は終わりにしませんか？
            </p>
            <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: 40}}>
              ※ DTV取得後は1回あたり最大180日滞在可能。5年間マルチプルエントリー対応。
            </p>
            <div style={{display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60}}>
              <a href="#consultation" className="btn-gold" style={{fontSize: '1rem', padding: '16px 40px'}}>まずは無料相談</a>
              <a href="#why" className="btn-outline" style={{color: 'rgba(255,255,255,0.9)', borderColor: 'rgba(255,255,255,0.35)', fontSize: '1rem', padding: '16px 40px'}}>DTVビザとは？</a>
            </div>
            <div style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {[
                {value: '500', unit: '名+', label: '申請サポート実績'},
                {value: '99.2', unit: '%', label: '審査通過率'},
                {value: '5', unit: '年', label: 'ビザ有効期間'},
                {value: '180', unit: '日', label: '1回の最大滞在日数'},
              ].map((s, i) => (
                <div key={i} className="hero-stat">
                  <div className="counter" style={{color: '#e2c46e'}}>{s.value}<span style={{fontSize: '1.5rem'}}>{s.unit}</span></div>
                  <div style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', marginTop: 4}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BACKGROUND */}
        <section style={{padding: '80px 24px', background: '#fff'}} id="why">
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">BACKGROUND</span>
              <h2 className="section-title" style={{marginTop: 8}}>タイへの移住・長期滞在が<br />これまで難しかった理由</h2>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 60}}>
              {[
                {emoji: '😓', color: '#c0392b', title: '毎年のビザ更新が大変', body: 'リタイアメントビザや就労ビザは毎年更新が必要。書類準備・大使館手続きの繰り返しで疲弊してしまう。'},
                {emoji: '💸', color: '#c0392b', title: '高額な資産証明が必要', body: 'リタイアメントビザには80万バーツ以上の預金証明が必須。ハードルが高く断念する方も多い。'},
                {emoji: '🤷', color: '#c0392b', title: 'どのビザが最適かわからない', body: 'ビザの種類が多く、自分のライフスタイルに合ったものを選ぶのが難しい。間違えると再申請が必要に。'},
              ].map((item, i) => (
                <div key={i} style={{background: '#fff5f5', border: '1px solid #f5c6c6', borderRadius: 16, padding: 28}}>
                  <div style={{fontSize: '2rem', marginBottom: 12}}>{item.emoji}</div>
                  <h3 style={{fontWeight: 700, marginBottom: 8, color: item.color}}>{item.title}</h3>
                  <p className="section-body" style={{fontSize: '0.88rem'}}>{item.body}</p>
                </div>
              ))}
            </div>
            <div style={{background: 'linear-gradient(135deg, #0d4f3c, #1a6b52)', borderRadius: 24, padding: '48px 40px', textAlign: 'center', color: '#fff'}}>
              <div style={{fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: 12}}>そこで登場したのが</div>
              <h3 style={{fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, marginBottom: 16, color: '#e2c46e'}}>DTV（デスティネーション・タイランド・ビザ）</h3>
              <p style={{maxWidth: 640, margin: '0 auto', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem'}}>
                2024年にタイ政府が新設した革新的なビザ制度。<br />
                <strong style={{color: '#e2c46e'}}>タイ国内でのアクティビティへの参加</strong>を目的とした長期滞在が可能になりました。<br />
                ゴルフはその「認定アクティビティ」のひとつです。
              </p>
            </div>
          </div>
        </section>

        {/* WHY GOLF */}
        <section style={{padding: '80px 24px', background: '#f5f0e6'}}>
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">WHY GOLF</span>
              <h2 className="section-title" style={{marginTop: 8}}>なぜゴルフでDTVビザが<br />取れるのか</h2>
              <p className="section-body" style={{maxWidth: 600, margin: '16px auto 0'}}>タイ政府はDTVの申請根拠として「スポーツへの参加」を認定。ゴルフはその代表格として、多くの申請者に活用されています。</p>
            </div>
            <div className="grid-2col" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                {[
                  {icon: '⛳', title: 'タイ政府公認のアクティビティ', body: 'ゴルフはタイ政府がDTV申請根拠として公式に認定したスポーツ活動。申請の信頼性が高く、審査通過率も抜群です。'},
                  {icon: '📋', title: '必要書類が比較的シンプル', body: '他のビザと比べて必要書類が少なく、申請の負担が軽い。大きな資産証明も不要です。'},
                  {icon: '🏌️', title: 'ゴルフ場との提携で書類取得をサポート', body: '当社は現地提携ゴルフ場を通じて、申請に必要な招待状・参加証明書の取得もフルサポートします。'},
                  {icon: '🌏', title: 'ゴルフ経験は問いません', body: '「ゴルフをやったことがない」方でも大丈夫。書類上の根拠となるため、腕前やスコアは一切関係ありません。'},
                ].map((item, i) => (
                  <div key={i} style={{display: 'flex', gap: 16, alignItems: 'flex-start'}}>
                    <div style={{width: 48, height: 48, background: '#0d4f3c', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontSize: '1.3rem'}}>{item.icon}</div>
                    <div>
                      <h4 style={{fontWeight: 700, marginBottom: 4, fontSize: '0.95rem'}}>{item.title}</h4>
                      <p className="section-body" style={{fontSize: '0.85rem'}}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 4px 24px rgba(0,0,0,0.06)'}}>
                <h4 style={{fontWeight: 700, fontSize: '1rem', marginBottom: 20, color: '#0a2e1f'}}>DTVビザ 他ビザとの比較</h4>
                <table style={{width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#0d4f3c', color: '#fff'}}>
                      <th style={{padding: '10px 12px', textAlign: 'left'}}>項目</th>
                      <th style={{padding: '10px 12px', textAlign: 'center', color: '#e2c46e'}}>DTV</th>
                      <th style={{padding: '10px 12px', textAlign: 'center'}}>リタイアメント</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['有効期間', '5年間', '1年ごと更新'],
                      ['1回の滞在', '最大180日', '最大1年'],
                      ['資産証明', '不要', '80万B以上'],
                      ['年齢制限', 'なし', '50歳以上'],
                      ['毎年更新', '不要', '必要'],
                    ].map(([label, dtv, retire], i) => (
                      <tr key={i} style={{borderBottom: '1px solid #e5e0d5', background: i % 2 === 1 ? '#f9f7f3' : undefined}}>
                        <td style={{padding: '10px 12px', fontWeight: 600}}>{label}</td>
                        <td style={{padding: '10px 12px', textAlign: 'center', color: '#0d4f3c', fontWeight: 700}}>{dtv}</td>
                        <td style={{padding: '10px 12px', textAlign: 'center'}}>{retire}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p style={{fontSize: '0.75rem', color: '#999', marginTop: 12}}>※ 各ビザの概要比較。詳細は個別にご相談ください。</p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section style={{padding: '80px 24px', background: '#fff'}}>
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">WHY CHOOSE US</span>
              <h2 className="section-title" style={{marginTop: 8}}>選ばれる6つの理由</h2>
            </div>
            <div className="grid-3col" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20}}>
              {[
                {icon: '🏆', title: '業界最高水準の通過率', body: '500名以上の申請実績をもとに磨き上げたノウハウで、審査通過率99.2%を実現。書類の不備ゼロを目指したチェック体制を整えています。'},
                {icon: '💻', title: '完全オンラインで完結', body: '相談から書類提出まで全てオンライン対応。わざわざ大使館や窓口に出向く必要はありません。日本にいながら申請が完了します。'},
                {icon: '⛳', title: '現地ゴルフ場と直接提携', body: 'タイの提携ゴルフ場を通じて、申請に必要な招待状・活動証明書を確実に取得。自分で探す手間が一切かかりません。'},
                {icon: '👨‍👩‍👧', title: '家族の同行ビザにも対応', body: '配偶者・お子様の同行ビザ申請も対応可能。家族全員のタイ生活をまとめてサポートします。'},
                {icon: '📞', title: 'ビザ取得後もアフターサポート', body: 'ビザ取得がゴールではありません。タイ入国後の生活立ち上げ・税務・銀行口座開設まで、継続サポートを提供します。'},
                {icon: '💬', title: '日本語で全てお任せ', body: 'タイ語・英語の書類も、全て当社が代行作成・翻訳。言語の壁を感じることなく、安心して申請を進められます。'},
              ].map((item, i) => (
                <div key={i} className="card-feature">
                  <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
                    <div style={{width: 44, height: 44, background: 'linear-gradient(135deg, #0d4f3c, #1a6b52)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'}}>{item.icon}</div>
                    <h3 style={{fontWeight: 700, fontSize: '0.95rem'}}>{item.title}</h3>
                  </div>
                  <p className="section-body" style={{fontSize: '0.85rem'}}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section style={{padding: '80px 24px', background: '#f5f0e6'}} id="plans">
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">PLANS</span>
              <h2 className="section-title" style={{marginTop: 8}}>プランから選ぶ</h2>
              <p className="section-body" style={{maxWidth: 560, margin: '16px auto 0'}}>ご状況やご要望に合わせて3つのプランをご用意しています。迷ったらまずは無料相談でご相談ください。</p>
            </div>
            <div className="grid-3col" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'stretch'}}>
              {/* LIGHT */}
              <div className="plan-card" style={{background: '#fff', border: '2px solid #e5e0d5', display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: '32px 28px 0'}}>
                  <span className="tag">ライトプラン</span>
                  <div style={{marginTop: 20}}>
                    <span style={{fontSize: '2.2rem', fontWeight: 900, color: '#0a2e1f'}}>¥98,000</span>
                    <span style={{fontSize: '0.85rem', color: '#777', marginLeft: 4}}>〜（税込）</span>
                  </div>
                  <p style={{fontSize: '0.82rem', color: '#777', marginTop: 4}}>書類準備に自信がある方向け</p>
                  <div className="divider" style={{margin: '20px 0'}} />
                </div>
                <div style={{padding: '0 28px', flex: 1}}>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                    {['初回無料相談（60分）', '申請書類チェック（2回まで）', '提携ゴルフ場招待状取得', '申請マニュアル提供'].map((f, i) => (
                      <li key={i} style={{display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.87rem'}}><span style={{color: '#0d4f3c', fontWeight: 700, flexShrink: 0}}>✓</span>{f}</li>
                    ))}
                    {['書類代行作成', '取得後アフターサポート'].map((f, i) => (
                      <li key={i} style={{display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.87rem', color: '#bbb'}}><span style={{flexShrink: 0}}>–</span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{padding: 28}}><a href="#consultation" className="btn-outline" style={{width: '100%', justifyContent: 'center'}}>相談してみる</a></div>
              </div>
              {/* STANDARD */}
              <div className="plan-card plan-popular" style={{background: '#0d4f3c', border: '2px solid #0d4f3c', display: 'flex', flexDirection: 'column', position: 'relative'}}>
                <div style={{position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: '#c9a84c', color: '#fff', padding: '4px 20px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap'}}>最も人気</div>
                <div style={{padding: '32px 28px 0'}}>
                  <span style={{display: 'inline-block', background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: 999, fontSize: '0.78rem', fontWeight: 600}}>スタンダードプラン</span>
                  <div style={{marginTop: 20}}>
                    <span style={{fontSize: '2.2rem', fontWeight: 900, color: '#e2c46e'}}>¥168,000</span>
                    <span style={{fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginLeft: 4}}>〜（税込）</span>
                  </div>
                  <p style={{fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: 4}}>はじめての方・安心重視の方に</p>
                  <div style={{height: 1, background: 'rgba(255,255,255,0.15)', margin: '20px 0'}} />
                </div>
                <div style={{padding: '0 28px', flex: 1}}>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                    {['初回無料相談（60分）', '申請書類 全件代行作成', '提携ゴルフ場招待状取得', 'タイ語・英語翻訳対応', '書類チェック 回数無制限'].map((f, i) => (
                      <li key={i} style={{display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.87rem', color: '#fff'}}><span style={{color: '#e2c46e', fontWeight: 700, flexShrink: 0}}>✓</span>{f}</li>
                    ))}
                    <li style={{display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.87rem', color: 'rgba(255,255,255,0.5)'}}><span style={{flexShrink: 0}}>–</span>取得後アフターサポート</li>
                  </ul>
                </div>
                <div style={{padding: 28}}><a href="#consultation" className="btn-gold" style={{width: '100%', justifyContent: 'center'}}>このプランで相談する</a></div>
              </div>
              {/* PREMIUM */}
              <div className="plan-card" style={{background: '#fff', border: '2px solid #e5e0d5', display: 'flex', flexDirection: 'column'}}>
                <div style={{padding: '32px 28px 0'}}>
                  <span className="tag" style={{background: 'rgba(201,168,76,0.12)', color: '#a07830'}}>プレミアムプラン</span>
                  <div style={{marginTop: 20}}>
                    <span style={{fontSize: '2.2rem', fontWeight: 900, color: '#0a2e1f'}}>¥248,000</span>
                    <span style={{fontSize: '0.85rem', color: '#777', marginLeft: 4}}>〜（税込）</span>
                  </div>
                  <p style={{fontSize: '0.82rem', color: '#777', marginTop: 4}}>家族同行・ビザ後サポートまで</p>
                  <div className="divider" style={{margin: '20px 0'}} />
                </div>
                <div style={{padding: '0 28px', flex: 1}}>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                    {['スタンダードの全内容', '家族同行ビザ申請サポート', 'タイ銀行口座開設サポート', 'タイ税務・住居探し相談', '入国後1年間アフターサポート', '専任コンシェルジュ担当制'].map((f, i) => (
                      <li key={i} style={{display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.87rem'}}><span style={{color: '#0d4f3c', fontWeight: 700, flexShrink: 0}}>✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{padding: 28}}><a href="#consultation" className="btn-outline" style={{width: '100%', justifyContent: 'center'}}>相談してみる</a></div>
              </div>
            </div>
            <p style={{textAlign: 'center', fontSize: '0.8rem', color: '#999', marginTop: 24}}>※ 料金はすべて税込表示。ビザ申請手数料（タイ政府への納付）は別途かかります。</p>
          </div>
        </section>

        {/* PROCESS */}
        <section style={{padding: '80px 24px', background: '#fff'}} id="process">
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">PROCESS</span>
              <h2 className="section-title" style={{marginTop: 8}}>申し込みの流れ</h2>
              <p className="section-body" style={{maxWidth: 500, margin: '16px auto 0'}}>最短2ヶ月でビザ取得を目指せます。全てのステップをプロがサポートします。</p>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16}}>
              {[
                {num: '1', color: '#0d4f3c', title: '無料相談', body: 'ご状況・ご要望をヒアリング。最適なプランをご提案します。', tag: 'オンライン60分'},
                {num: '2', color: '#0d4f3c', title: '書類準備', body: '必要書類をリストアップ。代行プランはこちらで作成します。', tag: '約2〜3週間'},
                {num: '3', color: '#0d4f3c', title: '申請サポート', body: 'タイ大使館への申請手続きを全面サポート。書類不備ゼロを徹底。', tag: '約2〜4週間'},
                {num: '4', color: '#c9a84c', title: 'ビザ取得', body: 'DTVビザがパスポートに貼付されます。5年間有効のスタンプ！', tag: 'ゴール🎉'},
                {num: '5', color: '#0d4f3c', title: 'タイ生活スタート', body: 'プレミアムはタイ入国後もサポート継続。安心の新生活を。', tag: 'アフターサポートあり'},
              ].map((step, i) => (
                <div key={i} style={{textAlign: 'center', padding: '24px 16px'}}>
                  <div style={{width: 56, height: 56, background: step.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff', fontWeight: 900, fontSize: '1.1rem'}}>{step.num}</div>
                  <div style={{fontWeight: 700, marginBottom: 8, fontSize: '0.9rem'}}>{step.title}</div>
                  <p style={{fontSize: '0.8rem', color: '#666', lineHeight: 1.7}}>{step.body}</p>
                  <div style={{marginTop: 8}}><span style={{fontSize: '0.75rem', color: step.color, fontWeight: 600, background: step.color === '#c9a84c' ? 'rgba(201,168,76,0.12)' : 'rgba(13,79,60,0.08)', padding: '2px 10px', borderRadius: 999}}>{step.tag}</span></div>
                </div>
              ))}
            </div>
            <div style={{background: '#f5f0e6', borderRadius: 16, padding: '24px 32px', marginTop: 40, textAlign: 'center'}}>
              <p style={{fontSize: '0.88rem', color: '#555', lineHeight: 1.8}}><strong className="highlight">最短2ヶ月でビザ取得可能。</strong>ご状況によって期間は異なりますが、余裕を持って3〜4ヶ月での完了を推奨しています。</p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{padding: '80px 24px', background: '#f5f0e6'}}>
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">TESTIMONIALS</span>
              <h2 className="section-title" style={{marginTop: 8}}>ご利用者の声</h2>
            </div>
            <div className="grid-3col" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24}}>
              {[
                {initial: 'T', name: '田中 義雄さん（60代・元会社員）', location: 'バンコク在住 / 2024年取得', text: '「毎年のビザ更新が本当に面倒でしたが、DTVを取ってからは5年間自由にタイに滞在できるようになりました。書類は全部代行してもらえて、私は印鑑を押すだけでした（笑）」'},
                {initial: 'S', name: '佐藤 真由子さん（50代・フリーランス）', location: 'チェンマイ在住 / 2024年取得', text: '「ゴルフ経験ゼロでも申請できると聞いて半信半疑でしたが、担当者が丁寧に説明してくれて安心しました。夫婦で取得でき、チェンマイでのんびり暮らしています。」'},
                {initial: 'Y', name: '山田 拓也さん（40代・エンジニア）', location: '日本・タイ二拠点生活 / 2024年取得', text: '「リモートワーカーとして日本とタイを行き来したかったのでDTVは最高でした。審査も思ったより早く、申請から1ヶ月半でパスポートが戻ってきました！」'},
              ].map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="stars">★★★★★</div>
                  <p style={{fontSize: '0.88rem', lineHeight: 1.9, color: '#444', margin: '12px 0'}}>{t.text}</p>
                  <div style={{display: 'flex', gap: 12, alignItems: 'center', marginTop: 16, paddingTop: 16, borderTop: '1px solid #e5e0d5'}}>
                    <div style={{width: 40, height: 40, background: 'linear-gradient(135deg, #0d4f3c, #1a6b52)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.9rem'}}>{t.initial}</div>
                    <div>
                      <div style={{fontWeight: 700, fontSize: '0.88rem'}}>{t.name}</div>
                      <div style={{fontSize: '0.78rem', color: '#999'}}>{t.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{padding: '80px 24px', background: '#fff'}} id="faq">
          <div style={{maxWidth: 800, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 56}}>
              <span className="section-label">FAQ</span>
              <h2 className="section-title" style={{marginTop: 8}}>よくあるご質問</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* CTA BANNER */}
        <section style={{padding: '60px 24px', background: 'linear-gradient(135deg, #082d21, #0d4f3c)'}}>
          <div style={{maxWidth: 800, margin: '0 auto', textAlign: 'center'}}>
            <div style={{fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: 8}}>まずは気軽に相談から</div>
            <h2 style={{fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#fff', marginBottom: 16}}>5年ビザで、あなたのタイ生活を<br />もっと自由に。</h2>
            <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: 32, fontSize: '0.9rem', lineHeight: 1.9}}>初回相談は完全無料。ビザのこと・タイ生活のことなど、何でもお気軽にご質問ください。</p>
            <a href="#consultation" className="btn-gold" style={{fontSize: '1rem', padding: '16px 48px'}}>無料で相談してみる</a>
          </div>
        </section>

        {/* CONSULTATION FORM */}
        <section style={{padding: '80px 24px', background: '#f5f0e6'}} id="consultation">
          <div style={{maxWidth: 700, margin: '0 auto'}}>
            <div style={{textAlign: 'center', marginBottom: 48}}>
              <span className="section-label">FREE CONSULTATION</span>
              <h2 className="section-title" style={{marginTop: 8}}>まずは無料相談から</h2>
              <p className="section-body" style={{marginTop: 12}}>フォームにご記入いただくと、担当者から1営業日以内にご連絡します。</p>
            </div>
            <div style={{background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 4px 32px rgba(0,0,0,0.06)'}}>
              <ConsultationForm />
            </div>
            <div style={{display: 'flex', gap: 24, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap'}}>
              {['🔒 個人情報は厳重に管理します', '⏱ 1営業日以内にご連絡', '✅ 無理な営業は一切しません'].map((t, i) => (
                <div key={i} style={{display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.82rem', color: '#666'}}>{t}</div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background: '#082d21', padding: '48px 24px 24px', color: 'rgba(255,255,255,0.7)'}}>
          <div style={{maxWidth: 1100, margin: '0 auto'}}>
            <div className="footer-grid" style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 40}}>
              <div>
                <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
                  <div style={{width: 32, height: 32, background: 'linear-gradient(135deg, #0d4f3c, #c9a84c)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <span style={{color: '#fff', fontWeight: 900, fontSize: '0.9rem'}}>G</span>
                  </div>
                  <span style={{color: '#fff', fontWeight: 700, fontSize: '1.1rem'}}>Golf<span style={{color: '#c9a84c'}}>DTV</span></span>
                </div>
                <p style={{fontSize: '0.85rem', lineHeight: 1.9, maxWidth: 320}}>タイDTVビザ × ゴルフで実現する、新しいタイ長期滞在のかたち。500名以上の申請実績と99.2%の通過率で、あなたのタイライフを全力でサポートします。</p>
              </div>
              <div>
                <h4 style={{color: '#fff', fontWeight: 700, fontSize: '0.88rem', marginBottom: 16}}>サービス</h4>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                  {[['DTVビザとは', '#why'], ['プラン一覧', '#plans'], ['申し込みの流れ', '#process'], ['よくある質問', '#faq']].map(([label, href], i) => (
                    <li key={i}><a href={href} style={{color: 'rgba(255,255,255,0.65)', fontSize: '0.83rem', textDecoration: 'none'}}>{label}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{color: '#fff', fontWeight: 700, fontSize: '0.88rem', marginBottom: 16}}>お問い合わせ</h4>
                <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10}}>
                  {[['無料相談フォーム', '#consultation'], ['プライバシーポリシー', '#'], ['特定商取引法に基づく表記', '#'], ['会社概要', '#']].map(([label, href], i) => (
                    <li key={i}><a href={href} style={{color: 'rgba(255,255,255,0.65)', fontSize: '0.83rem', textDecoration: 'none'}}>{label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12}}>
              <p style={{fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)'}}>© 2024 GolfDTV. All rights reserved.</p>
              <p style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', maxWidth: 500, textAlign: 'right', lineHeight: 1.6}}>当サービスはビザ申請のサポートを行うものであり、ビザ取得を保証するものではありません。</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

function FaqAccordion() {
  const faqs = [
    {q: 'DTV（デスティネーション・タイランド・ビザ）とはどんなビザですか？', a: 'DTVはタイ政府が2024年に新設した、タイ国内でのアクティビティ参加を目的とした長期滞在ビザです。5年間有効で、1回の入国につき最大180日間の滞在が可能。マルチプルエントリー対応のため、日本とタイを自由に行き来できます。'},
    {q: 'ゴルフをやったことがありませんが、申請できますか？', a: 'はい、ゴルフの経験・技術は一切問いません。DTVの申請においてゴルフは「参加する意志があるアクティビティ」として根拠となるものであり、実際のスコアや腕前を審査されることはありません。'},
    {q: '申請から取得まで、どのくらいかかりますか？', a: '書類が揃った状態からタイ大使館の審査期間は通常2〜4週間です。書類準備も含めると、最短で約2ヶ月、平均では3〜4ヶ月が目安です。'},
    {q: '家族も一緒に申請できますか？', a: 'はい、配偶者やお子様の同行ビザ（DTV同行者ビザ）申請も対応しています。プレミアムプランでは家族同行ビザのサポートも含まれています。'},
    {q: 'DTVビザ取得後も何かサポートはありますか？', a: 'プレミアムプランでは入国後1年間のアフターサポートを提供しています。タイでの銀行口座開設・住居探し・税務相談・医療機関紹介など、現地生活の立ち上げを丸ごとサポートします。'},
    {q: '万が一審査に落ちた場合はどうなりますか？', a: '当社の審査通過率は99.2%ですが、万が一不許可となった場合、不許可理由を分析した上で再申請のサポートを無償で行います（当社起因の場合）。'},
  ]
  return (
    <div>
      {faqs.map((faq, i) => (
        <FaqItem key={i} q={faq.q} a={faq.a} />
      ))}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span className={`accordion-icon${open ? ' open' : ''}`}>+</span>
      </button>
      <div className={`accordion-content${open ? ' open' : ''}`}>
        <div style={{paddingBottom: 20, color: '#555', fontSize: '0.9rem', lineHeight: 1.9}}>{a}</div>
      </div>
    </div>
  )
}

function ConsultationForm() {
  const [submitted, setSubmitted] = React.useState(false)
  if (submitted) {
    return <div style={{textAlign: 'center', padding: '40px 0', color: '#0d4f3c', fontWeight: 700, fontSize: '1.1rem'}}>✓ 送信が完了しました！1営業日以内にご連絡します。</div>
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20}}>
        <div><label className="form-label">お名前<span className="required">必須</span></label><input type="text" className="form-input" placeholder="山田 太郎" required /></div>
        <div><label className="form-label">フリガナ</label><input type="text" className="form-input" placeholder="ヤマダ タロウ" /></div>
      </div>
      <div style={{marginBottom: 20}}><label className="form-label">メールアドレス<span className="required">必須</span></label><input type="email" className="form-input" placeholder="your@email.com" required /></div>
      <div style={{marginBottom: 20}}><label className="form-label">お電話番号</label><input type="tel" className="form-input" placeholder="090-0000-0000" /></div>
      <div style={{marginBottom: 20}}>
        <label className="form-label">ご希望のプラン</label>
        <select className="form-input" style={{cursor: 'pointer'}}>
          <option value="">プランを選択してください</option>
          <option>ライトプラン（¥98,000〜）</option>
          <option>スタンダードプラン（¥168,000〜）</option>
          <option>プレミアムプラン（¥248,000〜）</option>
          <option>まだ決めていない・相談したい</option>
        </select>
      </div>
      <div style={{marginBottom: 20}}>
        <label className="form-label">タイへの移住・滞在を考えている時期</label>
        <select className="form-input" style={{cursor: 'pointer'}}>
          <option value="">お選びください</option>
          <option>3ヶ月以内</option><option>半年以内</option><option>1年以内</option><option>まだ決まっていない</option>
        </select>
      </div>
      <div style={{marginBottom: 20}}>
        <label className="form-label">ご家族の同行</label>
        <div style={{display: 'flex', gap: 20, marginTop: 8}}>
          {['自分のみ', '家族同行あり', '未定'].map((v) => (
            <label key={v} style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.9rem'}}>
              <input type="radio" name="family" style={{accentColor: '#0d4f3c'}} /> {v}
            </label>
          ))}
        </div>
      </div>
      <div style={{marginBottom: 28}}><label className="form-label">ご質問・ご相談内容</label><textarea className="form-input" rows={4} placeholder="例：ゴルフ経験がないのですが申請できますか？" style={{resize: 'vertical'}} /></div>
      <div style={{marginBottom: 20, fontSize: '0.8rem', color: '#888'}}>
        <label style={{display: 'flex', gap: 8, alignItems: 'flex-start', cursor: 'pointer'}}>
          <input type="checkbox" required style={{accentColor: '#0d4f3c', marginTop: 2}} />
          <span>プライバシーポリシーに同意して送信する</span>
        </label>
      </div>
      <button type="submit" className="btn-primary" style={{width: '100%', justifyContent: 'center', fontSize: '1rem', padding: 16}}>無料相談の申し込みを送信する</button>
    </form>
  )
}

import React from 'react'
