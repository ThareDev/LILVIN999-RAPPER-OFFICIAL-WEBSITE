"use client";

import Image from "next/image";
import artist from "@/public/heroooo.png";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

/* ─────────────────────────────────────
   ⚠️ CONFIG — swap these for the real thing
───────────────────────────────────── */

// Dummy target date for testing the countdown.
// Replace with the real album drop date/time, e.g.
// new Date("2026-07-18T00:00:00+05:30")
const DUMMY_TARGET_OFFSET_MS =
  6 * 24 * 60 * 60 * 1000 + // 6 days
  14 * 60 * 60 * 1000 + // 14 hours
  38 * 60 * 1000 + // 38 minutes
  52 * 1000; // 52 seconds

const SPOTIFY_ALBUM_URL = "https://open.spotify.com/album/REPLACE_WITH_ALBUM_ID";

/* ─────────────────────────────────────
   Countdown hook
───────────────────────────────────── */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(target: Date): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

const pad = (n: number) => n.toString().padStart(2, "0");

/* ─────────────────────────────────────
   Icons
───────────────────────────────────── */
function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#39FF14" strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function VinylIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#39FF14" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="#39FF14" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="#39FF14" />
    </svg>
  );
}

function HeadphoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080F14" strokeWidth="2">
      <path d="M3 15v-3a9 9 0 0 1 18 0v3" />
      <rect x="2" y="14" width="5" height="7" rx="2" />
      <rect x="17" y="14" width="5" height="7" rx="2" />
    </svg>
  );
}

function SpotifyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#080F14">
      <circle cx="12" cy="12" r="12" fill="#39FF14" />
      <path
        d="M6.5 9.8c3.4-1 7.8-.7 10.6 1"
        stroke="#080F14"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6.9 12.9c2.9-.85 6.6-.6 9 .8"
        stroke="#080F14"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M7.3 15.9c2.4-.65 5.4-.5 7.4.6"
        stroke="#080F14"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ─────────────────────────────────────
   Framer variants
───────────────────────────────────── */
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.35, delay: 0.1 } },
};

const panelVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0, y: 30 },
  show: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    scale: 0.92,
    opacity: 0,
    y: 18,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const riseIn: Variants = {
  hidden: { y: 16, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────
   Main Component
───────────────────────────────────── */
export default function EventBannerPopup() {
  const [open, setOpen] = useState(false);
  const [target] = useState(() => new Date(Date.now() + DUMMY_TARGET_OFFSET_MS));
  const { days, hours, minutes, seconds } = useCountdown(target);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const close = () => setOpen(false);

  const UNITS = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        .lv-popup-close {
          position: absolute; top: 14px; right: 14px;
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.25);
          color: rgba(255,255,255,0.9);
          font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          z-index: 60;
          backdrop-filter: blur(4px);
        }
        .lv-popup-close:hover {
          background: rgba(57,255,20,0.12);
          border-color: #39FF14;
          transform: rotate(90deg);
        }

        .lv-listen-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 16px 0;
          background: #39FF14;
          color: #080F14;
          font-family: 'Oswald', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          text-decoration: none;
          border-radius: 999px;
          box-shadow: 0 0 24px rgba(57,255,20,0.35);
          transition: box-shadow 0.25s, transform 0.2s, filter 0.2s;
        }
        .lv-listen-btn:hover {
          box-shadow: 0 0 34px rgba(57,255,20,0.6);
          transform: translateY(-2px);
          filter: brightness(1.05);
        }
        .lv-listen-btn:active { transform: translateY(0); }

        .lv-presave {
          display: inline-flex; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer;
          font-family: 'Oswald', sans-serif;
          font-size: 12px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #00A3FF;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .lv-presave:hover { opacity: 0.8; }

        .lv-grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1;
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
            variants={backdropVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={close}
          >
            {/* backdrop */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(2,6,9,0.92)", backdropFilter: "blur(10px)" }}
            />

            {/* panel */}
            <motion.div
              className="lv-grain relative overflow-hidden w-full"
              style={{
                maxWidth: 420,
                maxHeight: "92vh",
                overflowY: "auto",
                background: "#080F14",
                border: "1px solid rgba(57,255,20,0.18)",
                borderRadius: 22,
                boxShadow:
                  "0 0 60px rgba(57,255,20,0.12), 0 20px 60px rgba(0,0,0,0.6)",
              }}
              variants={panelVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── Header: image as background, text overlaid ── */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "4/3",
                  minHeight: 240,
                }}
              >
                <Image
                  src={artist}
                  alt="LILVIN999"
                  fill
                  priority
                  className="object-cover"
                  style={{
                    objectPosition: "85% 15%",
                    filter: "contrast(1.05) saturate(1.05) brightness(0.85)",
                  }}
                />

                {/* dark gradient so text stays legible over the photo, without hiding the face on the right */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(115deg, #080F14 0%, rgba(8,15,20,0.9) 26%, rgba(8,15,20,0.35) 46%, rgba(8,15,20,0) 62%), linear-gradient(to top, #080F14 0%, transparent 40%)",
                  }}
                />

                {/* close */}
                <button className="lv-popup-close" onClick={close} aria-label="Close">
                  ✕
                </button>

                {/* text block sits on top of the image */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="absolute inset-0 flex flex-col justify-center px-6"
                  style={{ zIndex: 2 }}
                >
                  <motion.p
                    variants={riseIn}
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                      color: "#39FF14",
                      marginBottom: 8,
                    }}
                  >
                    New Album Alert
                  </motion.p>

                  <motion.h1
                    variants={riseIn}
                    style={{
                      margin: 0,
                      lineHeight: 0.88,
                      fontFamily: "'Anton', Impact, sans-serif",
                      fontSize: "clamp(38px, 11vw, 56px)",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    <span style={{ color: "#FFFFFF" }}>LILVIN</span>
                    <span
                      style={{
                        color: "#39FF14",
                        textShadow:
                          "0 0 24px rgba(57,255,20,0.45), 0 0 48px rgba(57,255,20,0.15)",
                      }}
                    >
                      999
                    </span>
                  </motion.h1>

                  <motion.p
                    variants={riseIn}
                    style={{
                      fontFamily: "'Permanent Marker', cursive",
                      fontSize: 22,
                      color: "#39FF14",
                      marginTop: 10,
                      marginBottom: 0,
                      transform: "rotate(-1deg)",
                      opacity: 0.95,
                    }}
                  >
                    &ldquo;Born to Music.&rdquo;
                  </motion.p>
                </motion.div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative px-6 pt-6 pb-7"
              >
                {/* description */}
                <motion.p
                  variants={riseIn}
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.01em",
                    marginTop: -6,
                    marginBottom: 20,
                  }}
                >
                  Built from the block up. Every verse carved out of concrete,
                  every hook earned the hard way.
                </motion.p>

                <div
                  style={{
                    height: 1,
                    background: "rgba(255,255,255,0.08)",
                    marginBottom: 22,
                  }}
                />

                {/* ── Countdown ── */}
                <motion.div variants={riseIn} style={{ marginBottom: 22 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <CalendarIcon />
                    <span
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#39FF14",
                      }}
                    >
                      Album Drops In
                    </span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: 8,
                    }}
                  >
                    {UNITS.map((u) => (
                      <div
                        key={u.label}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(57,255,20,0.15)",
                          borderRadius: 12,
                          padding: "12px 0",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Anton', sans-serif",
                            fontSize: "clamp(22px, 6vw, 30px)",
                            color: "#39FF14",
                            textShadow: "0 0 16px rgba(57,255,20,0.35)",
                            lineHeight: 1,
                          }}
                        >
                          {pad(u.value)}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: 8.5,
                            letterSpacing: "0.16em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.35)",
                            marginTop: 6,
                          }}
                        >
                          {u.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ── Wait line ── */}
                <motion.div
                  variants={riseIn}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 22,
                  }}
                >
                  <VinylIcon />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 14,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "#FFFFFF",
                      }}
                    >
                      The Wait Is Almost Over
                    </div>
                    <div
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 12,
                        color: "rgba(255,255,255,0.4)",
                        marginTop: 2,
                      }}
                    >
                      Be the first to experience it.
                    </div>
                  </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.a
                  variants={riseIn}
                  href={SPOTIFY_ALBUM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lv-listen-btn"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HeadphoneIcon />
                  Listen To Album
                  <span style={{ marginLeft: 2 }}>→</span>
                </motion.a>

                <motion.div
                  variants={riseIn}
                  style={{ textAlign: "center", marginTop: 16 }}
                >
                  <a
                    href={SPOTIFY_ALBUM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lv-presave"
                  >
                    Pre-save on Spotify
                    <SpotifyIcon />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}