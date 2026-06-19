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
    <span style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateZ: -8 }}
          animate={{ opacity: 1, y: 0, rotateZ: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.045,
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
  "TRUST NOBODY • FEAR NONE • LILVIN999 • LOYALTY OVER EVERYTHING • TRUST NOBODY • FEAR NONE • LILVIN999 • LOYALTY OVER EVERYTHING • ";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
};
const riseIn: Variants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: "#070C0A" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;700&family=Permanent+Marker&display=swap');

        .grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .advisory {
          border: 1.5px solid #6B7C73;
          padding: 4px 8px;
          font-family: 'Oswald', sans-serif;
        }

        .lv-btn-solid {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #070C0A;
          background: #6B7C73;
          padding: 14px 32px;
          border: none;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .lv-btn-solid:hover { background: #fff; transform: translateY(-2px); }

        .lv-btn-ghost {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6B7C73;
          background: transparent;
          padding: 13px 32px;
          border: 1.5px solid #2E4A3D;
          cursor: pointer;
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .lv-btn-ghost:hover { border-color: #6B7C73; color: #fff; transform: translateY(-2px); }

        .crown-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #2E4A3D, transparent);
        }
      `}</style>

      {/* top marquee strip */}
      <div
        className="relative z-30 w-full overflow-hidden border-b"
        style={{ background: "#0D1620", borderColor: "rgba(46,74,61,0.4)" }}
      >
        <div className="marquee-track py-2">
          {[0, 1].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 11,
                letterSpacing: "0.25em",
                color: "#6B7C73",
                paddingRight: 0,
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* main split body */}
      <div className="relative flex-1 grid lg:grid-cols-2">
        {/* grain overlay across whole hero */}
        <div className="grain absolute inset-0 z-20 pointer-events-none" />

        {/* LEFT — text content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0"
          style={{ y: contentY }}
        >
          {/* dot grid accent */}
          <div
            className="absolute -top-10 -left-10 w-48 h-48 pointer-events-none hidden lg:block"
            style={{
              backgroundImage: "radial-gradient(rgba(61,86,102,0.35) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
              opacity: 0.5,
            }}
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            {/* advisory + label row */}
            <motion.div variants={riseIn} className="flex items-center gap-4 mb-6">
              <span
                className="advisory"
                style={{ fontSize: 9, letterSpacing: "0.1em", color: "#6B7C73", lineHeight: 1.2 }}
              >
                PARENTAL
                <br />
                ADVISORY
              </span>
              <div className="crown-divider flex-1" />
              <span
                style={{
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  color: "#3D5666",
                  textTransform: "uppercase",
                }}
              >
                Est. 2026
              </span>
            </motion.div>

            {/* name — letter reveal, stacked huge */}
            <h1 className="mb-2" style={{ margin: 0 }}>
              <div className="overflow-hidden">
                <LetterReveal
                  text="LILVIN"
                  delay={0.2}
                  style={{
                    fontFamily: "'Anton', Impact, sans-serif",
                    fontSize: "clamp(48px, 9vw, 120px)",
                    lineHeight: 0.85,
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <LetterReveal
                  text="999"
                  delay={0.7}
                  style={{
                    fontFamily: "'Anton', Impact, sans-serif",
                    fontSize: "clamp(48px, 9vw, 120px)",
                    lineHeight: 0.85,
                    color: "transparent",
                    WebkitTextStroke: "2px #2E4A3D",
                    textTransform: "uppercase",
                  }}
                />
              </div>
            </h1>

            {/* marker-style tagline */}
            <motion.p
              variants={riseIn}
              style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: "clamp(18px, 2.4vw, 26px)",
                color: "#6B7C73",
                margin: "20px 0 14px",
                transform: "rotate(-1.5deg)",
              }}
            >
              "BORN TO MUSIC"
            </motion.p>

            <motion.p
              variants={riseIn}
              className="max-w-sm mb-10"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14,
                lineHeight: 1.8,
                color: "rgba(107,124,115,0.75)",
                letterSpacing: "0.02em",
              }}
            >
              Built from the block up. Every verse carved out of concrete,
              every hook earned the hard way.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={riseIn} className="flex flex-wrap gap-4 mb-12">
              <button className="lv-btn-solid">Stream The Tape</button>
              <button className="lv-btn-ghost">Tour Dates</button>
            </motion.div>

            {/* stats row */}
            <motion.div variants={riseIn} className="flex gap-8 sm:gap-12">
              {STATS.map(({ target, suffix, label }) => (
                <div key={label}>
                  <div
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(24px, 3vw, 36px)",
                      color: "#3D5666",
                      lineHeight: 1,
                    }}
                  >
                    <Counter target={target} suffix={suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(107,124,115,0.55)",
                      marginTop: 6,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* RIGHT — image with diagonal clip */}
        <div className="relative h-[50vh] lg:h-auto overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              scale: imgScale,
              clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src={artist}
              alt="LILVIN999"
              fill
              priority
              className="object-cover"
              style={{
                filter: "contrast(1.15) brightness(0.65) saturate(0.5) sepia(0.15) hue-rotate(60deg)",
              }}
            />
            {/* duotone wash */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(160deg, rgba(15,31,22,0.55) 0%, rgba(13,22,32,0.35) 50%, rgba(7,12,10,0.75) 100%)",
              }}
            />
            {/* left edge fade into content */}
            <div
              className="absolute inset-0 hidden lg:block"
              style={{ background: "linear-gradient(to right, #070C0A 0%, transparent 18%)" }}
            />
            {/* bottom fade mobile */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{ background: "linear-gradient(to bottom, transparent 60%, #070C0A 100%)" }}
            />
          </motion.div>

          {/* floating skull/crest tag */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="absolute top-6 right-6 z-20 hidden lg:flex flex-col items-end gap-1"
          >
            <span
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: "#6B7C73",
                textTransform: "uppercase",
              }}
            >
              Loyalty Over Everything
            </span>
            <div style={{ width: 40, height: 1, background: "#2E4A3D" }} />
          </motion.div>

          {/* diagonal seam highlight */}
          <div
            className="absolute inset-y-0 hidden lg:block"
            style={{
              left: "12%",
              width: 2,
              background: "linear-gradient(to bottom, transparent, #2E4A3D, transparent)",
              transform: "skewX(-8deg)",
            }}
          />
        </div>
      </div>

      {/* bottom ticker bar */}
      <div
        className="relative z-30 w-full border-t flex items-center justify-between px-6 sm:px-10 lg:px-16 py-4"
        style={{ background: "#0D1620", borderColor: "rgba(46,74,61,0.35)" }}
      >
        <span
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 9,
            letterSpacing: "0.3em",
            color: "rgba(107,124,115,0.6)",
            textTransform: "uppercase",
          }}
        >
          Scroll Down
        </span>
        <motion.div
          animate={{ x: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 12,
            color: "#3D5666",
          }}
        >
          →
        </motion.div>
      </div>
    </section>
  );
}