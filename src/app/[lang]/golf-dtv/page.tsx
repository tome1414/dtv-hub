'use client'

import React, { useEffect, useState } from 'react'
import type { Locale } from '@/middleware'
import { getDictionary } from '@/lib/dictionaries'

interface GolfDTVPageProps {
  params: Promise<{ lang: string }>
}

export default function GolfDTVPage({ params }: GolfDTVPageProps) {
  const [dict, setDict] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
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
        .hero-bg { position: relative; overflow: hidden; }
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
        .btn-platinum { background:transparent;color:#c9a84c;padding:13px 32px;border-radius:999px;font-weight:700;font-size:.95rem;display:inline-flex;align-items:center;gap:8px;transition:all .3s;border:2px solid #c9a84c;cursor:pointer;text-decoration:none;font-family:inherit; }
        .btn-platinum:hover { background:linear-gradient(135deg,#c9a84c,#e2c46e);color:#fff;border-color:transparent; }
        .ticker-wrap { overflow:hidden;background:#0d4f3c; }
        .ticker { display:flex;animation:ticker-scroll 30s linear infinite;white-space:nowrap; }
        @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-item { display:inline-flex;align-items:center;gap:12px;padding:10px 32px;color:rgba(255,255,255,.9);font-size:.82rem;font-weight:500;flex-shrink:0; }
        .ticker-dot { width:5px;height:5px;border-radius:50%;background:#c9a84c;flex-shrink:0; }
        .nav-link { font-size:.85rem;color:rgba(255,255,255,.85);text-decoration:none;transition:color .2s;font-weight:500; }
        .nav-link:hover { color:#e2c46e; }
        .nav-desktop { display:flex;gap:24px;align-items:center; }
        .nav-mobile-right { display:none;align-items:center;gap:10px; }
        .hamburger-btn { background:none;border:none;cursor:pointer;padding:6px;color:#fff;display:flex;flex-direction:column;gap:5px; }
        .hamburger-btn span { display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all .3s; }
        .nav-mobile-menu { display:none;flex-direction:column;padding:16px 24px;gap:14px;border-top:1px solid rgba(255,255,255,.1);background:#082d21; }
        .nav-mobile-menu.open { display:flex; }
        .counter { font-size:clamp(2rem,5vw,3.5rem);font-weight:900; }
        .hero-stats-bar { background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);borderRadius:16px;border-radius:16px;display:flex;align-items:stretch;overflow:hidden; }
        .hero-stats-main { display:flex;flex-direction:column;align-items:center;justify-content:center;padding:22px 28px;flex-shrink:0;min-width:110px; }
        .hero-stats-divider { width:1px;background:rgba(255,255,255,.15);flex-shrink:0; }
        .hero-stats-grid { display:grid;grid-template-columns:1fr 1fr;flex:1; }
        .hero-stats-cell { display:flex;align-items:flex-start;gap:8px;padding:14px 18px;border-left:1px solid rgba(255,255,255,.08); }
        .hero-stats-cell-top { border-bottom:1px solid rgba(255,255,255,.08); }
        @media(max-width:600px){
          .hero-stats-bar{flex-direction:column}
          .hero-stats-divider{width:100%;height:1px}
          .hero-stats-main{padding:18px 24px;flex-direction:row;gap:12px;justify-content:flex-start}
          .hero-stats-grid{grid-template-columns:1fr}
          .hero-stats-cell{border-left:none;border-top:1px solid rgba(255,255,255,.08)}
          .hero-stats-cell-top{border-bottom:none}
        }
        .divider { height:2px;background:linear-gradient(90deg,transparent,#0d4f3c,transparent); }
        .tag { display:inline-block;background:rgba(13,79,60,.08);color:#0d4f3c;padding:4px 12px;border-radius:999px;font-size:.78rem;font-weight:600; }
        .form-two-col { display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px; }
        @media(max-width:768px){
          .hero-stat{border-right:none;border-bottom:1px solid rgba(255,255,255,.15)}
          .hero-stat:last-child{border-bottom:none}
          .two-col{grid-template-columns:1fr!important}
          .nav-desktop{display:none!important}
          .nav-mobile-right{display:flex!important}
          .form-two-col{grid-template-columns:1fr!important}
        }
      `}</style>

      <div className="golf-root">

        {/* NAV */}
        <nav style={{background:'#082d21',position:'sticky',top:0,zIndex:50,borderBottom:'1px solid rgba(255,255,255,.08)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
            {/* Logo */}
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:32,height:32,background:'linear-gradient(135deg,#0d4f3c,#c9a84c)',borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{color:'#fff',fontWeight:900,fontSize:'.9rem'}}>G</span>
              </div>
              <span style={{color:'#fff',fontWeight:700,fontSize:'1rem'}}>Golf<span style={{color:'#c9a84c'}}>DTV</span></span>
            </div>
            {/* Desktop nav */}
            <div className="nav-desktop">
              <a href="#plans" className="nav-link">{d.nav.plans}</a>
              <a href="#faq" className="nav-link">{d.nav.faq}</a>
              <LangSwitcher />
              <a href="#inquiry" className="btn-gold" style={{padding:'8px 20px',fontSize:'.82rem'}}>{d.hero.cta}</a>
            </div>
            {/* Mobile: lang + hamburger */}
            <div className="nav-mobile-right">
              <LangSwitcher />
              <button className="hamburger-btn" onClick={()=>setMenuOpen(!menuOpen)} aria-label="menu">
                <span/><span/><span/>
              </button>
            </div>
          </div>
          {/* Mobile dropdown menu */}
          <div className={`nav-mobile-menu${menuOpen?' open':''}`}>
            <a href="#plans" className="nav-link" onClick={()=>setMenuOpen(false)}>{d.nav.plans}</a>
            <a href="#faq" className="nav-link" onClick={()=>setMenuOpen(false)}>{d.nav.faq}</a>
            <a href="#inquiry" className="btn-gold" style={{padding:'10px 24px',fontSize:'.88rem',justifyContent:'center'}} onClick={()=>setMenuOpen(false)}>{d.hero.cta}</a>
          </div>
        </nav>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker">
            {[...Array(2)].map((_,i)=>(
              <span key={i} style={{display:'contents'}}>
                {d.ticker.map((t: string, j: number)=>(
                  <span key={j} className="ticker-item"><span className="ticker-dot"/>{t}</span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* HERO */}
        <section className="hero-bg" style={{padding:'80px 24px 64px',minHeight:'80vh',display:'flex',alignItems:'center',position:'relative',backgroundImage:`linear-gradient(160deg,rgba(8,45,33,0.82) 0%,rgba(13,79,60,0.72) 40%,rgba(26,107,82,0.68) 70%,rgba(10,61,46,0.82) 100%),url(/golf-hero.webp)`,backgroundSize:'cover',backgroundPosition:'center'}}>
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
            <div className="hero-stats-bar">
              {/* 96% */}
              <div className="hero-stats-main">
                <span style={{fontSize:'clamp(2.4rem,5vw,3.2rem)',fontWeight:900,color:'#e2c46e',lineHeight:1}}>{d.trust.successRate}</span>
                <span style={{color:'rgba(255,255,255,.6)',fontSize:'.75rem',marginTop:6,letterSpacing:'.05em'}}>Success Rate</span>
              </div>
              {/* vertical divider */}
              <div className="hero-stats-divider"/>
              {/* 4 items in 2×2 grid */}
              <div className="hero-stats-grid">
                {d.trust.items.map((item: string,i: number)=>(
                  <div key={i} className={`hero-stats-cell${i===0||i===1?' hero-stats-cell-top':''}`}>
                    <span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'#c9a84c',flexShrink:0,marginTop:3}}/>
                    <span style={{color:'rgba(255,255,255,.88)',fontSize:'.82rem',fontWeight:600,lineHeight:1.55}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY SAFE */}
        <section style={{padding:'72px 24px',background:'#082d21'}}>
          <div style={{maxWidth:1000,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:52}}>
              <span style={{fontSize:'.72rem',letterSpacing:'.18em',textTransform:'uppercase',color:'#c9a84c',fontWeight:600}}>{d.whySafe.sectionLabel}</span>
              <h2 style={{fontSize:'clamp(1.4rem,3vw,2.1rem)',fontWeight:900,lineHeight:1.3,color:'#fff',marginTop:10}}>{d.whySafe.title}</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:24}}>
              {d.whySafe.items.map((item: any)=>(
                <div key={item.number} style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(201,168,76,.25)',borderRadius:20,padding:'32px 28px',display:'flex',flexDirection:'column',gap:16}}>
                  <div style={{display:'flex',alignItems:'center',gap:14}}>
                    <span style={{fontSize:'2rem',fontWeight:900,color:'rgba(201,168,76,.35)',lineHeight:1,fontVariantNumeric:'tabular-nums'}}>{item.number}</span>
                    <div>
                      <p style={{fontWeight:800,color:'#fff',fontSize:'.98rem',lineHeight:1.4,margin:0}}>{item.title}</p>
                      <p style={{color:'#c9a84c',fontSize:'.75rem',fontWeight:600,marginTop:3,letterSpacing:'.02em'}}>{item.subtitle}</p>
                    </div>
                  </div>
                  <div style={{width:40,height:2,background:'linear-gradient(90deg,#c9a84c,transparent)'}}/>
                  <p style={{color:'rgba(255,255,255,.72)',fontSize:'.87rem',lineHeight:1.9,margin:0}}>{item.body}</p>
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
                const isPlatinum = plan.name === 'Platinum'
                const tierStyle = isPlatinum
                  ? {background:'linear-gradient(135deg,#3a3020,#5c4a2a)',color:'#e8d9a8',border:'1px solid rgba(201,168,76,.5)'}
                  : plan.name === 'Gold' || isPopular
                  ? {background:'linear-gradient(135deg,#b8891e,#e2c46e)',color:'#fff',border:'none'}
                  : {background:'rgba(140,140,150,.15)',color:'#666',border:'1px solid rgba(140,140,150,.3)'}
                const cardBg = isPopular ? '#0d4f3c' : isPlatinum ? '#1c1408' : '#fff'
                const cardBorder = isPopular ? '#c9a84c' : isPlatinum ? '#c9a84c' : '#e5e0d5'
                const priceColor = isPopular ? '#e2c46e' : isPlatinum ? '#e8c86a' : '#0a2e1f'
                const unitColor = isPopular ? 'rgba(255,255,255,.7)' : isPlatinum ? 'rgba(232,200,106,.6)' : '#666'
                const descColor = isPopular ? 'rgba(255,255,255,.6)' : isPlatinum ? 'rgba(232,200,106,.55)' : '#777'
                const featColor = (inc: boolean) => inc
                  ? (isPopular ? '#fff' : isPlatinum ? '#e0d4b0' : '#1a1a1a')
                  : (isPopular ? 'rgba(255,255,255,.4)' : isPlatinum ? 'rgba(224,212,176,.3)' : '#bbb')
                const checkColor = (inc: boolean) => inc
                  ? (isPopular ? '#e2c46e' : isPlatinum ? '#c9a84c' : '#0d4f3c')
                  : undefined
                return (
                  <div key={i} className="plan-card" style={{background:cardBg,border:`2px solid ${cardBorder}`,display:'flex',flexDirection:'column',position:'relative'}}>
                    {isPopular && (
                      <div style={{background:'#c9a84c',textAlign:'center',padding:'7px 20px',borderRadius:'18px 18px 0 0',fontSize:'.75rem',fontWeight:700,color:'#fff',letterSpacing:'.04em'}}>{plan.badge}</div>
                    )}
                    {isPlatinum && (
                      <div style={{background:'linear-gradient(90deg,#3a2e0e,#5c4a1a)',textAlign:'center',padding:'7px 20px',borderRadius:'18px 18px 0 0',fontSize:'.75rem',fontWeight:700,color:'#e8c86a',letterSpacing:'.06em'}}>PREMIUM</div>
                    )}
                    <div style={{padding:'24px 28px 0'}}>
                      <span style={{display:'inline-block',padding:'4px 14px',borderRadius:999,fontSize:'.78rem',fontWeight:700,letterSpacing:'.04em',...tierStyle}}>{plan.name}</span>
                      <div style={{marginTop:20}}>
                        <span style={{fontSize:'2.2rem',fontWeight:900,color:priceColor}}>{plan.price.toLocaleString()}</span>
                        <span style={{fontSize:'.9rem',color:unitColor,marginLeft:4}}>{plan.currency} / {plan.period}</span>
                      </div>
                      <p style={{fontSize:'.82rem',color:descColor,marginTop:4}}>{plan.description}</p>
                      <div style={{height:1,background:isPopular?'rgba(255,255,255,.15)':isPlatinum?'rgba(201,168,76,.2)':'#e5e0d5',margin:'20px 0'}}/>
                    </div>
                    <div style={{padding:'0 28px',flex:1}}>
                      <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                        {plan.features.map((f: any,j: number)=>(
                          <li key={j} style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:'.87rem',color:featColor(f.included)}}>
                            <span style={{flexShrink:0,fontWeight:700,color:checkColor(f.included)}}>{f.included?'✓':'–'}</span>
                            <span>{f.text}{f.note&&<span style={{fontSize:'.78rem',marginLeft:4,opacity:.75}}>（{f.note}）</span>}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{padding:28}}>
                      <a href="#inquiry" className={isPopular?'btn-gold':isPlatinum?'btn-platinum':'btn-outline'} style={{width:'100%',justifyContent:'center'}}>{plan.cta}</a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ADDON */}
        <section style={{padding:'64px 24px',background:'#f5f0e6'}}>
          <div style={{maxWidth:700,margin:'0 auto'}}>
            {/* Connector line */}
            <div style={{textAlign:'center',marginBottom:24}}>
              <span style={{display:'inline-flex',alignItems:'center',gap:10,color:'#0d4f3c',fontSize:'.82rem',fontWeight:600}}>
                <span style={{width:40,height:1,background:'#c9a84c',display:'inline-block'}}/>
                オプション追加可能
                <span style={{width:40,height:1,background:'#c9a84c',display:'inline-block'}}/>
              </span>
            </div>
            <div style={{background:'linear-gradient(135deg,#fdf8ee,#faf3e0)',borderRadius:24,border:'2px solid #c9a84c',boxShadow:'0 4px 24px rgba(201,168,76,.18)',overflow:'hidden'}}>
              {/* Gold top bar */}
              <div style={{background:'linear-gradient(90deg,#c9a84c,#e2c46e)',padding:'10px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <span style={{color:'#fff',fontWeight:700,fontSize:'.82rem',letterSpacing:'.08em'}}>OPTIONAL ADD-ON</span>
                <span style={{color:'rgba(255,255,255,.85)',fontSize:'.75rem',fontWeight:500}}>{d.addon.label}</span>
              </div>
              <div style={{padding:'32px 36px'}}>
                <h2 style={{fontSize:'clamp(1.3rem,3vw,1.8rem)',fontWeight:900,marginBottom:8,color:'#0a2e1f'}}>{d.addon.title}</h2>
                <p style={{color:'#555',marginBottom:24,fontSize:'.9rem',lineHeight:1.8}}>{d.addon.description}</p>
                <div style={{marginBottom:24,display:'flex',alignItems:'baseline',gap:6}}>
                  <span style={{fontSize:'2rem',fontWeight:900,color:'#c9a84c'}}>+{d.addon.price.toLocaleString()}</span>
                  <span style={{color:'#777',fontSize:'.9rem'}}>THB</span>
                </div>
                <ul style={{listStyle:'none',padding:0,margin:'0 0 28px',display:'flex',flexDirection:'column',gap:10}}>
                  {d.addon.features.map((f: string,i: number)=>(
                    <li key={i} style={{display:'flex',gap:8,alignItems:'flex-start',fontSize:'.88rem',color:'#333'}}>
                      <span style={{color:'#0d4f3c',flexShrink:0,fontWeight:700}}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#inquiry" className="btn-gold">{d.addon.cta}</a>
              </div>
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
              <InquiryForm plans={d.plans.items} cta={d.inquiry.cta} f={d.form} />
            </div>
          </div>
        </section>

        {/* LEGAL */}
        <section style={{padding:'48px 24px 56px',background:'#fff'}} id="legal">
          <div style={{maxWidth:800,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:36}}>
              <span className="section-label">LEGAL</span>
              <h2 className="section-title" style={{marginTop:8,fontSize:'clamp(1.2rem,2.5vw,1.6rem)'}}>各種規約・会社概要</h2>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <LegalBox id="company" title="会社概要">
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.88rem',lineHeight:1.8}}>
                  <tbody>
                    {[
                      ['会社名', 'Toy World Company'],
                      ['所在地', 'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Marshall Islands MH96960'],
                      ['設立', '2024年'],
                      ['事業内容', 'DTVビザ申請サポートサービス、ゴルフスクール受講斡旋、タイ長期滞在コンサルティング'],
                      ['お問い合わせ', 'お問い合わせフォームよりご連絡ください'],
                    ].map(([k,v])=>(
                      <tr key={k} style={{borderBottom:'1px solid #ede8df'}}>
                        <td style={{padding:'10px 16px 10px 0',fontWeight:600,color:'#0a2e1f',whiteSpace:'nowrap',verticalAlign:'top',width:140}}>{k}</td>
                        <td style={{padding:'10px 0',color:'#444'}}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </LegalBox>

              <LegalBox id="sct" title="特定商取引法に基づく表記">
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.88rem',lineHeight:1.8}}>
                  <tbody>
                    {[
                      ['販売業者', 'Toy World Company'],
                      ['所在地', 'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Marshall Islands MH96960'],
                      ['お問い合わせ', 'お問い合わせフォームよりご連絡ください'],
                      ['販売価格', 'Silverプラン: 20,000 THB／年\nGoldプラン: 50,000 THB／年\nPlatinumプラン: 100,000 THB／年\nDTV申請代行サービス: +10,000 THB\n※日本円換算は申込時の為替レートにより異なります。詳細はお問い合わせください。'],
                      ['支払方法', '銀行振込またはクレジットカード決済\n（詳細はお申し込み後に別途ご案内いたします）'],
                      ['役務提供時期', 'ご入金確認後1〜3営業日以内に、DTVビザ申請に必要な公式書類（入学許可証・受講証明書等）をPDFにて発行いたします'],
                      ['キャンセル・返金', 'ビザが申請却下された場合：申請代行プランご利用時はスクール代金100%返金、ご利用でない場合はスクール代金の50%を返金します。\nなお、ビザ申請費用（10,000 THB相当）はタイ大使館への直接支払い分のため、いずれの場合も返金対象外となります。'],
                      ['特記事項', '当サービスはビザ申請のサポートを行うものであり、ビザの取得を保証するものではありません。'],
                    ].map(([k,v])=>(
                      <tr key={k} style={{borderBottom:'1px solid #ede8df'}}>
                        <td style={{padding:'10px 16px 10px 0',fontWeight:600,color:'#0a2e1f',whiteSpace:'nowrap',verticalAlign:'top',width:160}}>{k}</td>
                        <td style={{padding:'10px 0',color:'#444',whiteSpace:'pre-line'}}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </LegalBox>

              <LegalBox id="privacy" title="プライバシーポリシー">
                <div style={{fontSize:'.88rem',color:'#444',lineHeight:2,display:'flex',flexDirection:'column',gap:16}}>
                  <p>Toy World Company（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、以下のプライバシーポリシーを定めます。</p>
                  {[
                    ['1. 収集する個人情報', 'お問い合わせフォームを通じて、お名前、メールアドレス、ご希望プラン、ご紹介コード、お問い合わせ内容等の情報をお預かりします。'],
                    ['2. 利用目的', 'お問い合わせへの回答およびサービスのご案内\nDTVビザ申請サポートサービスの提供\nサービス改善および新サービスのご案内\n法令に基づく対応'],
                    ['3. 第三者への提供', '当社は、以下の場合を除き、お客様の個人情報を第三者に提供いたしません。\n・お客様の同意がある場合\n・法令に基づく場合\n・サービス提供に必要な業務委託先（厳格な守秘義務を課します）'],
                    ['4. 個人情報の管理', '当社は、個人情報の漏洩・紛失・不正アクセスを防止するため、適切なセキュリティ措置を講じます。'],
                    ['5. 開示・訂正・削除', 'お客様は、当社が保有するご自身の個人情報の開示、訂正、削除を要求する権利を有します。ご要望はお問い合わせフォームよりご連絡ください。'],
                    ['6. Cookieの使用', '当社ウェブサイトでは、サービス向上のためCookieを使用することがあります。ブラウザの設定によりCookieを無効化することができますが、一部機能が制限される場合があります。'],
                    ['7. プライバシーポリシーの変更', '本ポリシーは、必要に応じて改定することがあります。重要な変更がある場合は、ウェブサイト上でお知らせします。'],
                    ['8. お問い合わせ', '個人情報に関するお問い合わせはお問い合わせフォームよりご連絡ください。'],
                  ].map(([heading, body])=>(
                    <div key={heading}>
                      <p style={{fontWeight:700,color:'#0a2e1f',marginBottom:4}}>{heading}</p>
                      <p style={{whiteSpace:'pre-line'}}>{body}</p>
                    </div>
                  ))}
                  <p style={{fontSize:'.8rem',color:'#999',marginTop:8}}>制定日：2024年1月1日</p>
                </div>
              </LegalBox>
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
                <p style={{fontSize:'.85rem',lineHeight:1.9,maxWidth:320}}>{d.footerNav.about}</p>
              </div>
              <div>
                <h4 style={{color:'#fff',fontWeight:700,fontSize:'.88rem',marginBottom:16}}>{d.footerNav.services}</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {d.footerNav.serviceLinks.map(([l,h]: string[],i: number)=>(
                    <li key={i}><a href={h} style={{color:'rgba(255,255,255,.65)',fontSize:'.83rem',textDecoration:'none'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{color:'#fff',fontWeight:700,fontSize:'.88rem',marginBottom:16}}>{d.footerNav.support}</h4>
                <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:10}}>
                  {d.footerNav.supportLinks.map(([l,h]: string[],i: number)=>(
                    <li key={i}><a href={h} style={{color:'rgba(255,255,255,.65)',fontSize:'.83rem',textDecoration:'none'}}>{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <p style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)'}}>{d.footerNav.copyright}</p>
              <p style={{fontSize:'.75rem',color:'rgba(255,255,255,.35)',maxWidth:500,textAlign:'right',lineHeight:1.6}}>{d.footerNav.disclaimer}</p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

function LegalBox({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div id={id} style={{border:'1px solid #e5e0d5',borderRadius:14,overflow:'hidden'}}>
      <button
        onClick={()=>setOpen(!open)}
        style={{width:'100%',background:open?'#0a2e1f':'#f5f0e6',padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',border:'none',cursor:'pointer',fontFamily:'inherit',transition:'background .2s'}}
      >
        <span style={{fontWeight:700,fontSize:'.95rem',color:open?'#e2c46e':'#0a2e1f'}}>{title}</span>
        <span style={{width:24,height:24,borderRadius:'50%',background:open?'rgba(255,255,255,.15)':'#0d4f3c',color:open?'#e2c46e':'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',lineHeight:1,transition:'transform .3s',transform:open?'rotate(45deg)':'none',flexShrink:0}}>+</span>
      </button>
      <div style={{maxHeight:open?2000:0,overflow:'hidden',transition:'max-height .4s ease',background:'#fff'}}>
        <div style={{padding:'24px'}}>
          {children}
        </div>
      </div>
    </div>
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

function InquiryForm({ plans, cta, f }: { plans: any[]; cta: string; f: any }) {
  const [submitted, setSubmitted] = React.useState(false)
  if (submitted) {
    return <div style={{textAlign:'center',padding:'40px 0',color:'#0d4f3c',fontWeight:700,fontSize:'1.1rem'}}>{f.successMessage}</div>
  }
  return (
    <form onSubmit={(e)=>{e.preventDefault();setSubmitted(true)}}>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.planLabel}</label>
        <select className="form-input" style={{cursor:'pointer'}}>
          <option value="">{f.planPlaceholder}</option>
          {plans.map((p: any,i: number)=>(
            <option key={i}>{p.name} — {p.price.toLocaleString()} {p.currency} / {p.period}</option>
          ))}
          <option>{f.planUndecided}</option>
        </select>
      </div>
      {/* Agency service checkbox */}
      <div style={{marginBottom:20,background:'#f0ede4',borderRadius:10,padding:'12px 14px',border:'1px solid #ddd8cc'}}>
        <label style={{display:'flex',gap:10,alignItems:'flex-start',cursor:'pointer'}}>
          <input type="checkbox" style={{accentColor:'#0d4f3c',marginTop:3,width:16,height:16,flexShrink:0}}/>
          <div>
            <span style={{fontWeight:700,fontSize:'.88rem',color:'#0a2e1f'}}>{f.agencyLabel}</span>
            <ul style={{margin:'4px 0 0',padding:'0 0 0 14px',fontSize:'.76rem',color:'#666',lineHeight:1.7}}>
              {f.agencyBullets.map((b: string, i: number)=><li key={i}>{b}</li>)}
            </ul>
          </div>
        </label>
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.nameLabel}<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>{f.required}</span></label>
        <input type="text" className="form-input" placeholder="" required/>
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.emailLabel}<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>{f.required}</span></label>
        <input type="email" className="form-input" placeholder="your@email.com" required/>
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.referralLabel}<span style={{fontSize:'.75rem',color:'#999',marginLeft:6,fontWeight:400}}>{f.referralNote}</span></label>
        <input type="text" className="form-input" placeholder={f.referralPlaceholder}/>
      </div>
      <div style={{marginBottom:28}}>
        <label className="form-label">{f.messageLabel}</label>
        <textarea className="form-input" rows={4} placeholder={f.messagePlaceholder} style={{resize:'vertical'}}/>
      </div>
      <div style={{marginBottom:20,fontSize:'.8rem',color:'#888'}}>
        <label style={{display:'flex',gap:8,alignItems:'flex-start',cursor:'pointer'}}>
          <input type="checkbox" required style={{accentColor:'#0d4f3c',marginTop:2}}/>
          <span>{f.privacyConsent}</span>
        </label>
      </div>
      <button type="submit" className="btn-gold" style={{width:'100%',justifyContent:'center',fontSize:'1rem',padding:16}}>{cta}</button>
    </form>
  )
}
