"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["About", "Music", "Shows", "Blog", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      style={{
        background: scrolled ? "rgba(8,15,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(57,255,20,0.15)" : "1px solid transparent",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        .lv-logo {
          font-family: 'Anton', Impact, sans-serif;
          letter-spacing: 0.04em;
          color: #FFFFFF;
          font-size: 22px;
        }
        .lv-logo-999 {
          color: #39FF14;
          text-shadow: 0 0 12px rgba(57,255,20,0.5);
        }

        .lv-link {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
          position: relative;
          padding-bottom: 4px;
          transition: color 0.25s;
          text-decoration: none;
        }
        .lv-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 1px;
          background: #39FF14;
          transition: width 0.3s ease;
        }
        .lv-link:hover { color: #39FF14; }
        .lv-link:hover::after { width: 100%; }

        .lv-cta {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #080F14;
          background: #39FF14;
          padding: 10px 24px;
          border: none;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
          transition: background 0.25s, box-shadow 0.25s;
          text-decoration: none;
          display: inline-block;
          box-shadow: 0 0 16px rgba(57,255,20,0.25);
        }
        .lv-cta:hover {
          background: #00A3FF;
          color: #fff;
          box-shadow: 0 0 20px rgba(0,163,255,0.4);
        }

        .mobile-link {
          font-family: 'Oswald', sans-serif;
          font-size: 13px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          padding: 10px 0;
          border-bottom: 1px solid rgba(57,255,20,0.08);
          display: block;
          transition: color 0.2s;
        }
        .mobile-link:hover { color: #39FF14; }
      `}</style>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 lg:h-18">
        {/* Logo */}
        <Link href="/" className="lv-logo">
          LILVIN<span className="lv-logo-999">999</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="lv-link">
              {link}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <a href="#shows" className="lv-cta">Get Tickets</a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 p-2 w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300 origin-center"
            style={{
              background: "#39FF14",
              transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{ background: "#39FF14", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-px transition-all duration-300 origin-center"
            style={{
              background: "#39FF14",
              transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? 360 : 0,
          opacity: menuOpen ? 1 : 0,
          background: "rgba(8,15,20,0.98)",
          borderTop: menuOpen ? "1px solid rgba(57,255,20,0.12)" : "none",
        }}
      >
        <div className="px-5 py-4 flex flex-col">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#shows" className="lv-cta text-center mt-4 w-full">
            Get Tickets
          </a>
        </div>
      </div>
    </nav>
  );
}