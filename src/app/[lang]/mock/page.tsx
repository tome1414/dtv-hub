'use client'
import { useState, useEffect } from 'react'

type Style = 'A' | 'B' | 'C'
type Page = 'top' | 'article'

const T = {
  bg: '#F8F7F3', bgSub: '#EDEAE3', card: '#FFFFFF',
  text: '#172019', sub: '#5C665E', muted: '#9EA89E',
  border: '#DDD9CE', green: '#0F6A43', gold: '#C9A24A',
  ctaBg: '#0F6A43', ctaText: '#FFFFFF',
}
type Tok = typeof T

const ARTICLES = [
  { cat: '比較', date: '2026-04-27', title: 'タイ長期滞在ビザ比較｜DTV・LTR・タイランドプリビレッジ・リタイアメントの違い' },
  { cat: '申請実務', date: '2026-04-26', title: 'DTVビザの申請方法と必要書類まとめ' },
  { cat: 'ガイド', date: '2026-04-25', title: 'DTVビザとは？2024年最新の概要と取得条件' },
  { cat: 'Golf DTV', date: '2026-04-24', title: 'ゴルフでビザを取る｜ソフトパワールート完全解説' },
  { cat: 'タイ生活', date: '2026-04-23', title: 'バンコクでの生活費と住居事情｜2026年版' },
]
const TABLE_ROWS = [
  ['DTV', '5年', 'なし', '約4万円'],
  ['LTR', '10年', 'なし', '約8万円'],
  ['タイランドプリビレッジ', '5〜20年', 'なし', '約60万円〜'],
  ['リタイアメント', '1年更新', '50歳以上', '約8千円〜'],
]
const TOC = ['タイ長期滞在ビザとは？', '各ビザの費用・条件比較', '向いている人タイプ別', 'よくある質問']

function CompareTable({ tok, bordered }: { tok: Tok; bordered?: boolean }) {
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0 28px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={bordered ? { background: tok.bgSub } : {}}>
            {['ビザ', '有効期間', '年齢制限', '費用目安'].map(h => (
              <th key={h} style={{ textAlign: 'left', padding: bordered ? '10px 14px' : '8px 0', fontWeight: 700, color: tok.text, borderBottom: `${bordered ? 0 : 2}px solid ${tok.border}`, fontSize: 12, letterSpacing: '0.03em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map((row, i) => (
            <tr key={i} style={{ background: bordered && i % 2 === 1 ? tok.bgSub : 'transparent', borderBottom: `1px solid ${tok.border}` }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: bordered ? '9px 14px' : '9px 0', color: j === 0 ? tok.text : tok.sub, fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── SHARED HEADER ───────────────────────────────────────────────────
function SiteHeader({ tok }: { tok: Tok }) {
  return (
    <header data-mock style={{ background: tok.bg }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
        {/* Top info strip */}
        <div className="mock-header-strip" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '6px 0', borderBottom: `1px solid ${tok.border}`,
          fontSize: 11, color: tok.muted, letterSpacing: '0.07em',
        }}>
          <span>タイ長期滞在ビザの情報メディア</span>
          <button style={{
            background: tok.ctaBg, color: tok.ctaText,
            border: 'none', padding: '5px 14px',
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            borderRadius: 2, letterSpacing: '0.04em',
          }}>無料相談</button>
        </div>
        {/* Logo + nav row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54, borderBottom: `1px solid ${tok.border}` }}>
          <span style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontWeight: 700, fontSize: 22,
            letterSpacing: '-0.02em', color: tok.text,
          }}>DTV Club</span>
          <nav className="mock-header-nav" style={{ display: 'flex', gap: 32 }}>
            {['ガイド', '必要書類', 'タイ生活', 'Golf DTV'].map(n => (
              <a key={n} href="#" style={{
                fontSize: 13, color: tok.sub, textDecoration: 'none',
                fontWeight: 500, letterSpacing: '0.01em',
              }}>{n}</a>
            ))}
          </nav>
          {/* Mobile CTA (visible only on small screens) */}
          <button className="mock-header-mobile-cta" style={{
            display: 'none',
            background: tok.ctaBg, color: tok.ctaText,
            border: 'none', padding: '7px 14px',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', borderRadius: 2,
          }}>相談</button>
        </div>
      </div>
    </header>
  )
}

// ─── A EDITORIAL ─────────────────────────────────────────────────────

function A_Top({ tok }: { tok: Tok }) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ padding: '44px 0 36px', borderBottom: `1px solid ${tok.border}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: tok.green, marginBottom: 18 }}>Featured</p>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 36, fontWeight: 700, lineHeight: 1.2, color: tok.text, margin: '0 0 18px', letterSpacing: '-0.01em' }}>
            タイへ、長く自由に住む。<br />
            <span style={{ color: tok.green }}>正確な情報</span>が、最初の一歩を助ける。
          </h1>
          <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.75, margin: '0 0 28px' }}>DTVビザの比較・申請・生活情報を中立的に解説。あなたに合ったビザと取得ルートを一緒に整理します。</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '11px 22px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 2 }}>ビザを比較する</button>
            <button style={{ background: 'transparent', color: tok.text, border: `1px solid ${tok.border}`, padding: '11px 22px', fontSize: 14, fontWeight: 500, cursor: 'pointer', borderRadius: 2 }}>必要書類を確認する</button>
          </div>
        </div>
        <div style={{ borderLeft: `1px solid ${tok.border}`, paddingLeft: 48 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: tok.muted, textTransform: 'uppercase', marginBottom: 10 }}>最新記事</p>
          <p style={{ fontSize: 11, color: tok.muted, marginBottom: 6 }}>{ARTICLES[0].cat} · {ARTICLES[0].date}</p>
          <h2 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, fontWeight: 700, lineHeight: 1.35, color: tok.text, margin: 0 }}>{ARTICLES[0].title}</h2>
        </div>
      </div>

      <div style={{ padding: '32px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 22 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: tok.muted, margin: 0 }}>最新記事</p>
          <a href="#" style={{ fontSize: 12, color: tok.green, textDecoration: 'none' }}>すべて見る →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 36px' }}>
          {ARTICLES.slice(1, 4).map((a, i) => (
            <div key={i} style={{ paddingBottom: 24, borderBottom: `1px solid ${tok.border}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: tok.green, textTransform: 'uppercase', margin: '0 0 7px' }}>{a.cat}</p>
              <h3 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 16, fontWeight: 700, lineHeight: 1.45, color: tok.text, margin: '0 0 8px' }}>{a.title}</h3>
              <p style={{ fontSize: 11, color: tok.muted, margin: 0 }}>{a.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${tok.border}`, borderBottom: `1px solid ${tok.border}`, padding: '22px 0', margin: '0 0 48px' }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', color: tok.muted, textTransform: 'uppercase', margin: '0 0 4px' }}>Golf DTV</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: tok.text, margin: 0 }}>タイでゴルフを続けながら、長期滞在する。</p>
        </div>
        <button style={{ background: 'transparent', color: tok.green, border: `1px solid ${tok.green}`, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer', borderRadius: 2, whiteSpace: 'nowrap' }}>詳細を見る</button>
      </div>
    </main>
  )
}

function A_Article({ tok }: { tok: Tok }) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
      <div className="mock-article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 264px', gap: 60, paddingTop: 44 }}>
        <article>
          <p style={{ fontSize: 11, color: tok.muted, margin: '0 0 20px' }}>ホーム › ブログ › 比較記事</p>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tok.green, margin: '0 0 12px' }}>比較記事</p>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 34, fontWeight: 700, lineHeight: 1.25, color: tok.text, margin: '0 0 16px', letterSpacing: '-0.01em' }}>
            タイ長期滞在ビザ比較｜DTV・LTR・タイランドプリビレッジ・リタイアメントの違い
          </h1>
          <p style={{ fontSize: 12, color: tok.muted, margin: '0 0 32px', borderBottom: `1px solid ${tok.border}`, paddingBottom: 16 }}>
            DTV Club編集部 · 2026年4月27日 · 更新2026年4月27日 · 8分で読める
          </p>
          <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 17, color: tok.sub, lineHeight: 1.85, margin: '0 0 24px' }}>
            タイで長期滞在を検討するとき、どのビザを選べばいいか分からない、という人は少なくありません。現在、タイには複数の長期滞在ビザが存在し、それぞれ対象者・費用・条件が大きく異なります。
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: tok.text, margin: '36px 0 12px', borderBottom: `1px solid ${tok.border}`, paddingBottom: 8 }}>タイ長期滞在ビザとは？まず全体像を整理する</h2>
          <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.85, margin: '0 0 12px' }}>タイには観光ビザ（30日〜）から始まり、長期滞在を目的とした複数のビザカテゴリが存在します。</p>
          <CompareTable tok={tok} />
          <h2 style={{ fontSize: 20, fontWeight: 700, color: tok.text, margin: '36px 0 12px', borderBottom: `1px solid ${tok.border}`, paddingBottom: 8 }}>よくある質問</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: tok.text, margin: '0 0 5px' }}>Q. DTVは年齢制限がありますか？</p>
            <p style={{ fontSize: 14, color: tok.sub, lineHeight: 1.75, margin: 0 }}>A. ありません。20代から60代以上まで、すべての年齢が対象です。</p>
          </div>
        </article>
        <aside className="mock-article-aside">
          <div style={{ position: 'sticky', top: 60 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tok.muted, margin: '0 0 14px' }}>目次</p>
            <nav style={{ borderLeft: `2px solid ${tok.border}`, paddingLeft: 16, marginBottom: 32 }}>
              {TOC.map((t, i) => (
                <a key={i} href="#" style={{ display: 'block', fontSize: 13, color: tok.sub, textDecoration: 'none', padding: '4px 0', lineHeight: 1.45 }}>{t}</a>
              ))}
            </nav>
            <div style={{ borderTop: `1px solid ${tok.border}`, paddingTop: 24 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: tok.text, margin: '0 0 8px' }}>相談・確認</p>
              <p style={{ fontSize: 12, color: tok.sub, lineHeight: 1.65, margin: '0 0 16px' }}>DTVの取得ルートについて専門家に相談できます。</p>
              <button style={{ display: 'block', width: '100%', background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '10px', fontSize: 13, fontWeight: 700, cursor: 'pointer', borderRadius: 2, marginBottom: 8 }}>DTV完全ガイドを読む</button>
              <button style={{ display: 'block', width: '100%', background: 'transparent', color: tok.text, border: `1px solid ${tok.border}`, padding: '10px', fontSize: 13, cursor: 'pointer', borderRadius: 2 }}>適性確認</button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

// ─── B MINIMAL ───────────────────────────────────────────────────────

function B_Top({ tok }: { tok: Tok }) {
  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '88px 2rem 80px' }}>
      <h1 style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.04em', color: tok.text, lineHeight: 1.08, margin: '0 0 24px' }}>
        タイへ、<br />長く自由に住む。
      </h1>
      <p style={{ fontSize: 16, color: tok.sub, lineHeight: 1.8, maxWidth: 460, margin: '0 0 40px' }}>
        DTVビザの比較・申請・生活情報を中立的に解説します。
      </p>
      <button style={{ background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '13px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 3 }}>ビザを比較する</button>

      <div style={{ borderTop: `1px solid ${tok.border}`, margin: '72px 0 44px' }} />

      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: tok.muted, margin: '0 0 24px' }}>最新記事</p>
      <div>
        {ARTICLES.map((a, i) => (
          <a key={i} href="#" style={{ display: 'flex', alignItems: 'baseline', gap: 20, padding: '15px 0', borderBottom: `1px solid ${tok.border}`, textDecoration: 'none' }}>
            <span style={{ fontSize: 12, color: tok.muted, whiteSpace: 'nowrap', minWidth: 90 }}>{a.date}</span>
            <span style={{ fontSize: 12, color: tok.green, minWidth: 64, fontWeight: 600 }}>{a.cat}</span>
            <span style={{ fontSize: 15, color: tok.text, lineHeight: 1.45 }}>{a.title}</span>
          </a>
        ))}
      </div>
    </main>
  )
}

function B_Article({ tok }: { tok: Tok }) {
  return (
    <main style={{ maxWidth: 680, margin: '0 auto', padding: '72px 2rem 80px' }}>
      <p style={{ fontSize: 11, color: tok.muted, margin: '0 0 28px' }}>ホーム · ブログ · 比較記事</p>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tok.green, margin: '0 0 16px' }}>比較記事</p>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.2, color: tok.text, margin: '0 0 18px' }}>
        タイ長期滞在ビザ比較｜DTV・LTR・タイランドプリビレッジ・リタイアメントの違い
      </h1>
      <p style={{ fontSize: 12, color: tok.muted, margin: '0 0 52px', paddingBottom: 24, borderBottom: `1px solid ${tok.border}` }}>
        DTV Club編集部 · 2026年4月27日 · 8分
      </p>

      <div style={{ margin: '0 0 52px' }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: tok.muted, margin: '0 0 14px' }}>目次</p>
        {TOC.map((t, i) => (
          <a key={i} href="#" style={{ display: 'block', fontSize: 13, color: tok.sub, textDecoration: 'none', padding: '4px 0' }}>{i + 1}. {t}</a>
        ))}
      </div>

      <p style={{ fontSize: 16, color: tok.sub, lineHeight: 1.9, margin: '0 0 20px' }}>
        タイで長期滞在を検討するとき、どのビザを選べばいいか分からない、という人は少なくありません。現在、タイには複数の長期滞在ビザが存在し、それぞれ対象者・費用・条件が大きく異なります。
      </p>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: tok.text, margin: '44px 0 14px' }}>タイ長期滞在ビザとは？まず全体像を整理する</h2>
      <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.9, margin: '0 0 12px' }}>タイには観光ビザ（30日〜）から始まり、長期滞在を目的とした複数のビザカテゴリが存在します。</p>
      <CompareTable tok={tok} />

      <div style={{ borderTop: `1px solid ${tok.border}`, marginTop: 52, paddingTop: 36 }}>
        <button style={{ background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 3, marginRight: 12 }}>DTV完全ガイドを読む</button>
        <button style={{ background: 'transparent', color: tok.sub, border: `1px solid ${tok.border}`, padding: '12px 24px', fontSize: 14, cursor: 'pointer', borderRadius: 3 }}>適性確認</button>
      </div>
    </main>
  )
}

// ─── C MAGAZINE ──────────────────────────────────────────────────────

function C_Top({ tok }: { tok: Tok }) {
  const bottom4 = [
    { cat: 'タイ生活', title: 'バンコクの生活費と住居事情2026' },
    { cat: 'ガイド', title: 'DTVビザとは？最新の概要と取得条件' },
    { cat: 'フリーランス', title: 'フリーランサーのDTV活用術' },
    { cat: '地域', title: 'チェンマイ vs バンコク｜長期滞在に向いている都市' },
  ]
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 0, borderBottom: `1px solid ${tok.border}`, paddingTop: 36 }}>
        <div style={{ paddingRight: 44, paddingBottom: 44 }}>
          <div style={{ display: 'inline-block', background: tok.green, padding: '3px 10px', marginBottom: 20 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.14em', textTransform: 'uppercase' }}>特集</span>
          </div>
          <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 46, fontWeight: 700, lineHeight: 1.14, color: tok.text, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
            タイへ、長く自由に住む。<br />
            <span style={{ color: tok.green }}>正確な情報</span>が、<br />最初の一歩を助ける。
          </h1>
          <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.72, margin: '0 0 28px', maxWidth: 440 }}>DTVビザの比較・申請・生活情報を中立的に解説。</p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '12px 24px', fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>ビザを比較する</button>
            <button style={{ background: 'transparent', color: tok.text, border: `2px solid ${tok.border}`, padding: '12px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>必要書類を確認する</button>
          </div>
        </div>
        <div style={{ borderLeft: `1px solid ${tok.border}`, paddingLeft: 36, paddingBottom: 44 }}>
          {ARTICLES.slice(0, 3).map((a, i) => (
            <div key={i} style={{ paddingBottom: i < 2 ? 20 : 0, marginBottom: i < 2 ? 20 : 0, borderBottom: i < 2 ? `1px solid ${tok.border}` : 'none' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: tok.green, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{a.cat}</span>
              <p style={{ fontSize: 15, fontWeight: 700, color: tok.text, lineHeight: 1.42, margin: '6px 0 4px' }}>{a.title}</p>
              <span style={{ fontSize: 11, color: tok.muted }}>{a.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 1px', background: tok.border, margin: '0 0 48px' }}>
        {bottom4.map((a, i) => (
          <div key={i} style={{ background: tok.bg, padding: '22px 20px' }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: tok.gold, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{a.cat}</span>
            <p style={{ fontSize: 14, fontWeight: 600, color: tok.text, lineHeight: 1.45, margin: '8px 0 0' }}>{a.title}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

function C_Article({ tok }: { tok: Tok }) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem' }}>
      <div style={{ borderBottom: `4px solid ${tok.green}`, paddingTop: 32, paddingBottom: 36, marginBottom: 44 }}>
        <p style={{ fontSize: 11, color: tok.muted, margin: '0 0 18px' }}>ホーム › ブログ › 比較記事</p>
        <div className="mock-c-article-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div style={{ background: tok.green, width: 5, height: 20 }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: tok.green, textTransform: 'uppercase', letterSpacing: '0.14em' }}>比較記事</span>
            </div>
            <h1 style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 38, fontWeight: 700, lineHeight: 1.2, color: tok.text, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              タイ長期滞在ビザ比較<br />DTV・LTR・タイランドプリビレッジ・リタイアメントの違い
            </h1>
            <p style={{ fontSize: 13, color: tok.muted, margin: 0 }}>DTV Club編集部 · 2026年4月27日 · 8分で読める</p>
          </div>
          <div style={{ background: tok.bgSub, padding: 24 }}>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: tok.muted, margin: '0 0 14px' }}>この記事の内容</p>
            {TOC.map((t, i) => (
              <a key={i} href="#" style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 13, color: tok.sub, textDecoration: 'none', padding: '5px 0', borderBottom: `1px solid ${tok.border}` }}>
                <span style={{ color: tok.gold, fontWeight: 700, fontSize: 12, minWidth: 20 }}>{String(i + 1).padStart(2, '0')}</span>
                {t}
              </a>
            ))}
            <button style={{ display: 'block', width: '100%', background: tok.ctaBg, color: tok.ctaText, border: 'none', padding: '11px', fontSize: 13, fontWeight: 800, cursor: 'pointer', marginTop: 18 }}>無料相談はこちら</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720 }}>
        <p style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 19, color: tok.text, lineHeight: 1.7, fontWeight: 600, borderLeft: `4px solid ${tok.gold}`, paddingLeft: 24, margin: '0 0 32px' }}>
          タイには複数の長期滞在ビザが存在し、それぞれ対象者・費用・条件が大きく異なります。
        </p>
        <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.88, margin: '0 0 24px' }}>
          タイで長期滞在を検討するとき、どのビザを選べばいいか分からない、という人は少なくありません。
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: tok.text, margin: '44px 0 16px', paddingTop: 18, borderTop: `3px solid ${tok.green}` }}>
          タイ長期滞在ビザとは？まず全体像を整理する
        </h2>
        <p style={{ fontSize: 15, color: tok.sub, lineHeight: 1.88, margin: '0 0 12px' }}>タイには観光ビザ（30日〜）から始まり、長期滞在を目的とした複数のビザカテゴリが存在します。</p>
        <CompareTable tok={tok} bordered />
      </div>
    </main>
  )
}

// ─── ROOT ────────────────────────────────────────────────────────────
export default function MockPage() {
  const [style, setStyle] = useState<Style>('A')
  const [page, setPage] = useState<Page>('top')
  const tok = T

  useEffect(() => {
    const els: HTMLElement[] = []
    document.querySelectorAll('header:not([data-mock]), footer').forEach(el => {
      const h = el as HTMLElement
      h.style.display = 'none'; els.push(h)
    })
    return () => els.forEach(h => { h.style.display = '' })
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: tok.bg, color: tok.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', transition: 'background 0.25s, color 0.25s' }}>
      <style>{`
        /* 実サイトのヘッダー・フッター・mainラッパーを非表示 */
        body > div > header,
        header.fixed { display: none !important; }
        footer { display: none !important; }
        main { padding-top: 0 !important; margin-top: 0 !important; }

        @media (max-width: 640px) {
          .mock-article-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mock-article-aside { display: none !important; }
          .mock-c-article-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .mock-header-strip { display: none !important; }
          .mock-header-nav { display: none !important; }
          .mock-header-mobile-cta { display: block !important; }
        }
      `}</style>
      {/* Control bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, background: '#111418', borderBottom: '1px solid #2A2E35', display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', height: 44 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#666', marginRight: 4 }}>スタイル</span>
          {(['A', 'B', 'C'] as Style[]).map(s => (
            <button key={s} onClick={() => setStyle(s)} style={{ background: style === s ? '#3B82F6' : '#252830', color: style === s ? '#fff' : '#888', border: 'none', borderRadius: 4, padding: '4px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              {s === 'A' ? 'A エディトリアル' : s === 'B' ? 'B ミニマル' : 'C マガジン'}
            </button>
          ))}
        </div>
        <div style={{ width: 1, height: 18, background: '#333' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#666', marginRight: 4 }}>ページ</span>
          {([['top', 'トップ'], ['article', '記事']] as [Page, string][]).map(([p, label]) => (
            <button key={p} onClick={() => setPage(p as Page)} style={{ background: page === p ? '#3A3F48' : 'transparent', color: page === p ? '#fff' : '#888', border: 'none', borderRadius: 4, padding: '4px 14px', fontSize: 12, cursor: 'pointer' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ paddingTop: 44 }}>
        <SiteHeader tok={tok} />
        {style === 'A' && page === 'top' && <A_Top tok={tok} />}
        {style === 'A' && page === 'article' && <A_Article tok={tok} />}
        {style === 'B' && page === 'top' && <B_Top tok={tok} />}
        {style === 'B' && page === 'article' && <B_Article tok={tok} />}
        {style === 'C' && page === 'top' && <C_Top tok={tok} />}
        {style === 'C' && page === 'article' && <C_Article tok={tok} />}
      </div>
    </div>
  )
}
