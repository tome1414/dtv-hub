'use client'

import React, { useEffect, useState } from 'react'
import type { Locale } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'

interface GolfDTVPageProps {
  params: Promise<{ lang: string }>
}

export default function GolfDTVPage({ params }: GolfDTVPageProps) {
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    params.then(({ lang }) => {
      getDictionary((lang || 'ja') as Locale).then(setDict)
    })
  }, [params])

  const d = dict?.golfDTV
  if (!d) return null

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.categories.flatMap((cat: any) =>
      cat.questions.map((qa: any) => ({
        '@type': 'Question',
        name: qa.q,
        acceptedAnswer: { '@type': 'Answer', text: qa.a },
      }))
    ),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
        .golf-root { font-family: 'Noto Sans JP', sans-serif; color: #1a1a1a; background: #fff; }
        .hero-bg { background: linear-gradient(160deg, #082d21 0%, #0d4f3c 40%, #1a6b52 70%, #0a3d2e 100%); position: relative; overflow: hidden; }
        .hero-circle { position: absolute; border-radius: 50%; background: rgba(201,168,76,0.07); animation: pulse-slow 6s ease-in-out infinite; }
        @keyframes pulse-slow { 0%,100%{transform:scale(1);opacity:.5} 50%{transform:scale(1.05);opacity:1} }
        .badge-green { display:inline-block;background:rgba(201,168,76,0.15);border:1px solid rgba(201,168,76,0.4);color:#e2c46e;padding:4px 16px;border-radius:999px;font-size:.75rem;letter-spacing:.1em;font-weight:500; }
        .hero-stat { text-align:center;padding:16px 24px;border-right:1px solid rgba(255,255,255,0.15); }
        .hero-stat:last-child { border-right:none; }
        .section-label { font-size:.75rem;letter-spacing:.15em;text-transform:uppercase;color:#0d4f3c;font-weight:600; }
        .section-title { font-size:clamp(1.6rem,3vw,2.4rem);font-weight:900;line-height:1.3;color:#0a2e1f; }
        .section-body { color:#4a4a4a;line-height:1.9;font-size:.95rem; }
        .plan-card { border-radius:20px;transition:all .3s; }
        .plan-card:hover { transform:translateY(-4px);box-shadow:0 16px 48px rgba(0,0,0,.12); }
        .accordion-item { border-bottom:1px solid #e5e0d5; }
        .accordion-btn { width:100%;text-align:left;padding:18px 0;font-weight:600;font-size:.92rem;color:#1a1a1a;display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:none;border:none;font-family:inherit; }
        .accordion-content { max-height:0;overflow:hidden;transition:max-height .35s ease; }
        .accordion-content.open { max-height:600px; }
        .accordion-icon { width:24px;height:24px;border-radius:50%;background:#0d4f3c;color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .3s;font-size:1.1rem;line-height:1; }
        .accordion-icon.open { transform:rotate(45deg); }
        .form-input { width:100%;padding:12px 16px;border:1px solid #d5d0c5;border-radius:10px;font-size:.9rem;font-family:'Noto Sans JP',sans-serif;outline:none;transition:border .2s;background:#fff;box-sizing:border-box; }
        .form-input:focus { border-color:#0d4f3c;box-shadow:0 0 0 3px rgba(13,79,60,.08); }
        .form-label { font-size:.85rem;font-weight:600;color:#333;margin-bottom:6px;display:block; }
        .btn-gold { background:linear-gradient(135deg,#c9a84c,#e2c46e);color:#fff;padding:14px 32px;border-radius:999px;font-weight:700;font-size:.95rem;display:inline-flex;align-items:center;gap:8px;transition:all .3s;border:none;cursor:pointer;text-decoration:none;font-family:inherit; }
        .btn-gold:hover { transform:translateY(-1px);box-shadow:0 8px 24px rgba(201,168,76,.4); }
        .btn-outline { background:transparent;color:#0d4f3c;padding:13px 32px;border-radius:999px;font-weight:700;font-size:.95rem;display:inline-flex;align-items:center;gap:8px;transition:all .3s;border:2px solid #0d4f3c;cursor:pointer;text-decoration:none;font-family:inherit; }
        .btn-outline:hover { background:#0d4f3c;color:#fff; }
        .ticker-wrap { overflow:hidden;background:#0d4f3c; }
        .ticker { display:flex;animation:ticker-scroll 30s linear infinite;white-space:nowrap; }
        @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-item { display:inline-flex;align-items:center;gap:12px;padding:10px 32px;color:rgba(255,255,255,.9);font-size:.82rem;font-weight:500;flex-shrink:0; }
        .ticker-dot { width:5px;height:5px;border-radius:50%;background:#c9a84c;flex-shrink:0; }
        .floating-cta { position:fixed;bottom:24px;right:24px;z-index:100;box-shadow:0 8px 32px rgba(13,79,60,.4);border-radius:999px;animation:float 3s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .nav-link { font-size:.85rem;color:rgba(255,255,255,.85);text-decoration:none;transition:color .2s;font-weight:500; }
        .nav-link:hover { color:#e2c46e; }
        .counter { font-size:clamp(2rem,5vw,3.5rem);font-weight:900; }
        .divider { height:2px;background:linear-gradient(90deg,transparent,#0d4f3c,transparent); }
        .tag { display:inline-block;background:rgba(13,79,60,.08);color:#0d4f3c;padding:4px 12px;border-radius:999px;font-size:.78rem;font-weight:600; }
        @media(max-width:768px){
          .hero-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.15)}
          .hero-stat:last-child{border-bottom:none}
          .two-col{grid-template-columns:1fr!important}
        }
      `}</style>

      <div className="golf-root">

        {/* FLOATING CTA */}
        <a href="#inquiry" className="floating-cta btn-gold" style={{fontSize:'.875rem'}}>{d.hero.cta}</a>

        {/* NAV */}
        <nav style={{background:'#082d21',position:'sticky',top:0,zIndex:50,borderBottom:'1px solid rgba(255,255,255,.08)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:32,height:32,background:'linear-gradient(135deg,#0d4f3c,#c9a84c)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{color:'#fff',fontWeight:900,fontSize:'.9rem'}}>G</span>
              </div>
              <span style={{color:'#fff',fontWeight:700,fontSize:'1rem'}}>Golf<span style={{color:'#c9a84c'}}>DTV</span></span>
            </div>
            <div style={{display:'flex',gap:24,alignItems:'center',flexWrap:'wrap'}}>
              <a href="#plans" className="nav-link">プラン</a>
              <a href="#faq" className="nav-link">よくある質問</a>
              <LangSwitcher />
              <a href="#inquiry" className="btn-gold" style={{padding:'8px 20px',fontSize:'.82rem'}}>{d.hero.cta}</a>
            </div>
          </div>
        </nav>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker">
            {[...Array(2)].map((_,i)=>(
              <span key={i} style={{display:'contents'}}>
                <span className="ticker-item"><span className="ticker-dot"/>業界初・ゴルフスクール経由DTV取得</span>
                <span className="ticker-item"><span className="ticker-dot"/>成功率96%</span>
                <span className="ticker-item"><span className="ticker-dot"/>Thailand PGA公認プロ提携</span>
                <span className="ticker-item"><span className="ticker-dot"/>5年間有効・マルチエントリー</span>
                <span className="ticker-item"><span className="ticker-dot"/>ゴルフ経験不問</span>
                <span className="ticker-item"><span className="ticker-dot"/>却下時100%返金保証（代行プラン）</span>
              </span>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="hero-bg" style={{padding:'80px 24px 64px',minHeight:'80vh',display:'flex',alignItems:'center',position:'relative'}}>
          <div className="hero-circle" style={{width:500,height:500,top:-100,right:-100}}/>
          <div className="hero-circle" style={{width:300,height:300,bottom:-50,left:100,animationDelay:'3s'}}/>
          <div style={{maxWidth:900,margin:'0 auto',textAlign:'center',position:'relative',zIndex:1}}>
            <div style={{marginBottom:20}}><span className="badge-green">{d.hero.badge}</span></div>
            <h1 style={{fontSize:'clamp(2.2rem,6vw,4rem)',fontWeight:900,color:'#fff',lineHeight:1.2,marginBottom:24}}>
              {d.hero.headline}
            </h1>
            <p style={{color:'rgba(255,255,255,.82)',fontSize:'clamp(.95rem,2vw,1.1rem)',lineHeight:1.9,maxWidth:680,margin:'0 auto 40px'}}>
              {d.hero.subheadline}
            </p>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:60}}>
              <a href="#inquiry" className="btn-gold" style={{fontSize:'1rem',padding:'16px 40px'}}>{d.hero.cta}</a>
            </div>
            {/* Trust stats */}
            <div style={{background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.12)',borderRadius:16,display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
              <div className="hero-stat">
                <div className="counter" style={{color:'#e2c46e'}}>{d.trust.successRate}</div>
                <div style={{color:'rgba(255,255,255,.7)',fontSize:'.78rem',marginTop:4}}>DTV取得成功率</div>
              </div>
              {d.trust.items.slice(0,3).map((item: string,i: number)=>(
                <div key={i} className="hero-stat">
                  <div style={{color:'#e2c46e',fontSize:'.85rem',fontWeight:700,padding:'4px 0'}}>{item}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section style={{padding:'64px 24px',background:'#fff'}}>
          <div style={{maxWidth:900,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:40}}>
              <span className="section-label">TRUST</span>
              <h2 className="section-title" style={{marginTop:8}}>{d.trust.title}</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
              {d.trust.items.map((item: string,i: number)=>(
                <div key={i} style={{background:'#f5f0e6',borderRadius:14,padding:'20px 18px',display:'flex',alignItems:'flex-start',gap:12}}>
                  <div style={{width:28,height:28,background:'#0d4f3c',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'#fff',fontWeight:700,fontSize:'.8rem',marginTop:1}}>✓</div>
                  <p style={{fontSize:'.85rem',color:'#333',lineHeight:1.65,fontWeight:500,margin:0}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section style={{padding:'80px 24px',background:'#f5f0e6'}} id="plans">
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:56}}>
              <span className="section-label">PLANS</span>
              <h2 className="section-title" style={{marginTop:8}}>{d.plans.intro}</h2>
              <p className="section-body" style={{maxWidth:560,margin:'16px auto 0'}}>{d.plans.subtext}</p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24,alignItems:'stretch'}}>
              {d.plans.items.map((plan: any, i: number)=>{
                const isPopular = !!plan.badge
                return (
                  <div key={i} className="plan-card" style={{background:isPopular?'#0d4f3c':'#fff',border:`2px solid ${isPopular?'#c9a84c':'#e5e0d5'}`,display:'flex',flexDirection:'column',position:'relative'}}>
                    {isPopular && (
                      <div style={{background:'#c9a84c',textAlign:'center',padding:'7px 20px',borderRadius:'18px 18px 0 0',fontSize:'.75rem',fontWeight:700,color:'#fff',letterSpacing:'.04em'}}>{plan.badge}</div>
                    )}
                    <div style={{padding: isPopular ? '24px 28px 0' : '32px 28px 0'}}>
                      <span className={isPopular?'':'tag'} style={isPopular?{display:'inline-block',background:'rgba(255,255,255,.15)',color:'#fff',padding:'4px 12px',borderRadius:999,fontSize:'.78rem',fontWeight:600}:{}}>{plan.name}</span>
                      <div style={{marginTop:20}}>
                        <span style={{fontSize:'2.2rem',fontWeight:900,color:isPopular?'#e2c46e':'#0a2e1f'}}>{plan.price.toLocaleString()}</span>
                        <span style={{fontSize:'.9rem',color:isPopular?'rgba(255,255,255,.7)':'#666',marginLeft:4}}>{plan.currency} / {plan.period}</span>
                      </div>
                      <p style={{fontSize:'.82rem',color:isPopular?'rgba(255,255,255,.6)':'#777',marginTop:4}}>{plan.description}</p>
                      <div style={isPopular?{height:1,background:'rgba(255,255,255,.15)',margin:'20px 0'}:{}} className={isPopular?'':'divider'} />
                      {!isPopular && <div className="divider" style={{margin:'20px 0'}}/>}
                    </div>
                    <div style={{padding:'0 28px',flex:1}}>
                      <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                        {plan.features.map((f: any,j: number)=>(
                          <li key={j} style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:'.87rem',color:f.included?(isPopular?'#fff':'#1a1a1a'):(isPopular?'rgba(255,255,255,.4)':'#bbb')}}>
                            <span style={{flexShrink:0,fontWeight:700,color:f.included?(isPopular?'#e2c46e':'#0d4f3c'):undefined}}>{f.included?'✓':'–'}</span>
                            <span>{f.text}{f.note&&<span style={{fontSize:'.78rem',marginLeft:4,opacity:.75}}>（{f.note}）</span>}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{padding:28}}>
                      <a href="#inquiry" className={isPopular?'btn-gold':'btn-outline'} style={{width:'100%',justifyContent:'center'}}>{plan.cta}</a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ADDON */}
        <section style={{padding:'64px 24px',background:'#fff'}}>
          <div style={{maxWidth:700,margin:'0 auto'}}>
            <div style={{background:'#0d4f3c',borderRadius:24,padding:'40px 36px',color:'#fff'}}>
              <div style={{marginBottom:8}}><span style={{display:'inline-block',background:'rgba(255,255,255,.15)',color:'rgba(255,255,255,.9)',padding:'3px 14px',borderRadius:999,fontSize:'.75rem',fontWeight:600}}>{d.addon.label}</span></div>
              <h2 style={{fontSize:'clamp(1.3rem,3vw,1.8rem)',fontWeight:900,marginBottom:8,color:'#e2c46e'}}>{d.addon.title}</h2>
              <p style={{color:'rgba(255,255,255,.8)',marginBottom:24,fontSize:'.9rem',lineHeight:1.8}}>{d.addon.description}</p>
              <div style={{marginBottom:24}}>
                <span style={{fontSize:'2rem',fontWeight:900,color:'#e2c46e'}}>{d.addon.price.toLocaleString()}</span>
                <span style={{color:'rgba(255,255,255,.6)',marginLeft:6,fontSize:'.9rem'}}>THB（追加費用）</span>
              </div>
              <ul style={{listStyle:'none',padding:0,margin:'0 0 28px',display:'flex',flexDirection:'column',gap:10}}>
                {d.addon.features.map((f: string,i: number)=>(
                  <li key={i} style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:'.88rem',color:'rgba(255,255,255,.9)'}}>
                    <span style={{color:'#e2c46e',flexShrink:0,fontWeight:700}}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#inquiry" className="btn-gold">{d.addon.cta}</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{padding:'80px 24px',background:'#f5f0e6'}} id="faq">
          <div style={{maxWidth:800,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:56}}>
              <span className="section-label">FAQ</span>
              <h2 className="section-title" style={{marginTop:8}}>{d.faq.title}</h2>
            </div>
            {d.faq.categories.map((cat: any)=>(
              <div key={cat.id} style={{marginBottom:32}}>
                <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:16}}>
                  <span style={{width:28,height:28,background:'#0d4f3c',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'.8rem',flexShrink:0}}>{cat.id}</span>
                  <span style={{fontWeight:700,fontSize:'1rem',color:'#0a2e1f'}}>{cat.name}</span>
                </div>
                <div style={{background:'#fff',borderRadius:16,padding:'0 24px',boxShadow:'0 2px 8px rgba(0,0,0,.04)'}}>
                  {cat.questions.map((qa: any,j: number)=>(
                    <FaqItem key={j} q={qa.q} a={qa.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INQUIRY */}
        <section style={{padding:'80px 24px',background:'#fff'}} id="inquiry">
          <div style={{maxWidth:700,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:48}}>
              <span className="section-label">INQUIRY</span>
              <h2 className="section-title" style={{marginTop:8}}>{d.inquiry.title}</h2>
              <p className="section-body" style={{marginTop:12}}>{d.inquiry.description}</p>
            </div>
            {/* Steps */}
            <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:40,flexWrap:'wrap'}}>
              {d.inquiry.steps.map((s: any,i: number)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:8}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,background:'#f5f0e6',borderRadius:999,padding:'8px 16px'}}>
                    <span style={{width:24,height:24,background:'#0d4f3c',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:'.8rem',flexShrink:0}}>{s.number}</span>
                    <span style={{fontSize:'.85rem',fontWeight:600,color:'#333'}}>{s.label}</span>
                  </div>
                  {i < d.inquiry.steps.length-1 && <span style={{color:'#ccc',fontSize:'1rem'}}>→</span>}
                </div>
              ))}
            </div>
            {/* Form */}
            <div style={{background:'#f5f0e6',borderRadius:24,padding:40}}>
              <InquiryForm plans={d.plans.items} cta={d.inquiry.cta} />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background:'#082d21',padding:'48px 24px 24px',color:'rgba(255,255,255,.7)'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:48,marginBottom:40}} className="two-col">
              <div>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16}}>
                  <div style={{width:32,height:32,background:'linear-gradient(135deg,#0d4f3c,#c9a84c)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <span style={{color:'#fff',fontWeight:900,fontSize:'.9rem'}}>G</span>
                  </div>
                  <span style={{color:'#fff',fontWeight:700,fontSize:'1.1rem'}}>Golf<span style={{color:'#c9a84c'}}>DTV</span></span>
                </div>
                <p style={{fontSize:'.85rem',lineHeight:1.9,maxWidth:320}}>ゴルフスクール経由のDTVビザ取得を業界で初めて確立した専門エージェント。Thailand PGA公認プロとの提携で確実取得をサポートします。</p>
              </div>
              <div>
                <h4 style={{color:'#fff',fontWeight:700,fontSize:'.88rem',marginBottom:16}}>サービス</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {[['プラン一覧','#plans'],['よくある質問','#faq'],['お問い合わせ','#inquiry']].map(([l,h],i)=>(
                    <li key={i}><a href={h} style={{color:'rgba(255,255,255,.65)',fontSize:'.83rem',textDecoration:'none'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{color:'#fff',fontWeight:700,fontSize:'.88rem',marginBottom:16}}>サポート</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {[['プライバシーポリシー','#'],['特定商取引法に基づく表記','#'],['会社概要','#']].map(([l,h],i)=>(
                    <li key={i}><a href={h} style={{color:'rgba(255,255,255,.65)',fontSize:'.83rem',textDecoration:'none'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <p style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)'}}>© 2024 GolfDTV. All rights reserved.</p>
              <p style={{fontSize:'.75rem',color:'rgba(255,255,255,.35)',maxWidth:500,textAlign:'right',lineHeight:1.6}}>当サービスはビザ申請のサポートを行うものであり、ビザ取得を保証するものではありません。</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="accordion-item">
      <button className="accordion-btn" onClick={() => setOpen(!open)}>
        <span style={{paddingRight:16}}>{q}</span>
        <span className={`accordion-icon${open?' open':''}`}>+</span>
      </button>
      <div className={`accordion-content${open?' open':''}`}>
        <div style={{paddingBottom:20,color:'#555',fontSize:'.9rem',lineHeight:1.9}}>{a}</div>
      </div>
    </div>
  )
}

function LangSwitcher() {
  const langs = [
    { code: 'ja', label: '🇯🇵 日本語' },
    { code: 'en', label: '🇬🇧 English' },
  ]
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value
    if (typeof window !== 'undefined') {
      window.location.href = `/${code}/golf-dtv`
    }
  }
  const currentLang = typeof window !== 'undefined'
    ? window.location.pathname.split('/')[1] || 'ja'
    : 'ja'
  return (
    <select
      defaultValue={currentLang}
      onChange={handleChange}
      style={{
        background:'rgba(255,255,255,.08)',
        border:'1px solid rgba(255,255,255,.2)',
        color:'rgba(255,255,255,.8)',
        padding:'6px 12px',
        borderRadius:8,
        fontSize:'.8rem',
        cursor:'pointer',
        fontFamily:'inherit',
      }}
    >
      {langs.map(l => (
        <option key={l.code} value={l.code} style={{background:'#082d21',color:'#fff'}}>{l.label}</option>
      ))}
    </select>
  )
}

function InquiryForm({ plans, cta }: { plans: any[]; cta: string }) {
  const [submitted, setSubmitted] = React.useState(false)
  if (submitted) {
    return <div style={{textAlign:'center',padding:'40px 0',color:'#0d4f3c',fontWeight:700,fontSize:'1.1rem'}}>✓ 送信が完了しました！担当者より1営業日以内にご連絡します。</div>
  }
  return (
    <form onSubmit={(e)=>{e.preventDefault();setSubmitted(true)}}>
      <div style={{marginBottom:20}}>
        <label className="form-label">ご希望のプラン</label>
        <select className="form-input" style={{cursor:'pointer'}}>
          <option value="">プランを選択してください</option>
          {plans.map((p: any,i: number)=>(
            <option key={i}>{p.name} — {p.price.toLocaleString()} {p.currency} / {p.period}</option>
          ))}
          <option>まだ決めていない・相談したい</option>
        </select>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:20}}>
        <div><label className="form-label">お名前<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>必須</span></label><input type="text" className="form-input" placeholder="山田 太郎" required/></div>
        <div><label className="form-label">メールアドレス<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>必須</span></label><input type="email" className="form-input" placeholder="your@email.com" required/></div>
      </div>
      <div style={{marginBottom:20}}><label className="form-label">お電話番号</label><input type="tel" className="form-input" placeholder="090-0000-0000"/></div>
      <div style={{marginBottom:28}}><label className="form-label">ご質問・ご相談内容</label><textarea className="form-input" rows={4} placeholder="お気軽にご記載ください" style={{resize:'vertical'}}/></div>
      <div style={{marginBottom:20,fontSize:'.8rem',color:'#888'}}>
        <label style={{display:'flex',gap:8,alignItems:'flex-start',cursor:'pointer'}}>
          <input type="checkbox" required style={{accentColor:'#0d4f3c',marginTop:2}}/>
          <span>プライバシーポリシーに同意して送信する</span>
        </label>
      </div>
      <button type="submit" className="btn-gold" style={{width:'100%',justifyContent:'center',fontSize:'1rem',padding:16}}>{cta}</button>
    </form>
  )
}
