"use client";

import Link from "next/link";

const PROFILE = {
  name: "Shahin Ahmed",
  role: "Full-Stack Developer",
  email: "sajidulsahin101@gmail.com",
  phone: "+88 01954791740",
  github: "github.com/sahin43881",
  location: "Dhaka, Bangladesh",
};

const ABOUT =
  "Passionate Full-Stack Developer building end-to-end, scalable, secure, and robust web and mobile applications. I bridge the gap between pixel-perfect user interfaces and powerful backend systems — designing data models, building secure APIs, and shipping products users love. Experienced across the React ecosystem, from large-scale Next.js platforms and React Native mobile apps to the Node.js / Express.js services and databases behind them.";

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
    company: "Freelance & Contract",
    role: "Full-Stack Developer",
    period: "2022 – 2023",
    bullets: [
      "Delivered end-to-end products — responsive frontends wired to custom REST APIs and databases",
      "Translated Figma designs into pixel-accurate React components with Tailwind CSS",
      "Built secure auth, data models, and integrations while keeping Core Web Vitals sharp",
    ],
  },
];

const PROJECTS = [
  {
    title: "FutureSchool",
    description:
      "An online education platform delivering interactive learning experiences for students at scale.",
    domain: "futureschool.life",
    href: "https://futureschool.life/",
  },
  {
    title: "Pleebly Canvas",
    description:
      "A slide and presentation generator — AI-assisted canvas tool built with modern React tech.",
    domain: "slide-gen-smoky.vercel.app",
    href: "https://slide-gen-smoky.vercel.app/",
  },
  {
    title: "Ride On",
    description:
      "A ride-sharing and transport service platform for Bangladesh, offering seamless booking UX.",
    domain: "rideonbd.com",
    href: "https://rideonbd.com/",
  },
  {
    title: "Access Doctor",
    description:
      "A UK-based digital healthcare platform connecting patients with doctors quickly and efficiently.",
    domain: "accessdoctor.co.uk",
    href: "https://accessdoctor.co.uk/",
  },
  {
    title: "VideoCV",
    description:
      "A video-based résumé platform where candidates introduce themselves with short, recordable video profiles.",
    domain: "videocv.bd",
    href: "https://videocv.bd/",
  },
  {
    title: "ReFactory",
    description:
      "A corporate web platform for an industrial brand — marketing site with service catalog and lead capture.",
    domain: "refactory.ae",
    href: "https://www.refactory.ae/",
  },
];

const SKILLS = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript ES6",
      "React Query",
      "Redux",
      "HTML / CSS",
    ],
  },
  {
    label: "Backend & Database",
    items: [
      "Node.js",
      "Express.js",
      "Supabase",
      "MongoDB",
      "Drizzle ORM",
      "REST APIs",
    ],
  },
  { label: "Mobile", items: ["React Native", "Expo"] },
  {
    label: "Styling",
    items: ["Tailwind CSS", "Shadcn/UI", "SASS", "Bootstrap", "SMACSS"],
  },
  { label: "Tools & APIs", items: ["Redux Toolkit", "Context API", "Axios", "Git"] },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 border-b border-slate-200 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
      {children}
    </h2>
  );
}

export default function CVPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 print:bg-white print:p-0">
      {/* Action bar — hidden when printing */}
      <div className="mx-auto mb-6 flex max-w-3xl items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-violet-600"
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
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to site
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-violet-500 to-indigo-500 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition hover:shadow-violet-500/50"
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
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* Resume sheet */}
      <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:rounded-none print:border-0 print:shadow-none">
        {/* Header */}
        <header className="relative border-b border-slate-200 bg-linear-to-br from-violet-50 to-white px-8 py-10 print:py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-violet-300/20 blur-3xl print:hidden"
          />
          <h1 className="font-[family-name:var(--font-syne)] text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {PROFILE.name}
          </h1>
          <p className="mt-1 text-lg font-semibold text-violet-600">
            {PROFILE.role}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-600">
            <a href={`mailto:${PROFILE.email}`} className="hover:text-violet-600">
              {PROFILE.email}
            </a>
            <span>{PROFILE.phone}</span>
            <a
              href={`https://${PROFILE.github}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-violet-600"
            >
              {PROFILE.github}
            </a>
            <span>{PROFILE.location}</span>
          </div>
        </header>

        <div className="space-y-8 px-8 py-8">
          {/* About */}
          <section>
            <SectionTitle>About</SectionTitle>
            <p className="text-sm leading-relaxed text-slate-600">{ABOUT}</p>
          </section>

          {/* Experience */}
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-5">
              {EXPERIENCE.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <h3 className="text-base font-semibold text-slate-900">
                      {job.company}
                      <span className="font-normal text-violet-600">
                        {" "}
                        · {job.role}
                      </span>
                    </h3>
                    <span className="font-mono text-xs text-slate-500">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-500" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <SectionTitle>Featured Projects</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <a
                  key={p.title}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-violet-300 hover:shadow-sm print:break-inside-avoid"
                >
                  <h3 className="font-mono text-sm font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {p.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-violet-600">
                    {p.domain}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <SectionTitle>Core Skills</SectionTitle>
            <div className="space-y-3">
              {SKILLS.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col gap-1.5 sm:flex-row sm:gap-3"
                >
                  <span className="w-44 shrink-0 text-sm font-semibold text-slate-900">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <SectionTitle>Education</SectionTitle>
            <p className="text-sm font-medium text-slate-900">
              Rizaul Karim Chowdhury Degree College
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
