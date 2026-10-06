import type { CSSProperties, ReactNode } from "react";

type P = { className?: string };

export function PhoneIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M6.6 3.5h2.2c.5 0 .9.3 1 .8l.9 3.6c.1.4 0 .9-.4 1.1l-1.6 1.1a12 12 0 0 0 5.2 5.2l1.1-1.6c.3-.4.7-.5 1.1-.4l3.6.9c.5.1.8.5.8 1v2.2a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M4.5 10.5 8 14l7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The mark: a rounded tile with a tick — the call, kept. `tone` flips it for dark backgrounds. */
export function Mark({ className = "h-7 w-7", tone = "ink" }: P & { tone?: "ink" | "paper" }) {
  const [bg, fg] = tone === "ink" ? ["var(--ink)", "var(--paper)"] : ["var(--paper)", "var(--ink)"];
  return (
    <svg viewBox="0 0 28 28" aria-hidden className={className}>
      <rect width="28" height="28" rx="8.5" fill={bg} />
      <path d="M8.6 14.6 12 18l7.4-8" fill="none" stroke={fg} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark tone={tone} />
      <span className="font-serif text-[1.6rem] leading-none tracking-[-0.015em]">
        Kept <em>Job</em>
      </span>
    </span>
  );
}

/** Five bars that read as a voice. Animated by `.wave` (always) or `.wave-hover` (on card hover). */
export function Wave({ className = "", mode = "wave", bars = 5 }: P & { mode?: "wave" | "wave-hover"; bars?: number }) {
  const heights = [0.55, 1, 0.7, 0.9, 0.45, 0.8, 0.6, 1, 0.5, 0.75];
  return (
    <span aria-hidden className={`${mode} inline-flex h-4 items-center gap-[3px] ${className}`}>
      {Array.from({ length: bars }, (_, i) => (
        <i key={i} style={{ height: `${heights[i % heights.length] * 100}%`, "--d": `${(i % 5) * -0.17}s` } as CSSProperties} />
      ))}
    </span>
  );
}

/** Pill button whose label rolls on hover. */
export function Btn({
  href,
  label,
  variant = "ink",
  size = "md",
  icon,
  className = "",
}: {
  href: string;
  label: string;
  variant?: "ink" | "ghost" | "paper";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
}) {
  const sizes = { sm: "h-10 px-4 text-[14px]", md: "h-[52px] px-6 text-[15px]", lg: "h-[60px] px-8 text-[16px]" };
  return (
    <a href={href} aria-label={label} className={`btn btn-${variant} ${sizes[size]} ${className}`}>
      {icon}
      <span className="roll" aria-hidden>
        <span data-t={label}>{label}</span>
      </span>
    </a>
  );
}
