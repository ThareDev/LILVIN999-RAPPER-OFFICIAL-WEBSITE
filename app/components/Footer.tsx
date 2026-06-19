"use client";

import { useState } from "react";
import ContactPopup from "@/app/components/popups/ContactPopup";

export default function Footer() {
  const [popupOpen, setPopupOpen] = useState(false);

  const socials = [
    { name: "Instagram", handle: "@lilvin999", url: "https://www.instagram.com/lilvin999?igsh=MXdwanV0dXJzeGhxaw==" },
    { name: "Spotify", handle: "LILVIN999", url: "https://open.spotify.com/artist/00FwwxGQZgbBpM5fwJm4Zy?si=b922hjQQQ5OzgXOJsPcuVg" },
    { name: "YouTube", handle: "LILVIN999TV", url: "https://youtube.com/@lilvin999?si=32SOeudo-8ttI309" },
    { name: "TikTok", handle: "@lilvin999_", url: "https://www.tiktok.com/@lilvin999_?_r=1&_t=ZS-97LkIOcbJr" },
    { name: "Facebook", handle: "Profile", url: "https://www.facebook.com/share/1DCpU3XGmV/" },
    { name: "Facebook Page", handle: "Official Page", url: "https://www.facebook.com/share/1H9L5suiP1/" },
  ];

  return (
    <>
      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <footer style={{ background: "#080F14", borderTop: "1px solid rgba(57,255,20,0.1)" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

          /* main CTA button */
          .ft-cta-btn {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #080F14;
            background: #39FF14;
            padding: 17px 50px;
            border: none;
            cursor: pointer;
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
            transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
            box-shadow: 0 0 24px rgba(57,255,20,0.3);
          }
          .ft-cta-btn:hover {
            background: #fff;
            box-shadow: 0 0 32px rgba(57,255,20,0.15);
            transform: translateY(-3px);
          }

          .ft-nav-link {
            font-family: 'Oswald', sans-serif;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.35);
            transition: color 0.25s;
            text-decoration: none;
            display: block;
          }
          .ft-nav-link:hover { color: #39FF14; }

          /* social rows */
          .ft-social-row {
            display: flex; align-items: center; justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(57,255,20,0.06);
            transition: border-color 0.25s;
            text-decoration: none;
          }
          .ft-social-row:hover { border-color: rgba(57,255,20,0.3); }
          .ft-social-name {
            font-family: 'Oswald', sans-serif;
            font-size: 11px; letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
            transition: color 0.25s;
          }
          .ft-social-handle {
            font-family: 'Oswald', sans-serif;
            font-size: 11px;
            color: rgba(0,163,255,0.5);
            transition: color 0.25s;
          }
          .ft-social-row:hover .ft-social-name { color: #39FF14; }
          .ft-social-row:hover .ft-social-handle { color: #00A3FF; }

          .ft-label {
            font-family: 'Oswald', sans-serif;
            font-size: 10px; letter-spacing: 0.25em;
            text-transform: uppercase;
            color: rgba(0,163,255,0.5);
          }
        `}</style>

        {/* ── CTA STRIP ── */}
        <div id="contact" className="py-16 lg:py-24" style={{ borderBottom: "1px solid rgba(57,255,20,0.08)" }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 text-center relative">

            {/* faded watermark */}
            <span
              aria-hidden="true"
              className="hidden lg:block select-none pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(80px, 14vw, 200px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(57,255,20,0.05)",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              999
            </span>

            <div className="relative">
              <div className="ft-label mb-4">Booking &amp; Press</div>
              <h2
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: "clamp(42px, 8vw, 96px)",
                  color: "#fff",
                  textTransform: "uppercase",
                  lineHeight: 0.92,
                  margin: "0 0 1.5rem",
                }}
              >
                Work With
                <br />
                <span style={{ color: "transparent", WebkitTextStroke: "2px #39FF14" }}>
                  LILVIN999
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  maxWidth: 460,
                  margin: "0 auto 2.5rem",
                }}
              >
                For booking, features, brand deals, and press inquiries
              </p>
              <button onClick={() => setPopupOpen(true)} className="ft-cta-btn">
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN FOOTER ── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* logo & tagline */}
            <div>
              <div style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: 30, color: "#fff",
                textTransform: "uppercase", marginBottom: 10,
              }}>
                LILVIN<span style={{ color: "#39FF14", textShadow: "0 0 16px rgba(57,255,20,0.5)" }}>999</span>
              </div>
              <p style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                maxWidth: 240,
                transform: "rotate(-1deg)",
              }}>
                Trust nobody, fear none — every bar a statement.
              </p>
            </div>

            {/* nav */}
            <div>
              <div className="ft-label mb-5">Navigate</div>
              <div className="grid grid-cols-2 gap-y-3">
                {["Music", "Shows", "About", "Blog", "Contact"].map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="ft-nav-link">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* socials */}
            <div>
              <div className="ft-label mb-5">Socials</div>
              <div>
                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="ft-social-row">
                    <span className="ft-social-name">{s.name}</span>
                    <span className="ft-social-handle">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* divider */}
          <div className="mt-10 mb-6" style={{
            height: 1,
            background: "linear-gradient(to right, transparent, rgba(57,255,20,0.25), transparent)",
          }} />

          {/* bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={{
              fontFamily: "'Oswald', sans-serif", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)",
            }}>
              © 2026 LILVIN999 Official. All rights reserved.
            </p>
            <p style={{
              fontFamily: "'Oswald', sans-serif", fontSize: 10,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "rgba(0,163,255,0.25)",
            }}>
              Developed by Ravana Tec Solutions PVT Ltd.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}