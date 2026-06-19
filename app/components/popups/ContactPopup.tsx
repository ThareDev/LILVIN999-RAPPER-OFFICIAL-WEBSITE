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
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      `}</style>

      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className={`
          fixed inset-0 z-50 flex items-center justify-center px-4
          bg-black/85 backdrop-blur-sm
          transition-all duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        style={{ backdropFilter: "blur(8px)" }}
      >
        {/* Panel */}
        <div
          className={`
            relative w-full max-w-lg
            border
            transition-all duration-300
            ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
          `}
          style={{
            background: "#0D1620",
            borderColor: "rgba(107,124,115,0.15)",
            boxShadow:
              "0 0 0 1px rgba(46,74,61,0.25), 0 40px 80px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2E4A3D 30%, #6B7C73 70%, transparent)",
            }}
          />

          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors group"
            style={{ color: "rgba(107,124,115,0.5)" }}
            aria-label="Close"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="group-hover:rotate-90 transition-transform duration-200 group-hover:text-white"
            >
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>

          <div className="p-8 lg:p-10">
            {formState === "success" ? (
              /* ── Success State ── */
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border"
                  style={{ borderColor: "rgba(46,74,61,0.5)" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: "#6B7C73" }}>
                    <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div
                  className="text-xs tracking-[0.3em] uppercase mb-3"
                  style={{ color: "#6B7C73", fontFamily: "'Oswald', sans-serif" }}
                >
                  Message Sent
                </div>
                <h3
                  className="text-3xl uppercase tracking-tight text-white mb-3"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  We&apos;ll be in touch.
                </h3>
                <p
                  className="text-sm tracking-wide"
                  style={{ color: "rgba(107,124,115,0.55)", fontFamily: "'Oswald', sans-serif" }}
                >
                  LILVIN999&apos;s team will get back to you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-85"
                  style={{
                    background: "#6B7C73",
                    color: "#070C0A",
                    fontFamily: "'Oswald', sans-serif",
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              /* ── Form State ── */
              <>
                <div className="mb-8">
                  <div
                    className="text-xs tracking-[0.3em] uppercase mb-3"
                    style={{ color: "#6B7C73", fontFamily: "'Oswald', sans-serif" }}
                  >
                    Booking &amp; Press
                  </div>
                  <h2
                    className="text-4xl uppercase leading-none text-white"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    GET IN{" "}
                    <span style={{ color: "transparent", WebkitTextStroke: "1.5px #2E4A3D" }}>
                      TOUCH
                    </span>
                  </h2>
                </div>

                {/* Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: "rgba(107,124,115,0.5)", fontFamily: "'Oswald', sans-serif" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full text-white text-sm px-4 py-3 outline-none transition-colors"
                        style={{
                          background: "rgba(107,124,115,0.05)",
                          border: "1px solid rgba(107,124,115,0.15)",
                          fontFamily: "'Oswald', sans-serif",
                        }}
                        disabled={formState === "loading"}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[10px] tracking-[0.25em] uppercase mb-2"
                        style={{ color: "rgba(107,124,115,0.5)", fontFamily: "'Oswald', sans-serif" }}
                      >
                        Mobile
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="+94 XX XXX XXXX"
                        className="w-full text-white text-sm px-4 py-3 outline-none transition-colors"
                        style={{
                          background: "rgba(107,124,115,0.05)",
                          border: "1px solid rgba(107,124,115,0.15)",
                          fontFamily: "'Oswald', sans-serif",
                        }}
                        disabled={formState === "loading"}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[10px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "rgba(107,124,115,0.5)", fontFamily: "'Oswald', sans-serif" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full text-white text-sm px-4 py-3 outline-none transition-colors"
                      style={{
                        background: "rgba(107,124,115,0.05)",
                        border: "1px solid rgba(107,124,115,0.15)",
                        fontFamily: "'Oswald', sans-serif",
                      }}
                      disabled={formState === "loading"}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-[10px] tracking-[0.25em] uppercase mb-2"
                      style={{ color: "rgba(107,124,115,0.5)", fontFamily: "'Oswald', sans-serif" }}
                    >
                      Message
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry — booking, features, press, brand deals..."
                      rows={4}
                      className="w-full text-white text-sm px-4 py-3 outline-none transition-colors resize-none"
                      style={{
                        background: "rgba(107,124,115,0.05)",
                        border: "1px solid rgba(107,124,115,0.15)",
                        fontFamily: "'Oswald', sans-serif",
                      }}
                      disabled={formState === "loading"}
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p
                    className="mt-3 text-xs tracking-wide"
                    style={{ color: "#6B7C73", fontFamily: "'Oswald', sans-serif" }}
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={formState === "loading"}
                  className="mt-6 w-full py-4 text-xs font-bold tracking-[0.25em] uppercase transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{
                    background: "#6B7C73",
                    color: "#070C0A",
                    fontFamily: "'Oswald', sans-serif",
                  }}
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
                  className="mt-4 text-center text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(107,124,115,0.35)", fontFamily: "'Oswald', sans-serif" }}
                >
                  We typically respond within 24–48 hours
                </p>
              </>
            )}
          </div>

          {/* bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px opacity-40"
            style={{
              background: "linear-gradient(90deg, transparent, #2E4A3D 50%, transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
}