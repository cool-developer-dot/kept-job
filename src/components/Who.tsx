"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { d } from "@/lib/motion";
import Reveal from "./Reveal";
import { CheckIcon, Mark } from "./icons";

/** How long each trade holds the spotlight before the next call "comes in" (ms). */
const DWELL = 3400;

const P = ({ d: path }: { d: string }) => <path d={path} pathLength={1} />;

const BLADE =
  "M16 14.2C15.4 10.6 16.8 7.6 19.4 7.3c2.3-.3 3 2.6.8 4.5-1.1 1-2.5 1.7-4.2 2.4";

/** Line icons, drawn stroke-by-stroke the first time the section comes into view. */
const ICONS: Record<string, ReactNode> = {
  HVAC: (
    <>
      <P d="M16 4a12 12 0 1 1 0 24a12 12 0 1 1 0-24" />
      <P d="M16 14.2a1.8 1.8 0 1 1 0 3.6a1.8 1.8 0 1 1 0-3.6" />
      {[0, 120, 240].map((r) => (
        <g key={r} transform={`rotate(${r} 16 16)`}>
          <P d={BLADE} />
        </g>
      ))}
    </>
  ),
  Plumbing: (
    <>
      <P d="M4 7h12a8 8 0 0 1 8 8v3" />
      <P d="M4 12h12a3 3 0 0 1 3 3v3" />
      <P d="M3 5v9" />
      <P d="M17.5 19h8" />
      <P d="M21.5 22.5c-1.4 1.7-2.2 2.9-2.2 3.8a2.2 2.2 0 0 0 4.4 0c0-.9-.8-2.1-2.2-3.8Z" />
    </>
  ),
  Electrical: <P d="M18 3 8 18h7.5L13 29l11-15.5h-7.5L18 3Z" />,
  "Garage door": (
    <>
      <P d="M4 14 16 5l12 9" />
      <P d="M7 12v15h18V12" />
      <P d="M10 27V17h12v10" />
      <P d="M10 20.5h12" />
      <P d="M10 24h12" />
    </>
  ),
  Locksmith: (
    <>
      <P d="M11 10.5a5.5 5.5 0 1 1 0 11a5.5 5.5 0 1 1 0-11" />
      <P d="M11 14.6a1.4 1.4 0 1 1 0 2.8a1.4 1.4 0 1 1 0-2.8" />
      <P d="M16.5 16H28" />
      <P d="M24 16v4" />
      <P d="M27.5 16v3" />
    </>
  ),
  Pool: (
    <>
      <P d="M11 4v15" />
      <P d="M19 4v15" />
      <P d="M11 9h8" />
      <P d="M11 14h8" />
      <P d="M3 23c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 6.5 0 4.3 1.6 6.5 0" />
      <P d="M3 27.5c2.2-1.6 4.3-1.6 6.5 0s4.3 1.6 6.5 0 4.3-1.6 6.5 0 4.3 1.6 6.5 0" />
    </>
  ),
  Pest: (
    <>
      <P d="M16 12c3 0 5 3.2 5 7.5S19 28 16 28s-5-4.2-5-8.5S13 12 16 12Z" />
      <P d="M16 7a2.6 2.6 0 1 1 0 5.2a2.6 2.6 0 1 1 0-5.2" />
      <P d="M14.5 7.5 12 4" />
      <P d="M17.5 7.5 20 4" />
      <P d="M16 14v13" />
      <P d="M11.3 16 6 13" />
      <P d="M11 20H5" />
      <P d="M11.6 24 6.5 27" />
      <P d="M20.7 16 26 13" />
      <P d="M21 20h6" />
      <P d="M20.4 24l5.1 3" />
    </>
  ),
  Roofing: (
    <>
      <P d="M2 17 16 6l14 11" />
      <P d="M6 14v13h20V14" />
      <P d="M21 10V5h3v7.5" />
      <P d="M10 20h4" />
      <P d="M18 20h4" />
      <P d="M14 23.5h4" />
    </>
  ),
  "Auto repair": (
    <P d="M21 4.5a6.5 6.5 0 0 0-6.2 8.6L4.5 23.4a2.8 2.8 0 0 0 4 4l10.3-10.3A6.5 6.5 0 0 0 27.5 11l-3.8 3.8-3.6-.7-.8-3.6 3.8-3.8A6.5 6.5 0 0 0 21 4.5Z" />
  ),
  Other: (
    <>
      <P d="M4 12h24v14H4z" />
      <P d="M12 12V8.5A1.5 1.5 0 0 1 13.5 7h5A1.5 1.5 0 0 1 20 8.5V12" />
      <P d="M4 18h24" />
      <P d="M14 18v3h4v-3" />
    </>
  ),
};

/** Example after-hours calls, one per trade (illustrative). */
const TRADES = [
  {
    name: "HVAC",
    time: "9:42 PM",
    call: "No heat, and the furnace keeps clicking.",
  },
  {
    name: "Plumbing",
    time: "10:15 PM",
    call: "Water heater’s leaking into the garage.",
  },
  {
    name: "Electrical",
    time: "7:58 PM",
    call: "Half the house just lost power.",
  },
  {
    name: "Garage door",
    time: "6:51 AM",
    call: "Spring snapped. My car’s stuck inside.",
  },
  {
    name: "Locksmith",
    time: "11:30 PM",
    call: "Locked out, and the keys are on the counter.",
  },
  {
    name: "Pool",
    time: "5:20 PM",
    call: "Pump’s humming, but nothing’s moving.",
  },
  {
    name: "Pest",
    time: "8:05 PM",
    call: "Wasps are getting in by the back door.",
  },
  {
    name: "Roofing",
    time: "9:10 PM",
    call: "The storm took shingles. It’s dripping inside.",
  },
  {
    name: "Auto repair",
    time: "6:40 PM",
    call: "Check-engine light, and it shakes at 40.",
  },
];

function TradeIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {ICONS[name]}
    </svg>
  );
}

export default function Who() {
  const board = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [live, setLive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* the next call comes in — unless the reader is pointing at a trade */
  const cycling = live && !hold && !still;
  useEffect(() => {
    if (!cycling) return;
    const t = window.setTimeout(
      () => setActive((a) => (a + 1) % TRADES.length),
      DWELL,
    );
    return () => window.clearTimeout(t);
  }, [active, cycling]);

  const t = TRADES[active];

  return (
    <Reveal
      id="who"
      className="relative isolate overflow-hidden bg-ink py-28 text-paper lg:py-40"
    >
      {/* backdrop: a dot grid that fades out from a soft glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(64,110,160,0.35),transparent)]" />
        <div className="absolute -bottom-60 -left-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(212,85,43,0.12),transparent)]" />
        <div className="who-dots absolute inset-0" />
      </div>

      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow rv text-paper/55">Who it&rsquo;s for</p>
            <h2 className="h2 mt-7">
              <span className="ml">
                <span>Built for the shops where</span>
              </span>
              <span className="ml">
                <span style={d(0.08)}>
                  <em>the owner still answers</em>
                </span>
              </span>
              <span className="ml">
                <span style={d(0.16)}>
                  <em>the phone.</em>
                </span>
              </span>
            </h2>
          </div>
          <p className="lede rv text-paper/65" style={d(0.25)}>
            Kept Job is for small U.S. field-service teams who need a reliable
            first answer after hours or when every hand is busy.
          </p>
        </div>

        <div
          ref={board}
          className="mt-16 grid gap-4 lg:mt-24 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-5"
        >
          {/* ---------- the call that just came in ---------- */}
          <div
            className="rv relative flex flex-col overflow-hidden rounded-[28px] bg-paper p-6 text-ink shadow-[0_50px_100px_-50px_rgba(0,0,0,0.8)] sm:p-9"
            style={d(0.1)}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Mark className="h-6 w-6" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                  Kept Job
                </span>
              </span>
              <span className="flex items-center gap-2 rounded-full bg-sand px-3 py-1.5 text-[12px] font-medium">
                <span className="live-blink h-1.5 w-1.5 rounded-full bg-signal" />{" "}
                After hours
              </span>
            </div>

            <div key={active} className="flex flex-1 flex-col">
              <div className="chip-in mt-9 flex items-center gap-4">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ink text-paper">
                  <span className="who-ring absolute inset-0 rounded-2xl border border-ink/30" />
                  <TradeIcon name={t.name} className="tdraw-now h-7 w-7" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                    Incoming &middot; {t.time}
                  </span>
                  <span className="mt-1 block font-serif text-[1.9rem] leading-none tracking-[-0.01em]">
                    {t.name}
                  </span>
                </span>
              </div>

              <blockquote
                className="bubble mt-8 font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] leading-[1.08] tracking-[-0.015em]"
                style={d(0.12)}
              >
                &ldquo;{t.call}&rdquo;
              </blockquote>

              <div className="mt-auto pt-10">
                <div className="flex flex-wrap gap-1.5">
                  {["Name", "Number", "Address", "Issue"].map((f, i) => (
                    <span
                      key={f}
                      className="field flex items-center gap-1.5 rounded-full bg-sand px-3 py-1.5 text-[12.5px] font-medium"
                      style={d(0.5 + i * 0.22)}
                    >
                      <CheckIcon className="h-3 w-3" /> {f}
                    </span>
                  ))}
                </div>
                <p
                  className="bubble mt-5 flex items-center gap-2.5 border-t border-ink/10 pt-5 text-[14px] text-ink/70"
                  style={d(1.5)}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-paper">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                  Texted to the owner. Call back when the job&rsquo;s done.
                </p>
              </div>
            </div>
          </div>

          {/* ---------- the trades ---------- */}
          <div
            className="grid grid-cols-3 gap-2.5 sm:gap-3"
            onMouseEnter={() => setHold(true)}
            onMouseLeave={() => setHold(false)}
          >
            {TRADES.map((tr, i) => {
              const on = i === active;
              return (
                <div key={tr.name} className="rv" style={d(0.15 + i * 0.05)}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className={`tile group relative flex h-[108px] w-full flex-col justify-between overflow-hidden rounded-[18px] p-3.5 text-left transition-[background-color,box-shadow,color] duration-500 sm:h-[150px] sm:rounded-[22px] sm:p-5 ${
                      on
                        ? "tile-on bg-paper/[0.1] text-paper shadow-[inset_0_0_0_1px_rgba(247,245,239,0.4)]"
                        : "bg-paper/[0.03] text-paper/65 shadow-[inset_0_0_0_1px_rgba(247,245,239,0.1)] hover:text-paper hover:shadow-[inset_0_0_0_1px_rgba(247,245,239,0.25)]"
                    }`}
                  >
                    <span className="flex items-start justify-between">
                      <TradeIcon
                        name={tr.name}
                        className="tdraw tile-icon h-7 w-7 sm:h-9 sm:w-9"
                      />
                      <span
                        className={`relative mt-1 h-2 w-2 rounded-full transition-colors duration-500 ${on ? "tile-ping bg-signal" : "bg-paper/15"}`}
                      />
                    </span>
                    <span>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40 sm:block">
                        {tr.time}
                      </span>
                      <span className="mt-1 block font-serif text-[1.1rem] leading-tight sm:text-[1.55rem]">
                        {tr.name}
                      </span>
                    </span>
                    {on && (
                      <span
                        key={`${active}-${cycling}`}
                        aria-hidden
                        className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-signal ${cycling ? "tile-prog" : "opacity-0"}`}
                        style={{ animationDuration: `${DWELL}ms` }}
                      />
                    )}
                  </button>
                </div>
              );
            })}

            <div
              className="rv col-span-3 flex h-16 items-center gap-4 rounded-[18px] px-4 text-paper/65 shadow-[inset_0_0_0_1px_rgba(247,245,239,0.1)] [background:repeating-linear-gradient(135deg,rgba(247,245,239,0.03)_0_10px,transparent_10px_20px)] sm:rounded-[22px] sm:px-5"
              style={d(0.6)}
            >
              <TradeIcon name="Other" className="tdraw h-7 w-7 shrink-0" />
              <span className="font-serif text-[1.25rem] leading-none sm:text-[1.5rem]">
                And other <em>local trades</em>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
