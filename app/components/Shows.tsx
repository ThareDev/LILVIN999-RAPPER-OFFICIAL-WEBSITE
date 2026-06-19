"use client";

import { motion } from "framer-motion";

const shows = [
  {
    date: "2026",
    day: "June 13",
    event: "කැරැල්ල",
    city: "Galle",
    venue: "Samanala Grounds",
    country: "Sri Lanka",
    status: "On Sale",
    sold: false,
    ticketUrl:
      "https://keralla.kodikaraentertainments.com/?fbclid=IwZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQPMjc1MjU0NjkyNTk4Mjc5AAEeR2EDGVpNBL3zuvjHJvJ93dCqldKjWlipHKuDKzNtavRx0pE_09Pv8b5Ddcc_aem_rWTPu6_RWu0SKcgMAFsMLw",
  },
  {
    date: "2026",
    day: "July 05",
    event: "Megha Naadha 360",
    city: "Tokyo",
    venue: "TBA",
    country: "Japan",
    status: "On Sale",
    sold: false,
    ticketUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSe5Gy5vDwE1b0lNoh-dkCuyZZ3RdQGM9VOYbBECXaJ53KXnzQ/viewform",
  },
];

export default function Shows() {
  return (
    <section
      id="shows"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: "#0A0F14" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Permanent+Marker&display=swap');

        .stub-card {
          position: relative;
          background: #0D1620;
          border: 1px solid rgba(46,74,61,0.3);
          clip-path: polygon(
            0 0, 100% 0, 100% calc(100% - 6px),
            calc(100% - 6px) 100%, 0 100%
          );
          transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
          overflow: hidden;
        }
        .stub-card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, transparent, #2E4A3D, transparent);
          opacity: 0.6;
        }
        .stub-card:hover {
          border-color: rgba(107,124,115,0.5);
          background: #132B24;
          transform: translateX(6px);
        }
        .stub-card .perf {
          position: absolute;
          top: 0; bottom: 0;
          width: 1px;
          background-image: repeating-linear-gradient(
            to bottom, rgba(107,124,115,0.3) 0, rgba(107,124,115,0.3) 5px, transparent 5px, transparent 11px
          );
        }

        .ticket-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #070C0A;
          background: #6B7C73;
          padding: 10px 22px;
          border: none;
          cursor: pointer;
          position: relative;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .ticket-btn:hover { background: #fff; transform: translateY(-2px); }

        .notify-btn {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #6B7C73;
          background: transparent;
          border: 1px solid #2E4A3D;
          padding: 9px 22px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .notify-btn:hover { border-color: #6B7C73; color: #fff; transform: translateY(-2px); }

        .status-live {
          position: relative;
          color: #6B7C73;
        }
        .status-live::before {
          content: '';
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #6B7C73;
          margin-right: 6px;
          box-shadow: 0 0 8px rgba(107,124,115,0.8);
          animation: blink-dot 1.6s ease-in-out infinite;
        }
        @keyframes blink-dot { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

        .vip-box {
          position: relative;
          background: linear-gradient(120deg, rgba(46,74,61,0.12) 0%, transparent 60%);
          border: 1px solid rgba(61,86,102,0.3);
        }
        .vip-box::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 90px; height: 90px;
          background: radial-gradient(circle, rgba(107,124,115,0.15) 0%, transparent 70%);
        }
      `}</style>

      {/* left accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(46,74,61,0.7), transparent)" }}
      />

      {/* huge faded year watermark, sliding */}
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
            WebkitTextStroke: "1px rgba(107,124,115,0.12)",
            lineHeight: 1,
          }}
        >
          2026
        </span>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
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
              <div style={{ width: 32, height: 1, background: "#2E4A3D" }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: "#3D5666",
                }}
              >
                Live & Direct
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
                color: "#6B7C73",
                marginTop: 10,
                transform: "rotate(-1deg)",
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
              className={`stub-card ${show.sold ? "opacity-50" : ""}`}
            >
              <div className="perf" style={{ left: "84px" }} />
              <div className="flex items-center gap-4 lg:gap-8 px-5 lg:px-7 py-5 lg:py-6 pl-7 lg:pl-9">
                {/* date block */}
                <div className="flex-shrink-0 w-16 lg:w-20 text-center">
                  <div
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(20px, 2vw, 26px)",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {show.date}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(107,124,115,0.6)",
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
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#6B7C73",
                      marginBottom: 4,
                    }}
                  >
                    {show.event}
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: "clamp(18px, 2vw, 26px)",
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
                        color: "rgba(61,86,102,0.9)",
                      }}
                    >
                      {show.country}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 13,
                      color: "rgba(107,124,115,0.55)",
                      marginTop: 3,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {show.venue}
                  </div>
                </div>

                {/* status + cta */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className={`hidden sm:block status-live`}
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {show.status}
                  </span>
                  {!show.sold ? (
                    <a
                      href={show.ticketUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ticket-btn flex-shrink-0"
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
                        color: "rgba(107,124,115,0.35)",
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
                color: "#3D5666",
                marginBottom: 8,
              }}
            >
              Exclusive Access
            </div>
            <h3
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(26px, 3.5vw, 38px)",
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
                color: "rgba(107,124,115,0.7)",
                maxWidth: 420,
                lineHeight: 1.7,
              }}
            >
              Meet & greet, soundcheck access, exclusive merch, and front-of-line
              entry — for those who run with the crew.
            </p>
          </div>
          <a href="#" className="notify-btn flex-shrink-0">
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}