import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, nationality, plan, agencyService, referral, message } = await req.json()

    // ── Gmail 送信 ──────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const html = `
<div style="font-family:'Helvetica Neue',sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #e5e0d5;">
  <div style="background:#082d21;padding:24px 28px;">
    <p style="margin:0;color:#c9a84c;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;">GolfDTV — New Inquiry</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:1.2rem;">新規お問い合わせ</h1>
  </div>
  <div style="background:#fdf8ee;padding:28px;">
    <table style="width:100%;border-collapse:collapse;font-size:.9rem;">
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;width:130px;">お名前</td>
        <td style="padding:10px 0;color:#333;">${name}</td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">メール</td>
        <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#0d4f3c;">${email}</a></td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">国籍</td>
        <td style="padding:10px 0;color:#333;">${nationality || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">希望プラン</td>
        <td style="padding:10px 0;color:#333;">${plan || '未選択'}</td>
      </tr>
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">申請代行</td>
        <td style="padding:10px 0;">
          <span style="background:${agencyService ? '#0d4f3c' : '#999'};color:#fff;padding:3px 10px;border-radius:999px;font-size:.8rem;font-weight:600;">
            ${agencyService ? '希望する (+10,000 THB)' : '希望しない'}
          </span>
        </td>
      </tr>
      ${referral ? `
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">紹介コード</td>
        <td style="padding:10px 0;color:#333;">${referral}</td>
      </tr>` : ''}
      ${message ? `
      <tr>
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;vertical-align:top;">メッセージ</td>
        <td style="padding:10px 0;color:#333;white-space:pre-wrap;line-height:1.7;">${message}</td>
      </tr>` : ''}
    </table>
  </div>
  <div style="background:#f0ede4;padding:14px 28px;font-size:.78rem;color:#999;">
    送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })} (JST)
  </div>
</div>`

    await transporter.sendMail({
      from: `"GolfDTV" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_TO ?? process.env.GMAIL_USER,
      bcc: 'saotome14z@gmail.com',
      replyTo: email,
      subject: `【GolfDTV】${name}様よりお問い合わせ — ${plan || 'プラン未選択'}`,
      html,
    })

    // ── Google Sheets 記録（任意）────────────────────────────────
    // GOOGLE_SHEETS_WEBHOOK_URL が設定されている場合のみ実行
    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            nationality: nationality || '',
            plan: plan || '',
            agencyService: agencyService ? '希望' : '不要',
            referral: referral || '',
            message: message || '',
          }),
        })
      } catch (sheetErr) {
        // Sheets への書き込みに失敗してもメール送信は成功扱い
        console.error('Sheets webhook error:', sheetErr)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
