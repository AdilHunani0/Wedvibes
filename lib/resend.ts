import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key')
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@wedvibe.in'

export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  templateName: string,
  tier: string
) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Your WedVibe card is being created! 🌸',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf8f4; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #a0522d; font-size: 28px; margin: 0;">WedVibe</h1>
          <p style="color: #6b3d2a; font-size: 14px; margin: 4px 0 0;">Your love story, beautifully told</p>
        </div>
        <h2 style="color: #2a1810; font-size: 22px;">Hello ${name}! 🌸</h2>
        <p style="color: #6b3d2a; font-size: 16px; line-height: 1.6;">
          We've received your order for the <strong>${templateName}</strong> (${tier}) invitation card. 
          Your beautiful card is being crafted and will be ready in moments.
        </p>
        <div style="background: #fff; border: 1px solid #e8c97e; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="color: #a0522d; font-weight: bold; margin: 0 0 8px;">What happens next?</p>
          <ol style="color: #6b3d2a; margin: 0; padding-left: 20px; line-height: 1.8;">
            <li>Your card is automatically generated (usually within seconds)</li>
            <li>You'll receive another email with your unique card link</li>
            <li>Share it on WhatsApp with your guests!</li>
          </ol>
        </div>
        <p style="color: #a07060; font-size: 14px; text-align: center;">
          Need help? Chat with us on WhatsApp — we respond within minutes.
        </p>
      </div>
    `,
  })
}

export async function sendCardDeliveredEmail(
  to: string,
  name: string,
  cardUrl: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const cardLink = `${appUrl}/card/${cardUrl}`
  const waLink = `https://wa.me/?text=${encodeURIComponent(`You're invited! View our beautiful card: ${cardLink}`)}`

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Your card is ready! Share it now 💌',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf8f4; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #a0522d; font-size: 28px; margin: 0;">WedVibe</h1>
          <p style="color: #6b3d2a; font-size: 14px; margin: 4px 0 0;">Your love story, beautifully told</p>
        </div>
        <h2 style="color: #2a1810; font-size: 22px;">Your card is ready, ${name}! 🎉</h2>
        <p style="color: #6b3d2a; font-size: 16px; line-height: 1.6;">
          Your beautiful animated invitation is ready to share with your guests.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${cardLink}" style="background: #a0522d; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; display: inline-block;">
            View Your Card ✨
          </a>
        </div>
        <div style="text-align: center; margin: 16px 0;">
          <a href="${waLink}" style="background: #25d366; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 15px; display: inline-block;">
            Share on WhatsApp 💬
          </a>
        </div>
        <p style="color: #a07060; font-size: 13px; text-align: center; margin-top: 32px;">
          Card link: <a href="${cardLink}" style="color: #a0522d;">${cardLink}</a>
        </p>
      </div>
    `,
  })
}

export async function sendWelcomeEmail(to: string, name: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: 'Welcome to WedVibe! Here\'s ₹50 off your first card 🌹',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #fdf8f4; padding: 40px; border-radius: 12px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #a0522d; font-size: 28px; margin: 0;">WedVibe</h1>
          <p style="color: #6b3d2a; font-size: 14px; margin: 4px 0 0;">Your love story, beautifully told</p>
        </div>
        <h2 style="color: #2a1810; font-size: 22px;">Welcome, ${name}! 🌹</h2>
        <p style="color: #6b3d2a; font-size: 16px; line-height: 1.6;">
          We're thrilled to have you join the WedVibe family. India's most beautiful animated digital invitations are just a few clicks away.
        </p>
        <div style="background: linear-gradient(135deg, #a0522d, #c9a96e); border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: white; font-size: 14px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px;">Welcome Gift</p>
          <p style="color: white; font-size: 36px; font-weight: bold; margin: 0;">₹50 OFF</p>
          <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 8px 0 0;">On your first card order</p>
        </div>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${appUrl}/templates" style="background: #a0522d; color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px;">
            Browse Templates →
          </a>
        </div>
      </div>
    `,
  })
}
