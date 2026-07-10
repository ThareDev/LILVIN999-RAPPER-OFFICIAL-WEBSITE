"use client";

import { motion } from "framer-motion";


const shows = [
  {
    date: "2026",
    day: "August 08",
    event: "Beheth",
    city: "Colombo",
    venue: "Port City Colombo",
    country: "Sri Lanka",
    status: "On Sale",
    sold: false,
    ticketUrl: "https://tickets.behethconcert.com/",
  },
];


export default function Shows() {
  return (
    <section
      id="shows"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#080F14" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        /* ticket-stub card */
        .stub-card {
          position: relative;
          background: #0A1520;
          border: 1px solid rgba(57,255,20,0.15);
          clip-path: polygon(
            0 0, 100% 0, 100% calc(100% - 6px),
            calc(100% - 6px) 100%, 0 100%
          );
          transition: border-color 0.3s ease, transform 0.3s ease,
                      background 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }
        /* left accent bar */
        .stub-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, transparent, #39FF14, transparent);
          opacity: 0.5;
        }
        .stub-card:hover {
          border-color: rgba(57,255,20,0.45);
          background: #0D1A2A;
          transform: translateX(6px);
          box-shadow: 0 4px 24px rgba(57,255,20,0.07);
        }

        /* perforated dashed line */
        .stub-perf {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(57,255,20,0.2) 0,
            rgba(57,255,20,0.2) 5px,
            transparent 5px,
            transparent 11px
          );
        }

        /* ticket button */
        .ticket-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #080F14;
          background: #39FF14;
          padding: 10px 22px;
          border: none;
          cursor: pointer;
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
          box-shadow: 0 0 16px rgba(57,255,20,0.3);
          text-decoration: none;
          display: inline-block;
        }
        .ticket-btn:hover {
          background: #fff;
          box-shadow: 0 0 20px rgba(57,255,20,0.15);
          transform: translateY(-2px);
        }

        /* notify ghost button */
        .notify-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #00A3FF;
          background: transparent;
          border: 1.5px solid #00A3FF;
          padding: 10px 22px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.25s;
          text-decoration: none;
          display: inline-block;
        }
        .notify-btn:hover {
          color: #fff;
          box-shadow: 0 0 18px rgba(0,163,255,0.3);
          transform: translateY(-2px);
        }

        /* blinking "On Sale" dot */
        .status-live {
          position: relative;
          color: #39FF14;
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .status-live::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #39FF14;
          margin-right: 7px;
          vertical-align: middle;
          box-shadow: 0 0 8px rgba(57,255,20,0.8);
          animation: blink-dot 1.6s ease-in-out infinite;
        }
        @keyframes blink-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.25; } }

        /* VIP box */
        .vip-box {
          position: relative;
          background: linear-gradient(120deg, rgba(0,163,255,0.07) 0%, rgba(8,15,20,0.8) 60%);
          border: 1px solid rgba(0,163,255,0.25);
        }
        .vip-box::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 100px; height: 100px;
          background: radial-gradient(circle, rgba(0,163,255,0.15) 0%, transparent 70%);
        }
      `}</style>

      {/* left accent vertical line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(57,255,20,0.35), transparent)" }}
      />

      {/* faded watermark year */}
      <motion.div
        className="absolute -right-10 top-10 select-none pointer-events-none hidden lg:block"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <span
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(100px, 14vw, 220px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(57,255,20,0.07)",
            lineHeight: 1,
          }}
        >
          2026
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div style={{ width: 32, height: 1, background: "#39FF14", opacity: 0.5 }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#00A3FF",
                }}
              >
                Live &amp; Direct
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(40px, 6vw, 68px)",
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 0.95,
                margin: 0,
              }}
            >
              Tour Dates
            </h2>
            <p
              style={{
                fontFamily: "'Permanent Marker', cursive",
                fontSize: 16,
                color: "#39FF14",
                marginTop: 10,
                transform: "rotate(-1deg)",
                opacity: 0.8,
              }}
            >
              run it back — 2026 world run
            </p>
          </div>
        </motion.div>

        {/* shows list */}
        <div className="space-y-4">
          {shows.map((show, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`stub-card ${show.sold ? "opacity-40" : ""}`}
            >
              <div className="stub-perf" style={{ left: "90px" }} />

              <div className="flex items-center gap-4 lg:gap-8 px-5 lg:px-7 py-5 lg:py-6">
                {/* date block */}
                <div className="flex-shrink-0 w-16 lg:w-20 text-center">
                  <div
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      color: "#39FF14",
                      lineHeight: 1,
                      textShadow: "0 0 14px rgba(57,255,20,0.4)",
                    }}
                  >
                    {show.date}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 9,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.35)",
                      marginTop: 4,
                    }}
                  >
                    {show.day}
                  </div>
                </div>

                {/* city / venue */}
                <div className="flex-1 min-w-0 pl-6 lg:pl-8">
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#00A3FF",
                      marginBottom: 4,
                      opacity: 0.9,
                    }}
                  >
                    {show.event}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: "clamp(17px, 2vw, 24px)",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {show.city}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(0,163,255,0.6)",
                      }}
                    >
                      {show.country}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.3)",
                      marginTop: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {show.venue}
                  </div>
                </div>

                {/* status + CTA */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span className="status-live hidden sm:block">{show.status}</span>
                  {!show.sold ? (
                    <a
                      href={show.ticketUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ticket-btn"
                    >
                      Tickets
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.25)",
                        padding: "10px 22px",
                      }}
                    >
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIP box */}
        <motion.div
          className="vip-box mt-14 p-6 lg:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#00A3FF",
                marginBottom: 8,
              }}
            >
              Exclusive Access
            </div>
            <h3
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 36px)",
                color: "#fff",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              VIP Packages
            </h3>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 14,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 420,
                lineHeight: 1.7,
              }}
            >
              Meet &amp; greet, soundcheck access, exclusive merch, and front-of-line
              entry — for those who run with the crew.
            </p>
          </div>
          <a href="#" className="notify-btn flex-shrink-0">Learn More</a>
        </motion.div>
      </div>
    </section>
  );
}