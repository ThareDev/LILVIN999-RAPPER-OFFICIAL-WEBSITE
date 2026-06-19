"use client";

import Image from "next/image";
import artist from "@/public/lilvin.jpg";
import { useEffect, useRef, useState, JSX } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

/* ───────────── letter-by-letter reveal ───────────── */
function LetterReveal({
  text,
  delay = 0,
  style,
}: {
  text: string;
  delay?: number;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <span style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateZ: -6 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ ...style, display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ───────────── animated counter ───────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }): JSX.Element {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const dur = 1400;
      const step = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.disconnect();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const STATS = [
  { target: 999, suffix: "K", label: "Followers" },
  { target: 14, suffix: "", label: "Mixtapes" },
  { target: 6, suffix: "", label: "Sold Out Shows" },
];

const MARQUEE_TEXT =
  "TRUST NOBODY • FEAR NONE • LILVIN999 • LOYALTY OVER EVERYTHING • ";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } },
};
const riseIn: Variants = {
  hidden: { y: 28, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#080F14" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        .lv-neon-green { color: #39FF14; }
        .lv-electric-blue { color: #00A3FF; }
        .lv-white { color: #FFFFFF; }

        /* Grain overlay */
        .lv-grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1;
        }

        /* Marquee */
        .lv-marquee-track {
          display: flex;
          width: max-content;
          animation: lv-marquee 20s linear infinite;
        }
        @keyframes lv-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Buttons */
        .lv-btn-blue {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #080F14;
          background: #00A3FF;
          padding: 13px 28px;
          border: none;
          cursor: pointer;
          transition: box-shadow 0.25s, transform 0.25s;
          box-shadow: 0 0 18px rgba(0,163,255,0.35);
          white-space: nowrap;
        }
        .lv-btn-blue:hover {
          box-shadow: 0 0 28px rgba(0,163,255,0.6);
          transform: translateY(-2px);
        }

        .lv-btn-green {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #39FF14;
          background: transparent;
          padding: 12px 28px;
          border: 1.5px solid #39FF14;
          cursor: pointer;
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
          white-space: nowrap;
        }
        .lv-btn-green:hover {
          background: rgba(57,255,20,0.08);
          box-shadow: 0 0 20px rgba(57,255,20,0.2);
          transform: translateY(-2px);
        }

        /* Green glow text */
        .lv-glow-green {
          text-shadow: 0 0 20px rgba(57,255,20,0.5), 0 0 40px rgba(57,255,20,0.2);
        }

        /* Blue glow */
        .lv-glow-blue {
          text-shadow: 0 0 20px rgba(0,163,255,0.4);
        }

        /* Diagonal seam */
        .lv-seam {
          position: absolute;
          top: 0; bottom: 0;
          left: 10%;
          width: 1.5px;
          background: linear-gradient(to bottom, transparent, rgba(57,255,20,0.25), transparent);
          transform: skewX(-6deg);
        }

        @media (prefers-reduced-motion: reduce) {
          .lv-marquee-track { animation: none; }
        }
      `}</style>

      {/* ── TOP MARQUEE ── */}
      <div
        className="relative z-30 w-full overflow-hidden"
        style={{ background: "#0A1520", borderBottom: "1px solid rgba(57,255,20,0.12)" }}
      >
        <div className="lv-marquee-track py-2">
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10,
                letterSpacing: "0.28em",
                color: "rgba(57,255,20,0.65)",
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN SPLIT ── */}
      <div className="relative flex-1 grid lg:grid-cols-2 min-h-0">

        {/* Grain */}
        <div className="lv-grain absolute inset-0 z-20 pointer-events-none" />

        {/* ── LEFT: TEXT ── */}
        <motion.div
          className="relative z-10 flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-12 lg:py-0 order-2 lg:order-1"
          style={{ y: contentY }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-lg w-full"
          >
            {/* Tagline marker style */}
            <motion.p
              variants={riseIn}
              style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: "clamp(14px, 2vw, 20px)",
                color: "#39FF14",
                marginBottom: 12,
                transform: "rotate(-1deg)",
                opacity: 0.9,
              }}
            >
              &ldquo;BORN TO MUSIC.&rdquo;
            </motion.p>

            {/* NAME — single horizontal line */}
            <h1 style={{ margin: 0, lineHeight: 0.9, display: "flex", alignItems: "baseline", gap: "0.18em", flexWrap: "nowrap" }}>
              <LetterReveal
                text="LILVIN"
                delay={0.15}
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize: "clamp(48px, 9.5vw, 112px)",
                  color: "#FFFFFF",
                  letterSpacing: "-1px",
                }}
              />
              <LetterReveal
                text="999"
                delay={0.55}
                style={{
                  fontFamily: "'Anton', Impact, sans-serif",
                  fontSize: "clamp(48px, 9.5vw, 112px)",
                  color: "#39FF14",
                  letterSpacing: "-1px",
                  textShadow: "0 0 30px rgba(57,255,20,0.4), 0 0 60px rgba(57,255,20,0.15)",
                }}
              />
            </h1>

            {/* Body */}
            <motion.p
              variants={riseIn}
              className="mt-4 mb-8"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: "clamp(13px, 1.4vw, 15px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.02em",
                maxWidth: 380,
              }}
            >
              Built from the block up. Every verse carved out of concrete,
              every hook earned the hard way.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={riseIn} className="flex flex-wrap gap-3 mb-10">
              <button className="lv-btn-blue">Stream The Tape</button>
              <button className="lv-btn-green">Tour Dates</button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={riseIn} className="flex gap-8 sm:gap-12">
              {STATS.map(({ target, suffix, label }) => (
                <div key={label}>
                  <div
                    className="lv-glow-green"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(22px, 3vw, 34px)",
                      color: "#39FF14",
                      lineHeight: 1,
                    }}
                  >
                    <Counter target={target} suffix={suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 5,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: IMAGE ── */}
        <div className="relative h-[70vw] sm:h-[60vw] lg:h-auto overflow-hidden order-1 lg:order-2">
          <motion.div
            className="absolute inset-0"
            style={{
              scale: imgScale,
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src={artist}
              alt="LILVIN999"
              fill
              priority
              className="object-cover object-top"
              style={{
                filter: "contrast(1.05) brightness(1) saturate(1)",
              }}
            />

            {/* Subtle left edge bleed into text — desktop only, very light */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background: "linear-gradient(to right, #080F14 0%, transparent 10%)",
              }}
            />

            {/* Mobile bottom fade — just enough to read text below */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{
                background: "linear-gradient(to bottom, transparent 70%, #080F14 100%)",
              }}
            />
          </motion.div>

          {/* Diagonal seam */}
          <div className="lv-seam hidden lg:block" />

          {/* Floating tag */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-5 right-5 z-20 hidden lg:flex flex-col items-end gap-1"
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 9,
                letterSpacing: "0.28em",
                color: "rgba(57,255,20,0.55)",
                textTransform: "uppercase",
              }}
            >
              Loyalty Over Everything
            </span>
            <div style={{ width: 36, height: 1, background: "rgba(57,255,20,0.3)" }} />
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="relative z-30 w-full flex items-center justify-between px-5 sm:px-10 lg:px-14 py-3"
        style={{
          background: "#0A1520",
          borderTop: "1px solid rgba(57,255,20,0.1)",
        }}
      >
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}
        >
          Scroll Down
        </span>
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          style={{ fontSize: 14, color: "#39FF14" }}
        >
          →
        </motion.div>
      </div>
    </section>
  );
}