import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ContactPayload {
  name: string;
  email: string;
  mobile: string;
  description: string;
}

// ── App Router handler ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();
    const { name, email, mobile, description } = body;

    // Basic validation
    if (!name || !email || !mobile || !description) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // ── Nodemailer transporter ─────────────────────────────────────────────
    // Uses Gmail with an App Password.
    // Steps to get an App Password:
    //   1. Enable 2-Step Verification on the Gmail account.
    //   2. Go to myaccount.google.com → Security → App passwords.
    //   3. Generate a password for "Mail" / "Other" and paste it below (or in .env).
    //
    // .env.local:
    //   GMAIL_USER=Dushanprabashanarr@gmail.com
    //   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
    // ──────────────────────────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // App Password, NOT your Gmail password
      },
    });

    // ── Email to LILVIN999's team ───────────────────────────────────────────
    const mailToArtist = {
      from: `"LILVIN999 Website" <${process.env.GMAIL_USER}>`,
      to: "lilvin999@gmail.com",
      replyTo: email,
      subject: `[New Inquiry] ${name} — Booking / Press Contact`,
      text: `New inquiry from ${name}\nEmail: ${email}\nMobile: ${mobile}\n\n${description}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body  { margin: 0; padding: 0; background: #080F14; font-family: 'Helvetica Neue', Arial, sans-serif; }
              .wrap { max-width: 560px; margin: 40px auto; background: #0A1520; border: 1px solid rgba(57,255,20,0.12); }
              .hdr  { background: #080F14; padding: 32px 36px 24px; border-bottom: 1px solid rgba(57,255,20,0.12); }
              .ttl  { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #00A3FF; margin-bottom: 6px; }
              .name { font-size: 28px; font-weight: 900; text-transform: uppercase; color: #fff; letter-spacing: 0.05em; }
              .accentDot { color: #39FF14; text-shadow: 0 0 12px rgba(57,255,20,0.55); }
              .body { padding: 32px 36px; }
              .row  { margin-bottom: 22px; }
              .lbl  { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 4px; }
              .val  { font-size: 14px; color: rgba(255,255,255,0.75); line-height: 1.6; }
              .msg  { background: #080F14; border: 1px solid rgba(57,255,20,0.12); padding: 16px 20px; border-radius: 2px; }
              .ftr  { padding: 20px 36px; border-top: 1px solid rgba(57,255,20,0.12); }
              .ftr p { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; margin: 0; }
              .accent-link { color: #39FF14; text-decoration: none; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="hdr">
                <div class="ttl">New Inquiry</div>
                <div class="name">LILVIN<span class="accentDot">999</span></div>
              </div>
              <div class="body">
                <div class="row">
                  <div class="lbl">Full Name</div>
                  <div class="val">${escapeHtml(name)}</div>
                </div>
                <div class="row">
                  <div class="lbl">Email</div>
                  <div class="val"><a href="mailto:${escapeHtml(email)}" class="accent-link">${escapeHtml(email)}</a></div>
                </div>
                <div class="row">
                  <div class="lbl">Mobile</div>
                  <div class="val">${escapeHtml(mobile)}</div>
                </div>
                <div class="row">
                  <div class="lbl">Message</div>
                  <div class="val msg">${escapeHtml(description).replace(/\n/g, "<br/>")}</div>
                </div>
              </div>
              <div class="ftr">
                <p>Sent via lilvin999.com contact form &nbsp;·&nbsp; Reply directly to respond to ${escapeHtml(name)}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // ── Auto-reply to the sender ───────────────────────────────────────────
    const mailToSender = {
      from: `"LILVIN999" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We got your message — LILVIN999",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body  { margin: 0; padding: 0; background: #080F14; font-family: 'Helvetica Neue', Arial, sans-serif; }
              .wrap { max-width: 560px; margin: 40px auto; background: #0A1520; border: 1px solid rgba(57,255,20,0.12); }
              .hdr  { background: #080F14; padding: 32px 36px 24px; border-bottom: 1px solid rgba(57,255,20,0.12); }
              .ttl  { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #00A3FF; margin-bottom: 6px; }
              .name { font-size: 28px; font-weight: 900; text-transform: uppercase; color: #fff; letter-spacing: 0.05em; }
              .accentDot { color: #39FF14; text-shadow: 0 0 12px rgba(57,255,20,0.55); }
              .body { padding: 32px 36px; }
              .p    { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.8; margin-bottom: 16px; }
              .ftr  { padding: 20px 36px; border-top: 1px solid rgba(57,255,20,0.12); }
              .ftr p { font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; margin: 0; }
              .sign { color: rgba(255,255,255,0.3); font-size: 12px; font-style: italic; }
            </style>
          </head>
          <body>
            <div class="wrap">
              <div class="hdr">
                <div class="ttl">Message Received</div>
                <div class="name">LILVIN<span class="accentDot">999</span></div>
              </div>
              <div class="body">
                <p class="p">Hey ${escapeHtml(name)},</p>
                <p class="p">Your message has landed. The team will review your inquiry and get back to you within 24–48 hours.</p>
                <p class="p">Built from the block up — every verse carved out of concrete.</p>
                <p class="sign">— LILVIN999 Team</p>
              </div>
              <div class="ftr">
                <p>© 2026 LILVIN999 Official. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Send both in parallel
    await Promise.all([
      transporter.sendMail(mailToArtist),
      transporter.sendMail(mailToSender),
    ]);

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Error sending email:", err);
    return NextResponse.json(
      { message: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

// ── HTML escape helper ────────────────────────────────────────────────────────
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}