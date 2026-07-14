"use client";

import Image from "next/image";
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import aboutPortrait from "@/public/615940895_122151814346889569_5411851280753949891_n.jpg";

import {
  AmbientBackground,
  CountUp,
  EASE,
  Loader,
  Magnetic,
  Reveal,
  ScrollProgress,
  SmoothScroll,
  SplitText,
  SPRING,
  Stagger,
  StaggerItem,
  popVariants,
  scrollToId,
} from "./animations";

/* ------------------------------------------------------------------ *
 * Content — kept as-is, only re-homed into the editorial layout.
 * ------------------------------------------------------------------ */
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const NAV_IDS = NAV_LINKS.map((l) => l.href);

const MARQUEE = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Supabase",
  "Tailwind",
  "React Native",
];

type Project = {
  title: string;
  description: string;
  href: string;
  url: string;
};

const PROJECTS: Project[] = [
  {
    title: "FutureSchool",
    description:
      "Educational platform with a guided onboarding flow and a parental dashboard for tracking student progress.",
    href: "https://futureschool.life/",
    url: "futureschool.life",
  },
  {
    title: "Pleebly Canvas",
    description:
      "Interactive web-based UI tool for composing and arranging visual elements on a flexible canvas.",
    href: "https://slide-gen-smoky.vercel.app/",
    url: "slide-gen-smoky.vercel.app",
  },
  {
    title: "Ride On",
    description:
      "Ride-sharing and transportation web platform — booking, fare estimates, and trip tracking.",
    href: "https://rideonbd.com/",
    url: "rideonbd.com",
  },
  {
    title: "Access Doctor",
    description:
      "Healthcare and telemedicine platform connecting patients with doctors for online consultations.",
    href: "https://accessdoctor.co.uk/",
    url: "accessdoctor.co.uk",
  },
  {
    title: "VideoCV",
    description:
      "Video-based résumé platform where candidates introduce themselves with short, recordable video profiles.",
    href: "https://videocv.bd/",
    url: "videocv.bd",
  },
  {
    title: "ReFactory",
    description:
      "Corporate web platform for an industrial brand — marketing site with service catalog and lead capture.",
    href: "https://www.refactory.ae/",
    url: "refactory.ae",
  },
];

const SKILL_COLUMNS = [
  {
    heading: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 96 },
      { name: "HTML / CSS", level: 98 },
    ],
  },
  {
    heading: "Backend & DB",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Supabase", level: 85 },
      { name: "MongoDB", level: 85 },
      { name: "Drizzle ORM", level: 80 },
    ],
  },
  {
    heading: "Mobile",
    skills: [{ name: "React Native / Expo", level: 90 }],
  },
];

const EXPERIENCE = [
  {
    period: "2023 — Present",
    role: "Full-Stack Developer",
    company: "Relogic",
    summary: "Building end-to-end products with React, Node.js and Supabase.",
  },
  {
    period: "2021 — 2023",
    role: "Frontend Developer",
    company: "Freelance",
    summary: "Shipped marketing sites, dashboards and mobile apps for global clients.",
  },
];

/* ------------------------------------------------------------------ *
 * Hooks
 * ------------------------------------------------------------------ */
function useInView<T extends Element>(rootMargin = "-15% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView] as const;
}

function useDhakaClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Dhaka",
      }).format(new Date());

    // Defer the first paint off the effect body (avoids SSR/hydration
    // mismatch and cascading-render lint) then tick every 30s.
    const raf = requestAnimationFrame(() => setTime(format()));
    const id = setInterval(() => setTime(format()), 30_000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  return time;
}

/** Tracks which section owns the viewport for the nav active indicator. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // ids is a stable module constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return active;
}

/** True once the page has scrolled past a small threshold. */
function useScrolled(threshold = 16) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > threshold));
  return scrolled;
}

/* ------------------------------------------------------------------ *
 * Chrome — fixed nav + rotated edge labels
 * ------------------------------------------------------------------ */
function NavLink({
  link,
  active,
  onNavigate,
}: {
  link: (typeof NAV_LINKS)[number];
  active: boolean;
  onNavigate: (href: string) => void;
}) {
  return (
    <a
      href={link.href}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(link.href);
      }}
      className={`group relative text-xs font-medium uppercase tracking-[0.22em] transition-colors ${
        active ? "text-ink" : "text-muted-ink hover:text-ink"
      }`}
    >
      {link.label}
      <span
        aria-hidden
        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 ease-out ${
          active ? "scale-x-0" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
      {active && (
        <motion.span
          aria-hidden
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 h-px w-full bg-ink"
          transition={SPRING}
        />
      )}
    </a>
  );
}

function Nav({ start }: { start: boolean }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const scrolled = useScrolled();
  const active = useActiveSection(NAV_IDS);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  const entrance = reduce
    ? {}
    : {
        initial: { y: -80, opacity: 0 },
        animate: start ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 },
        transition: { duration: 0.8, ease: EASE },
      };

  return (
    <motion.header
      {...entrance}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        scrolled
          ? "border-hairline bg-paper/70 backdrop-blur-xl"
          : "border-transparent bg-paper/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-20">
        <motion.a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          whileHover={reduce ? undefined : { rotate: -2 }}
          transition={SPRING}
          className="inline-block font-body text-sm font-semibold tracking-[0.25em] text-ink"
        >
          SHAHIN<span className="text-muted-ink">.AHMED</span>
        </motion.a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              link={link}
              active={active === link.href}
              onNavigate={go}
            />
          ))}
        </nav>

        <Magnetic strength={0.5}>
          <motion.a
            href="/cv"
            target="_blank"
            rel="noreferrer"
            whileHover={reduce ? undefined : { scale: 1.04 }}
            whileTap={reduce ? undefined : { scale: 0.96 }}
            transition={SPRING}
            className="hidden border border-ink px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-ink hover:text-paper md:inline-block"
          >
            CV →
          </motion.a>
        </Magnetic>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-hairline text-ink md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-hairline bg-paper md:hidden">
          <div className="mx-auto flex max-w-[1600px] flex-col px-6 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className="py-3 text-xs font-medium uppercase tracking-[0.22em] text-muted-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cv"
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 border border-ink px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink"
            >
              CV →
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}

function EdgeLabels({ clock }: { clock: string }) {
  return (
    <>
      <span
        aria-hidden
        className="side-label fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 rotate-180 text-[10px] font-medium uppercase text-muted-ink lg:block"
      >
        Portfolio · MMXXVI
      </span>
      <span
        aria-hidden
        className="side-label fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 text-[10px] font-medium uppercase text-muted-ink lg:block"
      >
        Dhaka · {clock || "--:--"}
      </span>
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Layout primitives
 * ------------------------------------------------------------------ */
function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1600px] px-6 md:px-20 ${className}`}>
      {children}
    </div>
  );
}

function SectionIndex({ index, label }: { index: string; label: string }) {
  return (
    <Reveal as="p" className="mb-8 text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink">
      ({index}) — {label}
    </Reveal>
  );
}

function GiantHeading({ text }: { text: string }) {
  return (
    <h2
      className="font-display uppercase leading-[0.92] text-ink"
      style={{ fontSize: "clamp(2.75rem, 8vw, 8.5rem)" }}
    >
      <SplitText text={text} />
    </h2>
  );
}

/* ------------------------------------------------------------------ *
 * Sections
 * ------------------------------------------------------------------ */
function Hero({ start }: { start: boolean }) {
  const reduce = useReducedMotion();

  const mount = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          animate: start
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 14, filter: "blur(6px)" },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  const headingFont = { fontSize: "clamp(3.5rem, 13vw, 15rem)" } as const;

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-hairline pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <Container>
        <motion.div
          {...mount(0.1)}
          className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping bg-ink opacity-60" />
            <span className="relative inline-flex h-2 w-2 bg-ink" />
          </span>
          Available for work · 2024
        </motion.div>

        <h1 className="font-display uppercase leading-[0.95] text-ink">
          <span className="block" style={headingFont}>
            <SplitText
              text="Hi ! I'm Shahin"
              trigger="mount"
              start={start}
              delay={0.2}
              stagger={0.03}
            />
          </span>
          <span className="block pl-[8%]" style={headingFont}>
            <SplitText
              text="Full-Stack"
              trigger="mount"
              start={start}
              delay={0.42}
              stagger={0.03}
            />
          </span>
          <span className="block pl-[16%]" style={headingFont}>
            <SplitText
              text="Developer."
              trigger="mount"
              start={start}
              delay={0.6}
              stagger={0.03}
            />
          </span>
        </h1>

        <Stagger
          trigger="mount"
          start={start}
          className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-12"
        >
          <StaggerItem className="md:col-span-4 md:col-start-1">
            <p className="text-sm leading-relaxed text-muted-ink">
              I&apos;ve been building for the web for 3+ years, crafting scalable,
              secure and robust products — from the first pixel to the systems
              behind them.
            </p>
          </StaggerItem>
          <StaggerItem className="md:col-span-4 md:col-start-9">
            <p className="text-sm leading-relaxed text-muted-ink">
              I&apos;ve worked with startups and agencies across BD, UK and AE —
              shipping end-to-end web and mobile experiences that people actually
              enjoy using.
            </p>
          </StaggerItem>
        </Stagger>

        <Stagger
          trigger="mount"
          start={start}
          className="mt-14 flex flex-wrap items-center gap-8"
        >
          <StaggerItem variants={popVariants}>
            <Magnetic strength={0.35}>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#work");
                }}
                className="group inline-flex items-center gap-4"
              >
                <span className="h-px w-12 bg-ink transition-all duration-300 group-hover:w-20" />
                <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ink">
                  See my work
                </span>
              </a>
            </Magnetic>
          </StaggerItem>
          <StaggerItem variants={popVariants}>
            <Magnetic strength={0.35}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("#contact");
                }}
                className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink transition-colors hover:text-ink"
              >
                Contact →
              </a>
            </Magnetic>
          </StaggerItem>
        </Stagger>
      </Container>
    </section>
  );
}

function Marquee() {
  const row = (
    <div className="marquee-track">
      {MARQUEE.concat(MARQUEE).map((tech, i) => (
        <span key={i} className="flex items-center">
          <span
            className="font-display uppercase leading-none text-ink"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            {tech}
          </span>
          <span
            className="mx-8 text-muted-ink md:mx-14"
            style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)" }}
          >
            ✦
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="overflow-hidden border-b border-hairline py-8"
    >
      <div className="flex w-max flex-nowrap">{row}</div>
    </section>
  );
}

/** Portrait with float, grayscale glow, and cursor-driven parallax. */
function FloatingPortrait() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });
  const py = useSpring(0, { stiffness: 120, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const cy = (e.clientY - (r.top + r.height / 2)) / r.height;
    px.set(cx * 14);
    py.set(cy * 14);
  };
  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <Reveal className="md:col-span-4 md:col-start-1 md:row-span-2 md:row-start-1">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className="relative"
      >
        <span aria-hidden className="portrait-glow" />
        <motion.div
          style={reduce ? undefined : { x: px, y: py }}
          className="group relative aspect-4/5 w-full overflow-hidden"
        >
          <div className={reduce ? "h-full w-full" : "float-slow h-full w-full"}>
            <Image
              src={aboutPortrait}
              alt="Portrait of Shahin Ahmed"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              placeholder="blur"
              className="object-cover object-center opacity-60 grayscale mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-90 group-hover:grayscale-0"
            />
          </div>
        </motion.div>
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-hairline py-28 md:py-40">
      <Container>
        <SectionIndex index="01" label="About" />
        <GiantHeading text="A bit about me." />

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-12">
          <FloatingPortrait />
          <Reveal
            as="p"
            delay={0.1}
            className="text-base leading-relaxed text-muted-ink md:col-span-4 md:col-start-5 md:row-start-1 md:mt-16"
          >
            My journey began at age 12 in a remote Bangladeshi village, on a
            shared school computer and a slow café connection. What started as
            curiosity became a craft — 3+ years of shipping products end-to-end.
          </Reveal>
          <Reveal
            as="p"
            delay={0.2}
            className="text-base leading-relaxed text-muted-ink md:col-span-4 md:col-start-9 md:row-start-2 md:self-start"
          >
            As a Full-Stack Developer, I bridge the gap between pixel-perfect
            interfaces and powerful backend systems — designing data models,
            building secure APIs, and shipping products that are scalable,
            robust, and a joy to use.
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function WorkRow({ project, index }: { project: Project; index: number }) {
  return (
    <StaggerItem>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block border-b border-hairline"
      >
        {/* Soft wash sweeps in from the left on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-paper-soft transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        {/* Accent rail draws down the left edge on hover. */}
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-ink transition-transform duration-500 ease-out group-hover:scale-y-100"
        />
        <div className="relative grid grid-cols-12 items-center gap-4 py-8 transition-[padding] duration-300 ease-out group-hover:pl-4 md:py-10 md:group-hover:pl-8">
          <span className="col-span-2 text-xs font-medium text-muted-ink md:col-span-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="col-span-10 font-display uppercase leading-none text-ink md:col-span-4"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
          >
            {project.title}
          </h3>
          <p className="col-span-12 text-sm leading-relaxed text-muted-ink md:col-span-4 md:col-start-6">
            {project.description}
          </p>
          <span className="col-span-10 text-xs font-medium uppercase tracking-[0.12em] text-muted-ink md:col-span-2 md:col-start-10">
            {project.url}
          </span>
          <span className="col-span-2 flex justify-end text-ink md:col-span-1">
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      </a>
    </StaggerItem>
  );
}

function Work() {
  return (
    <section id="work" className="scroll-mt-24 border-b border-hairline py-28 md:py-40">
      <Container>
        <SectionIndex index="02" label="Selected Work" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <GiantHeading text={"Recent\nProjects."} />
          <Reveal
            as="span"
            delay={0.15}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink"
          >
            {String(PROJECTS.length).padStart(2, "0")} / Projects
          </Reveal>
        </div>

        <Stagger className="mt-16 border-t border-hairline">
          {PROJECTS.map((project, i) => (
            <WorkRow key={project.title} project={project} index={i} />
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function SkillBar({ level, animate }: { level: number; animate: boolean }) {
  return (
    <div className="mt-3 h-px w-full bg-hairline">
      <motion.div
        className="h-px w-full bg-ink"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: animate ? level / 100 : 0 }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </div>
  );
}

function Skills() {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <section
      id="skills"
      className="scroll-mt-24 border-b border-hairline bg-paper-soft py-28 md:py-40"
    >
      <Container>
        <SectionIndex index="03" label="Stack" />
        <GiantHeading text={"Tools of\nthe trade."} />

        <div ref={ref}>
          <Stagger className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-3">
            {SKILL_COLUMNS.map((column) => (
              <StaggerItem key={column.heading}>
                <h3 className="mb-8 text-xs font-semibold uppercase tracking-[0.28em] text-muted-ink">
                  {column.heading}
                </h3>
                <div className="space-y-7">
                  {column.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-ink">{skill.name}</span>
                        <span className="text-xs text-muted-ink">
                          <CountUp value={skill.level} suffix="%" />
                        </span>
                      </div>
                      <SkillBar level={skill.level} animate={inView} />
                    </div>
                  ))}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function Experience() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-b border-hairline py-28 md:py-40"
    >
      <Container>
        <SectionIndex index="04" label="Experience" />
        <GiantHeading text={"Where I've\nworked."} />

        <div ref={listRef} className="relative mt-16 pl-6 md:pl-10">
          {/* Timeline rail — a faint track with a line that draws on scroll. */}
          <span
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-hairline"
          />
          <motion.span
            aria-hidden
            className="timeline-line absolute left-0 top-0 h-full w-px bg-ink"
            style={reduce ? { scaleY: 1 } : { scaleY: lineScale }}
          />

          <Stagger>
            {EXPERIENCE.map((entry) => (
              <StaggerItem
                key={entry.company}
                className="grid grid-cols-1 gap-4 border-b border-hairline py-10 md:grid-cols-12 md:items-baseline"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-ink md:col-span-3">
                  {entry.period}
                </span>
                <div className="md:col-span-9">
                  <h3
                    className="font-display uppercase leading-none text-ink"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                  >
                    {entry.role}{" "}
                    <span className="text-muted-ink">— {entry.company}</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-ink">
                    {entry.summary}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-ink py-28 text-paper md:py-40">
      <Container>
        <SectionIndex index="05" label="Get in touch" />
        <h2
          className="font-display uppercase leading-[0.92] text-paper"
          style={{ fontSize: "clamp(2.75rem, 9vw, 9.5rem)" }}
        >
          <SplitText text="Let's build" className="block" />
          <SplitText text="something" className="block text-muted-ink" />
          <SplitText text="together." className="block" />
        </h2>

        <Reveal
          className="mt-20 h-px w-full"
          delay={0.1}
        >
          <span
            aria-hidden
            className="block h-px w-full"
            style={{ backgroundColor: "oklch(0.3 0 0)" }}
          />
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          <StaggerItem>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-ink">
              Email
            </p>
            <a
              href="mailto:sajidulsahin101@gmail.com"
              className="mt-3 inline-block font-display text-xl uppercase text-paper transition-opacity hover:opacity-70 md:text-2xl"
            >
              sajidulsahin101@gmail.com
            </a>
          </StaggerItem>
          <StaggerItem>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-ink">
              Phone
            </p>
            <a
              href="tel:+8801954791740"
              className="mt-3 inline-block font-display text-xl uppercase text-paper transition-opacity hover:opacity-70 md:text-2xl"
            >
              +88 019 5479 1740
            </a>
          </StaggerItem>
          <StaggerItem>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-ink">
              Based in
            </p>
            <p className="mt-3 font-display text-xl uppercase text-paper md:text-2xl">
              Dhaka, Bangladesh
            </p>
          </StaggerItem>
        </Stagger>

        <Reveal className="mt-24 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-ink">
            © 2024 Shahin Ahmed — All rights reserved.
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("#top");
            }}
            className="text-[10px] font-medium uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-70"
          >
            Back to top ↑
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  const clock = useDhakaClock();
  const [loading, setLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE }}>
      <SmoothScroll />
      <ScrollProgress />
      <AmbientBackground />
      <Loader onDone={() => setLoading(false)} />
      <Nav start={!loading} />
      <EdgeLabels clock={clock} />
      <main>
        <Hero start={!loading} />
        <Marquee />
        <About />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </MotionConfig>
  );
}
