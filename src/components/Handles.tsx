import { d } from "@/lib/motion";
import Reveal from "./Reveal";
import { Wave } from "./icons";

const CALLS = [
  {
    title: "Repair requests",
    body: "Urgent issues, routine repairs, and what the caller is seeing.",
    quote: "Water’s coming through the ceiling under the upstairs bath.",
  },
  {
    title: "Quote requests",
    body: "Enough context for you to decide whether and when to call back.",
    quote: "What would it take to move my panel to 200 amps?",
  },
  {
    title: "Where’s my tech?",
    body: "She notes the message so your customer gets a real response from your team.",
    quote: "He said two o’clock. It’s almost four.",
  },
  {
    title: "Billing messages",
    body: "A clear message, with no promises or policy decisions made on your behalf.",
    quote: "I think I was charged twice for last week’s visit.",
  },
];

export default function Handles() {
  return (
    <Reveal id="handles" className="bg-paper py-28 lg:py-40">
      <div className="wrap">
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

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:gap-5">
          {CALLS.map((c, i) => (
            <article
              key={c.title}
              style={d(0.08 * i)}
              className="rv group flex min-h-[290px] flex-col rounded-[26px] border border-ink/10 p-7 transition-[background-color,border-color] duration-500 hover:border-ink/20 hover:bg-sand sm:p-9"
            >
              <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                <span className="flex items-center gap-2.5">
                  <Wave mode="wave-hover" className="h-3.5 text-ink/60" /> Caller
                </span>
                <span>0{i + 1}</span>
              </div>
              <blockquote className="mt-6 font-serif text-[1.75rem] leading-[1.14] tracking-[-0.012em] sm:text-[2.05rem]">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <div className="mt-auto border-t border-ink/10 pt-5">
                <h3 className="text-[1.08rem] font-medium tracking-[-0.01em]">{c.title}</h3>
                <p className="mt-1.5 leading-relaxed text-ink/65">{c.body}</p>
              </div>
            </article>
          ))}
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
