import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const { name, email, nationality, category, message } = await req.json()

    // 必須項目チェック
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const categoryLabel = category || 'その他'
    const sentAt = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

    const html = `
<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;border-radius:12px;overflow:hidden;border:1px solid #dde3ec;">

  <!-- Header -->
  <div style="background:#0A7A6A;padding:24px 28px;">
    <p style="margin:0;color:rgba(255,255,255,0.65);font-size:11px;letter-spacing:.12em;text-transform:uppercase;">DTV Club — お問い合わせ</p>
    <h1 style="margin:6px 0 0;color:#fff;font-size:18px;font-weight:700;">新規お問い合わせが届きました</h1>
  </div>

  <!-- Body -->
  <div style="background:#f8fafb;padding:28px;">
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 0;font-weight:700;color:#1a2435;width:140px;">お名前</td>
        <td style="padding:12px 0;color:#333;">${name}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 0;font-weight:700;color:#1a2435;">メールアドレス</td>
        <td style="padding:12px 0;"><a href="mailto:${email}" style="color:#0A7A6A;">${email}</a></td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 0;font-weight:700;color:#1a2435;">国籍</td>
        <td style="padding:12px 0;color:#333;">${nationality || '—'}</td>
      </tr>
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px 0;font-weight:700;color:#1a2435;">お問い合わせ種別</td>
        <td style="padding:12px 0;">
          <span style="background:#e6f4f2;color:#0A7A6A;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;">${categoryLabel}</span>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 0;font-weight:700;color:#1a2435;vertical-align:top;">お問い合わせ内容</td>
        <td style="padding:12px 0;color:#333;white-space:pre-wrap;line-height:1.75;">${message}</td>
      </tr>
    </table>
  </div>

  <!-- Footer -->
  <div style="background:#edf1f5;padding:14px 28px;font-size:12px;color:#7e8ea4;display:flex;justify-content:space-between;">
    <span>送信日時: ${sentAt} (JST)</span>
    <span>DTV Club — dtvclub.com</span>
  </div>
</div>`

    await transporter.sendMail({
      from: `"DTV Club" <${process.env.GMAIL_USER}>`,
      to: process.env.CONTACT_TO ?? process.env.GMAIL_USER,
      bcc: 'saotome14z@gmail.com, hobbychameleonclub@gmail.com',
      replyTo: email,
      subject: `【DTV Club】${name}様よりお問い合わせ（${categoryLabel}）`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('General contact API error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
