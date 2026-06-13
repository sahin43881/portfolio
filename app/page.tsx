"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const CV_URL = "/cv";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

const FRONTEND_SKILLS = [
  { name: "React / Next.js", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Tailwind CSS", level: 95 },
  { name: "React Query", level: 88 },
  { name: "JavaScript", level: 95 },
  { name: "HTML / CSS", level: 98 },
];

const BACKEND_SKILLS = [
  { name: "Node.js / Express.js", level: 85 },
  { name: "Supabase", level: 80 },
  { name: "MongoDB", level: 85 },
  { name: "Drizzle ORM", level: 80 },
];

const MOBILE_SKILLS = [{ name: "React Native / Expo", level: 90 }];

const TECH_TAGS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "React Query",
  "Node.js",
  "Express.js",
  "Supabase",
  "MongoDB",
  "Drizzle ORM",
  "React Native",
  "Expo",
];

const EXPERIENCE = [
  {
    company: "Relogic",
    role: "Full-Stack Developer",
    period: "2023 – Present",
    bullets: [
      "Building scalable, secure, end-to-end web applications from database to UI",
      "Designing React & Next.js interfaces backed by Node.js / Express.js APIs and modern databases",
      "Modeling data layers with Supabase, MongoDB, and Drizzle ORM for robust, type-safe persistence",
      "Driving architecture decisions, code reviews, and conventions across the full stack",
    ],
  },
  {
    company: "Full-Stack Developer",
    role: "Freelance & Contract",
    period: "2022 – 2023",
    bullets: [
      "Delivered end-to-end products — responsive frontends wired to custom REST APIs and databases",
      "Translated Figma designs into pixel-accurate React components with Tailwind CSS",
      "Built secure auth, data models, and integrations while keeping Core Web Vitals sharp",
    ],
  },
];

type Project = {
  title: string;
  description: string;
  href: string;
};

const PROJECTS: Project[] = [
  {
    title: "FutureSchool",
    description:
      "Educational platform with a guided user onboarding flow and a parental dashboard for tracking student progress.",
    href: "https://futureschool.life/",
  },
  {
    title: "Pleebly Canvas",
    description:
      "Interactive web-based UI tool for composing and arranging visual elements on a flexible canvas.",
    href: "https://slide-gen-smoky.vercel.app/",
  },
  {
    title: "Ride On",
    description:
      "Ride-sharing and transportation web platform — booking, fare estimates, and trip tracking.",
    href: "https://rideonbd.com/",
  },
  {
    title: "Access Doctor",
    description:
      "Healthcare and telemedicine platform connecting patients with doctors for online consultations.",
    href: "https://accessdoctor.co.uk/",
  },
  {
    title: "VideoCV",
    description:
      "Video-based résumé platform where candidates introduce themselves with short, recordable video profiles.",
    href: "https://videocv.bd/",
  },
  {
    title: "ReFactory",
    description:
      "Corporate web platform for an industrial brand — marketing site with service catalog and lead capture.",
    href: "https://www.refactory.ae/",
  },
];

// Soft, distinct accent per card so the grid reads colorful but stays minimal.
const PROJECT_TINTS = [
  {
    card: "from-violet-50 to-white border-violet-100 hover:border-violet-300",
    icon: "border-violet-100 bg-violet-50 text-violet-600 group-hover:bg-violet-100",
    accent: "group-hover:text-violet-600",
  },
  {
    card: "from-sky-50 to-white border-sky-100 hover:border-sky-300",
    icon: "border-sky-100 bg-sky-50 text-sky-600 group-hover:bg-sky-100",
    accent: "group-hover:text-sky-600",
  },
  {
    card: "from-emerald-50 to-white border-emerald-100 hover:border-emerald-300",
    icon: "border-emerald-100 bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    accent: "group-hover:text-emerald-600",
  },
  {
    card: "from-rose-50 to-white border-rose-100 hover:border-rose-300",
    icon: "border-rose-100 bg-rose-50 text-rose-600 group-hover:bg-rose-100",
    accent: "group-hover:text-rose-600",
  },
  {
    card: "from-amber-50 to-white border-amber-100 hover:border-amber-300",
    icon: "border-amber-100 bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    accent: "group-hover:text-amber-600",
  },
  {
    card: "from-indigo-50 to-white border-indigo-100 hover:border-indigo-300",
    icon: "border-indigo-100 bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100",
    accent: "group-hover:text-indigo-600",
  },
];

async function fetchProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return PROJECTS;
}

function useInView<T extends Element>(options?: IntersectionObserverInit) {
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
      { threshold: 0.2, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, options]);

  return [ref, inView] as const;
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label="Shahin Ahmed — home"
          className="group inline-flex items-center font-mono text-xl font-semibold tracking-tight text-slate-900 transition-colors hover:text-slate-700"
        >
          <span className="text-violet-600 transition-colors group-hover:text-violet-500">
            &lt;
          </span>

          <span className="text-violet-600 transition-colors group-hover:text-violet-500">
            /&gt;
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-violet-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href={CV_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:shadow-violet-500/40"
          >
            CV
          </a>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 md:hidden"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-violet-600"
              >
                {link.label}
              </a>
            ))}
            <a
              href={CV_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white"
            >
              CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroCodeDecor() {
  // Decorative, low-opacity dev icons scattered behind the hero content.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* </> */}
      <svg className="absolute left-[5%] top-[16%] h-14 w-14 rotate-[-10deg] text-violet-400/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      {/* { } braces */}
      <svg className="absolute right-[8%] top-[12%] h-12 w-12 rotate-[8deg] text-indigo-400/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1" />
        <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1" />
      </svg>
      {/* terminal */}
      <svg className="absolute left-[12%] bottom-[16%] h-12 w-12 rotate-6 text-slate-400/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="6 9 9 12 6 15" />
        <line x1="12" y1="15" x2="16" y2="15" />
      </svg>
      {/* database */}
      <svg className="absolute right-[6%] bottom-[20%] h-12 w-12 -rotate-6 text-violet-400/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
      {/* git branch */}
      <svg className="absolute left-[42%] top-[8%] h-10 w-10 rotate-10 text-indigo-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
      {/* hash / tag */}
      <svg className="absolute right-[40%] bottom-[10%] h-9 w-9 rotate-[-8deg] text-slate-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    </div>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-200 bg-linear-to-b from-slate-50 to-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-400/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-400/20 blur-[140px]"
      />

      <HeroCodeDecor />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="min-w-0 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </div>
          <p className="text-sm text-slate-500">Hi there! I&apos;m</p>
          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
            SHAHIN
            <br />
            <span className="bg-linear-to-r from-violet-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              AHMED
            </span>
          </h1>
          <p className="max-w-md text-lg text-slate-600">
            Full-Stack Developer with{" "}
            <span className="font-semibold text-slate-900">3+ years</span> of
            experience building end-to-end, scalable, secure, and robust web
            applications — from polished interfaces to the systems behind them.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:shadow-violet-500/50"
            >
              View Work
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-violet-400 hover:bg-violet-50 hover:text-violet-700"
            >
              Contact Me
            </a>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-violet-400/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-violet-400/20 blur-3xl"
          />
          <div className="relative aspect-square overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-violet-500/10">
            <Image
              src="/615940895_122151814346889569_5411851280753949891_n.jpg"
              alt="Shahin Ahmed portrait"
              fill
              priority
              sizes="(min-width: 1024px) 512px, (min-width: 768px) 448px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-slate-900/5" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-xl">
            <p className="text-xs uppercase tracking-wider text-violet-600">
              Full-Stack
            </p>
            <p className="text-sm text-slate-700">Frontend · Backend</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({
  name,
  level,
  animate,
  delay,
}: {
  name: string;
  level: number;
  animate: boolean;
  delay: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-700">{name}</span>
        <span className="text-slate-500">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-400 transition-[width] duration-1500 ease-out"
          style={{
            width: animate ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  tone = "light",
  children,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  tone?: "light" | "muted";
  children: ReactNode;
}) {
  const bg =
    tone === "muted"
      ? "bg-linear-to-b from-slate-50 to-white"
      : "bg-white";

  return (
    <section id={id} className={`border-b border-slate-200 ${bg}`}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {title && (
          <div className="mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              {eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              {title}
            </h2>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function About() {
  const [skillsRef, skillsInView] = useInView<HTMLDivElement>();

  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-2 md:items-start">
        <div className="space-y-5 text-slate-600 leading-relaxed md:sticky md:top-20 md:h-fit">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">
              About
            </p>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              A bit about me
            </h2>
          </div>
          <p>
            My journey began at age 12 in a remote Bangladeshi village, using a
            school computer and cyber-café to explore programming. 3+ years of
            experience crafting cutting-edge apps.
          </p>
          <p>
            As a Full-Stack Developer, I bridge the gap between pixel-perfect
            user interfaces and powerful backend systems — designing data
            models, building secure APIs, and shipping end-to-end products that
            are scalable, robust, and a joy to use.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div ref={skillsRef} className="scrollbar-none space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Frontend
            </h3>
            <div className="space-y-4">
              {FRONTEND_SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  animate={skillsInView}
                  delay={i * 80}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Backend &amp; Database
            </h3>
            <div className="space-y-4">
              {BACKEND_SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  animate={skillsInView}
                  delay={(FRONTEND_SKILLS.length + i) * 80}
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-600">
              Mobile
            </h3>
            <div className="space-y-4">
              {MOBILE_SKILLS.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  animate={skillsInView}
                  delay={
                    (FRONTEND_SKILLS.length + BACKEND_SKILLS.length + i) * 80
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked"
      tone="muted"
    >
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-2 top-2 h-full w-px bg-linear-to-b from-violet-500/60 via-violet-500/20 to-transparent md:left-3" />
        <div className="space-y-12">
          {EXPERIENCE.map((entry) => (
            <div key={entry.company} className="relative">
              <div className="absolute -left-7 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20 md:-left-8.25" />
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {entry.company}
                    </h3>
                    <p className="text-sm text-violet-600">{entry.role}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {entry.period}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {entry.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tint = PROJECT_TINTS[index % PROJECT_TINTS.length];

  let domain = "";
  try {
    domain = new URL(project.href).hostname.replace(/^www\./, "");
  } catch {
    domain = project.href;
  }

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open in new tab`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-linear-to-br p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 ${tint.card}`}
    >
      <div className="relative flex grow flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-mono text-lg font-bold tracking-tight text-slate-900">
            {project.title}
          </h3>
          <span
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${tint.icon}`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 L17 7" />
              <polyline points="8 7 17 7 17 16" />
            </svg>
          </span>
        </div>
        <p className="mb-6 text-sm text-slate-600">{project.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span
              className={`font-mono text-xs text-slate-500 transition-colors ${tint.accent}`}
            >
              {domain}
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors ${tint.accent}`}
          >
            Visit
            <svg
              className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

function ProjectSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-5 w-2/3 rounded bg-slate-200" />
        <div className="h-8 w-8 rounded-lg bg-slate-100" />
      </div>
      <div className="mb-2 h-4 w-full rounded bg-slate-100" />
      <div className="mb-6 h-4 w-3/4 rounded bg-slate-100" />
      <div className="flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="h-3 w-10 rounded bg-slate-100" />
      </div>
    </div>
  );
}

function Portfolio() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <Section id="portfolio" eyebrow="Portfolio" title="Selected work">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProjectSkeleton key={i} />)
          : data?.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch" tone="muted">
      <div className="grid gap-6 md:grid-cols-2">
        <a
          href="mailto:sajidulsahin101@gmail.com"
          className="group relative overflow-hidden rounded-2xl border border-violet-200 bg-linear-to-br from-violet-50 to-white p-6 shadow-sm transition hover:border-violet-400 hover:shadow-md"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Email
          </p>
          <p className="mt-1 text-lg font-medium text-slate-900 transition group-hover:text-violet-600">
            sajidulsahin101@gmail.com
          </p>
        </a>

        <a
          href="tel:+8801954791740"
          className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-6 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Phone
          </p>
          <p className="mt-1 text-lg font-medium text-slate-900 transition group-hover:text-emerald-600">
            +88 01954791740
          </p>
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-auto bg-linear-to-b from-slate-50 to-white py-10">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent"
      />
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
        © 2024 <span className="font-medium text-violet-600">Shahin Ahmed</span>.
        All rights reserved.
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
