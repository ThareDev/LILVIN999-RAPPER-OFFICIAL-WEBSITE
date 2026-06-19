import Image from "next/image";
import portrait from "@/public/about.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#080F14" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;700&family=Permanent+Marker&display=swap');

        /* faded watermark behind section */
        .about-stroke {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(57,255,20,0.06);
        }

        /* genre tags */
        .about-tag {
          font-family: 'Oswald', sans-serif;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(57,255,20,0.7);
          border: 1px solid rgba(57,255,20,0.2);
          padding: 6px 14px;
          transition: border-color 0.25s, color 0.25s, background 0.25s;
          cursor: default;
        }
        .about-tag:hover {
          border-color: #39FF14;
          color: #39FF14;
          background: rgba(57,255,20,0.06);
          box-shadow: 0 0 12px rgba(57,255,20,0.12);
        }

        /* primary CTA */
        .about-btn-solid {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #080F14;
          background: #39FF14;
          padding: 13px 30px;
          border: none;
          cursor: pointer;
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
          box-shadow: 0 0 18px rgba(57,255,20,0.3);
          text-decoration: none;
          display: inline-block;
        }
        .about-btn-solid:hover {
          background: #fff;
          box-shadow: 0 0 24px rgba(57,255,20,0.2);
          transform: translateY(-2px);
        }

        /* ghost CTA */
        .about-btn-ghost {
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00A3FF;
          background: transparent;
          border: 1.5px solid #00A3FF;
          padding: 12px 30px;
          cursor: pointer;
          transition: border-color 0.25s, color 0.25s, box-shadow 0.25s, transform 0.25s;
          text-decoration: none;
          display: inline-block;
        }
        .about-btn-ghost:hover {
          border-color: #00A3FF;
          color: #fff;
          box-shadow: 0 0 20px rgba(0,163,255,0.3);
          transform: translateY(-2px);
        }
      `}</style>

      {/* large faded watermark */}
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

      {/* dot grid accent top-right */}
      <div
        className="absolute right-0 top-0 w-72 h-72 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "radial-gradient(rgba(0,163,255,0.2) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(ellipse 70% 70% at 100% 0%, black 0%, transparent 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── IMAGE SIDE ── */}
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
                style={{ filter: "contrast(1.05) brightness(0.95) saturate(0.9)" }}
              />
              {/* bottom gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(8,15,20,0.9) 100%)",
                }}
              />
              {/* subtle electric blue glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,163,255,0.08) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* frame accents */}
            <div
              className="absolute -bottom-4 -right-4 w-3/4 h-3/4 -z-10 hidden sm:block"
              style={{ border: "1px solid rgba(57,255,20,0.18)" }}
            />
            <div
              className="absolute -top-4 -left-4 w-24 h-24 hidden sm:block"
              style={{ borderTop: "1px solid #00A3FF", borderLeft: "1px solid #00A3FF" }}
            />

            {/* quote tag */}
            <div className="absolute bottom-6 left-0 right-0 px-6">
              <blockquote
                style={{
                  fontFamily: "'Permanent Marker', cursive",
                  fontSize: "clamp(15px, 2vw, 21px)",
                  color: "#fff",
                  lineHeight: 1.4,
                  transform: "rotate(-1deg)",
                }}
              >
                &ldquo;The block raised me,{" "}
                <span style={{ color: "#39FF14" }}>the booth saved me.&rdquo;</span>
              </blockquote>
            </div>

            {/* advisory badge */}
            <div
              className="absolute top-5 left-5 z-10"
              style={{
                border: "1.5px solid rgba(57,255,20,0.4)",
                padding: "3px 7px",
                fontFamily: "'Oswald', sans-serif",
                fontSize: 8,
                letterSpacing: "0.1em",
                color: "rgba(57,255,20,0.7)",
                lineHeight: 1.2,
                background: "rgba(8,15,20,0.7)",
              }}
            >
              PARENTAL
              <br />
              ADVISORY
            </div>
          </div>

          {/* ── TEXT SIDE ── */}
          <div className="order-1 lg:order-2">
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <div style={{ width: 32, height: 1, background: "#39FF14", opacity: 0.5 }} />
              <span
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#00A3FF",
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
                  WebkitTextStroke: "1.5px #39FF14",
                  textShadow: "none",
                }}
              >
                LILVIN999
              </span>
            </h2>

            <div
              className="space-y-4"
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 16,
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.5)",
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
                <span style={{ color: "#39FF14" }}>Trust nobody. Fear none.</span>{" "}
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
              <a href="#music" className="about-btn-solid">Listen Now</a>
              <a href="#contact" className="about-btn-ghost">Book Me</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}