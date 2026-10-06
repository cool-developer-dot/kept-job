import type { CSSProperties } from "react";
import { d } from "@/lib/motion";
import { BOOK_HREF } from "@/lib/site";
import Reveal from "./Reveal";
import { ArrowIcon, Btn, CheckIcon } from "./icons";

const INCLUDED = [
  "After-hours answering",
  "Overflow when every hand is busy",
  "A clean text for every call",
  "Works on the number you already have",
];

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/** The price rolls into place like a counter, one digit after another. */
function Odometer({ value }: { value: string }) {
  return (
    <span aria-hidden className="inline-flex">
      {value.split("").map((ch, i) => (
        <span key={i} className="odo-win">
          <span className="odo-col" style={{ "--n": Number(ch), "--d": `${0.2 + i * 0.14}s` } as CSSProperties}>
            {DIGITS.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Pricing() {
  return (
    <Reveal id="pricing" className="bg-sand py-28 lg:py-40">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_minmax(0,500px)] lg:gap-20">
        <div>
          <p className="eyebrow rv text-ink/60">Simple pricing</p>
          <h2 className="h2 mt-7">
            <span className="ml">
              <span>A steady answer,</span>
            </span>
            <span className="ml">
              <span style={d(0.08)}>
                <em>without a call-center</em>
              </span>
            </span>
            <span className="ml">
              <span style={d(0.16)}>
                <em>contract.</em>
              </span>
            </span>
          </h2>
          <p className="lede rv mt-8 max-w-[28rem] text-ink/70" style={d(0.25)}>
            One plan for after-hours and overflow coverage. No surprise tiers. No long-term lock-in.
          </p>
        </div>

        <div
          className="rv relative overflow-hidden rounded-[32px] bg-ink p-8 text-paper shadow-[0_50px_90px_-50px_rgba(11,31,51,0.7)] sm:p-10"
          style={d(0.15)}
        >
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(247,245,239,0.12),transparent)]" />

          <div className="flex items-center justify-between">
            <p className="font-serif text-[2rem] italic leading-none">Pulse</p>
            <span className="rounded-full border border-paper/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/70">One plan</span>
          </div>

          <p className="mt-10 flex items-start font-serif leading-none">
            <span className="sr-only">$497 per month</span>
            <span aria-hidden className="mt-2 text-[2rem] text-paper/70">
              $
            </span>
            <span className="text-[clamp(5rem,11vw,7.5rem)] tracking-[-0.03em]">
              <Odometer value="497" />
            </span>
            <span aria-hidden className="ml-2 self-end pb-3 font-sans text-[15px] text-paper/60">
              /month
            </span>
          </p>
          <p className="mt-3 text-[15px] text-paper/70">+ $990 one-time setup</p>

          <ul className="mt-9 space-y-3 border-t border-paper/12 pt-7">
            {INCLUDED.map((x) => (
              <li key={x} className="flex items-center gap-3 text-[15px] text-paper/85">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-paper/10">
                  <CheckIcon className="h-3 w-3" />
                </span>
                {x}
              </li>
            ))}
          </ul>

          <Btn href={BOOK_HREF} label="Book 20 minutes" variant="paper" className="mt-10 w-full" icon={<ArrowIcon className="arr order-last h-4 w-4" />} />
          <p className="mt-4 text-center text-[13px] text-paper/50">Cancel with 30 days&rsquo; notice.</p>
        </div>
      </div>
    </Reveal>
  );
}
