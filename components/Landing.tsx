"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, MapPin, Send } from "lucide-react";

const FORMSPREE_URL = "https://formspree.io/f/mpqgyvad";
const NURSES_ONBOARDED = 7;

/* ============================================================
   Brand mark: the ram on a dark rounded square
   ============================================================ */
function RamMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-xl bg-ink-primary"
      style={{ width: size, height: size }}
    >
      <Image
        src="/ram.png"
        alt=""
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        priority
      />
    </div>
  );
}

/* ============================================================
   Animated number helper
   ============================================================ */
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (display === value) return;
    const diff = value - display;
    const steps = 24;
    const stepSize = diff / steps;
    let current = display;
    let count = 0;
    const interval = setInterval(() => {
      count++;
      current += stepSize;
      if (count >= steps) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        setDisplay(Math.round(current));
      }
    }, 24);
    return () => clearInterval(interval);
  }, [value, display]);

  return <>{display.toLocaleString()}</>;
}

/* ============================================================
   "This Week" animated mockup
   ============================================================ */
function ThisWeekMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [1800, 2000, 2000, 2000, 2000, 5000];
    const timeout = setTimeout(() => setStep((s) => (s + 1) % 6), timings[step]);
    return () => clearTimeout(timeout);
  }, [step]);

  const TOTAL_HOURS = 52;
  const TOTAL_AMOUNT = 1820;

  const state = [
    { hoursWorked: 0, amountEarned: 0, label: "Sunday morning" },
    { hoursWorked: 10, amountEarned: 350, label: "Monday morning" },
    { hoursWorked: 20, amountEarned: 700, label: "Wednesday morning" },
    { hoursWorked: 30, amountEarned: 1050, label: "Thursday morning" },
    { hoursWorked: 40, amountEarned: 1400, label: "Friday morning" },
    { hoursWorked: 52, amountEarned: 1820, label: "End of week" },
  ][step];

  const workedPct = (state.hoursWorked / TOTAL_HOURS) * 100;

  const scheduledDays = [0, 2, 3, 4, 5];
  const workedDaysByStep: number[][] = [
    [],
    [0],
    [0, 2],
    [0, 2, 3],
    [0, 2, 3, 4],
    [0, 2, 3, 4, 5],
  ];

  return (
    <div className="relative mx-auto min-h-[340px] w-full max-w-[380px] rounded-3xl bg-elevated p-8 shadow-[0_30px_60px_-20px_rgba(52,72,84,0.15),0_0_0_1px_rgba(52,72,84,0.06)]">
      <div className="absolute right-5 top-4 text-[10px] font-medium uppercase tracking-[0.15em] text-ink-muted opacity-60">
        {state.label}
      </div>

      <div className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        This week
      </div>

      <div className="mb-5 flex min-h-[56px] items-baseline gap-3">
        <div
          className="min-w-[180px] font-display text-5xl font-light leading-none tracking-tight text-ink-primary"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <span className="align-top text-[26px] text-ink-muted">$</span>
          <AnimatedNumber value={state.amountEarned} />
        </div>
        <div
          className="whitespace-nowrap text-[13px] text-ink-muted"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          of ${TOTAL_AMOUNT.toLocaleString()}
        </div>
      </div>

      <div className="mb-3 h-2 overflow-hidden rounded-full bg-recessed">
        <div
          className="h-full bg-brand-green transition-[width] duration-[900ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ width: `${workedPct}%` }}
        />
      </div>

      <div className="mb-8 flex items-center gap-5 text-xs text-ink-muted">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-brand-green" />
          <span>
            <strong
              className="font-semibold text-ink-primary"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <AnimatedNumber value={state.hoursWorked} />h
            </strong>{" "}
            worked
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-brand-turquoise-deep" />
          <span>
            <strong className="font-semibold text-ink-primary">{TOTAL_HOURS}h</strong>{" "}
            scheduled
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
          const isScheduled = scheduledDays.includes(i);
          const isWorked = workedDaysByStep[step].includes(i);

          return (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-lg text-[11px] font-semibold transition-all duration-500 ${
                isWorked
                  ? "bg-brand-green text-elevated"
                  : isScheduled
                    ? "border-[1.5px] border-brand-turquoise-deep bg-transparent text-brand-turquoise-deep"
                    : "bg-canvas-soft text-ink-muted"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Submit-hours animated mockup: report becomes a sent text
   ============================================================ */
function SubmitMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [3200, 5000];
    const timeout = setTimeout(() => setStep((s) => (s + 1) % 2), timings[step]);
    return () => clearTimeout(timeout);
  }, [step]);

  const shifts = [
    { day: "Sun, Jun 23", hours: "10h", amount: 350 },
    { day: "Tue, Jun 25", hours: "10h", amount: 350 },
    { day: "Wed, Jun 26", hours: "10h", amount: 350 },
    { day: "Thu, Jun 27", hours: "10h", amount: 350 },
    { day: "Fri, Jun 28", hours: "12h", amount: 420 },
  ];

  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[380px] overflow-hidden rounded-3xl bg-elevated shadow-[0_30px_60px_-20px_rgba(52,72,84,0.15),0_0_0_1px_rgba(52,72,84,0.06)]">
      {/* Beat 1: the hours report */}
      <div
        className="pointer-events-none absolute inset-0 p-8 transition-all duration-[600ms] ease-out"
        style={{
          opacity: step === 0 ? 1 : 0,
          transform: step === 0 ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
          Hours report
        </div>
        <div className="mb-6 font-display text-[22px] font-medium text-ink-primary">
          Jun 23 to Jun 29
        </div>

        <div className="mb-5 flex flex-col gap-3">
          {shifts.map((shift, i) => (
            <div key={i} className="flex items-baseline justify-between">
              <div className="text-[13px] text-ink-secondary">{shift.day}</div>
              <div className="flex items-baseline gap-4">
                <span className="text-xs text-ink-muted">{shift.hours}</span>
                <span
                  className="min-w-[44px] text-right text-[13px] font-medium text-ink-primary"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  ${shift.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-baseline justify-between border-t border-recessed pt-4">
          <div className="text-[13px] font-semibold text-ink-primary">Total · 52h</div>
          <div
            className="font-display text-2xl text-brand-green"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            $1,820
          </div>
        </div>

        <div className="flex gap-2.5">
          <div className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-ink-primary px-4 py-3 text-[13px] font-medium text-ink-on-dark">
            <Send size={13} /> Send as text
          </div>
          <div className="flex flex-1 items-center justify-center rounded-xl border border-recessed px-4 py-3 text-[13px] font-medium text-ink-primary">
            Download PDF
          </div>
        </div>
      </div>

      {/* Beat 2: the sent text message */}
      <div
        className="pointer-events-none absolute inset-0 flex flex-col p-8 transition-all duration-[600ms] ease-out"
        style={{
          opacity: step === 1 ? 1 : 0,
          transform: step === 1 ? "translateY(0)" : "translateY(12px)",
        }}
      >
        <div className="mb-6 border-b border-recessed pb-4 text-center">
          <div className="mb-1.5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-canvas-soft text-base font-semibold text-ink-secondary">
            M
          </div>
          <div className="text-[13px] font-semibold text-ink-primary">Maria · Admin</div>
        </div>

        <div className="flex justify-end">
          <div
            className="max-w-[85%] whitespace-pre-line rounded-[18px_18px_4px_18px] bg-brand-green px-4 py-3.5 text-[13px] leading-relaxed text-white"
            style={{
              fontVariantNumeric: "tabular-nums",
              transform: step === 1 ? "scale(1)" : "scale(0.92)",
              transition: "transform 0.5s cubic-bezier(0.34, 1.4, 0.64, 1) 0.3s",
            }}
          >
            {`Hours for Jun 23 to 29

Sun 23 · 10h
Tue 25 · 10h
Wed 26 · 10h
Thu 27 · 10h
Fri 28 · 12h

Total: 52h · $1,820`}
          </div>
        </div>

        <div
          className="mt-2 pr-1 text-right text-[11px] text-ink-muted"
          style={{
            opacity: step === 1 ? 1 : 0,
            transition: "opacity 0.4s ease 1.1s",
          }}
        >
          Delivered
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Owed mockup (static with count-up on mount)
   ============================================================ */
function OwedMockup() {
  const [owed, setOwed] = useState(0);

  useEffect(() => {
    const target = 1850;
    const steps = 60;
    let current = 0;
    const increment = target / steps;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setOwed(target);
        clearInterval(interval);
      } else {
        setOwed(Math.floor(current));
      }
    }, 1400 / steps);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[360px] rounded-3xl bg-elevated p-7 shadow-[0_30px_60px_-20px_rgba(52,72,84,0.15),0_0_0_1px_rgba(52,72,84,0.06)]">
      <div className="mb-8 flex items-center gap-2.5">
        <RamMark size={28} />
        <div>
          <div className="font-display text-[15px] font-medium leading-none text-ink-primary">
            Hearth
          </div>
          <div className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            by Nomeas
          </div>
        </div>
      </div>

      <div className="mb-1.5 text-xs font-medium text-ink-secondary">You&apos;re owed</div>
      <div
        className="font-display text-[56px] font-light leading-none tracking-tight text-ink-primary"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span className="align-top text-[28px] text-ink-muted">$</span>
        {owed.toLocaleString()}
      </div>
      <div className="mt-2.5 text-xs text-ink-muted">From 3 clients</div>
      <div className="mt-1 text-xs text-ink-muted">
        $200 received, pending shift allocation.
      </div>

      <div className="mb-3.5 mt-7 text-[9px] font-medium uppercase tracking-[0.18em] text-ink-muted">
        Recent shifts
      </div>
      <div className="flex flex-col gap-3">
        {[
          { client: "Smith family", date: "Mon, Jun 23 · 10h", amount: 350, paid: false },
          { client: "Johnson family", date: "Sat, Jun 21 · 10h", amount: 350, paid: true },
        ].map((shift, i) => (
          <div key={i} className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-ink-primary">{shift.client}</div>
              <div className="mt-0.5 text-[11px] text-ink-muted">{shift.date}</div>
            </div>
            <div
              className={`text-xs font-medium ${shift.paid ? "text-brand-green" : "text-ink-secondary"}`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              ${shift.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Tonight mockup (static)
   ============================================================ */
function TonightMockup() {
  return (
    <div className="mx-auto w-full max-w-[360px] rounded-3xl bg-ink-primary p-7 shadow-[0_30px_60px_-20px_rgba(52,72,84,0.25)]">
      <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-turquoise">
        Tonight
      </div>
      <div className="mb-1.5 font-display text-[22px] font-medium leading-tight text-ink-on-dark">
        Smith family
      </div>
      <div className="mb-4 text-[13px] text-brand-turquoise">9:00 PM to 7:00 AM</div>
      <div
        className="font-display text-[28px] font-light text-brand-turquoise"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        $350
      </div>
      <div className="mt-6 rounded-xl border border-brand-turquoise/15 bg-brand-turquoise/10 p-3">
        <div className="text-xs leading-normal text-ink-on-dark">
          1247 Park Slope, Brooklyn, NY
        </div>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-brand-turquoise">
          Open in Maps <ArrowRight size={10} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Join form
   ============================================================ */
function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", role: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          contact: formData.contact,
          about: formData.role,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again, or email us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again, or email us directly.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border-2 border-brand-green bg-elevated p-10 text-center sm:p-12">
        <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green">
          <Check size={28} color="white" />
        </div>
        <h3 className="mb-3 font-display text-2xl font-medium text-ink-primary">Got it.</h3>
        <p className="text-[15px] leading-relaxed text-ink-secondary">
          The founder will reach out within a day or two. Thanks for being part of the
          first hundred.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-recessed bg-elevated p-6 sm:p-8"
    >
      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-primary">
          Your name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-[10px] border border-recessed bg-canvas px-3.5 py-3 text-[15px] text-ink-primary outline-none focus:border-brand-green"
          placeholder="e.g. Ada Williams"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-primary">
          Phone or email
        </label>
        <input
          type="text"
          required
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="w-full rounded-[10px] border border-recessed bg-canvas px-3.5 py-3 text-[15px] text-ink-primary outline-none focus:border-brand-green"
          placeholder="Whichever you use most"
        />
      </div>

      <div className="mb-7">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink-primary">
          Tell us about your work
        </label>
        <textarea
          required
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          rows={3}
          className="w-full resize-y rounded-[10px] border border-recessed bg-canvas px-3.5 py-3 text-[15px] text-ink-primary outline-none focus:border-brand-green"
          placeholder="Night nurse with newborns? NCS? Postpartum doula? Sharing this on behalf of someone? A sentence is enough."
        />
      </div>

      {error ? (
        <p className="mb-4 text-[13px] text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-primary px-6 py-3.5 text-[15px] font-medium text-ink-on-dark transition-transform active:scale-[0.98] disabled:opacity-60"
      >
        <Send size={14} /> {sending ? "Sending..." : "Send to founder"}
      </button>
    </form>
  );
}

/* ============================================================
   The page
   ============================================================ */
export function Landing() {
  return (
    <div className="min-h-screen bg-canvas text-ink-primary">
      {/* ===== HEADER ===== */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7 lg:px-8">
        <div className="flex items-center gap-3">
          <RamMark size={44} />
          <div>
            <div className="font-display text-[22px] font-medium leading-none text-ink-primary">
              nomeas
            </div>
            <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-ink-muted">
              est. 2026
            </div>
          </div>
        </div>
        <a
          href="#join"
          className="text-[13px] font-medium text-brand-green no-underline"
        >
          Join the first 100 →
        </a>
      </header>

      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="max-w-[720px]">
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green lg:mb-7">
            Tools for night care work
          </div>
          <h1 className="mb-6 font-display text-[40px] font-light leading-[1.08] tracking-tight text-ink-primary sm:text-5xl lg:text-[64px] xl:text-[72px]">
            For the people who care for newborns{" "}
            <em className="italic text-brand-green">at night.</em>
          </h1>
          <p className="mb-10 max-w-[560px] text-[17px] leading-relaxed text-ink-secondary lg:text-lg xl:max-w-[620px] xl:text-xl">
            Nomeas builds tools for night nurses, newborn care specialists, and
            postpartum doulas. Our first product,{" "}
            <strong className="font-semibold text-ink-primary">Hearth</strong>, is a
            private ledger for the nurse. Log your shifts, track what&apos;s owed, get
            paid faster.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#join"
              className="inline-flex items-center gap-2 rounded-xl bg-ink-primary px-7 py-3.5 text-sm font-medium text-ink-on-dark no-underline transition-transform active:scale-[0.98]"
            >
              Join the first 100 <ArrowRight size={14} />
            </a>
            <a
              href="#story"
              className="text-sm font-medium text-ink-secondary no-underline"
            >
              Or read the story →
            </a>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT MOMENT 1: You're owed ===== */}
      <section className="bg-canvas-soft px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              The ledger
            </div>
            <h2 className="mb-5 font-display text-[32px] font-normal leading-tight tracking-tight text-ink-primary lg:text-[40px] xl:text-[46px]">
              See what you&apos;re owed, at a glance.
            </h2>
            <p className="mb-4 max-w-[460px] text-base leading-relaxed text-ink-secondary">
              Log a shift in 10 seconds. Watch the running total update. Know exactly
              which families owe you what, and when payments arrive.
            </p>
            <p className="max-w-[460px] text-base leading-relaxed text-ink-secondary">
              A paper trail for a paperless workflow.
            </p>
          </div>
          <OwedMockup />
        </div>
      </section>

      {/* ===== PRODUCT MOMENT 2: This Week (animated) ===== */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Your week, in motion
            </div>
            <h2 className="mb-5 font-display text-[32px] font-normal leading-tight tracking-tight text-ink-primary lg:text-[40px] xl:text-[46px]">
              Watch what you&apos;re building.
            </h2>
            <p className="mb-4 max-w-[460px] text-base leading-relaxed text-ink-secondary">
              Every shift you log ticks the number up. Every hour you work fills the
              bar. Not a spreadsheet. A running picture of what your week is becoming.
            </p>
            <p className="max-w-[460px] text-base leading-relaxed text-ink-secondary">
              When you&apos;re working through the night, seeing the goal helps.
            </p>
          </div>
          <ThisWeekMockup />
        </div>
      </section>

      {/* ===== PRODUCT MOMENT 3: Tonight ===== */}
      <section className="bg-canvas-soft px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div className="md:order-2">
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Tonight
            </div>
            <h2 className="mb-5 font-display text-[32px] font-normal leading-tight tracking-tight text-ink-primary lg:text-[40px] xl:text-[46px]">
              Show up at the right house.
            </h2>
            <p className="mb-4 max-w-[460px] text-base leading-relaxed text-ink-secondary">
              Every shift lives in one place. Tap the address and Maps opens with the
              route ready. No scrolling a text thread at 8:45 PM trying to find the
              house number.
            </p>
            <p className="max-w-[460px] text-base leading-relaxed text-ink-secondary">
              The next address is always one tap away.
            </p>
          </div>
          <div className="md:order-1">
            <TonightMockup />
          </div>
        </div>
      </section>

      {/* ===== PRODUCT MOMENT 4: Submit as text (animated) ===== */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div>
            <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Submitting hours
            </div>
            <h2 className="mb-5 font-display text-[32px] font-normal leading-tight tracking-tight text-ink-primary lg:text-[40px] xl:text-[46px]">
              Your hours, as a text. Ready to send.
            </h2>
            <p className="mb-4 max-w-[460px] text-base leading-relaxed text-ink-secondary">
              It&apos;s Sunday morning after five night shifts. The last thing you want
              is to rebuild your week from memory, scrolling texts for dates and doing
              math on the back of a receipt.
            </p>
            <p className="mb-4 max-w-[460px] text-base leading-relaxed text-ink-secondary">
              Hearth writes the whole week up as a plain text message. Copy it, send it
              to your admin, done. No app she has to download. No attachment she
              can&apos;t open at 7 AM. It arrives the way she already works: as a text.
            </p>
            <p className="max-w-[460px] text-base leading-relaxed text-ink-secondary">
              Work for yourself? Download the same report as a clean PDF instead.
            </p>
          </div>
          <SubmitMockup />
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section id="story" className="bg-ink-primary px-6 py-20 text-ink-on-dark lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[800px]">
          <div className="mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-turquoise">
            Why Nomeas exists
          </div>
          <h2 className="mb-9 font-display text-[34px] font-light leading-tight tracking-tight text-ink-on-dark lg:text-[44px] xl:text-[52px]">
            The shepherd, in the background.
          </h2>
          <p className="mb-5 text-[17px] leading-[1.7] text-ink-on-dark/85">
            In ancient Greek,{" "}
            <em className="italic text-brand-turquoise">nomeús</em> meant shepherd. The
            one who guides and protects a flock, who knows each animal by name, who
            works quietly through nights and seasons so the herd can thrive.
          </p>
          <p className="mb-5 text-[17px] leading-[1.7] text-ink-on-dark/85">
            We don&apos;t broker the relationships. We don&apos;t take a cut of every
            shift. We don&apos;t tell you where to work or who to work for.
          </p>
          <p className="text-[17px] leading-[1.7] text-ink-on-dark/85">
            We build infrastructure for a category of professional who&apos;s never had
            any. Tools that respect the work. Systems that catch what gets dropped.{" "}
            <strong className="font-medium text-brand-turquoise">
              Quiet support for the work you already do beautifully.
            </strong>
          </p>
        </div>
      </section>

      {/* ===== ROAD TO 100 ===== */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="mb-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Phase one · in progress
          </div>
          <h2 className="mb-7 font-display text-[34px] font-light leading-tight tracking-tight text-ink-primary lg:text-[44px] xl:text-[52px]">
            Road to 100.
          </h2>
          <p className="mx-auto mb-6 max-w-[580px] text-[17px] leading-relaxed text-ink-secondary">
            The founder is personally onboarding the first 100 nurses. Five to twenty
            minutes per call. The calls are activation and research. Every conversation
            teaches us what to build next.
          </p>
          <p className="mx-auto mb-12 max-w-[580px] text-[17px] leading-relaxed text-ink-secondary">
            Hearth is free. It stays free.
          </p>

          <div className="mx-auto max-w-[480px] rounded-2xl border border-recessed bg-elevated p-8">
            <div className="mb-2 font-display text-[64px] font-light leading-none tracking-tight text-brand-green lg:text-7xl">
              {NURSES_ONBOARDED}
            </div>
            <div className="text-sm text-ink-muted">
              nurses onboarded · {100 - NURSES_ONBOARDED} to go
            </div>
          </div>
        </div>
      </section>

      {/* ===== JOIN ===== */}
      <section id="join" className="bg-canvas-soft px-6 py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[560px]">
          <div className="mb-7 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Join the first 100
          </div>
          <h2 className="mb-6 text-center font-display text-[34px] font-light leading-tight tracking-tight text-ink-primary lg:text-[44px] xl:text-[52px]">
            Tell us about you.
          </h2>
          <p className="mb-12 text-center text-base leading-relaxed text-ink-secondary">
            We&apos;ll be in touch within a day or two. The founder onboards every nurse
            personally. No automated funnels.
          </p>

          <JoinForm />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-ink-primary px-6 py-12 text-ink-on-dark lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <RamMark size={36} />
            <div>
              <div className="font-display text-lg font-medium text-brand-turquoise">
                nomeas
              </div>
              <div className="mt-0.5 text-xs opacity-60">
                The shepherd, in the background.
              </div>
            </div>
          </div>
          <div className="text-[13px] opacity-70">
            Benedicta Gokah · benedicta.gokah@gmail.com
          </div>
        </div>
      </footer>
    </div>
  );
}
