"use client";

import { useEffect, useRef, useState } from "react";
import { d } from "@/lib/motion";
import Reveal from "./Reveal";
import { CheckIcon, PhoneIcon } from "./icons";

const DAY = [
  { t: "8:12 AM", what: "Driving" },
  { t: "10:47 AM", what: "Diagnosing" },
  { t: "1:30 PM", what: "Lifting" },
  { t: "4:05 PM", what: "Quoting" },
  { t: "7:04 PM", what: "The last job" },
];

/**
 * A working day as a timeline. As you scroll, a line runs through it, and every call it reaches flips
 * from "went to voicemail" to "answered, lead texted". Scroll drives it, so the reader sets the pace.
 */
export default function Cost() {
  const track = useRef<HTMLOListElement>(null);
  const [kept, setKept] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      const raf = requestAnimationFrame(() => setKept(DAY.length));
      return () => cancelAnimationFrame(raf);
    }

    let raf = 0;
    const apply = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.45 + r.height * 0.5)));
      el.style.setProperty("--p", p.toFixed(4));
      setKept(p < 0.02 ? 0 : Math.min(DAY.length, Math.floor((p - 0.02) * DAY.length) + 1));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      } else {
        window.removeEventListener("scroll", onScroll);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Reveal id="cost" className="bg-sand py-28 lg:py-40">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow rv text-ink/60">The cost of &ldquo;I&rsquo;ll call back&rdquo;</p>
            <h2 className="h2 mt-7">
              <span className="ml">
                <span>The call you miss is</span>
              </span>
              <span className="ml">
                <span style={d(0.08)}>usually the job you never</span>
              </span>
              <span className="ml">
                <span style={d(0.16)}>
                  <em>hear about again.</em>
                </span>
              </span>
            </h2>
          </div>
          <p className="lede rv text-ink/70" style={d(0.25)}>
            Field-service work doesn&rsquo;t happen from a desk. You&rsquo;re driving, diagnosing, lifting, quoting, or finishing the last job of the
            day.
          </p>
        </div>

        <div className="rv mt-16 rounded-[28px] bg-paper p-6 shadow-[0_1px_0_rgba(11,31,51,0.05),0_30px_60px_-50px_rgba(11,31,51,0.35)] sm:p-10 lg:mt-20" style={d(0.1)}>
          <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
            <span>A Tuesday in the field</span>
            <span className="hidden sm:inline">Calls that land while you can&rsquo;t answer</span>
          </div>

          <ol ref={track} className="relative mt-10 grid gap-9 md:grid-cols-5 md:gap-5">
            {/* the rail and the line that runs along it */}
            <span aria-hidden className="absolute bottom-3 left-[10.5px] top-3 w-px bg-ink/12 md:bottom-auto md:left-0 md:right-0 md:top-[49px] md:h-px md:w-auto">
              <span className="tl-fill absolute inset-0 bg-ink" />
            </span>

            {DAY.map((e, i) => (
              <li key={e.t} data-kept={i < kept} className="relative pl-11 md:pl-0">
                <span className="block h-[18px] font-mono text-[11.5px] leading-[18px] text-ink/50">{e.t}</span>

                <span aria-hidden className="absolute left-0 top-0 grid h-[22px] w-[22px] place-items-center md:relative md:my-5">
                  <span className="tl-ping absolute inset-0 grid place-items-center rounded-full border border-signal bg-paper">
                    <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                  </span>
                  <span className="tl-kept absolute inset-0 grid place-items-center rounded-full bg-ink text-paper">
                    <CheckIcon className="h-3 w-3" />
                  </span>
                </span>

                <p className="tl-what mt-1 font-serif text-[1.75rem] leading-tight text-ink/55 md:mt-0">{e.what}</p>

                <span className="mt-2 block h-6 overflow-hidden text-[13px]">
                  <span className="tl-flip block">
                    <span className="flex h-6 items-center gap-1.5 text-signal">
                      <PhoneIcon className="h-3 w-3" /> Went to voicemail
                    </span>
                    <span className="flex h-6 items-center gap-1.5 font-medium text-ink">
                      <CheckIcon className="h-3.5 w-3.5" /> Answered, lead texted
                    </span>
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="rv mx-auto mt-16 max-w-[44rem] text-center font-serif text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.2] tracking-[-0.01em]">
          Kept Job is there for the calls that land <em>while you can&rsquo;t be.</em>
        </p>
      </div>
    </Reveal>
  );
}
