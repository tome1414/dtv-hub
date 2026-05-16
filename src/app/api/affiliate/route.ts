import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, platform, message } = await req.json()

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
    <p style="margin:0;color:#c9a84c;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;">GolfDTV — Partner Inquiry</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:1.2rem;">パートナープログラム お問い合わせ</h1>
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
      ${platform ? `
      <tr style="border-bottom:1px solid #e8e0d0;">
        <td style="padding:10px 0;font-weight:700;color:#0a2e1f;">紹介媒体</td>
        <td style="padding:10px 0;color:#333;">${platform}</td>
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
      to: process.env.GOLF_DTV_TO ?? process.env.GMAIL_TO ?? process.env.GMAIL_USER,
      bcc: 'saotome14z@gmail.com, hobbychameleonclub@gmail.com',
      replyTo: email,
      subject: `【GolfDTV】パートナープログラム お問い合わせ — ${name}様`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Affiliate API error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
