import { d } from "@/lib/motion";
import { BOOK_HREF, DEMO_HREF } from "@/lib/site";
import CallDemo from "./CallDemo";
import { ArrowIcon, Btn, CheckIcon, PhoneIcon } from "./icons";

export default function Hero() {
  return (
    <section className="on-load relative overflow-hidden pb-24 pt-28 sm:pt-32 lg:pb-32 lg:pt-40">
      <div className="wrap grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="relative z-10">
          <p className="eyebrow rv text-ink/65" style={d(0.05)}>
            After-hours &amp; overflow calls
          </p>

          <h1 className="display mt-8">
            <span className="ml">
              <span style={d(0.12)}>Stop losing</span>
            </span>
            <span className="ml">
              <span style={d(0.2)}>jobs to</span>
            </span>
            <span className="ml">
              <span style={d(0.28)}>
                <em className="strike">voicemail</em>.
              </span>
            </span>
          </h1>

          <p className="lede rv mt-9 max-w-[29rem] text-ink/75" style={d(0.45)}>
            When you&rsquo;re on a roof at 7pm, we answer. Your phone buzzes with the lead.
          </p>

          <div className="rv mt-10 flex flex-wrap items-center gap-3" style={d(0.55)}>
            <Btn href={DEMO_HREF} label="Hear a live demo" icon={<PhoneIcon />} />
            <Btn href={BOOK_HREF} label="Book 30 minutes" variant="ghost" icon={<ArrowIcon className="arr h-4 w-4 order-last" />} />
          </div>

          <p className="rv mt-14 flex max-w-[26rem] gap-3 border-t border-ink/10 pt-6 text-[14.5px] leading-relaxed text-ink/65" style={d(0.65)}>
            <CheckIcon className="mt-[3px] h-4 w-4 shrink-0 text-ink" />
            Every call becomes a clean text: name, number, address, and what they need.
          </p>
        </div>

        <div className="rv relative" style={d(0.35)}>
          {/* backdrop: a sand disc and two faint rings radiating from the phone */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2">
            <div className="breathe absolute inset-[110px] rounded-full bg-sand" />
            <svg viewBox="0 0 640 640" className="absolute inset-0 h-full w-full text-ink/[0.07]">
              <circle cx="320" cy="320" r="250" fill="none" stroke="currentColor" />
              <circle cx="320" cy="320" r="316" fill="none" stroke="currentColor" strokeDasharray="2 6" />
            </svg>
          </div>
          <CallDemo />
        </div>
      </div>
    </section>
  );
}
