'use client'

import React, { useEffect, useState } from 'react'
import type { Locale } from '@/middleware'
import {
  analytics,
  pushGolfDtvView,
  pushGolfDtvCtaClick,
  pushGolfDtvFormStart,
  pushGolfDtvLead,
  pushGolfDtvFormError,
} from '@/lib/analytics'

interface GolfDTVClientProps {
  dict: any
  locale: Locale
}

export default function GolfDTVClient({ dict, locale }: GolfDTVClientProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollTracked, setScrollTracked] = useState(false)
  const [navScrolled, setNavScrolled] = useState(false)
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')
  const [affiliateOpen, setAffiliateOpen] = useState(false)
  const [affiliateForm, setAffiliateForm] = useState({ name: '', email: '', platform: '', message: '' })
  const [affiliateStatus, setAffiliateStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  useEffect(() => {
    analytics.languageChange(locale)
    analytics.sectionView('golf_dtv_page')
    pushGolfDtvView(locale)
  }, [locale])

  useEffect(() => {
    if (inquirySubmitted) {
      document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [inquirySubmitted])

  // スクロール深度追跡 + ナビ透過制御
  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 20)
      if (scrollTracked) return
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50) {
        analytics.scrollDepth(50)
        setScrollTracked(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollTracked])

  const d = dict

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap');
        .golf-root { font-family: 'Noto Sans JP', sans-serif; color: #1a1a1a; background: #fff; }
        .hero-bg { position: relative; overflow: hidden; }
        .hero-sub { line-height:1.85; }
        @media(max-width:768px){ .hero-sub { line-height:1.6; text-align:left!important; } }
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
        .aff-input { width:100%;padding:10px 14px;border:1px solid rgba(8,45,33,.2);border-radius:8px;font-size:.9rem;font-family:inherit;outline:none;transition:border-color .2s;box-sizing:border-box; }
        .aff-input:focus { border-color:#0d4f3c;box-shadow:0 0 0 3px rgba(13,79,60,.1); }
        .aff-overlay { position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:200;display:flex;align-items:center;justify-content:center;padding:16px; }
        .aff-modal { background:#fff;border-radius:20px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(0,0,0,.25); }
        .btn-outline { background:transparent;color:#0d4f3c;padding:13px 32px;border-radius:999px;font-weight:700;font-size:.95rem;display:inline-flex;align-items:center;gap:8px;transition:all .3s;border:2px solid #0d4f3c;cursor:pointer;text-decoration:none;font-family:inherit; }
        .btn-outline:hover { background:#0d4f3c;color:#fff; }
        .btn-platinum { background:transparent;color:#c9a84c;padding:13px 32px;border-radius:999px;font-weight:700;font-size:.95rem;display:inline-flex;align-items:center;gap:8px;transition:all .3s;border:2px solid #c9a84c;cursor:pointer;text-decoration:none;font-family:inherit; }
        .btn-platinum:hover { background:linear-gradient(135deg,#c9a84c,#e2c46e);color:#fff;border-color:transparent; }
        .ticker-wrap { overflow:hidden;background:#0d4f3c; }
        .ticker { display:flex;animation:ticker-scroll 30s linear infinite;white-space:nowrap; }
        @keyframes ticker-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-item { display:inline-flex;align-items:center;gap:12px;padding:10px 32px;color:rgba(255,255,255,.9);font-size:.82rem;font-weight:500;flex-shrink:0; }
        .ticker-dot { width:5px;height:5px;border-radius:50%;background:#c9a84c;flex-shrink:0; }
        .nav-link { font-size:.85rem;color:#1a3a2a;text-decoration:none;transition:color .2s;font-weight:500; }
        .nav-link:hover { color:#0d6b4a; }
        .nav-desktop { display:flex;gap:24px;align-items:center; }
        .nav-mobile-right { display:none;align-items:center;gap:10px; }
        .hamburger-btn { background:none;border:none;cursor:pointer;padding:6px;color:#1a3a2a;display:flex;flex-direction:column;gap:5px; }
        .hamburger-btn span { display:block;width:22px;height:2px;background:#1a3a2a;border-radius:2px;transition:all .3s; }
        .nav-mobile-menu { display:none;flex-direction:column;padding:12px 16px;gap:8px;border-top:1px solid rgba(26,58,42,.12);background:rgba(255,255,255,.97);max-width:240px;margin:0 auto; }
        .nav-mobile-menu.open { display:flex; }
        .counter { font-size:clamp(2rem,5vw,3.5rem);font-weight:900; }
        .flow-grid { grid-template-columns: repeat(3,1fr); }
        .flow-step { border-bottom: 1px solid #f0ede4; }
        .flow-step:nth-child(n+4) { border-bottom: none; }
        @media(max-width:700px){
          .flow-grid { grid-template-columns: 1fr !important; }
          .flow-step { border-bottom: 1px solid #f0ede4; padding: 20px 0; }
          .flow-step:last-child { border-bottom: none; }
        }
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
        <nav style={{
          position:'sticky',top:0,zIndex:50,
          background: navScrolled ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.60)',
          backdropFilter:'blur(16px)',
          WebkitBackdropFilter:'blur(16px)',
          borderBottom: navScrolled ? '1px solid rgba(26,58,42,0.12)' : '1px solid rgba(26,58,42,0.06)',
          boxShadow: navScrolled ? '0 1px 12px rgba(26,58,42,0.08)' : 'none',
          transition:'background .3s,box-shadow .3s,border-color .3s',
        }}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
            {/* Logo */}
            <a href="#" style={{display:'flex',alignItems:'center',textDecoration:'none'}}>
              <img src="/golf-dtv-logo-nav.webp" alt="GolfDTV" style={{height:48,width:'auto'}} />
            </a>
            {/* Desktop nav */}
            <div className="nav-desktop">
              <a href="#flow" className="nav-link">{d.nav.flow}</a>
              <a href="#plans" className="nav-link">{d.nav.plans}</a>
              <a href="#faq" className="nav-link">{d.nav.faq}</a>
              <LangSwitcher currentLocale={locale} />
              <a href="#inquiry" className="btn-gold" style={{padding:'8px 20px',fontSize:'.82rem'}} onClick={()=>pushGolfDtvCtaClick(locale,'nav_inquiry','#inquiry')}>{d.hero.cta}</a>
            </div>
            {/* Mobile: lang + hamburger */}
            <div className="nav-mobile-right">
              <LangSwitcher currentLocale={locale} />
              <button className="hamburger-btn" onClick={()=>{setMenuOpen(!menuOpen); analytics.menuToggle(!menuOpen)}} aria-label="menu">
                <span/><span/><span/>
              </button>
            </div>
          </div>
          {/* Mobile dropdown menu */}
          <div className={`nav-mobile-menu${menuOpen?' open':''}`}>
            <a href="#flow" className="nav-link" onClick={()=>setMenuOpen(false)}>{d.nav.flow}</a>
            <a href="#plans" className="nav-link" onClick={()=>setMenuOpen(false)}>{d.nav.plans}</a>
            <a href="#faq" className="nav-link" onClick={()=>setMenuOpen(false)}>{d.nav.faq}</a>
            <a href="#inquiry" className="btn-gold" style={{padding:'10px 24px',fontSize:'.88rem',justifyContent:'center'}} onClick={()=>{setMenuOpen(false);pushGolfDtvCtaClick(locale,'nav_inquiry_mobile','#inquiry')}}>{d.hero.cta}</a>
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
            <p className="hero-sub" style={{color:'rgba(255,255,255,.82)',fontSize:'clamp(.95rem,2vw,1.1rem)',maxWidth:640,margin:'0 auto 40px',textAlign:'center'}}>
              {d.hero.subheadline}
            </p>
            <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginBottom:60}}>
              <a href="#inquiry" className="btn-gold" style={{fontSize:'1rem',padding:'16px 40px'}} onClick={()=>pushGolfDtvCtaClick(locale,'hero_primary','#inquiry')}>{d.hero.cta}</a>
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

        {/* FLOW */}
        <section id="flow" style={{padding:'72px 24px',background:'#f9f6ef'}}>
          <div style={{maxWidth:900,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:48}}>
              <span style={{fontSize:'.72rem',letterSpacing:'.18em',textTransform:'uppercase',color:'#0d4f3c',fontWeight:600}}>{d.flow.sectionLabel}</span>
              <h2 style={{fontSize:'clamp(1.4rem,3vw,2rem)',fontWeight:900,color:'#0a2e1f',marginTop:10}}>{d.flow.title}</h2>
            </div>
            {(() => {
              const phaseColors = ['#0d4f3c','#b8891e','#2a4a7f','#1a6b3f']
              return (
                <div style={{display:'flex',flexDirection:'column',gap:20}}>
                  {d.flow.phases.map((phase: any, pi: number) => (
                    <div key={phase.number} style={{borderRadius:16,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,.07)'}}>
                      {/* Phase header */}
                      <div style={{background:phaseColors[pi],padding:'14px 24px',display:'flex',alignItems:'center',gap:16,flexWrap:'wrap',justifyContent:'space-between'}}>
                        <div style={{display:'flex',alignItems:'center',gap:12,minWidth:0}}>
                          <span style={{background:'rgba(255,255,255,.18)',color:'#fff',fontSize:'.7rem',fontWeight:800,letterSpacing:'.1em',padding:'3px 10px',borderRadius:999,flexShrink:0}}>
                            PHASE {phase.number}
                          </span>
                          <span style={{color:'#fff',fontWeight:800,fontSize:'1rem',overflow:'hidden',textOverflow:'ellipsis'}}>{phase.title}</span>
                        </div>
                        {phase.duration && (
                          <span style={{color:'rgba(255,255,255,.75)',fontSize:'.78rem',flexShrink:0,whiteSpace:'nowrap'}}>{phase.duration}</span>
                        )}
                      </div>
                      {/* Phase body */}
                      <div style={{background:'#fff',padding:'20px 24px'}}>
                        {phase.note && (
                          <div style={{background:'#fff8e6',border:'1px solid #e2c46e',borderRadius:8,padding:'10px 14px',marginBottom:16,fontSize:'.82rem',color:'#7a5c00',display:'flex',gap:8,alignItems:'flex-start'}}>
                            <span style={{flexShrink:0}}>💡</span>
                            <span>{phase.note}</span>
                          </div>
                        )}
                        <div style={{display:'flex',flexDirection:'column',gap:0}}>
                          {phase.steps.map((step: any, si: number) => (
                            <div key={step.number} style={{display:'flex',gap:14,paddingTop:si===0?0:14,paddingBottom:14,borderBottom:si<phase.steps.length-1?'1px solid #f0ede4':'none'}}>
                              <div style={{width:30,height:30,borderRadius:'50%',background:phaseColors[pi],display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                                <span style={{color:'#fff',fontWeight:800,fontSize:'.75rem'}}>{step.number}</span>
                              </div>
                              <div style={{flex:1}}>
                                <p style={{fontWeight:700,color:'#0a2e1f',fontSize:'.9rem',margin:'0 0 4px'}}>{step.title}</p>
                                {step.body && <p style={{color:'#666',fontSize:'.82rem',lineHeight:1.8,margin:0}}>{step.body}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </section>

        {/* PLANS */}
        <section style={{padding:'80px 24px',background:'#f5f0e6'}} id="plans">
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:56}}>
              <span className="section-label">PLANS</span>
              <h2 className="section-title" style={{marginTop:8}}>{d.plans.intro}</h2>
              <p className="section-body" style={{maxWidth:560,margin:'16px auto 0'}}>{d.plans.subtext}</p>
              <p style={{fontSize:'.82rem',color:'#777',margin:'12px auto 0',maxWidth:600,lineHeight:1.7}}>{d.plans.feeNote}</p>
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
                        <span style={{fontSize:'.68rem',color:unitColor,opacity:.6,marginLeft:6}}>+VAT 7%</span>
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
                      <a href="#inquiry" className={isPopular?'btn-gold':isPlatinum?'btn-platinum':'btn-outline'} style={{width:'100%',justifyContent:'center'}} onClick={()=>pushGolfDtvCtaClick(locale,planCtaName(plan.name),'#inquiry')}>{plan.cta}</a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* OPTIONS — 申請代行 + 継続プラン（ja のみ） */}
        <section style={{padding:'64px 24px',background:'#0a2e1f'}}>
          <div style={{maxWidth:900,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:40}}>
              <span style={{display:'inline-block',background:'rgba(201,168,76,.18)',border:'1px solid rgba(201,168,76,.45)',color:'#e2c46e',padding:'4px 16px',borderRadius:999,fontSize:'.72rem',letterSpacing:'.12em',fontWeight:600,marginBottom:14}}>
                ADD-ON OPTIONS
              </span>
              <h2 style={{fontSize:'clamp(1.3rem,3vw,1.9rem)',fontWeight:900,color:'#fff',margin:'0 0 10px'}}>
                {locale === 'ja' ? 'オプションサービス' : 'Optional Services'}
              </h2>
              <p style={{color:'rgba(255,255,255,.55)',fontSize:'.87rem',maxWidth:520,margin:'0 auto',lineHeight:1.85}}>
                {locale === 'ja'
                  ? 'いずれかのプランにプラスして選べるオプションです。'
                  : 'These services can be added to any plan.'}
              </p>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:16}}>
              {/* 申請代行サービス — 全言語 */}
              <div style={{background:'rgba(201,168,76,.07)',border:'1px solid rgba(201,168,76,.35)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column' as const}}>
                <span style={{display:'inline-block',background:'linear-gradient(135deg,#c9a84c,#e2c46e)',color:'#fff',fontSize:'.68rem',fontWeight:700,padding:'3px 10px',borderRadius:999,marginBottom:14,alignSelf:'flex-start' as const}}>
                  RECOMMENDED
                </span>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:10}}>
                  <h3 style={{fontSize:'1rem',fontWeight:800,color:'#fff',margin:0,lineHeight:1.4}}>{d.addon.title}</h3>
                  <span style={{fontSize:'1.2rem',fontWeight:900,color:'#e2c46e',whiteSpace:'nowrap' as const}}>+{d.addon.price.toLocaleString()} THB</span>
                </div>
                <p style={{fontSize:'.82rem',color:'rgba(255,255,255,.6)',lineHeight:1.8,margin:'0 0 14px'}}>{d.addon.description}</p>
                <ul style={{listStyle:'none',padding:0,margin:'0 0 22px',display:'flex',flexDirection:'column' as const,gap:7,flexGrow:1}}>
                  {d.addon.features.map((feat: string,i: number)=>(
                    <li key={i} style={{display:'flex',gap:8,fontSize:'.8rem',color:'rgba(255,255,255,.7)',lineHeight:1.6}}>
                      <span style={{color:'#c9a84c',flexShrink:0,fontWeight:700}}>✓</span>{feat}
                    </li>
                  ))}
                </ul>
                <a href="#inquiry" className="btn-gold" style={{fontSize:'.82rem',padding:'11px 22px',alignSelf:'flex-start' as const}} onClick={()=>pushGolfDtvCtaClick(locale,'addon_agency','#inquiry')}>{d.addon.cta}</a>
              </div>

              {/* 5年まとめてプラン — 全言語 */}
              {d.fiveYearPlan && (
                <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.12)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column' as const}}>
                  <span style={{display:'inline-block',background:'rgba(201,168,76,.22)',color:'#e2c46e',fontSize:'.68rem',fontWeight:700,padding:'3px 10px',borderRadius:999,marginBottom:14,alignSelf:'flex-start' as const}}>
                    {d.fiveYearPlan.badge}
                  </span>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:10}}>
                    <h3 style={{fontSize:'1rem',fontWeight:800,color:'#fff',margin:0,lineHeight:1.4}}>{d.fiveYearPlan.title}</h3>
                    <span style={{fontSize:'.88rem',fontWeight:700,color:'#e2c46e',whiteSpace:'nowrap' as const,background:'rgba(201,168,76,.15)',padding:'3px 10px',borderRadius:999}}>{d.fiveYearPlan.discount}</span>
                  </div>
                  <p style={{fontSize:'.82rem',color:'rgba(255,255,255,.6)',lineHeight:1.8,margin:'0 0 10px'}}>{d.fiveYearPlan.description}</p>
                  <p style={{fontSize:'.77rem',color:'rgba(255,255,255,.35)',lineHeight:1.7,margin:'0 0 22px',flexGrow:1}}>{d.fiveYearPlan.note}</p>
                  <a href="#inquiry" style={{fontSize:'.82rem',padding:'11px 22px',borderRadius:999,fontWeight:700,border:'1.5px solid rgba(255,255,255,.25)',color:'rgba(255,255,255,.8)',display:'inline-flex',alignItems:'center',gap:8,transition:'all .3s',textDecoration:'none',alignSelf:'flex-start' as const}} onClick={()=>pushGolfDtvCtaClick(locale,'option_five_year','#inquiry')}>
                    {d.fiveYearPlan.cta}
                  </a>
                </div>
              )}

              {/* 年次更新プラン — 全言語 */}
              {d.annualRenewal && (
                <div style={{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.12)',borderRadius:18,padding:'28px 24px',display:'flex',flexDirection:'column' as const}}>
                  <span style={{display:'inline-block',background:'rgba(13,79,60,.5)',color:'rgba(255,255,255,.7)',fontSize:'.68rem',fontWeight:700,padding:'3px 10px',borderRadius:999,marginBottom:14,alignSelf:'flex-start' as const}}>
                    {d.annualRenewal.badge}
                  </span>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:8,marginBottom:10}}>
                    <h3 style={{fontSize:'1rem',fontWeight:800,color:'#fff',margin:0,lineHeight:1.4}}>{d.annualRenewal.title}</h3>
                    <span style={{fontSize:'.88rem',fontWeight:700,color:'rgba(255,255,255,.7)',whiteSpace:'nowrap' as const,background:'rgba(13,79,60,.5)',padding:'3px 10px',borderRadius:999}}>{d.annualRenewal.discount}</span>
                  </div>
                  <p style={{fontSize:'.82rem',color:'rgba(255,255,255,.6)',lineHeight:1.8,margin:'0 0 10px'}}>{d.annualRenewal.description}</p>
                  <p style={{fontSize:'.77rem',color:'rgba(255,255,255,.35)',lineHeight:1.7,margin:'0 0 22px',flexGrow:1}}>{d.annualRenewal.note}</p>
                  <a href="#inquiry" style={{fontSize:'.82rem',padding:'11px 22px',borderRadius:999,fontWeight:700,border:'1.5px solid rgba(255,255,255,.25)',color:'rgba(255,255,255,.8)',display:'inline-flex',alignItems:'center',gap:8,transition:'all .3s',textDecoration:'none',alignSelf:'flex-start' as const}} onClick={()=>pushGolfDtvCtaClick(locale,'option_annual_renewal','#inquiry')}>
                    {d.annualRenewal.cta}
                  </a>
                </div>
              )}
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
              <div key={cat.id} id={`faq-cat-${cat.id}`} style={{marginBottom:32}}>
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
            {inquirySubmitted ? (
              <div style={{textAlign:'center',padding:'80px 0'}}>
                <div style={{fontSize:'3rem',marginBottom:16}}>✓</div>
                <p style={{color:'#0d4f3c',fontWeight:700,fontSize:'1.1rem',margin:'0 0 24px'}}>{d.form.successMessage}</p>
                {receiptNumber && (
                  <div style={{display:'inline-block',background:'#f5f0e6',borderRadius:12,padding:'20px 32px',textAlign:'center'}}>
                    <p style={{margin:'0 0 4px',fontSize:'.8rem',color:'#888',letterSpacing:'.05em',textTransform:'uppercase'}}>Receipt No.</p>
                    <p style={{margin:'0 0 16px',fontSize:'1.4rem',fontWeight:700,color:'#0d4f3c',letterSpacing:'.05em'}}>{receiptNumber}</p>
                    <p style={{margin:'0 0 16px',fontSize:'.85rem',color:'#555',lineHeight:1.7}}>{d.form.receiptNote}</p>
                    {process.env.NEXT_PUBLIC_MESSENGER_URL && (
                      <a href={process.env.NEXT_PUBLIC_MESSENGER_URL} target="_blank" rel="noopener noreferrer"
                        style={{display:'inline-block',background:'#0084ff',color:'#fff',fontWeight:700,fontSize:'.9rem',padding:'12px 24px',borderRadius:999,textDecoration:'none'}}>
                        {d.form.messengerCta}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <>
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
                  <InquiryForm plans={d.plans.items} cta={d.inquiry.cta} f={d.form} locale={locale} onSubmitDone={(rn)=>{setInquirySubmitted(true);setReceiptNumber(rn)}} />
                </div>
              </>
            )}
          </div>
        </section>

        {/* LEGAL */}
        <section style={{padding:'48px 24px 56px',background:'#fff'}} id="legal">
          <div style={{maxWidth:800,margin:'0 auto'}}>
            <div style={{textAlign:'center',marginBottom:36}}>
              <span className="section-label">LEGAL</span>
              <h2 className="section-title" style={{marginTop:8,fontSize:'clamp(1.2rem,2.5vw,1.6rem)'}}>
                {locale === 'ja' ? '各種規約・会社概要' : 'Terms and Privacy Policy'}
              </h2>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {locale === 'ja' ? (
                <>
              <LegalBox id="academy" title="ゴルフアカデミー概要（提携スクール）">
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.88rem',lineHeight:1.8}}>
                  <tbody>
                    {[
                      ['スクール名', "Ken's Golf Bangkok"],
                      ['法人名', 'PREMIER GOLF TOUR Co.,Ltd'],
                      ['設立', '2021年'],
                      ['所在地', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110'],
                      ['対応言語', '日本語・英語・タイ語・ベトナム語'],
                      ['提供サービス', 'ゴルフレッスン（初心者〜上級者）、クラブリペア・フィッティング'],
                    ].map(([k,v])=>(
                      <tr key={k} style={{borderBottom:'1px solid #ede8df'}}>
                        <td style={{padding:'10px 16px 10px 0',fontWeight:600,color:'#0a2e1f',whiteSpace:'nowrap',verticalAlign:'top',width:140}}>{k}</td>
                        <td style={{padding:'10px 0',color:'#444'}}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Ken Sugiyama プロフィール */}
                <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid #ede8df'}}>
                  <p style={{fontWeight:700,fontSize:'.82rem',color:'#0a2e1f',letterSpacing:'.06em',marginBottom:14}}>代表講師</p>
                  <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap' as const}}>
                    <img
                      src="/ken-sugiyama.avif"
                      alt="Ken Sugiyama - Head Pro"
                      style={{width:96,height:96,borderRadius:'50%',objectFit:'cover' as const,flexShrink:0,border:'2px solid #e5e0d5'}}
                    />
                    <div style={{flex:1,minWidth:200}}>
                      <p style={{fontWeight:800,fontSize:'1rem',color:'#0a2e1f',margin:'0 0 2px'}}>Ken Sugiyama</p>
                      <p style={{fontSize:'.78rem',color:'#c9a84c',fontWeight:600,margin:'0 0 10px',letterSpacing:'.04em'}}>HEAD PRO</p>
                      <p style={{fontSize:'.83rem',color:'#444',lineHeight:1.85,margin:'0 0 10px'}}>
                        タイPGA認定の現役プロインストラクター。完全初心者から競技・トーナメントレベルまで対応した体系的なカリキュラムを持ち、多国籍クライアントへの指導実績多数。日本語・英語・タイ語・ベトナム語の4言語対応により、国際的な環境でも高い評価を受けている。
                      </p>
                      <div style={{display:'flex',flexWrap:'wrap' as const,gap:6}}>
                        {['タイPGA認定','初心者〜プロ対応','トーナメント準備','4言語対応'].map(tag=>(
                          <span key={tag} style={{fontSize:'.72rem',background:'#f5f0e6',color:'#0a2e1f',padding:'3px 10px',borderRadius:999,fontWeight:500}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </LegalBox>

              <LegalBox id="sct" title="特定商取引法に基づく表記">
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.88rem',lineHeight:1.8}}>
                  <tbody>
                    {[
                      ['販売業者', 'Toy World Company'],
                      ['所在地', 'Trust Company Complex, Ajeltake Road, Ajeltake Island, Majuro, Marshall Islands MH96960'],
                      ['お問い合わせ', 'お問い合わせフォームよりご連絡ください'],
                      ['販売価格', 'Silverプラン: 20,000 THB／年\nGoldプラン: 50,000 THB／年\nPlatinumプラン: 100,000 THB／年\nDTV申請代行サービス: +10,000 THB\n※別途タイVAT（7%）が加算されます。\n※日本円換算は申込時の為替レートにより異なります。詳細はお問い合わせください。'],
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

              <LegalBox id="refund" title="返金ポリシー">
                <div style={{fontSize:'.88rem',color:'#444',lineHeight:2,display:'flex',flexDirection:'column',gap:16}}>
                  <p style={{fontSize:'.8rem',color:'#999',margin:0}}>最終更新日：2026年5月17日</p>
                  {[
                    ['1. スクール受講料の返金',
                      '【申請代行サービスをご利用の場合】\nタイ大使館・領事館によるビザ審査の結果、申請が却下された場合は、スクール受講料を100%全額返金いたします。\n\n【申請代行サービスをご利用でない場合（自己申請）】\nビザ申請が却下された場合は、スクール受講料の50%を返金いたします。\n\n【以下の場合はいずれのプランも返金対象外】\n・審査基準の変更・審査官の裁量による却下\n・お客様による虚偽申告・情報の不備・不足\n・お客様提出書類の不備・提出漏れ・期限超過\n・追加書類（Additional Documents）の未対応・対応期限超過\n・お客様都合による申請放棄（最終連絡から14日間以上応答がない場合）\n・お客様都合による連絡遅延（弊社からの連絡に対し7日間以上応答がない場合）\n\n【返金確認プロセス】\n返金対応にあたり、弊社にてThai e-VisaシステムへのログインID（メールアドレス・パスワード）をお客様よりご提供いただき、審査結果（却下）を直接確認した上で返金手続きを進めます。'],
                    ['2. ビザ申請料（約10,000 THB）について',
                      'ビザ申請料はタイ大使館・領事館へ直接お支払いいただく政府費用です。弊社を経由しない支払いのため、いかなる場合も返金対象外となります。'],
                    ['3. 申請代行サービス料（10,000 THB）の返金',
                      '【弊社起因による却下の場合】\n弊社の書類作成ミス・申請手続きの不備など、弊社に起因すると客観的事実に基づき判断された場合、申請代行サービス料（10,000 THB）を全額返金いたします。\n\n【以下の場合は返金対象外】\n・審査基準の変更・審査官の裁量による却下\n・お客様による虚偽申告・情報の不備・不足\n・お客様提出書類の不備・提出漏れ・期限超過\n・追加書類（Additional Documents）の未対応・対応期限超過\n・お客様都合による申請放棄（最終連絡から14日間以上応答がない場合）\n・お客様都合による連絡遅延（弊社からの連絡に対し7日間以上応答がない場合）'],
                    ['4. 返金の手続き',
                      '・返金のご申請は、不許可通知の受領後14日以内にお問い合わせフォームよりご連絡ください。\n・返金の審査・確認には最大14営業日いただく場合があります。\n・返金はお申し込み時と同一の支払い方法にて対応いたします。\n・返金額はお申し込み時のTHB建て金額を基準とし、為替変動による差額は補償対象外となります。'],
                    ['5. キャンセル（ビザ申請前）について',
                      'スクール受講料のお支払い後、ビザ申請前にキャンセルをご希望の場合は、弊社が受入レター等の書類を発行済みかどうかにより対応が異なります。詳細はお問い合わせフォームよりご相談ください。'],
                    ['6. 特別審査対象国籍の方への返金上限について',
                      'タイ政府が安全保障上の理由から「特別審査対象国（Countries under Special Observation）」に指定している以下の国籍の方については、DTV申請代行サービスをご利用の場合であっても、ビザ申請却下時のスクール受講料の返金は50%を上限とします。\n\n【対象国籍（29カ国）】\nアフガニスタン／イラン／イラク／シリア／イエメン／レバノン／パレスチナ／パキスタン／バングラデシュ／ネパール／北朝鮮（朝鮮民主主義人民共和国）／中国／ナイジェリア／ソマリア／スーダン／リビア／アルジェリア／エジプト／カメルーン／中央アフリカ共和国／コンゴ共和国／コンゴ民主共和国／赤道ギニア／ガーナ／ギニア／リベリア／マリ／サントメ・プリンシペ／シエラレオネ\n\n上記国籍の方は、第三国でのビザ申請制限・追加書類義務・厳格な面接審査など通常とは異なる審査プロセスが適用されます。これらに起因するビザ却下リスクは弊社のコントロール外となるため、申請代行サービスを含む全プランにおいて返金上限を設けております。'],
                  ].map(([heading, body])=>(
                    <div key={heading}>
                      <p style={{fontWeight:700,color:'#0a2e1f',marginBottom:4}}>{heading}</p>
                      <p style={{whiteSpace:'pre-line'}}>{body}</p>
                    </div>
                  ))}
                  <p style={{fontSize:'.8rem',color:'#999',marginTop:8}}>※ 当サービスはビザ申請のサポートを行うものであり、ビザ取得を保証するものではありません。</p>
                </div>
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
                </>
              ) : (
                <>
              <LegalBox id="academy" title={
                locale === 'zh' ? '高尔夫学院概要（合作学校）' :
                locale === 'ko' ? '골프 아카데미 개요（제휴 스쿨）' :
                locale === 'ru' ? 'О гольф-академии（партнёрская школа）' :
                'Golf Academy（Partner School）'
              }>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'.88rem',lineHeight:1.8}}>
                  <tbody>
                    {(locale === 'zh' ? [
                      ['学校名称', "Ken's Golf Bangkok"],
                      ['法人名称', 'PREMIER GOLF TOUR Co.,Ltd'],
                      ['成立', '2021年'],
                      ['地址', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110'],
                      ['服务语言', '日语・英语・泰语・越南语'],
                      ['提供服务', '高尔夫课程（初学者至高级）、球杆修理・配件'],
                    ] : locale === 'ko' ? [
                      ['스쿨명', "Ken's Golf Bangkok"],
                      ['법인명', 'PREMIER GOLF TOUR Co.,Ltd'],
                      ['설립', '2021년'],
                      ['소재지', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110'],
                      ['대응 언어', '일본어・영어・태국어・베트남어'],
                      ['제공 서비스', '골프 레슨（초보자〜상급자）、클럽 리페어・피팅'],
                    ] : locale === 'ru' ? [
                      ['Название', "Ken's Golf Bangkok"],
                      ['Юр. лицо', 'PREMIER GOLF TOUR Co.,Ltd'],
                      ['Основана', '2021 г.'],
                      ['Адрес', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110'],
                      ['Языки', 'Японский, английский, тайский, вьетнамский'],
                      ['Услуги', 'Уроки гольфа (для начинающих и продвинутых), ремонт и подгонка клюшек'],
                    ] : [
                      ['School Name', "Ken's Golf Bangkok"],
                      ['Legal Entity', 'PREMIER GOLF TOUR Co.,Ltd'],
                      ['Established', '2021'],
                      ['Location', '9 Thong Lo, Khlongton-nua, Watthana, Bangkok 10110'],
                      ['Languages', 'Japanese, English, Thai, Vietnamese'],
                      ['Services', 'Golf lessons (beginners to advanced), Club repair & fitting'],
                    ]).map(([k,v])=>(
                      <tr key={k} style={{borderBottom:'1px solid #ede8df'}}>
                        <td style={{padding:'10px 16px 10px 0',fontWeight:600,color:'#0a2e1f',whiteSpace:'nowrap',verticalAlign:'top',width:130}}>{k}</td>
                        <td style={{padding:'10px 0',color:'#444'}}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Ken Sugiyama プロフィール（多言語） */}
                <div style={{marginTop:24,paddingTop:20,borderTop:'1px solid #ede8df'}}>
                  <p style={{fontWeight:700,fontSize:'.82rem',color:'#0a2e1f',letterSpacing:'.06em',marginBottom:14}}>
                    {locale === 'zh' ? '首席教练' : locale === 'ko' ? '헤드 프로' : locale === 'ru' ? 'Главный тренер' : 'Head Instructor'}
                  </p>
                  <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap' as const}}>
                    <img
                      src="/ken-sugiyama.avif"
                      alt="Ken Sugiyama - Head Pro"
                      style={{width:96,height:96,borderRadius:'50%',objectFit:'cover' as const,flexShrink:0,border:'2px solid #e5e0d5'}}
                    />
                    <div style={{flex:1,minWidth:200}}>
                      <p style={{fontWeight:800,fontSize:'1rem',color:'#0a2e1f',margin:'0 0 2px'}}>Ken Sugiyama</p>
                      <p style={{fontSize:'.78rem',color:'#c9a84c',fontWeight:600,margin:'0 0 10px',letterSpacing:'.04em'}}>HEAD PRO</p>
                      <p style={{fontSize:'.83rem',color:'#444',lineHeight:1.85,margin:'0 0 10px'}}>
                        {locale === 'zh'
                          ? '泰国PGA认证的现役专业教练。拥有从完全初学者到竞技、锦标赛级别的系统化课程，拥有丰富的多国籍学员指导经验。精通日语、英语、泰语、越南语四种语言，在国际环境中享有高度评价。'
                          : locale === 'ko'
                          ? '태국 PGA 공인 현역 프로 인스트럭터. 완전 초보자부터 대회 레벨까지 폭넓은 수준에 대응하는 체계적인 커리큘럼을 갖추고 있으며, 다국적 클라이언트 지도 실적이 풍부합니다. 일본어・영어・태국어・베트남어 4개 국어 대응으로 국제적인 환경에서 높은 평가를 받고 있습니다.'
                          : locale === 'ru'
                          ? 'Действующий профессиональный инструктор, сертифицированный PGA Таиланда. Располагает системной программой для всех уровней — от абсолютных новичков до турнирного уровня. Богатый опыт работы с клиентами из разных стран. Владеет четырьмя языками: японским, английским, тайским и вьетнамским.'
                          : 'Thailand PGA certified professional instructor. Offers a structured curriculum for all levels — from complete beginners to tournament-level players — with extensive experience coaching international clients. Fluent in Japanese, English, Thai, and Vietnamese, he is highly regarded in multicultural environments.'}
                      </p>
                      <div style={{display:'flex',flexWrap:'wrap' as const,gap:6}}>
                        {(locale === 'zh'
                          ? ['泰国PGA认证','初学者至职业','锦标赛准备','4语言对应']
                          : locale === 'ko'
                          ? ['태국PGA공인','초보자〜프로대응','토너먼트준비','4개국어대응']
                          : locale === 'ru'
                          ? ['Сертификат PGA','Все уровни','Турнирная подготовка','4 языка']
                          : ['Thailand PGA Certified','All Levels','Tournament Ready','4 Languages']
                        ).map((tag: string)=>(
                          <span key={tag} style={{fontSize:'.72rem',background:'#f5f0e6',color:'#0a2e1f',padding:'3px 10px',borderRadius:999,fontWeight:500}}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </LegalBox>

              <LegalBox id="refund" title={
                locale === 'zh' ? '退款政策' :
                locale === 'ko' ? '환불 정책' :
                locale === 'ru' ? 'Политика возврата' :
                'Refund Policy'
              }>
                <div style={{fontSize:'.88rem',color:'#444',lineHeight:2,display:'flex',flexDirection:'column',gap:16}}>
                  <p style={{fontSize:'.8rem',color:'#999',margin:0}}>
                    {locale === 'zh' ? '最后更新：2026年5月17日' :
                     locale === 'ko' ? '최종 업데이트: 2026년 5월 17일' :
                     locale === 'ru' ? 'Последнее обновление: 17 мая 2026 г.' :
                     'Last updated: May 17, 2026'}
                  </p>
                  {(locale === 'zh' ? [
                    ['1. 学费退款',
                      '【使用申请代办服务时】\n若泰国大使馆/领事馆的签证审核结果为拒签，我们将全额退还100%的学费。\n\n【未使用申请代办服务时（自行申请）】\n若签证申请被拒，我们将退还学费的50%。\n\n【以下情况均不予退款】\n・审核标准变更或审核官自由裁量导致的拒签\n・申请人虚假申报、信息不完整或不足\n・申请人提交的材料不完整、遗漏或超期\n・未响应或超过补充材料（Additional Documents）截止日期\n・申请人主动放弃申请（自最后联系之日起14天以上无回复）\n・申请人延迟回复（对我方联系7天以上无回复）\n\n【退款确认流程】\n为办理退款，我们需要您提供泰国电子签证系统的登录信息（电子邮件地址及密码），以便直接确认审核结果（拒签）后再进行退款处理。'],
                    ['2. 签证申请费（约10,000泰铢）',
                      '签证申请费为直接支付给泰国大使馆/领事馆的政府费用，不经由本公司收取，因此任何情况下均不予退款。'],
                    ['3. 申请代办服务费（10,000泰铢）的退款',
                      '【因本公司原因导致拒签时】\n若经客观事实认定，拒签原因为本公司的文件准备失误或申请手续不当，我们将全额退还申请代办服务费（10,000泰铢）。\n\n【以下情况不予退款】\n・审核标准变更或审核官自由裁量导致的拒签\n・申请人虚假申报、信息不完整或不足\n・申请人提交的材料不完整、遗漏或超期\n・未响应或超过补充材料截止日期\n・申请人主动放弃申请（自最后联系之日起14天以上无回复）\n・申请人延迟回复（对我方联系7天以上无回复）'],
                    ['4. 退款手续',
                      '・请在收到拒签通知后14天内通过咨询表格申请退款。\n・退款审核及确认最长需要14个工作日。\n・退款将通过申请时使用的相同支付方式处理。\n・退款金额以申请时的泰铢金额为基准，汇率波动产生的差额不在补偿范围内。'],
                    ['5. 取消（签证申请前）',
                      '若您在支付学费后、提交签证申请前希望取消，处理方式将根据我方是否已发出录取函等文件而有所不同。详情请通过咨询表格与我们联系。'],
                  ] : locale === 'ko' ? [
                    ['1. 수강료 환불',
                      '【대행 서비스 이용 시】\n태국 대사관·영사관의 비자 심사 결과 신청이 거절된 경우, 수강료를 100% 전액 환불해 드립니다.\n\n【대행 서비스 미이용 시（자체 신청）】\n비자 신청이 거절된 경우, 수강료의 50%를 환불해 드립니다.\n\n【다음의 경우 모든 플랜에서 환불 불가】\n・심사 기준 변경 또는 심사관의 재량에 의한 거절\n・신청인의 허위 신고, 정보 불비 또는 부족\n・신청인이 제출한 서류의 불비, 누락 또는 기한 초과\n・추가 서류(Additional Documents) 미대응 또는 대응 기한 초과\n・신청인 사정에 의한 신청 포기（마지막 연락으로부터 14일 이상 무응답）\n・신청인 사정에 의한 연락 지연（당사의 연락에 7일 이상 무응답）\n\n【환불 확인 절차】\n환불 처리를 위해 태국 전자비자 시스템 로그인 정보（이메일 주소·비밀번호）를 고객님으로부터 제공받아, 심사 결과（거절）를 직접 확인한 후 환불 절차를 진행합니다.'],
                    ['2. 비자 신청비（약 10,000 THB）에 대하여',
                      '비자 신청비는 태국 대사관·영사관에 직접 납부하는 정부 수수료입니다. 당사를 통하지 않는 결제이므로 어떠한 경우에도 환불되지 않습니다.'],
                    ['3. 대행 서비스 수수료（10,000 THB）환불',
                      '【당사 귀책 사유에 의한 거절의 경우】\n당사의 서류 작성 오류·신청 절차 불비 등, 당사에 귀책 사유가 있다고 객관적 사실에 근거하여 판단된 경우, 대행 서비스 수수료（10,000 THB）를 전액 환불해 드립니다.\n\n【다음의 경우 환불 불가】\n・심사 기준 변경 또는 심사관의 재량에 의한 거절\n・신청인의 허위 신고, 정보 불비 또는 부족\n・신청인이 제출한 서류의 불비, 누락 또는 기한 초과\n・추가 서류 미대응 또는 대응 기한 초과\n・신청인 사정에 의한 신청 포기（마지막 연락으로부터 14일 이상 무응답）\n・신청인 사정에 의한 연락 지연（당사의 연락에 7일 이상 무응답）'],
                    ['4. 환불 절차',
                      '・환불 신청은 불허가 통지 수령 후 14일 이내에 문의 양식을 통해 연락해 주세요.\n・환불 심사·확인에는 최대 14 영업일이 소요될 수 있습니다.\n・환불은 신청 시와 동일한 결제 수단으로 처리됩니다.\n・환불 금액은 신청 시의 THB 기준 금액으로 하며, 환율 변동에 의한 차액은 보상 대상이 아닙니다.'],
                    ['5. 취소（비자 신청 전）에 대하여',
                      '수강료 납부 후 비자 신청 전에 취소를 원하시는 경우, 당사가 입학 허가서 등의 서류를 발행했는지 여부에 따라 대응이 달라집니다. 자세한 내용은 문의 양식을 통해 상담해 주세요.'],
                  ] : locale === 'ru' ? [
                    ['1. Возврат платы за обучение',
                      '【При использовании услуги сопровождения заявки】\nЕсли тайское посольство или консульство отклонит вашу визовую заявку, мы вернём 100% оплаты за обучение.\n\n【Без использования услуги сопровождения（самостоятельная подача）】\nЕсли визовая заявка отклонена, мы вернём 50% оплаты за обучение.\n\n【Случаи, при которых возврат невозможен（для всех планов）】\n・Отказ вследствие изменения критериев или по усмотрению сотрудника\n・Ложные сведения, неполная или недостаточная информация со стороны заявителя\n・Отсутствие, неполнота или просрочка документов заявителя\n・Непредоставление доп. документов (Additional Documents) или нарушение срока\n・Отказ от подачи по инициативе заявителя（без ответа более 14 дней）\n・Задержка ответа со стороны заявителя（нет ответа в течение 7 дней）\n\n【Процедура проверки для возврата】\nДля оформления возврата мы попросим вас предоставить данные для входа в Thai e-Visa（адрес эл. почты и пароль）, чтобы напрямую подтвердить результат（отказ）перед началом процедуры.'],
                    ['2. Сбор за подачу визовой заявки（около 10 000 THB）',
                      'Сбор за подачу визовой заявки является государственной пошлиной, уплачиваемой непосредственно в тайское посольство или консульство. Поскольку эта оплата не проходит через нас, она не подлежит возврату ни при каких обстоятельствах.'],
                    ['3. Возврат платы за услугу сопровождения（10 000 THB）',
                      '【В случае отказа по нашей вине】\nЕсли отказ объективно обусловлен ошибками в подготовке документов или процедурными нарушениями с нашей стороны, мы полностью возместим плату за услугу сопровождения（10 000 THB）.\n\n【Случаи, при которых возврат невозможен】\n・Отказ вследствие изменения критериев или по усмотрению сотрудника\n・Ложные сведения, неполная или недостаточная информация заявителя\n・Отсутствие, неполнота или просрочка документов\n・Непредоставление доп. документов или нарушение срока\n・Отказ от подачи по инициативе заявителя（более 14 дней без ответа）\n・Задержка ответа заявителя（нет ответа в течение 7 дней）'],
                    ['4. Процедура возврата',
                      '・Запрос на возврат необходимо подать в течение 14 дней с момента получения уведомления об отказе через форму обратной связи.\n・Проверка и подтверждение возврата может занять до 14 рабочих дней.\n・Возврат осуществляется тем же способом оплаты, что и при подаче заявки.\n・Сумма возврата основана на сумме в THB на момент подачи; разница из-за колебаний курса не компенсируется.'],
                    ['5. Отмена（до подачи визовой заявки）',
                      'Если вы хотите отменить заказ после оплаты обучения, но до подачи визовой заявки, условия зависят от того, были ли уже выданы письма о зачислении и другие документы. Для получения подробной информации свяжитесь с нами через форму обратной связи.'],
                  ] : [
                    ['1. School Tuition Refund',
                      '【With Application Agency Service】\nIf your visa application is rejected by a Thai embassy or consulate, we will refund 100% of your school tuition fee.\n\n【Without Application Agency Service (Self-Application)】\nIf your visa application is rejected, we will refund 50% of your school tuition fee.\n\n【Non-Refundable Cases (All Plans)】\n・Changes in screening criteria or rejection at the discretion of the reviewing officer\n・False declarations, incomplete or insufficient information by the applicant\n・Missing, incomplete, or expired documents submitted by the applicant\n・Failure to respond to or missing the deadline for Additional Documents requests\n・Abandonment of application at the applicant\'s discretion (no response for 14+ days since last contact)\n・Delayed response by the applicant (no response within 7 days of our contact)\n\n【Refund Verification Process】\nTo process your refund, we will ask you to provide your Thai e-Visa system login credentials (email address and password) so we can directly verify the rejection result before proceeding.'],
                    ['2. Visa Application Fee (approx. 10,000 THB)',
                      'The visa application fee is a government fee paid directly to the Thai embassy or consulate. As this payment does not go through us, it is non-refundable under any circumstances.'],
                    ['3. Application Agency Service Fee (10,000 THB) Refund',
                      '【In Case of Rejection Due to Our Error】\nIf rejection is objectively determined to be caused by our document preparation errors or procedural deficiencies, we will refund the full application agency service fee (10,000 THB).\n\n【Non-Refundable Cases】\n・Changes in screening criteria or rejection at the discretion of the reviewing officer\n・False declarations, incomplete or insufficient information by the applicant\n・Missing, incomplete, or expired documents submitted by the applicant\n・Failure to respond to or missing the deadline for Additional Documents requests\n・Abandonment of application at the applicant\'s discretion (no response for 14+ days since last contact)\n・Delayed response by the applicant (no response within 7 days of our contact)'],
                    ['4. Refund Procedure',
                      '・Refund requests must be submitted within 14 days of receiving the rejection notice via the contact form.\n・Refund review and verification may take up to 14 business days.\n・Refunds will be processed using the same payment method used at the time of application.\n・Refund amounts are based on the THB amount at the time of application; differences due to exchange rate fluctuations are not covered.'],
                    ['5. Cancellation (Before Visa Application)',
                      'If you wish to cancel after paying the school tuition fee but before submitting the visa application, the process will vary depending on whether we have already issued acceptance letters or other documents. Please contact us via the contact form for details.'],
                  ]).map(([heading, body]) => (
                    <div key={heading}>
                      <p style={{fontWeight:700,color:'#0a2e1f',marginBottom:4}}>{heading}</p>
                      <p style={{whiteSpace:'pre-line'}}>{body}</p>
                    </div>
                  ))}
                  <p style={{fontSize:'.8rem',color:'#999',marginTop:8}}>
                    {locale === 'zh' ? '※ 本服务为签证申请提供支持，不保证签证获批。' :
                     locale === 'ko' ? '※ 본 서비스는 비자 신청 지원을 위한 것이며, 비자 취득을 보증하지 않습니다.' :
                     locale === 'ru' ? '※ Данная услуга обеспечивает поддержку при подаче визовой заявки и не гарантирует получение визы.' :
                     '※ This service provides support for visa applications and does not guarantee visa approval.'}
                  </p>
                </div>
              </LegalBox>

              <LegalBox id="privacy" title="Privacy Policy">
                <div style={{fontSize:'.88rem',color:'#444',lineHeight:2,display:'flex',flexDirection:'column',gap:16}}>
                  <p>Toy World Company (hereinafter &quot;the Company&quot;) recognizes the protection of customer personal information as an important responsibility and establishes this privacy policy.</p>
                  {[
                    ['1. Information We Collect', 'We collect your name, email address, preferred plan, referral code, and inquiry message through the contact form on this website.'],
                    ['2. Use of Information', 'To respond to inquiries and provide service information • To provide DTV visa application support services • To improve services and inform about new offerings • To comply with applicable laws'],
                    ['3. Third Party Disclosure', 'We do not disclose customer personal information to third parties except in the following cases: With your consent • When required by law • To business partners necessary for service provision (under strict confidentiality obligations)'],
                    ['4. Information Security', 'We implement appropriate security measures to prevent unauthorized access, loss, or leakage of personal information.'],
                    ['5. Access, Correction, Deletion', 'You have the right to request disclosure, correction, or deletion of your personal information held by us. Please submit requests through the contact form.'],
                    ['6. Cookies', 'Our website may use cookies to improve service. You can disable cookies in your browser settings, though some features may be limited.'],
                    ['7. Privacy Policy Changes', 'We may revise this policy as necessary. Significant changes will be announced on our website.'],
                    ['8. Contact', 'For inquiries regarding personal information, please contact us through the contact form.'],
                  ].map(([heading, body])=>(
                    <div key={heading}>
                      <p style={{fontWeight:700,color:'#0a2e1f',marginBottom:4}}>{heading}</p>
                      <p style={{whiteSpace:'pre-line'}}>{body}</p>
                    </div>
                  ))}
                  <p style={{fontSize:'.8rem',color:'#999',marginTop:8}}>Established: January 1, 2024</p>
                </div>
              </LegalBox>
                </>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{background:'#082d21',padding:'48px 24px 24px',color:'rgba(255,255,255,.7)'}}>
          <div style={{maxWidth:1100,margin:'0 auto'}}>
            <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:48,marginBottom:40}} className="two-col">
              <div>
                <div style={{marginBottom:16}}>
                  <img src="/golf-dtv-logo-footer.webp" alt="GolfDTV" style={{height:32,width:'auto'}} />
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
            {/* Partner / Affiliate band */}
            {d.affiliate && (
              <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:28,marginBottom:24}}>
                <div style={{background:'rgba(201,168,76,.08)',border:'1px solid rgba(201,168,76,.25)',borderRadius:14,padding:'20px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
                  <div>
                    <p style={{margin:'0 0 4px',color:'#e2c46e',fontWeight:700,fontSize:'.95rem'}}>🤝 {d.affiliate.footerLink}</p>
                    <p style={{margin:0,color:'rgba(255,255,255,.65)',fontSize:'.82rem'}}>{d.affiliate.footerDesc}</p>
                  </div>
                  <button onClick={()=>setAffiliateOpen(true)} style={{background:'transparent',border:'1px solid rgba(201,168,76,.6)',color:'#e2c46e',padding:'8px 20px',borderRadius:999,fontSize:'.82rem',fontWeight:600,cursor:'pointer',whiteSpace:'nowrap',fontFamily:'inherit',transition:'all .2s'}}
                    onMouseEnter={e=>{e.currentTarget.style.background='rgba(201,168,76,.15)'}}
                    onMouseLeave={e=>{e.currentTarget.style.background='transparent'}}>
                    {d.affiliate.footerCta}
                  </button>
                </div>
              </div>
            )}

            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',paddingTop:20,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:12}}>
              <p style={{fontSize:'.78rem',color:'rgba(255,255,255,.4)'}}>{d.footerNav.copyright}</p>
              <p style={{fontSize:'.75rem',color:'rgba(255,255,255,.35)',maxWidth:500,textAlign:'right',lineHeight:1.6}}>{d.footerNav.disclaimer}</p>
            </div>
          </div>
        </footer>

      </div>

      {/* Affiliate / Partner Modal */}
      {affiliateOpen && d.affiliate && (
        <div className="aff-overlay" onClick={e=>{if(e.target===e.currentTarget)setAffiliateOpen(false)}}>
          <div className="aff-modal">
            {/* Header */}
            <div style={{background:'#082d21',padding:'24px 28px',borderRadius:'20px 20px 0 0',display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
              <div>
                <p style={{margin:'0 0 4px',color:'#c9a84c',fontSize:'.75rem',letterSpacing:'.1em',textTransform:'uppercase'}}>GolfDTV</p>
                <h2 style={{margin:0,color:'#fff',fontSize:'1.15rem',fontWeight:700}}>{d.affiliate.modalTitle}</h2>
              </div>
              <button onClick={()=>setAffiliateOpen(false)} style={{background:'rgba(255,255,255,.1)',border:'none',color:'#fff',width:32,height:32,borderRadius:'50%',cursor:'pointer',fontSize:'1.1rem',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>✕</button>
            </div>
            {/* Body */}
            <div style={{padding:'24px 28px'}}>
              <p style={{margin:'0 0 20px',color:'#555',fontSize:'.88rem',lineHeight:1.7}}>{d.affiliate.modalDesc}</p>
              {affiliateStatus === 'done' ? (
                <div style={{textAlign:'center',padding:'32px 0',color:'#0d4f3c',fontWeight:700,fontSize:'1rem'}}>{d.affiliate.success}</div>
              ) : (
                <form onSubmit={async e=>{
                  e.preventDefault()
                  setAffiliateStatus('sending')
                  try {
                    const res = await fetch('/api/affiliate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(affiliateForm)})
                    setAffiliateStatus(res.ok ? 'done' : 'error')
                  } catch { setAffiliateStatus('error') }
                }}>
                  <div style={{display:'flex',flexDirection:'column',gap:14}}>
                    <div>
                      <label style={{display:'block',fontSize:'.82rem',fontWeight:600,color:'#1a3a2a',marginBottom:5}}>
                        {d.affiliate.nameLabel} <span style={{color:'#c9a84c'}}>*</span>
                      </label>
                      <input className="aff-input" required value={affiliateForm.name}
                        onChange={e=>setAffiliateForm(f=>({...f,name:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{display:'block',fontSize:'.82rem',fontWeight:600,color:'#1a3a2a',marginBottom:5}}>
                        {d.affiliate.emailLabel} <span style={{color:'#c9a84c'}}>*</span>
                      </label>
                      <input className="aff-input" type="email" required value={affiliateForm.email}
                        onChange={e=>setAffiliateForm(f=>({...f,email:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{display:'block',fontSize:'.82rem',fontWeight:600,color:'#1a3a2a',marginBottom:5}}>
                        {d.affiliate.platformLabel}
                      </label>
                      <input className="aff-input" placeholder={d.affiliate.platformPlaceholder} value={affiliateForm.platform}
                        onChange={e=>setAffiliateForm(f=>({...f,platform:e.target.value}))} />
                    </div>
                    <div>
                      <label style={{display:'block',fontSize:'.82rem',fontWeight:600,color:'#1a3a2a',marginBottom:5}}>
                        {d.affiliate.messageLabel}
                      </label>
                      <textarea className="aff-input" rows={4} placeholder={d.affiliate.messagePlaceholder}
                        style={{resize:'vertical'}} value={affiliateForm.message}
                        onChange={e=>setAffiliateForm(f=>({...f,message:e.target.value}))} />
                    </div>
                    {affiliateStatus === 'error' && (
                      <p style={{color:'#c00',fontSize:'.82rem',margin:0}}>送信に失敗しました。時間をおいて再度お試しください。</p>
                    )}
                    <button type="submit" className="btn-gold" disabled={affiliateStatus==='sending'}
                      style={{width:'100%',justifyContent:'center',opacity:affiliateStatus==='sending'?.6:1}}>
                      {affiliateStatus === 'sending' ? '...' : d.affiliate.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
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
        <div style={{paddingBottom:20,color:'#555',fontSize:'.9rem',lineHeight:1.9}} dangerouslySetInnerHTML={{__html:a.replace(/\n/g,'<br/>')}} />
      </div>
    </div>
  )
}

function LangSwitcher({ currentLocale }: { currentLocale: string }) {
  const langs = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'ja', label: '🇯🇵 日本語' },
    { code: 'ko', label: '🇰🇷 한국어' },
    { code: 'zh', label: '🇨🇳 中文' },
    { code: 'ru', label: '🇷🇺 Русский' },
  ]
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.location.href = `/${e.target.value}/golf-dtv`
  }
  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      style={{
        background:'rgba(8,45,33,.06)',
        border:'1px solid rgba(8,45,33,.2)',
        color:'#1a3a2a',
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

const COUNTRIES = [
  // Africa
  'Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde',
  'Cameroon','Central African Republic','Chad','Comoros','Congo','DR Congo',
  'Djibouti','Egypt','Equatorial Guinea','Eritrea','Eswatini','Ethiopia',
  'Gabon','Gambia','Ghana','Guinea','Guinea-Bissau','Ivory Coast','Kenya',
  'Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania',
  'Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda',
  'São Tomé and Príncipe','Senegal','Seychelles','Sierra Leone','Somalia',
  'South Africa','South Sudan','Sudan','Tanzania','Togo','Tunisia','Uganda',
  'Zambia','Zimbabwe',
  // Americas
  'Antigua and Barbuda','Argentina','Bahamas','Barbados','Belize','Bolivia',
  'Brazil','Canada','Chile','Colombia','Costa Rica','Cuba','Dominica',
  'Dominican Republic','Ecuador','El Salvador','Grenada','Guatemala','Guyana',
  'Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Paraguay','Peru',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
  'Suriname','Trinidad and Tobago','United States','Uruguay','Venezuela',
  // Asia & Pacific
  'Afghanistan','Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei',
  'Cambodia','China','Cyprus','Georgia','Hong Kong','India','Indonesia','Iran',
  'Iraq','Israel','Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos',
  'Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea',
  'Oman','Pakistan','Palestine','Philippines','Qatar','Saudi Arabia','Singapore',
  'South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste',
  'Turkey','Turkmenistan','UAE','Uzbekistan','Vietnam','Yemen',
  // Europe
  'Albania','Andorra','Austria','Belarus','Belgium','Bosnia and Herzegovina',
  'Bulgaria','Croatia','Czech Republic','Denmark','Estonia','Finland','France',
  'Germany','Greece','Hungary','Iceland','Ireland','Italy','Kosovo','Latvia',
  'Liechtenstein','Lithuania','Luxembourg','Malta','Moldova','Monaco',
  'Montenegro','Netherlands','North Macedonia','Norway','Poland','Portugal',
  'Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain',
  'Sweden','Switzerland','Ukraine','United Kingdom','Vatican City',
  // Oceania
  'Australia','Fiji','Kiribati','Marshall Islands','Micronesia','Nauru',
  'New Zealand','Palau','Papua New Guinea','Samoa','Solomon Islands',
  'Tonga','Tuvalu','Vanuatu',
].sort()

const RESTRICTED_NATIONALITIES = new Set([
  'Afghanistan','Iran','Iraq','Syria','Yemen','Lebanon','Palestine',
  'Pakistan','Bangladesh','Nepal','North Korea','China',
  'Nigeria','Somalia','Sudan','Libya','Algeria','Egypt',
  'Cameroon','Central African Republic','Congo','DR Congo',
  'Equatorial Guinea','Ghana','Guinea','Liberia','Mali',
  'São Tomé and Príncipe','Sierra Leone',
])

function NationalityCombobox({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const [query, setQuery] = React.useState(value)
  const [open, setOpen] = React.useState(false)
  const filtered = query.length > 0
    ? COUNTRIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES
  return (
    <div style={{position:'relative'}}>
      <input
        type="text"
        className="form-input"
        value={query}
        placeholder={placeholder}
        onChange={e => { setQuery(e.target.value); onChange(''); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 160)}
        autoComplete="off"
      />
      {open && (
        <ul style={{position:'absolute',top:'100%',left:0,right:0,zIndex:100,background:'#fff',border:'1px solid #ddd8cc',borderRadius:8,maxHeight:220,overflowY:'auto',margin:'4px 0 0',padding:0,listStyle:'none',boxShadow:'0 4px 16px rgba(0,0,0,.1)'}}>
          {filtered.length > 0 ? filtered.map(c => (
            <li
              key={c}
              onMouseDown={() => { onChange(c); setQuery(c); setOpen(false) }}
              style={{padding:'10px 14px',cursor:'pointer',fontSize:'.88rem',color:'#333',borderBottom:'1px solid #f0ede4'}}
              onMouseEnter={e=>(e.currentTarget.style.background='#f5f0e6')}
              onMouseLeave={e=>(e.currentTarget.style.background='#fff')}
            >{c}</li>
          )) : (
            <li style={{padding:'10px 14px',fontSize:'.85rem',color:'#999'}}>No results</li>
          )}
        </ul>
      )}
    </div>
  )
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = document.cookie.match(new RegExp('(?:^|; )' + escaped + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : undefined
}

function planCtaName(name: string): string {
  switch (name.toLowerCase()) {
    case 'silver': return 'plan_silver'
    case 'gold': return 'plan_gold'
    case 'platinum': return 'plan_platinum'
    default: return 'plan_unknown'
  }
}

function normalizePlan(plan: string): 'silver' | 'gold' | 'platinum' | 'undecided' {
  const lower = plan.toLowerCase()
  if (lower.includes('silver')) return 'silver'
  if (lower.includes('gold')) return 'gold'
  if (lower.includes('platinum')) return 'platinum'
  return 'undecided'
}

function InquiryForm({ plans, cta, f, locale, onSubmitDone }: { plans: any[]; cta: string; f: any; locale: string; onSubmitDone: (receiptNumber: string) => void }) {
  const [loading, setLoading] = React.useState(false)
  const [sendError, setSendError] = React.useState(false)
  const formStarted = React.useRef(false)
  const handleFormStart = () => {
    if (formStarted.current) return
    formStarted.current = true
    pushGolfDtvFormStart(locale)
  }
  const [plan, setPlan] = React.useState('')
  const [agencyService, setAgencyService] = React.useState(false)
  const [fiveYearPlan, setFiveYearPlan] = React.useState(false)
  const [annualRenewal, setAnnualRenewal] = React.useState(false)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [nationality, setNationality] = React.useState('')
  const [referral, setReferral] = React.useState('')
  const [dependentVisa, setDependentVisa] = React.useState('')
  const [sources, setSources] = React.useState<string[]>([])
  const [message, setMessage] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSendError(false)
    try {
      const eventId = crypto.randomUUID()
      const fbp = getCookie('_fbp')
      const fbc = getCookie('_fbc')
      const eventSourceUrl = window.location.href

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, nationality, plan, agencyService, fiveYearPlan, annualRenewal,
          dependentVisa, sources, referral, message,
          eventId, fbp, fbc, eventSourceUrl,
        }),
      })
      if (!res.ok) throw new Error('api')
      const data = await res.json()
      onSubmitDone(data.receiptNumber || '')
      pushGolfDtvLead(locale, normalizePlan(plan), agencyService, fiveYearPlan, annualRenewal, eventId)
    } catch (err) {
      setSendError(true)
      let errorType: 'api' | 'network' | 'unknown' = 'unknown'
      if (err instanceof TypeError) {
        errorType = 'network'
      } else if (err instanceof Error && err.message === 'api') {
        errorType = 'api'
      }
      pushGolfDtvFormError(locale, errorType)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} onFocus={handleFormStart}>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.planLabel}</label>
        <select className="form-input" style={{cursor:'pointer'}} value={plan} onChange={e=>setPlan(e.target.value)}>
          <option value="">{f.planPlaceholder}</option>
          {plans.map((p: any,i: number)=>(
            <option key={i} value={`${p.name} — ${p.price.toLocaleString()} ${p.currency} / ${p.period}`}>
              {p.name} — {p.price.toLocaleString()} {p.currency} / {p.period} +VAT 7%
            </option>
          ))}
          <option value={f.planUndecided}>{f.planUndecided}</option>
        </select>
      </div>
      {/* Agency service checkbox */}
      <div style={{background:'#f0ede4',borderRadius:10,padding:'12px 14px',border:'1px solid #ddd8cc',marginBottom:8}}>
        <label style={{display:'flex',gap:10,alignItems:'flex-start',cursor:'pointer'}}>
          <input type="checkbox" checked={agencyService} onChange={e=>setAgencyService(e.target.checked)} style={{accentColor:'#0d4f3c',marginTop:3,width:16,height:16,flexShrink:0}}/>
          <div>
            <span style={{fontWeight:700,fontSize:'.88rem',color:'#0a2e1f'}}>{f.agencyLabel}</span>
            <ul style={{margin:'4px 0 0',padding:'0 0 0 14px',fontSize:'.76rem',color:'#666',lineHeight:1.7}}>
              {f.agencyBullets.map((b: string, i: number)=><li key={i}>{b}</li>)}
            </ul>
          </div>
        </label>
      </div>
      {/* 継続オプション */}
      <div style={{marginBottom:20,background:'#f0ede4',borderRadius:10,padding:'12px 14px',border:'1px solid #ddd8cc'}}>
        <p style={{margin:'0 0 8px',fontWeight:700,fontSize:'.88rem',color:'#0a2e1f'}}>
          {locale === 'ja' ? 'スクール継続オプション' : 'School Continuation Options'}
        </p>
        <div style={{display:'flex',flexDirection:'column' as const,gap:8}}>
          <label style={{display:'flex',gap:10,alignItems:'flex-start',cursor:'pointer'}}>
            <input type="checkbox" checked={fiveYearPlan} onChange={e=>setFiveYearPlan(e.target.checked)} style={{accentColor:'#0d4f3c',marginTop:2,width:15,height:15,flexShrink:0}}/>
            <div>
              <span style={{fontWeight:600,fontSize:'.85rem',color:'#0a2e1f'}}>
                {locale === 'ja' ? '5年まとめてプラン' : '5-Year Bundle Plan'}
              </span>
              <span style={{fontSize:'.76rem',color:'#666',marginLeft:6}}>
                {locale === 'ja' ? '2〜5年目20%OFF・一括払い' : '20% off years 2–5 · Upfront payment'}
              </span>
            </div>
          </label>
          <label style={{display:'flex',gap:10,alignItems:'flex-start',cursor:'pointer'}}>
            <input type="checkbox" checked={annualRenewal} onChange={e=>setAnnualRenewal(e.target.checked)} style={{accentColor:'#0d4f3c',marginTop:2,width:15,height:15,flexShrink:0}}/>
            <div>
              <span style={{fontWeight:600,fontSize:'.85rem',color:'#0a2e1f'}}>
                {locale === 'ja' ? '年次更新プラン' : 'Annual Renewal Plan'}
              </span>
              <span style={{fontSize:'.76rem',color:'#666',marginLeft:6}}>
                {locale === 'ja' ? '更新時10%OFF' : '10% off at each renewal'}
              </span>
            </div>
          </label>
        </div>
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.nameLabel}<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>{f.required}</span></label>
        <input type="text" className="form-input" required value={name} onChange={e=>setName(e.target.value)}/>
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.nationalityLabel}<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>{f.required}</span></label>
        <NationalityCombobox value={nationality} onChange={setNationality} placeholder={f.nationalityPlaceholder}/>
        {RESTRICTED_NATIONALITIES.has(nationality) && f.restrictedWarning && (
          <div style={{marginTop:10,padding:'12px 14px',background:'#fff5f5',border:'1.5px solid #e05a5a',borderRadius:10,fontSize:'.8rem',color:'#c0392b',lineHeight:1.85}}>
            <p style={{fontWeight:700,margin:'0 0 6px',display:'flex',alignItems:'center',gap:6}}>
              <span>⚠️</span> {f.restrictedWarning.title}
            </p>
            <ul style={{margin:0,padding:'0 0 0 16px'}}>
              {f.restrictedWarning.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
            </ul>
            <p style={{margin:'8px 0 0',fontWeight:700}}>{f.restrictedWarning.footer}</p>
          </div>
        )}
      </div>
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.emailLabel}<span style={{color:'#e05a5a',fontSize:'.7rem',marginLeft:4}}>{f.required}</span></label>
        <input type="email" className="form-input" placeholder="your@email.com" required value={email} onChange={e=>setEmail(e.target.value)}/>
      </div>
      {/* 扶養ビザ（jaのみ） */}
      {f.dependentVisaLabel && (
        <div style={{marginBottom:20}}>
          <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:6}}>
            <label className="form-label" style={{margin:0}}>{f.dependentVisaLabel}</label>
            <span style={{color:'#e05a5a',fontSize:'.7rem'}}>{f.required}</span>
          </div>
          <div style={{display:'flex',gap:20,marginBottom:4}}>
            <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:'.88rem',color:'#333'}}>
              <input type="radio" name="dependentVisa" value="consult" required checked={dependentVisa==='consult'} onChange={()=>setDependentVisa('consult')} style={{accentColor:'#0d4f3c'}}/>
              {f.dependentVisaConsult}
            </label>
            <label style={{display:'flex',alignItems:'center',gap:6,cursor:'pointer',fontSize:'.88rem',color:'#333'}}>
              <input type="radio" name="dependentVisa" value="no" required checked={dependentVisa==='no'} onChange={()=>setDependentVisa('no')} style={{accentColor:'#0d4f3c'}}/>
              {f.dependentVisaNo}
            </label>
          </div>
          <p style={{margin:0,fontSize:'.75rem',color:'#888'}}>
            ※ <a href="#faq-cat-F" style={{color:'#0d4f3c',textDecoration:'underline'}}>{f.dependentVisaNote}</a>
          </p>
        </div>
      )}
      {/* 流入経路アンケート */}
      {f.sourceOptions && (
        <div style={{marginBottom:20}}>
          <label className="form-label">
            {f.sourceLabel}
            <span style={{fontSize:'.75rem',color:'#999',marginLeft:6,fontWeight:400}}>{f.sourceNote}</span>
          </label>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'8px 16px',marginTop:8}}>
            {f.sourceOptions.map((opt: string) => (
              <label key={opt} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',fontSize:'.85rem',color:'#333'}}>
                <input
                  type="checkbox"
                  checked={sources.includes(opt)}
                  onChange={e => setSources(prev => e.target.checked ? [...prev, opt] : prev.filter(s => s !== opt))}
                  style={{accentColor:'#0d4f3c',width:15,height:15,flexShrink:0}}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      )}
      <div style={{marginBottom:20}}>
        <label className="form-label">{f.referralLabel}<span style={{fontSize:'.75rem',color:'#999',marginLeft:6,fontWeight:400}}>{f.referralNote}</span></label>
        <input type="text" className="form-input" placeholder={f.referralPlaceholder} value={referral} onChange={e=>setReferral(e.target.value)}/>
      </div>
      <div style={{marginBottom:28}}>
        <label className="form-label">{f.messageLabel}</label>
        <textarea className="form-input" rows={4} placeholder={f.messagePlaceholder} style={{resize:'vertical'}} value={message} onChange={e=>setMessage(e.target.value)}/>
      </div>
      <div style={{marginBottom:12,fontSize:'.8rem',color:'#888'}}>
        <label style={{display:'flex',gap:8,alignItems:'flex-start',cursor:'pointer'}}>
          <input type="checkbox" required style={{accentColor:'#0d4f3c',marginTop:2}}/>
          <span>{f.privacyConsent}</span>
        </label>
      </div>
      {f.refundPolicyConsent && (
        <div style={{marginBottom:20,fontSize:'.8rem',color:'#888'}}>
          <label style={{display:'flex',gap:8,alignItems:'flex-start',cursor:'pointer'}}>
            <input type="checkbox" required style={{accentColor:'#0d4f3c',marginTop:2}}/>
            <span>{f.refundPolicyConsent}</span>
          </label>
        </div>
      )}
      {sendError && (
        <div style={{marginBottom:16,padding:'12px 16px',background:'#fef2f2',border:'1px solid #fca5a5',borderRadius:8,fontSize:'.85rem',color:'#b91c1c'}}>
          送信に失敗しました。時間をおいて再度お試しください。
        </div>
      )}
      <button type="submit" disabled={loading} className="btn-gold" style={{width:'100%',justifyContent:'center',fontSize:'1rem',padding:16,opacity:loading?0.7:1}}>
        {loading ? '送信中...' : cta}
      </button>
    </form>
  )
}
