import { d } from "@/lib/motion";
import Reveal from "./Reveal";
import { Mark, PhoneIcon } from "./icons";

const STEPS = [
  { n: "01", title: "They call your number.", body: "No new line to promote. No app for the customer to learn." },
  { n: "02", title: "She takes the details.", body: "Name, number, service address, and the issue — gathered calmly." },
  { n: "03", title: "You get a text.", body: "One quick glance tells you who needs you and where to call back." },
];

const DETAILS = [
  ["Name", "Dana Whitfield"],
  ["Number", "(512) 555-0148"],
  ["Address", "1418 Larkspur Ln"],
  ["Issue", "AC blowing warm"],
];

/** Three panels telling one 9-second story; a dot carries it from step to step. */
export default function HowItWorks() {
  return (
    <Reveal id="how" className="bg-paper py-28 lg:py-40">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow rv text-ink/60">How it works</p>
            <h2 className="h2 mt-7">
              <span className="ml">
                <span>Your number.</span>
              </span>
              <span className="ml">
                <span style={d(0.08)}>
                  Her <em>steady voice.</em>
                </span>
              </span>
              <span className="ml">
                <span style={d(0.16)}>A useful text.</span>
              </span>
            </h2>
          </div>
        </div>

        <ol className="relative mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-6">
          {/* the thread between steps, with the dot that travels it */}
          <span aria-hidden className="absolute inset-x-0 top-[279px] hidden h-px bg-ink/12 md:block">
            <span className="hw-dot absolute inset-0">
              <span className="absolute -top-[3.5px] left-[18px] h-2 w-2 rounded-full bg-signal" />
            </span>
          </span>

          {STEPS.map((s, i) => (
            <li key={s.n} className="rv" style={d(0.1 + i * 0.1)}>
              <div className={`hw-${i + 1} relative h-[230px] overflow-hidden rounded-[24px] bg-sand shadow-[inset_0_0_0_1px_rgba(11,31,51,0.08)]`}>
                {i === 0 && <CallVisual />}
                {i === 1 && <DetailsVisual />}
                {i === 2 && <TextVisual />}
              </div>
              <span className="relative z-10 mt-7 inline-block bg-paper pr-4 font-serif text-[2.6rem] italic leading-none">{s.n}</span>
              <h3 className="mt-4 text-[1.3rem] font-medium tracking-[-0.012em]">{s.title}</h3>
              <p className="mt-2 max-w-[21rem] leading-relaxed text-ink/65">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

function CallVisual() {
  return (
    <div aria-hidden className="flex h-full flex-col items-center justify-center">
      <div className="relative grid h-16 w-16 place-items-center">
        {[0, 0.75, 1.5].map((s) => (
          <span key={s} className="hw-ring absolute inset-0 rounded-full border border-ink/25" style={d(s)} />
        ))}
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-ink text-paper">
          <PhoneIcon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">Your business line</p>
      <p className="mt-1.5 font-serif text-[1.7rem] leading-none">(512) 555-0100</p>
    </div>
  );
}

function DetailsVisual() {
  return (
    <div aria-hidden className="flex h-full items-center justify-center p-6">
      <div className="w-full max-w-[290px] rounded-2xl bg-paper px-4 py-1.5 shadow-[0_20px_40px_-30px_rgba(11,31,51,0.5)]">
        {DETAILS.map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between border-b border-ink/[0.07] py-2.5 last:border-0">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">{k}</span>
            <span className="hw-val text-[13.5px] font-medium" style={d(i * 0.45)}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TextVisual() {
  return (
    <div aria-hidden className="flex h-full flex-col justify-center gap-3 p-6">
      <div className="hw-msg rounded-[18px] rounded-tl-md bg-paper p-3.5 shadow-[0_20px_40px_-28px_rgba(11,31,51,0.55)]">
        <div className="flex items-center gap-2">
          <Mark className="h-[18px] w-[18px]" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/50">Kept Job &middot; now</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-ink/80">
          <strong className="font-semibold text-ink">Dana Whitfield</strong> &middot; (512) 555-0148 &middot; 1418 Larkspur Ln. AC blowing warm, newborn at
          home.
        </p>
      </div>
      <div className="flex items-center gap-2 pl-1 text-ink/50">
        <span className="hw-buzz grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">
          <PhoneIcon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[12.5px]">Bzzz. That&rsquo;s the lead.</span>
      </div>
    </div>
  );
}
