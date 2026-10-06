"use client";

import { useEffect, useState } from "react";
import { DEMO_HREF } from "@/lib/site";
import { Btn, Logo, PhoneIcon } from "./icons";

const NAV = [
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

/** Transparent at the top, paper once you scroll; slips away while you read down, returns when you scroll up. */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setSolid(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header
      className={`hdr hdr-in fixed inset-x-0 top-0 z-50 ${hidden ? "-translate-y-full" : ""} ${
        solid ? "bg-paper/85 shadow-[0_1px_0_rgba(11,31,51,0.08)] backdrop-blur-md" : ""
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between lg:h-[72px]">
        <a href="#top" aria-label="Kept Job — back to top" className="rounded-lg">
          <Logo />
        </a>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hidden px-3 py-2 text-[14.5px] text-ink/70 transition-colors hover:text-ink md:block">
              <span className="link-u pb-0.5">{n.label}</span>
            </a>
          ))}
          <Btn href={DEMO_HREF} label="Hear a live demo" size="sm" icon={<PhoneIcon className="h-3.5 w-3.5" />} className="ml-2 hidden sm:inline-flex" />
          <Btn href={DEMO_HREF} label="Live demo" size="sm" icon={<PhoneIcon className="h-3.5 w-3.5" />} className="sm:hidden" />
        </nav>
      </div>
    </header>
  );
}
