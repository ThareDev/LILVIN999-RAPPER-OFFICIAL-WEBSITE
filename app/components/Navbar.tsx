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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "backdrop-blur-md border-b"
          : "bg-transparent border-b border-transparent"
        }`}
      style={{
        background: scrolled ? "rgba(15,31,22,0.92)" : "transparent",
        borderColor: scrolled ? "rgba(46,74,61,0.4)" : "transparent",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&family=UnifrakturCook:wght@700&display=swap');

        .lv-logo {
          font-family: 'UnifrakturCook', 'Impact', serif;
          letter-spacing: 0.04em;
          color: #6B7C73;
          text-shadow: 0 0 14px rgba(46,74,61,0.6);
        }
        .lv-link {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6B7C73;
          position: relative;
          padding-bottom: 4px;
          transition: color 0.25s;
        }
        .lv-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 0; height: 1px;
          background: #2E4A3D;
          transition: width 0.3s ease;
        }
        .lv-link:hover { color: #ffffff; }
        .lv-link:hover::after { width: 100%; }

        .lv-cta {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0F1F16;
          background: #6B7C73;
          padding: 10px 26px;
          border: none;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 0 100%);
          transition: background 0.25s, color 0.25s;
        }
        .lv-cta:hover { background: #2E4A3D; color: #fff; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="lv-logo text-2xl lg:text-3xl">
          LILVIN<span style={{ color: "#3D5666" }}>999</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="lv-link">
              {link}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="#shows" className="lv-cta">
            Get Tickets
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#6B7C73",
              transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none",
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{ background: "#6B7C73", opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: "#6B7C73",
              transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-400"
        style={{
          maxHeight: menuOpen ? 400 : 0,
          opacity: menuOpen ? 1 : 0,
          background: "rgba(13,22,32,0.97)",
          borderTop: "1px solid rgba(46,74,61,0.3)",
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="lv-link !text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="#shows" className="lv-cta text-center mt-2">
            Get Tickets
          </a>
        </div>
      </div>
    </nav>
  );
}