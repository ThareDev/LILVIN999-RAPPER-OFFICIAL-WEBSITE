"use client";

import { useEffect, useRef, useState } from "react";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    description: "",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => {
        setForm({ name: "", email: "", mobile: "", description: "" });
        setFormState("idle");
        setErrorMsg("");
      }, 300);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { name, email, mobile, description } = form;
    if (!name || !email || !mobile || !description) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    setErrorMsg("");
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFormState("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&display=swap');

        .cp-input {
          width: 100%;
          color: #fff;
          font-size: 13px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          background: rgba(57,255,20,0.03);
          border: 1px solid rgba(57,255,20,0.12);
          font-family: 'Oswald', sans-serif;
        }
        .cp-input::placeholder { color: rgba(255,255,255,0.2); }
        .cp-input:focus {
          border-color: rgba(57,255,20,0.4);
          box-shadow: 0 0 0 3px rgba(57,255,20,0.06);
        }
        .cp-input:disabled { opacity: 0.45; cursor: not-allowed; }

        .cp-label {
          display: block;
          font-family: 'Oswald', sans-serif;
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(57,255,20,0.5);
          margin-bottom: 8px;
        }

        .cp-submit {
          width: 100%;
          padding: 15px;
          font-family: 'Oswald', sans-serif;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #080F14;
          background: #39FF14;
          border: none;
          cursor: pointer;
          clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
          transition: background 0.25s, box-shadow 0.25s, transform 0.25s;
          box-shadow: 0 0 20px rgba(57,255,20,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .cp-submit:hover:not(:disabled) {
          background: #fff;
          box-shadow: 0 0 28px rgba(57,255,20,0.15);
          transform: translateY(-1px);
        }
        .cp-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .cp-close {
          position: absolute;
          top: 16px; right: 16px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(57,255,20,0.35);
          transition: color 0.2s;
          background: none; border: none; cursor: pointer;
        }
        .cp-close:hover { color: #39FF14; }
        .cp-close svg { transition: transform 0.2s; }
        .cp-close:hover svg { transform: rotate(90deg); }
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`
          fixed inset-0 z-50 flex items-center justify-center px-4
          transition-all duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{ background: "rgba(8,15,20,0.92)", backdropFilter: "blur(10px)" }}
      >
        {/* Panel */}
        <div
          className={`
            relative w-full max-w-lg
            transition-all duration-300
            ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
          `}
          style={{
            background: "#0A1520",
            border: "1px solid rgba(57,255,20,0.15)",
            boxShadow:
              "0 0 0 1px rgba(57,255,20,0.06), 0 40px 80px rgba(0,0,0,0.9), inset 0 1px 0 rgba(57,255,20,0.04)",
          }}
        >
          {/* top accent line — neon green gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #39FF14 40%, rgba(0,163,255,0.6) 70%, transparent)",
            }}
          />

          {/* close button */}
          <button onClick={onClose} className="cp-close" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="p-8 lg:p-10">
            {formState === "success" ? (
              /* ── Success State ── */
              <div className="text-center py-8">
                {/* checkmark circle */}
                <div
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
                  style={{
                    border: "1.5px solid #39FF14",
                    boxShadow: "0 0 20px rgba(57,255,20,0.2), inset 0 0 20px rgba(57,255,20,0.04)",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "#39FF14" }}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#00A3FF",
                    marginBottom: 12,
                  }}
                >
                  Message Sent
                </div>

                <h3
                  style={{
                    fontFamily: "'Anton', sans-serif",
                    fontSize: "clamp(28px, 5vw, 36px)",
                    textTransform: "uppercase",
                    color: "#fff",
                    marginBottom: 10,
                  }}
                >
                  We&apos;ll be in touch.
                </h3>

                <p
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.03em",
                  }}
                >
                  LILVIN999&apos;s team will get back to you shortly.
                </p>

                <button
                  onClick={onClose}
                  style={{
                    marginTop: 32,
                    padding: "12px 36px",
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    background: "transparent",
                    color: "#39FF14",
                    border: "1.5px solid #39FF14",
                    cursor: "pointer",
                    transition: "background 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(57,255,20,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(57,255,20,0.2)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <>
                <div className="mb-8">
                  <div
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#00A3FF",
                      marginBottom: 10,
                    }}
                  >
                    Booking &amp; Press
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      fontSize: "clamp(32px, 5vw, 42px)",
                      textTransform: "uppercase",
                      lineHeight: 0.95,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    GET IN{" "}
                    <span
                      style={{
                        color: "transparent",
                        WebkitTextStroke: "1.5px #39FF14",
                        textShadow: "none",
                      }}
                    >
                      TOUCH
                    </span>
                  </h2>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="cp-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="cp-input"
                        disabled={formState === "loading"}
                      />
                    </div>
                    <div>
                      <label className="cp-label">Mobile</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="+94 XX XXX XXXX"
                        className="cp-input"
                        disabled={formState === "loading"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="cp-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="cp-input"
                      disabled={formState === "loading"}
                    />
                  </div>

                  <div>
                    <label className="cp-label">Message</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry — booking, features, press, brand deals..."
                      rows={4}
                      className="cp-input"
                      style={{ resize: "none" }}
                      disabled={formState === "loading"}
                    />
                  </div>
                </div>

                {/* Error */}
                {errorMsg && (
                  <p
                    style={{
                      marginTop: 10,
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.05em",
                      color: "#ff4444",
                    }}
                  >
                    ⚠ {errorMsg}
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={formState === "loading"}
                  className="cp-submit mt-6"
                >
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                <p
                  style={{
                    marginTop: 14,
                    textAlign: "center",
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.18)",
                  }}
                >
                  We typically respond within 24–48 hours
                </p>
              </>
            )}
          </div>

          {/* bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.2) 50%, transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
}