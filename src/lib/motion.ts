import type { CSSProperties } from "react";

/** Stagger helper: `style={d(0.2)}` delays an element's reveal by 0.2s. */
export const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;
