"use client";

/* ------------------------------------------------------------------ *
 * Animation system — reusable Motion primitives.
 *
 * Design rules honoured here:
 *  - Every transform is GPU-friendly (x/y/scale/opacity/filter only).
 *  - Everything degrades to a static render under prefers-reduced-motion.
 *  - Reveals fire once via viewport({ once }) — no re-trigger on scroll back.
 *  - Springs over linear; expo-out easing to match the existing skill bars.
 * ------------------------------------------------------------------ */

import Lenis from "lenis";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/* Expo-out — the house easing. Matches globals.css skill-fill curve. */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 1 } as const;
export const SPRING_POP = { type: "spring", stiffness: 320, damping: 18, mass: 0.9 } as const;

/* ------------------------------------------------------------------ *
 * Lenis smooth scroll — module singleton so anchors can drive it.
 * ------------------------------------------------------------------ */
let lenis: Lenis | null = null;

export function scrollToId(hash: string) {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  if (id === "#top") {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -80 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis?.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, [reduce]);

  return null;
}

/* ------------------------------------------------------------------ *
 * Scroll progress — hairline bar pinned to the very top.
 * ------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    restDelta: 0.001,
  });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-ink"
      style={{ scaleX }}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Ambient background — drifting grayscale blobs + noise + soft light.
 * Purely decorative, fixed, non-interactive, stays behind everything.
 * ------------------------------------------------------------------ */
export function AmbientBackground() {
  return (
    <div aria-hidden className="ambient" >
      <span className="ambient-blob ambient-blob--a" />
      <span className="ambient-blob ambient-blob--b" />
      <span className="ambient-blob ambient-blob--c" />
      <span className="ambient-light" />
      <span className="ambient-noise" />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Premium loader — logo reveal, line draw, curtain lift.
 * ------------------------------------------------------------------ */
export function Loader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const hold = reduce ? 350 : 1500;
    // Lock scroll while the curtain is up.
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      // Reveal deterministically — unlocking scroll and handing off to the
      // page must never depend on the exit animation completing. The curtain
      // then slides away purely as visual polish.
      document.documentElement.style.overflow = "";
      setShow(false);
      onDone();
    }, hold);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
    // onDone is a stable setstate updater; run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-80 flex items-center justify-center bg-paper"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="overflow-hidden">
            <motion.span
              className="block font-body text-sm font-semibold tracking-[0.35em] text-ink"
              initial={reduce ? { opacity: 0 } : { y: "110%" }}
              animate={reduce ? { opacity: 1 } : { y: "0%" }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            >
              SHAHIN<span className="text-muted-ink">.AHMED</span>
            </motion.span>
          </div>
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-px bg-ink"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: EASE }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ *
 * SplitText — per-character stagger reveal with a slight blur wash.
 * Words never break across lines; \n forces a hard line break.
 * ------------------------------------------------------------------ */
const parentVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

const charVariant: Variants = {
  hidden: { opacity: 0, y: "45%", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: EASE },
  },
};

export function SplitText({
  text,
  className = "",
  stagger = 0.022,
  delay = 0,
  trigger = "view",
  start = true,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
  trigger?: "view" | "mount";
  /** For mount triggers: gate the animation start (e.g. after the loader). */
  start?: boolean;
}) {
  const reduce = useReducedMotion();
  const lines = text.split("\n");

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </span>
    );
  }

  const activation =
    trigger === "mount"
      ? { animate: start ? "visible" : "hidden" }
      : {
          whileInView: "visible",
          viewport: { once: true, margin: "-8% 0px -8% 0px" },
        };

  return (
    <motion.span
      className={className}
      variants={parentVariants(stagger, delay)}
      initial="hidden"
      aria-label={text}
      {...activation}
    >
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block" aria-hidden>
            {words.map((word, wi) => (
              <span
                key={wi}
                className="inline-block whitespace-nowrap"
                style={{ willChange: "transform" }}
              >
                {Array.from(word).map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="inline-block"
                    variants={charVariant}
                  >
                    {ch}
                  </motion.span>
                ))}
                {wi < words.length - 1 ? " " : null}
              </span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * Reveal — fade + rise + de-blur. The workhorse for paragraphs/blocks.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  y = 26,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ *
 * Stagger group — parent + item variants for choreographed children.
 * ------------------------------------------------------------------ */
export const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

export const popVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: SPRING_POP },
};

export function Stagger({
  children,
  className = "",
  trigger = "view",
  start = true,
}: {
  children: ReactNode;
  className?: string;
  trigger?: "view" | "mount";
  start?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const activation =
    trigger === "mount"
      ? { animate: start ? "visible" : "hidden" }
      : {
          whileInView: "visible",
          viewport: { once: true, margin: "-8% 0px -8% 0px" },
        };

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      {...activation}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  variants = itemVariants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic — element drifts toward the cursor, springs back on leave.
 * ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  if (reduce) return <span className={className}>{children}</span>;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, display: "inline-block" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * CountUp — smooth integer count when scrolled into view.
 * ------------------------------------------------------------------ */
export function CountUp({
  value,
  suffix = "",
  className = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
