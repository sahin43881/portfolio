"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const CV_URL =
  "https://docs.google.com/document/d/15LrSRPZYlaJxeOtj97xAb58LErNCt96sUclVyT5tRKU/preview";

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
  { name: "Vue / Nuxt.js", level: 80 },
  { name: "JavaScript", level: 95 },
  { name: "HTML / CSS", level: 98 },
  { name: "React Query", level: 88 },
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
  "Vue",
  "Nuxt.js",
  "React Native",
  "Expo",
];

const EXPERIENCE = [
  {
    company: "Qubiqe",
    role: "Senior Frontend Developer",
    period: "2023 – Present",
    bullets: [
      "Working in a dynamic team to ship high-quality web applications end-to-end",
      "Building scalable React & Next.js interfaces with a focus on performance and accessibility",
      "Collaborating closely with designers, backend developers, and stakeholders to refine UX",
      "Driving frontend architecture decisions, code reviews, and component-library conventions",
    ],
  },
  {
    company: "Frontend Developer",
    role: "Freelance & Contract",
    period: "2022 – 2023",
    bullets: [
      "Delivered responsive marketing sites and dashboards for early-stage product teams",
      "Translated Figma designs into pixel-accurate React components with Tailwind CSS",
      "Optimized Core Web Vitals — image strategy, code splitting, and bundle hygiene",
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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          aria-label="Shahin Ahmed — home"
          className="group inline-flex items-center font-mono text-xl font-semibold tracking-tight text-slate-200 transition-colors hover:text-white"
        >
          <span className="text-violet-400 transition-colors group-hover:text-violet-300">
            &lt;
          </span>
          
          <span className="text-violet-400 transition-colors group-hover:text-violet-300">
            /&gt;
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition-colors hover:text-violet-400"
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-slate-200 md:hidden"
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
        <div className="border-t border-white/5 bg-black/95 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-violet-400"
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

function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-white/5"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-700/15 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-700/15 blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="min-w-0 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </div>
          <p className="text-sm text-slate-400">Hi there! I&apos;m</p>
          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            SHAHIN
            <br />
            <span className="bg-linear-to-r from-violet-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              AHMED
            </span>
          </h1>
          <p className="max-w-md text-lg text-slate-300">
            Senior Frontend Developer with{" "}
            <span className="text-white">3+ years</span> of experience building
            fast, accessible, and scalable web applications.
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
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-400/40 hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-violet-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl"
          />
          <div className="relative aspect-square overflow-hidden rounded-4xl border border-white/10 bg-black shadow-2xl shadow-violet-500/10">
            <Image
              src="/615940895_122151814346889569_5411851280753949891_n.jpg"
              alt="Shahin Ahmed portrait"
              fill
              priority
              sizes="(min-width: 1024px) 512px, (min-width: 768px) 448px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-black/90 px-5 py-3.5 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-violet-400">
              Senior Frontend
            </p>
            <p className="text-sm text-slate-200">React · Next.js</p>
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
        <span className="text-slate-200">{name}</span>
        <span className="text-slate-400">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/5">
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
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  const [skillsRef, skillsInView] = useInView<HTMLDivElement>();

  return (
    <Section id="about" eyebrow="About" title="A bit about me">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-5 text-slate-300 leading-relaxed">
          <p>
            My journey began at age 12 in a remote Bangladeshi village, using
            school computer and cyber-café to explore programming. 3+ years of
            experience crafting cutting-edge apps.
          </p>
          <p>
            As a Senior Frontend Developer, I thrive on building scalable user
            interfaces, optimizing web performance, and collaborating closely
            with cross-functional teams to deliver high-quality code.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {TECH_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div ref={skillsRef} className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400">
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
            <h3 className="text-sm font-semibold uppercase tracking-wider text-violet-400">
              Mobile
            </h3>
            <div className="space-y-4">
              {MOBILE_SKILLS.map((skill, i) => (
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
        </div>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked">
      <div className="relative pl-8 md:pl-10">
        <div className="absolute left-2 top-2 h-full w-px bg-linear-to-b from-violet-500/60 via-violet-500/20 to-transparent md:left-3" />
        <div className="space-y-12">
          {EXPERIENCE.map((entry) => (
            <div key={entry.company} className="relative">
              <div className="absolute -left-7 top-1.5 h-3 w-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20 md:-left-8.25" />
              <div className="rounded-2xl border border-white/5 bg-white/2 p-6 transition hover:border-violet-500/30 hover:bg-white/4">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {entry.company}
                    </h3>
                    <p className="text-sm text-violet-300">{entry.role}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    {entry.period}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-slate-300">
                  {entry.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
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

function ProjectCard({ project }: { project: Project }) {
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
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-white/2 p-6 transition hover:-translate-y-1 hover:border-violet-500/40 hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-violet-500/0 via-violet-500/0 to-indigo-500/0 opacity-0 transition-opacity group-hover:from-violet-500/5 group-hover:to-indigo-500/10 group-hover:opacity-100"
      />
      <div className="relative flex grow flex-col">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-mono text-lg font-bold tracking-tight text-white">
            {project.title}
          </h3>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition group-hover:border-violet-400/40 group-hover:bg-violet-500/15 group-hover:text-violet-300">
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
        <p className="mb-6 text-sm text-slate-300">{project.description}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-slate-400 transition-colors group-hover:text-violet-300">
              {domain}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition-colors group-hover:text-violet-300">
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
    <div className="animate-pulse rounded-2xl border border-white/5 bg-white/2 p-6">
      <div className="mb-3 flex items-start justify-between">
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-8 w-8 rounded-lg bg-white/5" />
      </div>
      <div className="mb-2 h-4 w-full rounded bg-white/5" />
      <div className="mb-6 h-4 w-3/4 rounded bg-white/5" />
      <div className="flex items-center justify-between border-t border-white/5 pt-4">
        <div className="h-3 w-24 rounded bg-white/5" />
        <div className="h-3 w-10 rounded bg-white/5" />
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
          : data?.map((p) => <ProjectCard key={p.title} project={p} />)}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Get in touch">
      <div className="grid gap-6 md:grid-cols-2">
        <a
          href="mailto:sajidulsahin101@gmail.com"
          className="group relative overflow-hidden rounded-2xl border border-violet-500/20 bg-linear-to-br from-violet-500/10 to-violet-500/0 p-6 transition hover:border-violet-500/50"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
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
          <p className="text-xs uppercase tracking-wider text-slate-400">Email</p>
          <p className="mt-1 text-lg font-medium text-white transition group-hover:text-violet-300">
            sajidulsahin101@gmail.com
          </p>
        </a>

        <a
          href="tel:+8801954791740"
          className="group relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-linear-to-br from-emerald-500/10 to-emerald-500/0 p-6 transition hover:border-emerald-500/50"
        >
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
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
          <p className="text-xs uppercase tracking-wider text-slate-400">Phone</p>
          <p className="mt-1 text-lg font-medium text-white transition group-hover:text-emerald-300">
            +88 01954791740
          </p>
        </a>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-8">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-500">
        © 2026 Shahin Ahmed. Built with Next.js &amp; Tailwind CSS.
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
