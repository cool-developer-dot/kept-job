import { d } from "@/lib/motion";
import { CONTACT_HREF, DEMO_HREF, PRIVACY_HREF, TERMS_HREF } from "@/lib/site";
import Reveal from "./Reveal";
import { Btn, Logo, PhoneIcon } from "./icons";

/** The final ask and the footer, on one navy ground. */
export default function Closing() {
  return (
    <Reveal className="relative overflow-hidden bg-ink text-paper">
      <div className="wrap pb-24 pt-32 text-center lg:pb-32 lg:pt-44">
        <h2 className="display mx-auto text-[clamp(3rem,7.4vw,6.4rem)]">
          <span className="ml">
            <span>The next missed call</span>
          </span>
          <span className="ml">
            <span style={d(0.08)}>could be tomorrow&rsquo;s</span>
          </span>
          <span className="ml">
            <span style={d(0.16)}>
              <em>best job.</em>
            </span>
          </span>
        </h2>
        <p className="lede rv mx-auto mt-9 max-w-[30rem] text-paper/65" style={d(0.3)}>
          Hear how Kept Job sounds, then decide if it belongs in your business.
        </p>

        <div className="rv relative mt-12 inline-grid place-items-center" style={d(0.4)}>
          {[0, 1.2, 2.4].map((s) => (
            <span key={s} aria-hidden className="cta-ring absolute inset-0 rounded-full border border-paper/25" style={d(s)} />
          ))}
          <Btn href={DEMO_HREF} label="Hear a live demo" variant="paper" size="lg" icon={<PhoneIcon />} className="relative" />
        </div>
      </div>

      <footer className="relative">
        <div className="wrap flex flex-col gap-6 border-t border-paper/10 py-8 text-[13.5px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Logo tone="paper" />
            <span>&copy; 2026</span>
          </div>
          <nav aria-label="Footer" className="flex gap-6">
            <a href={PRIVACY_HREF} className="link-u transition-colors hover:text-paper">
              Privacy
            </a>
            <a href={TERMS_HREF} className="link-u transition-colors hover:text-paper">
              Terms
            </a>
            <a href={CONTACT_HREF} className="link-u transition-colors hover:text-paper">
              Contact
            </a>
          </nav>
        </div>
        <p
          aria-hidden
          className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-serif text-[26vw] leading-[0.72] tracking-[-0.04em] text-paper/[0.05]"
        >
          Kept <em>Job</em>
        </p>
      </footer>
    </Reveal>
  );
}
