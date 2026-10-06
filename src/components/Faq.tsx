"use client";

import { useId, useState } from "react";
import { d } from "@/lib/motion";
import Reveal from "./Reveal";

const QA = [
  {
    q: "Do I need a new phone number?",
    a: "No. Customers keep calling the number they already know. There’s no new line to promote and no app for them to learn.",
  },
  {
    q: "What’s in the text I get?",
    a: "The caller’s name, their number, the service address, and what they need. One quick glance tells you who needs you and where to call back.",
  },
  {
    q: "Will she quote prices or book jobs?",
    a: "No. She doesn’t quote prices or make appointments on your behalf. She captures the request and hands it back to you.",
  },
  {
    q: "When does she pick up?",
    a: "After hours, and as overflow when every hand is busy — the calls that land while you can’t take them.",
  },
  {
    q: "What does it cost, and am I locked in?",
    a: "One plan: $990 to set up, then $497 a month. No surprise tiers and no long-term contract. Cancel with 30 days’ notice.",
  },
  {
    q: "Is it a fit for my trade?",
    a: "It’s built for small U.S. field-service teams: HVAC, plumbing, electrical, garage door, locksmith, pool, pest, roofing, auto repair, and other local trades.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const base = useId();

  return (
    <Reveal id="faq" className="bg-paper py-28 lg:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow rv text-ink/60">Common questions</p>
          <h2 className="h2 mt-7">
            <span className="ml">
              <span>A few straight</span>
            </span>
            <span className="ml">
              <span style={d(0.08)}>
                <em>answers.</em>
              </span>
            </span>
          </h2>
        </div>

        <ul className="border-t border-ink/12">
          {QA.map((item, i) => {
            const isOpen = open === i;
            const id = `${base}-${i}`;
            return (
              <li key={item.q} className="rv border-b border-ink/12" style={d(0.05 * i)}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.12rem] font-medium tracking-[-0.012em] sm:py-7 sm:text-[1.28rem]"
                  >
                    <span className="transition-transform duration-500 group-hover:translate-x-1">{item.q}</span>
                    <span
                      data-open={isOpen}
                      className="plus relative grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-ink/15 transition-[background-color,color,box-shadow] duration-300 group-hover:ring-ink"
                    >
                      <i />
                      <i />
                    </span>
                  </button>
                </h3>
                <div id={id} role="region" aria-label={item.q} className="acc" data-open={isOpen}>
                  <div>
                    <p className="max-w-[38rem] pb-8 pr-12 leading-relaxed text-ink/68">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
