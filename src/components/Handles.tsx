"use client";

import { useEffect, useRef, useState } from "react";
import { d } from "@/lib/motion";
import Reveal from "./Reveal";
import { Mark, Wave } from "./icons";

/** How long each call type plays before the next one (ms). */
const DWELL = 8200;

const BOXES = ["Telephoned", "Please call back", "Urgent", "Will call again"];

/** Illustrative calls. Her lines never promise, price or decide — she takes the message. */
const CALLS = [
  {
    title: "Repair requests",
    body: "Urgent issues, routine repairs, and what the caller is seeing.",
    time: "9:14 PM",
    caller: "Marcus Hale",
    phone: "(512) 555-0162",
    convo: [
      ["caller", "Water’s coming through the ceiling under the upstairs bath."],
      ["kj", "Is it still coming through right now?"],
      ["caller", "Slowly. We’ve got a bucket under it."],
    ],
    checks: [true, true, true, false],
    note: "Active leak through the ceiling below the upstairs bath. Bucket under it.",
    stamp: "Urgent",
    red: true,
  },
  {
    title: "Quote requests",
    body: "Enough context for you to decide whether and when to call back.",
    time: "7:36 PM",
    caller: "Priya Shah",
    phone: "(512) 555-0127",
    convo: [
      ["caller", "What would it take to move my panel to 200 amps?"],
      ["kj", "I’ll get that to the team. What’s in there now?"],
      ["caller", "A 100-amp panel. The house is from ’78."],
    ],
    checks: [true, true, false, false],
    note: "Wants a quote: 100A to 200A panel, 1978 house. Flexible on timing.",
    stamp: "Quote",
    red: false,
  },
  {
    title: "Where’s my tech?",
    body: "She notes the message so your customer gets a real response from your team.",
    time: "3:52 PM",
    caller: "Ellen Ortiz",
    phone: "(512) 555-0183",
    convo: [
      ["caller", "He said two o’clock. It’s almost four."],
      ["kj", "I’m sorry about the wait. I’ll pass this to the team now."],
      ["caller", "Okay. I’m home all afternoon."],
    ],
    checks: [true, true, true, false],
    note: "Tech was due at 2:00, not there at 3:52. Home all afternoon.",
    stamp: "Call back",
    red: true,
  },
  {
    title: "Billing messages",
    body: "A clear message, with no promises or policy decisions made on your behalf.",
    time: "8:20 PM",
    caller: "Tom Becker",
    phone: "(512) 555-0119",
    convo: [
      ["caller", "I think I was charged twice for last week’s visit."],
      ["kj", "I can’t make billing changes, but I’ll pass this straight to the team."],
      ["caller", "That works. Thanks."],
    ],
    checks: [true, true, false, false],
    note: "Thinks last week’s visit was charged twice. Wants it looked at.",
    stamp: "No promises made",
    red: false,
  },
];

export default function Handles() {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [live, setLive] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStill(true));
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cycling = live && !hold && !still;
  useEffect(() => {
    if (!cycling) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % CALLS.length), DWELL);
    return () => window.clearTimeout(t);
  }, [active, cycling]);

  const c = CALLS[active];

  return (
    <Reveal id="handles" className="bg-paper py-28 lg:py-40">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow rv text-ink/60">What she handles</p>
            <h2 className="h2 mt-7">
              <span className="ml">
                <span>The conversations that</span>
              </span>
              <span className="ml">
                <span style={d(0.08)}>
                  should not end at <em>voicemail.</em>
                </span>
              </span>
            </h2>
          </div>
          <p className="lede rv text-ink/65" style={d(0.2)}>
            Every one ends the same way: a clear message on your desk, ready when you are.
          </p>
        </div>

        <div
          ref={stage}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-14"
        >
          {/* ---------- the four kinds of call ---------- */}
          <ul className="rv self-center border-b border-ink/12" style={d(0.1)}>
            {CALLS.map((call, i) => {
              const on = i === active;
              return (
                <li key={call.title} className="relative border-t border-ink/12">
                  <span aria-hidden className="absolute -top-px left-0 h-px w-full">
                    {on && (
                      <span
                        key={`${active}-${cycling}`}
                        className={`absolute inset-0 origin-left bg-ink ${cycling ? "tile-prog" : "opacity-0"}`}
                        style={{ animationDuration: `${DWELL}ms` }}
                      />
                    )}
                  </span>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex w-full items-baseline gap-5 py-5 text-left sm:py-6"
                  >
                    <span className={`font-mono text-[11px] tracking-[0.14em] transition-colors duration-500 ${on ? "text-signal" : "text-ink/35"}`}>0{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-serif text-[1.75rem] leading-[1.05] tracking-[-0.015em] transition-[color,transform] duration-500 sm:text-[2.2rem] ${
                          on ? "text-ink" : "text-ink/35 group-hover:translate-x-1 group-hover:text-ink/70"
                        }`}
                      >
                        {call.title}
                      </span>
                      <span className="acc" data-open={on}>
                        <span>
                          <span className="block max-w-[24rem] pt-2.5 text-[15px] leading-relaxed text-ink/65">{call.body}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* ---------- the desk: the call, then the message it becomes ---------- */}
          <div
            aria-live="polite"
            className="rv relative overflow-hidden rounded-[32px] bg-sand p-4 sm:min-h-[690px] sm:p-8"
            style={d(0.2)}
          >
            <div aria-hidden className="desk-lines pointer-events-none absolute inset-0" />

            <div key={active} className="relative sm:min-h-[626px]">
              {/* the call */}
              <div className="bubble relative max-w-[440px] rounded-[24px] bg-paper p-5 shadow-[0_24px_50px_-34px_rgba(11,31,51,0.45)] sm:p-6">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2.5 font-medium">
                    <Mark className="h-5 w-5" />
                    Kept Job
                    <Wave className="h-3.5 text-ink/70" />
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink/45">{c.time}</span>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  {c.convo.map(([who, line], i) => (
                    <p
                      key={line}
                      style={d(0.25 + i * 0.85)}
                      className={`bubble max-w-[88%] rounded-[18px] px-4 py-2.5 text-[14px] leading-snug ${
                        who === "kj" ? "self-start rounded-bl-md bg-sand text-ink/85" : "self-end rounded-br-md bg-ink text-paper"
                      }`}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* the message slip */}
              <div
                style={d(2.4)}
                className="slip slip-in relative z-10 mt-6 ml-auto w-[min(400px,100%)] rounded-[6px] px-6 pb-6 pt-7 shadow-[0_40px_70px_-36px_rgba(11,31,51,0.55),0_2px_6px_rgba(11,31,51,0.06)] sm:absolute sm:bottom-0 sm:right-0 sm:mt-0"
              >
                <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2">
                  <p className="font-serif text-[1.85rem] italic leading-none">While you were out</p>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45">No. 0{active + 1}</span>
                </div>

                <dl className="mt-3 grid grid-cols-[64px_1fr] gap-y-1.5 text-[13px]">
                  <dt className="font-mono text-[10px] uppercase leading-[22px] tracking-[0.16em] text-ink/45">Caller</dt>
                  <dd className="hand border-b border-ink/15 text-[1.35rem] leading-[22px]">
                    <span className="write inline-block" style={d(2.9)}>
                      {c.caller}
                    </span>
                  </dd>
                  <dt className="font-mono text-[10px] uppercase leading-[22px] tracking-[0.16em] text-ink/45">Phone</dt>
                  <dd className="hand border-b border-ink/15 text-[1.35rem] leading-[22px]">
                    <span className="write inline-block" style={d(3.2)}>
                      {c.phone}
                    </span>
                  </dd>
                </dl>

                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
                  {BOXES.map((b, i) => (
                    <span key={b} className="flex items-center gap-2 text-[12.5px] text-ink/75">
                      <span className="relative h-[15px] w-[15px] shrink-0 rounded-[3px] border-[1.5px] border-ink/50">
                        {c.checks[i] && (
                          <svg viewBox="0 0 20 20" aria-hidden className="check-draw absolute -left-[3px] -top-[7px] h-[22px] w-[22px] text-ink" style={d(3.5 + i * 0.18)}>
                            <path d="M3 11.5c1.6 1.2 3 2.8 4.4 5C9.8 11 13 6.4 18.5 2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" pathLength={1} />
                          </svg>
                        )}
                      </span>
                      {b}
                    </span>
                  ))}
                </div>

                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">Message</p>
                <p className="hand ruled mt-1 min-h-[96px] text-[1.4rem] text-ink/90">
                  <span className="write block" style={d(4.2)}>
                    {c.note}
                  </span>
                </p>

                <span
                  style={d(5.4)}
                  className={`stamp stamp-in absolute right-4 top-[62px] rounded-[6px] border-[2.5px] border-current px-3 py-1.5 font-mono text-[12.5px] font-bold uppercase tracking-[0.2em] ${
                    c.red ? "text-signal" : "text-ink-2"
                  }`}
                >
                  {c.stamp}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 border-t border-ink/12 pt-12 lg:mt-32 lg:grid-cols-[0.55fr_1.45fr] lg:gap-10">
          <p className="eyebrow rv text-ink/55">Where she stops</p>
          <p className="rv font-serif text-[clamp(1.9rem,3.6vw,3.1rem)] leading-[1.12] tracking-[-0.016em]" style={d(0.1)}>
            She doesn&rsquo;t quote prices or make fake appointments. She captures the request and{" "}
            <span className="relative whitespace-nowrap">
              <em>hands it back to you.</em>
              <svg aria-hidden viewBox="0 0 300 14" preserveAspectRatio="none" className="draw absolute -bottom-2 left-0 h-3 w-full text-signal">
                <path
                  d="M3 9.5C60 4 118 3.2 168 6.4S258 11.6 297 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  pathLength={1}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </Reveal>
  );
}
