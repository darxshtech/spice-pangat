"use client";
import { useState, useEffect } from "react";
import { Reveal } from "./Motion";

export default function GuestEmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check if previously subscribed in browser
    try {
      const saved = localStorage.getItem("spice_pangat_subscribed");
      if (saved) {
        setStatus("success");
      }
    } catch {
      // LocalStorage access safe fallback
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate gentle registration delay
    setTimeout(() => {
      setStatus("success");
      try {
        localStorage.setItem("spice_pangat_subscribed", email);
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  return (
    <section id="email-signup" className="email-capture section section-tint" aria-labelledby="email-capture-title">
      <div className="container email-capture__container">
        <Reveal className="email-capture__card">
          <div className="email-capture__ornament" aria-hidden="true">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
              <path d="M0 10C10 10 10 2 20 2C30 2 30 10 40 10C30 10 30 18 20 18C10 18 10 10 0 10Z" stroke="var(--gold)" strokeWidth="1.2" strokeOpacity="0.8" />
              <circle cx="20" cy="10" r="2.5" fill="var(--chilli)" />
            </svg>
          </div>

          <p className="eyebrow center">Table Invitations · Early Access</p>
          <h2 id="email-capture-title" className="email-capture__title">
            Hear about the next <em>pangat</em> first.
          </h2>
          <p className="email-capture__desc">
            Our gatherings seat only 20–24 guests around one shared table and often fill quickly. Leave your email, and we will quietly send you upcoming dates, secret menus, and private booking links before public release.
          </p>

          {status === "success" ? (
            <div className="email-capture__success" role="status">
              <div className="email-capture__success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="email-capture__success-heading">You&apos;re on our priority guest list!</h3>
              <p className="email-capture__success-text">
                Thank you for joining our circle. You will be the first to know whenever we announce our next supper club date in Northwood.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="email-capture__form" noValidate>
              <div className="email-capture__input-group">
                <label htmlFor="guest-email" className="visually-hidden">
                  Your email address
                </label>
                <input
                  id="guest-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="email-capture__input"
                  required
                  disabled={status === "submitting"}
                />
                <button
                  type="submit"
                  className="btn email-capture__btn"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Joining..." : "Join Priority List"}
                </button>
              </div>

              {status === "error" && (
                <p className="email-capture__error" role="alert">
                  {errorMessage}
                </p>
              )}

              <p className="email-capture__promise">
                <span className="lock-icon" aria-hidden="true">🔒</span>
                No marketing clutter. We only write when a table is laid. Unsubscribe anytime with one tap.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
