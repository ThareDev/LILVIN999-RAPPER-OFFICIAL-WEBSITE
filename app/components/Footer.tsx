"use client";

import { useState } from "react";
import ContactPopup from "@/app/components/popups/ContactPopup";

export default function Footer() {
  const [popupOpen, setPopupOpen] = useState(false);

  const socials = [
    { name: "Instagram", handle: "@lilvin999", url: "https://www.instagram.com/lilvin999" },
    { name: "Spotify", handle: "LILVIN999", url: "https://open.spotify.com/artist/lilvin999" },
    { name: "YouTube", handle: "LILVIN999TV", url: "https://youtube.com/@lilvin999" },
    { name: "TikTok", handle: "@lilvin999", url: "https://www.tiktok.com/@lilvin999" },
    { name: "Facebook", handle: "@lilvin999", url: "https://www.facebook.com/lilvin999" },
  ];

  return (
    <>
      <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />

      <footer style={{ background: "#070C0A", borderTop: "1px solid rgba(107,124,115,0.1)" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

          .ft-cta-btn {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 13px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #070C0A;
            background: #6B7C73;
            padding: 17px 50px;
            border: none;
            cursor: pointer;
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
            transition: background 0.25s ease, transform 0.25s ease;
          }
          .ft-cta-btn:hover { background: #fff; transform: translateY(-3px); }

          .ft-nav-link {
            font-family: 'Oswald', sans-serif;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(107,124,115,0.65);
            transition: color 0.25s;
          }
          .ft-nav-link:hover { color: #fff; }

          .ft-social-row {
            display: flex; align-items: center; justify-content: space-between;
            padding: 6px 0;
            border-bottom: 1px solid rgba(107,124,115,0.08);
            transition: border-color 0.25s;
          }
          .ft-social-row:hover { border-color: rgba(46,74,61,0.5); }
          .ft-social-name {
            font-family: 'Oswald', sans-serif;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(107,124,115,0.65);
            transition: color 0.25s;
          }
          .ft-social-handle {
            font-family: 'Oswald', sans-serif;
            font-size: 11px;
            color: rgba(61,86,102,0.8);
            transition: color 0.25s;
          }
          .ft-social-row:hover .ft-social-name { color: #fff; }
          .ft-social-row:hover .ft-social-handle { color: #6B7C73; }

          .ft-label {
            font-family: 'Oswald', sans-serif;
            font-size: 10px;
            letter-spacing: 0.25em;
            text-transform: uppercase;
            color: rgba(61,86,102,0.7);
          }
        `}</style>

        {/* CTA strip */}
        <div
          id="contact"
          className="py-16 lg:py-24"
          style={{ borderBottom: "1px solid rgba(107,124,115,0.1)" }}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative">
            {/* faded watermark behind heading */}
            <span
              aria-hidden="true"
              className="hidden lg:block select-none pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2"
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(80px, 14vw, 200px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(107,124,115,0.06)",
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
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "2px #2E4A3D",
                  }}
                >
                  LILVIN999
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 15,
                  color: "rgba(107,124,115,0.65)",
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

        {/* main footer */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* logo & tagline */}
            <div>
              <div
                style={{
                  fontFamily: "'Anton', sans-serif",
                  fontSize: 30,
                  color: "#fff",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                LILVIN<span style={{ color: "#2E4A3D" }}>999</span>
              </div>
              <p
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  fontSize: 14,
                  color: "#6B7C73",
                  maxWidth: 240,
                  transform: "rotate(-1deg)",
                }}
              >
                Trust nobody, fear none — every bar a statement.
              </p>
            </div>

            {/* nav links */}
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
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-social-row"
                  >
                    <span className="ft-social-name">{s.name}</span>
                    <span className="ft-social-handle">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div
            className="mt-10 mb-6"
            style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(46,74,61,0.5), transparent)" }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(107,124,115,0.4)",
              }}
            >
              © 2026 LILVIN999 Official. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(107,124,115,0.25)",
              }}
            >
              Developed by Tharaka Nuwan Athuluwage
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}