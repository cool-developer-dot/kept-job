"use client";

import { useEffect, useRef, useState } from "react";
import { d } from "@/lib/motion";
import { CheckIcon, Mark, PhoneIcon, Wave } from "./icons";

/** How long each scene holds (ms): the phone rings → Kept Job is on the line → the text lands. */
const HOLD = [2600, 6600, 5800];
const CAPTIONS = ["7:04 PM. You’re on a roof.", "Kept Job answers.", "Your phone buzzes with the lead."];

const LINES = [
  { who: "kj", text: "Thanks for calling. What’s going on?", at: 0.35 },
  { who: "caller", text: "Our AC’s blowing warm air, and we’ve got a newborn.", at: 1.5 },
  { who: "kj", text: "Let’s get you a call back tonight. Your name and address?", at: 3 },
  { who: "caller", text: "Dana Whitfield. 1418 Larkspur Lane.", at: 4.4 },
];

const FIELDS = [
  { k: "Number", at: 0.7 },
  { k: "Issue", at: 2.3 },
  { k: "Name", at: 5 },
  { k: "Address", at: 5.3 },
];

/**
 * The hero story on a phone, looping. Only the active scene (and the one fading out beneath it) is mounted,
 * and each scene remounts when it comes round again so its entrance animations replay.
 * Pauses off-screen; reduced-motion users get the final scene, still.
 */
export default function CallDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setStep(2));
      return () => cancelAnimationFrame(raf);
    }
    let s = 0;
    let timer = 0;
    const next = () => {
      timer = window.setTimeout(() => {
        s += 1;
        setStep(s);
        next();
      }, HOLD[s % 3]);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearTimeout(timer);
        setLive(e.isIntersecting);
        if (e.isIntersecting) next();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const phase = step % 3;
  const prev = step > 0 ? (step - 1) % 3 : -1;
  const layer = (i: number) =>
    i === phase ? "z-20 opacity-100 transition-opacity duration-700" : i === prev ? "z-10 opacity-100" : "z-0 opacity-0";
  const scene = (i: number) => (i === phase ? step : i === prev ? step - 1 : null);

  return (
    <div
      ref={ref}
      data-live={live}
      role="img"
      aria-label="Example: a call at 7:04 PM goes unanswered, Kept Job picks up, and the caller's name, number, address and issue arrive as a text."
      className="demo relative mx-auto w-fit"
    >
      {/* the caption that narrates each scene */}
      <div aria-hidden className="absolute -top-6 left-1/2 z-30 -translate-x-1/2 sm:-left-24 sm:top-[16%] sm:translate-x-0 lg:-left-32">
        <p
          key={phase}
          className="chip-in flex items-center whitespace-nowrap gap-2.5 rounded-full bg-paper py-2.5 pl-3.5 pr-4 text-[13.5px] font-medium shadow-[0_14px_40px_-16px_rgba(11,31,51,0.4)] ring-1 ring-ink/[0.07]"
        >
          <span className={`h-2 w-2 rounded-full ${phase === 0 ? "live-blink bg-signal" : "bg-ink"}`} />
          {CAPTIONS[phase]}
        </p>
      </div>

      <div
        aria-hidden
        className={`relative h-[580px] w-[284px] rounded-[46px] bg-ink p-[8px] shadow-[0_60px_110px_-50px_rgba(11,31,51,0.6),0_30px_60px_-34px_rgba(11,31,51,0.4),inset_0_0_0_1px_rgba(255,255,255,0.1)] sm:h-[612px] sm:w-[300px] ${
          phase === 2 ? "buzz" : ""
        }`}
      >
        <div className="relative h-full overflow-hidden rounded-[38px] bg-[#0e2741] text-paper">
          <div className="absolute left-1/2 top-[10px] z-40 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-x-0 top-0 z-30 flex h-[46px] items-center justify-between px-7 text-[12.5px] font-semibold">
            <span>{phase === 2 ? "7:06" : "7:04"}</span>
            <span className="flex items-center gap-1">
              <span className="flex items-end gap-[2px]">
                {[4, 6, 8, 10].map((h) => (
                  <i key={h} className="block w-[3px] rounded-[1px] bg-paper" style={{ height: h }} />
                ))}
              </span>
              <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-paper/60 p-[1.5px]">
                <span className="block h-full w-3/4 rounded-[1px] bg-paper" />
              </span>
            </span>
          </div>

          {[Ringing, OnCall, LockScreen].map((Scene, i) => {
            const k = scene(i);
            return (
              <div key={i} className={`absolute inset-0 ${layer(i)}`}>
                {k !== null && <Scene key={k} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Ringing() {
  return (
    <div className="flex h-full flex-col items-center bg-[radial-gradient(120%_70%_at_50%_0%,#1f4369_0%,#0e2741_55%,#0b1f33_100%)] px-6 pt-24">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/50">Incoming call</p>
      <p className="mt-3 font-serif text-[2.2rem] leading-none tracking-[-0.01em]">(512) 555-0148</p>
      <p className="mt-2 text-[13px] text-paper/50">Austin, TX</p>

      <div className="relative mt-20 grid h-24 w-24 place-items-center">
        {[0, 0.8, 1.6].map((s) => (
          <span key={s} className="ripple absolute inset-0 rounded-full border border-paper/40" style={d(s)} />
        ))}
        <span className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-paper text-ink">
          <PhoneIcon className="ring-shake h-6 w-6" />
        </span>
      </div>

      <div className="relative mb-12 mt-auto flex h-[58px] w-full items-center rounded-full bg-paper/10 p-[5px]">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-ink">
          <PhoneIcon className="h-5 w-5" />
        </span>
        <span className="shimmer absolute inset-0 grid place-items-center pl-10 text-[14px]">slide to answer</span>
      </div>
    </div>
  );
}

function OnCall() {
  return (
    <div className="flex h-full flex-col bg-[#0e2741] px-3.5 pt-14">
      <div className="bubble flex items-center gap-3 rounded-2xl bg-paper/[0.07] p-3">
        <Mark tone="paper" className="h-9 w-9" />
        <div className="min-w-0 flex-1">
          <p className="text-[13.5px] font-medium">Kept Job</p>
          <p className="flex items-center gap-1.5 text-[11.5px] text-paper/55">
            <span className="live-blink h-1.5 w-1.5 rounded-full bg-[#6fd3a0]" /> On the line
          </p>
        </div>
        <Wave bars={7} className="mr-1 h-5 text-paper/80" />
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-2.5">
        {LINES.map((l) => (
          <p
            key={l.text}
            style={d(l.at)}
            className={`bubble max-w-[86%] rounded-[18px] px-3.5 py-2.5 text-[13px] leading-snug ${
              l.who === "kj" ? "self-start rounded-bl-md bg-paper/[0.1] text-paper/90" : "self-end rounded-br-md bg-paper text-ink"
            }`}
          >
            {l.text}
          </p>
        ))}
      </div>

      <div className="mb-7 mt-3 rounded-2xl border border-paper/10 p-3">
        <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/45">Captured</p>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {FIELDS.map((f) => (
            <span key={f.k} style={d(f.at)} className="field flex items-center gap-1.5 rounded-lg bg-paper/[0.06] px-2 py-1.5 text-[12px] text-paper/85">
              <CheckIcon className="h-3 w-3" /> {f.k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LockScreen() {
  return (
    <div className="flex h-full flex-col items-center bg-[radial-gradient(90%_60%_at_50%_100%,#27507a_0%,#0e2741_55%,#0b1f33_100%)] px-3 pt-[70px]">
      <p className="text-[13px] font-medium text-paper/70">Tuesday, June 9</p>
      <p className="mt-1 text-[4.6rem] font-extralight leading-none tracking-[-0.04em]">7:06</p>

      <div className="mt-10 w-full space-y-2">
        <div style={d(0.6)} className="notif rounded-[20px] bg-paper/95 p-3.5 text-ink shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2">
            <Mark className="h-5 w-5" />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">Kept Job</span>
            <span className="ml-auto text-[11px] text-ink/45">now</span>
          </div>
          <p className="mt-2 text-[14px] font-semibold">New call: Dana Whitfield</p>
          <div className="mt-1 space-y-0.5 text-[12.5px] leading-snug text-ink/75">
            <p>(512) 555-0148</p>
            <p>1418 Larkspur Ln, Round Rock</p>
            <p>AC blowing warm. Newborn at home &mdash; wants a call tonight.</p>
          </div>
        </div>

        <div style={d(0.15)} className="notif flex items-center gap-2.5 rounded-[18px] bg-paper/[0.12] p-3 text-[12.5px]">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-signal text-paper">
            <PhoneIcon className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="font-medium">Missed call</p>
            <p className="text-paper/60">(512) 555-0148 &middot; 7:04 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
