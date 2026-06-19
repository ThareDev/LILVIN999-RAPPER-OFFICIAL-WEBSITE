import Image from "next/image";
import portrait from "@/public/about.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#0F1F16" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;700&family=Permanent+Marker&display=swap');

        .about-stroke {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(107,124,115,0.18);
        }
        .about-tag {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #6B7C73;
          border: 1px solid rgba(107,124,115,0.25);
          padding: 6px 14px;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          cursor: default;
        }
        .about-tag:hover {
          border-color: #2E4A3D;
          color: #fff;
          background: rgba(46,74,61,0.2);
        }
        .about-btn-solid {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #070C0A;
          background: #6B7C73;
          padding: 13px 30px;
          transition: background 0.25s, transform 0.25s;
        }
        .about-btn-solid:hover { background: #fff; transform: translateY(-2px); }
        .about-btn-ghost {
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #6B7C73;
          background: transparent;
          border: 1.5px solid #2E4A3D;
          padding: 12px 30px;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .about-btn-ghost:hover { border-color: #6B7C73; color: #fff; transform: translateY(-2px); }
      `}</style>

      {/* large faded watermark word */}
      <div className="absolute left-0 top-0 overflow-hidden select-none pointer-events-none">
        <span
          className="about-stroke block"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: "clamp(80px, 22vw, 300px)",
            lineHeight: 1,
            transform: "translate(-6%, -18%)",
          }}
        >
          REAL
        </span>
      </div>

      {/* dot grid accent */}
      <div
        className="absolute right-0 top-0 w-72 h-72 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(61,86,102,0.3) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(ellipse 70% 70% at 100% 0%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ── image side ── */}
          <div className="relative order-2 lg:order-1">
            <div
              className="relative aspect-[3/4] overflow-hidden"
              style={{ clipPath: "polygon(0 3%, 100% 0, 100% 97%, 0 100%)" }}
            >
              <Image
                src={portrait}
                alt="LILVIN999"
                fill
                className="object-cover object-top"
                style={{
                  filter: "contrast(1.1) brightness(0.7) saturate(0.5) sepia(0.12) hue-rotate(60deg)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,12,10,0.1) 0%, transparent 40%, rgba(7,12,10,0.85) 100%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, rgba(15,31,22,0.3) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* frame accents */}
            <div
              className="absolute -bottom-4 -right-4 w-3/4 h-3/4 -z-10"
              style={{ border: "1px solid rgba(46,74,61,0.5)" }}
            />
            <div
              className="absolute -top-4 -left-4 w-24 h-24"
              style={{ borderTop: "1px solid #3D5666", borderLeft: "1px solid #3D5666" }}
            />

            {/* quote tag */}
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <blockquote
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  fontSize: "clamp(17px, 2.2vw, 23px)",
                  color: "#fff",
                  lineHeight: 1.4,
                  transform: "rotate(-1deg)",
                }}
              >
                &ldquo;The block raised me,{" "}
                <span style={{ color: "#6B7C73" }}>the booth saved me.&rdquo;</span>
              </blockquote>
            </div>

            {/* small advisory badge */}
            <div
              className="absolute top-5 left-5 z-10"
              style={{
                border: "1.5px solid #6B7C73",
                padding: "3px 7px",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 8,
                letterSpacing: "0.1em",
                color: "#6B7C73",
                lineHeight: 1.2,
                background: "rgba(7,12,10,0.6)",
              }}
            >
              PARENTAL
              <br />
              ADVISORY
            </div>
          </div>

          {/* ── text side ── */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 32, height: 1, background: "#2E4A3D" }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#3D5666",
                }}
              >
                The Story
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(40px, 6vw, 64px)",
                lineHeight: 0.95,
                color: "#fff",
                textTransform: "uppercase",
                margin: "0 0 2rem",
              }}
            >
              Who Is
              <br />
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px #2E4A3D",
                }}
              >
                LILVIN999
              </span>
            </h2>

            <div
              className="space-y-4"
              style={{
                fontFamily: "'Barlow Condensed', 'Oswald', sans-serif",
                fontSize: 17,
                lineHeight: 1.8,
                color: "rgba(107,124,115,0.85)",
              }}
            >
              <p>
                Raised on the back streets where loyalty is currency and trust is rare,
                LILVIN999 turned silence into sound. His bars carry the weight of every
                block he came up on — raw, unfiltered, and built to last.
              </p>
              <p>
                Blending hard-hitting trap energy with melodic street storytelling, he
                crafts records that feel like a confession and a flex in the same breath.
                No gimmicks. No shortcuts. Just receipts.
              </p>
              <p>
                <span style={{ color: "#6B7C73" }}>Trust nobody. Fear none.</span>{" "}
                Every track is proof of where he&apos;s been and a warning of where he&apos;s headed.

              </p>
            </div>

            {/* tags */}
            <div className="flex flex-wrap gap-2 mt-8">
              {["Trap", "Street Rap", "Melodic Hooks", "Drill Influence", "Live Energy"].map(
                (tag) => (
                  <span key={tag} className="about-tag">
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#music" className="about-btn-solid">
                Listen Now
              </a>
              <a href="#contact" className="about-btn-ghost">
                Book Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}