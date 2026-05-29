"use client";

import { useMemo, useState } from "react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Career Score", href: "#career-score" },
  { label: "Skill Gaps", href: "#skill-gaps" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "AI Mentor", href: "#mentor" },
];

function Icon({ name, className = "h-5 w-5" }) {
  const common = { className, fill: "none", viewBox: "0 0 24 24" };
  switch (name) {
    case "spark":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2l1.6 6.2L20 10l-6.4 1.8L12 18l-1.6-6.2L4 10l6.4-1.8L12 2z"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3l7 4v6c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-5"
          />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
          />
        </svg>
      );
    case "route":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 5a2 2 0 104 0 2 2 0 00-4 0zm0 14a2 2 0 104 0 2 2 0 00-4 0zm8-9h4m-4 0a3 3 0 00-3 3v3"
          />
        </svg>
      );
    case "chat":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h7M21 12c0 4.4-4 8-9 8-1.1 0-2.2-.2-3.2-.6L3 21l1.6-4.1C3.6 15.6 3 13.9 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Badge({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 shadow-[0_0_20px_rgba(52,211,153,0.55)]" />
      {children}
    </div>
  );
}

function GlassCard({ className = "", children }) {
  return (
    <div
      className={[
        "group relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_-40px_rgba(0,0,0,0.85)]",
        "transition-transform duration-300 will-change-transform hover:-translate-y-1",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/15 via-fuchsia-500/10 to-emerald-500/15 blur" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function StatPill({ label, value, tone = "cyan" }) {
  const toneClasses =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
      : tone === "fuchsia"
        ? "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-100"
        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";
  return (
    <div
      className={[
        "rounded-xl border px-4 py-3",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_20px_60px_-40px_rgba(0,0,0,0.9)]",
        toneClasses,
      ].join(" ")}
    >
      <div className="text-xs/5 text-white/70">{label}</div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
    </div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("Full Stack Developer");
  const [level, setLevel] = useState("Intermediate");

  const score = useMemo(() => {
    const base = role.includes("Data") ? 74 : role.includes("Product") ? 77 : 82;
    const bump = level === "Beginner" ? -10 : level === "Senior" ? +6 : 0;
    return Math.max(38, Math.min(96, base + bump));
  }, [role, level]);

  const scoreLabel =
    score >= 85 ? "Ready for top interviews" : score >= 70 ? "Strong momentum" : "Build core depth";

  const scoreRing = useMemo(() => {
    const r = 46;
    const c = 2 * Math.PI * r;
    const offset = c - (score / 100) * c;
    return { r, c, offset };
  }, [score]);

  return (
    <main className="relative min-h-screen bg-[#070A12] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_58%)] blur-2xl" />
        <div className="absolute -top-24 left-[10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute top-[22%] right-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070A12]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="group inline-flex items-center gap-3">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-emerald-500/20 blur-sm" />
              <div className="relative text-cyan-200">
                <Icon name="spark" className="h-5 w-5" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                CareerPilot <span className="text-cyan-200">AI</span>
              </div>
              <div className="text-[11px] text-white/55">Career Intelligence Platform</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#roadmap"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              See Roadmap
            </a>
            <a
              href="#career-score"
              className="cp-shimmer rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-black shadow-[0_25px_70px_-35px_rgba(34,211,238,0.6)] cp-animate-gradient"
            >
              Get Career Score
            </a>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 backdrop-blur md:hidden"
            onClick={() => setMenuOpen((s) => !s)}
            aria-label="Toggle menu"
            type="button"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-[#070A12]/70 backdrop-blur-xl md:hidden">
            <div className="mx-auto max-w-6xl px-4 py-3">
              <div className="grid gap-2">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href="#roadmap"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm text-white/80"
                    onClick={() => setMenuOpen(false)}
                  >
                    Roadmap
                  </a>
                  <a
                    href="#career-score"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-black"
                    onClick={() => setMenuOpen(false)}
                  >
                    Score
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 md:px-6 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge>National-level career readiness, AI-personalized.</Badge>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Your career,{" "}
              <span className="bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-transparent">
                computed
              </span>{" "}
              like a mission plan.
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-base text-white/70 md:text-lg">
              CareerPilot AI turns your resume, projects, GitHub, and target role into a{" "}
              <span className="text-white">Career Score</span>, skill gap analysis, and a structured roadmap—
              with an AI mentor that guides every sprint.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#career-score"
                className="cp-shimmer inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_28px_80px_-40px_rgba(217,70,239,0.55)] cp-animate-gradient"
              >
                <Icon name="bolt" className="h-5 w-5" />
                Generate My Score
              </a>
              <a
                href="#mentor"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                <Icon name="chat" className="h-5 w-5" />
                Meet the AI Mentor
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <StatPill label="Avg. score uplift" value="+19 points" tone="cyan" />
              <StatPill label="Roadmap time" value="45 seconds" tone="fuchsia" />
              <StatPill label="Interview coverage" value="Top companies" tone="emerald" />
            </div>
          </div>

          <div className="relative">
            <div className="cp-animate-float absolute -inset-8 rounded-[28px] bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-emerald-500/20 blur-2xl" />
            <GlassCard className="cp-shimmer">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-white/60">Live Career Intelligence</div>
                    <div className="mt-1 text-lg font-semibold tracking-tight">
                      CareerPilot Dashboard
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_16px_rgba(52,211,153,0.55)]" />
                    <span className="text-xs text-white/70">Connected</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Career Score</div>
                      <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-100">
                        Real-time
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <div className="text-4xl font-semibold tracking-tight">{score}</div>
                        <div className="mt-1 text-xs text-white/60">{scoreLabel}</div>
                      </div>
                      <div className="h-12 w-24 rounded-xl bg-gradient-to-r from-cyan-500/30 via-fuchsia-500/20 to-emerald-500/30" />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Skill Gaps</div>
                      <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-2 py-1 text-xs text-fuchsia-100">
                        Ranked
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      {[
                        { label: "System Design", pct: 72, tone: "from-fuchsia-500/60" },
                        { label: "DSA / LeetCode", pct: 58, tone: "from-cyan-500/60" },
                        { label: "Project Depth", pct: 81, tone: "from-emerald-500/60" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <span>{s.label}</span>
                            <span>{s.pct}%</span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-white/10">
                            <div
                              className={[
                                "h-2 rounded-full bg-gradient-to-r",
                                s.tone,
                                "to-white/10",
                              ].join(" ")}
                              style={{ width: `${s.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: "shield",
                      title: "Signal-proof scoring",
                      desc: "Evidence-weighted, bias-aware scoring across projects, skills, and outcomes.",
                    },
                    {
                      icon: "route",
                      title: "Roadmap engine",
                      desc: "Autogenerates sprints with milestones, resources, and checkpoints.",
                    },
                    {
                      icon: "chat",
                      title: "Mentor copilot",
                      desc: "Ask “what next?” and get targeted tasks with feedback loops.",
                    },
                  ].map((c) => (
                    <div
                      key={c.title}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center gap-2 text-cyan-200">
                        <Icon name={c.icon} className="h-5 w-5" />
                        <div className="text-sm font-semibold text-white">{c.title}</div>
                      </div>
                      <div className="mt-2 text-xs text-white/65">{c.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">
              BUILT FOR OUTCOMES
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              A futuristic career stack—end to end.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              One platform to quantify readiness, close gaps, and ship proof-of-work—while your mentor AI
              keeps you on track.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-cyan-400/90 shadow-[0_0_14px_rgba(34,211,238,0.6)]" />
            Designed for hackathon-grade polish
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Career Intelligence Graph",
              desc: "Connect resume, GitHub, projects, certifications, and role requirements into one signal graph.",
              icon: "spark",
              accent: "from-cyan-500/20 via-cyan-500/0 to-transparent",
            },
            {
              title: "Evidence-based Skill Gaps",
              desc: "Get ranked gaps with confidence scores and the fastest evidence you can ship.",
              icon: "shield",
              accent: "from-emerald-500/20 via-emerald-500/0 to-transparent",
            },
            {
              title: "Roadmap Generator",
              desc: "Sprint-ready roadmap with milestones, resources, projects, and weekly check-ins.",
              icon: "route",
              accent: "from-fuchsia-500/20 via-fuchsia-500/0 to-transparent",
            },
            {
              title: "Interview Readiness Mode",
              desc: "Mock interviews, system design drills, and curated question sets aligned to your gaps.",
              icon: "bolt",
              accent: "from-cyan-500/20 via-fuchsia-500/0 to-transparent",
            },
            {
              title: "Mentor Chatbot",
              desc: "Ask for feedback, next steps, project reviews, and learning plans in real time.",
              icon: "chat",
              accent: "from-fuchsia-500/20 via-emerald-500/0 to-transparent",
            },
            {
              title: "Privacy-first Controls",
              desc: "Your data stays yours with granular controls and transparent signal inputs.",
              icon: "shield",
              accent: "from-emerald-500/20 via-cyan-500/0 to-transparent",
            },
          ].map((f) => (
            <GlassCard key={f.title} className="p-6">
              <div className="relative">
                <div
                  className={[
                    "pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br",
                    f.accent,
                    "opacity-60 blur-2xl",
                  ].join(" ")}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5 text-cyan-200">
                      <Icon name={f.icon} className="h-5 w-5" />
                    </div>
                    <div className="text-base font-semibold">{f.title}</div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">{f.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Career Score */}
      <section id="career-score" className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">
              AI CAREER SCORE
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              A score you can improve every week.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
              CareerPilot AI ranks your readiness using role-specific signals—projects, fundamentals, depth,
              communication, and portfolio strength—then generates a roadmap to raise it.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-xs text-white/65">Target Role</div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none ring-0 focus:border-cyan-400/40"
                >
                  <option>Full Stack Developer</option>
                  <option>Data Analyst</option>
                  <option>Product Manager</option>
                  <option>AI/ML Engineer</option>
                </select>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="text-xs text-white/65">Level</div>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none ring-0 focus:border-fuchsia-400/40"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <StatPill label="Portfolio signals" value="High" tone="emerald" />
              <StatPill label="ATS alignment" value="Optimized" tone="cyan" />
              <StatPill label="Hiring fit" value="Role-ready" tone="fuchsia" />
            </div>
          </div>

          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Computed Score</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">{role}</div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Updated now
              </div>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
              <div className="relative grid place-items-center">
                <svg viewBox="0 0 120 120" className="h-44 w-44">
                  <defs>
                    <linearGradient id="cpScore" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
                      <stop offset="50%" stopColor="rgba(217,70,239,0.92)" />
                      <stop offset="100%" stopColor="rgba(52,211,153,0.95)" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r={scoreRing.r}
                    stroke="rgba(255,255,255,0.10)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={scoreRing.r}
                    stroke="url(#cpScore)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={scoreRing.c}
                    strokeDashoffset={scoreRing.offset}
                    transform="rotate(-90 60 60)"
                    style={{ transition: "stroke-dashoffset 700ms ease" }}
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-4xl font-semibold tracking-tight">{score}</div>
                  <div className="mt-1 text-xs text-white/60">{scoreLabel}</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { k: "Projects & Impact", v: 84, tone: "from-emerald-500/60" },
                  { k: "Core Fundamentals", v: 76, tone: "from-cyan-500/60" },
                  { k: "System Design", v: 67, tone: "from-fuchsia-500/60" },
                  { k: "Communication", v: 79, tone: "from-cyan-500/50" },
                ].map((row) => (
                  <div key={row.k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold">{row.k}</span>
                      <span className="text-white/70">{row.v}%</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10">
                      <div
                        className={["h-2 rounded-full bg-gradient-to-r", row.tone, "to-white/10"].join(
                          " "
                        )}
                        style={{ width: `${row.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#skill-gaps"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                <Icon name="shield" className="h-5 w-5" />
                See skill gaps
              </a>
              <a
                href="#roadmap"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-black cp-animate-gradient"
              >
                <Icon name="route" className="h-5 w-5" />
                Generate roadmap
              </a>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Skill gaps */}
      <section id="skill-gaps" className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">
              SKILL GAP ANALYSIS
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Cards that turn gaps into a plan.
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
              Each gap includes a confidence score, what to learn, how to prove it, and a mini-project to
              ship—so your roadmap is measurable.
            </p>
          </div>
          <div className="flex items-center justify-start gap-2 lg:justify-end">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70 backdrop-blur">
              Prioritized by impact × effort
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "System Design",
              severity: "High impact",
              confidence: 0.82,
              bullets: ["Design scalable APIs", "Caching strategies", "Trade-offs & bottlenecks"],
              proof: "Ship: Rate-limited API + Redis cache + load test report",
              tone: "from-fuchsia-500/25 via-cyan-500/10 to-transparent",
            },
            {
              title: "DSA & Problem Solving",
              severity: "Core signal",
              confidence: 0.74,
              bullets: ["Arrays / Strings", "Graphs / BFS-DFS", "Dynamic programming"],
              proof: "Ship: 30-day challenge + patterns notes + solutions repo",
              tone: "from-cyan-500/25 via-emerald-500/10 to-transparent",
            },
            {
              title: "Project Depth",
              severity: "Portfolio upgrade",
              confidence: 0.79,
              bullets: ["Observability", "Auth & RBAC", "Performance profiling"],
              proof: "Ship: Production-grade app with metrics + audits",
              tone: "from-emerald-500/25 via-fuchsia-500/10 to-transparent",
            },
            {
              title: "Resume Signal Quality",
              severity: "Fast wins",
              confidence: 0.88,
              bullets: ["Impact numbers", "Role keywords", "Projects → outcomes mapping"],
              proof: "Ship: ATS-ready resume + 1-page portfolio refresh",
              tone: "from-cyan-500/22 via-fuchsia-500/10 to-transparent",
            },
            {
              title: "Behavioral Storytelling",
              severity: "Interview edge",
              confidence: 0.69,
              bullets: ["STAR narratives", "Conflict & ownership", "Decision trade-offs"],
              proof: "Ship: Story bank + 12 mock answers + feedback loop",
              tone: "from-fuchsia-500/22 via-emerald-500/10 to-transparent",
            },
            {
              title: "AI-era Differentiators",
              severity: "Modern stack",
              confidence: 0.71,
              bullets: ["Agentic workflows", "RAG basics", "Eval & safety"],
              proof: "Ship: RAG demo + eval harness + write-up",
              tone: "from-emerald-500/22 via-cyan-500/10 to-transparent",
            },
          ].map((card) => (
            <GlassCard key={card.title} className="p-6">
              <div
                className={[
                  "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-70 blur-2xl",
                  card.tone,
                ].join(" ")}
              />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-base font-semibold">{card.title}</div>
                    <div className="mt-1 text-xs text-white/60">{card.severity}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-right">
                    <div className="text-[10px] text-white/60">Confidence</div>
                    <div className="text-sm font-semibold">
                      {Math.round(card.confidence * 100)}%
                    </div>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/30" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs font-semibold text-white/80">Proof-of-work</div>
                  <div className="mt-1 text-xs text-white/65">{card.proof}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">
              ROADMAP GENERATOR
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              A roadmap that feels like a product launch.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
              Generate sprints, milestones, and projects based on your goal role and current score. Every
              sprint includes measurable deliverables and checkpoints.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <StatPill label="Sprint cadence" value="Weekly" tone="cyan" />
              <StatPill label="Artifacts shipped" value="Proof-of-work" tone="emerald" />
            </div>
          </div>

          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs text-white/60">Generated Roadmap</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">90-day Mission Plan</div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Auto-updates
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  w: "Sprint 1",
                  t: "Baseline + Portfolio refactor",
                  d: "Audit projects, upgrade README, add metrics, and publish a portfolio page.",
                  tone: "from-cyan-500/25",
                },
                {
                  w: "Sprint 2",
                  t: "System design foundations",
                  d: "Design API, data models, caching, rate-limits; write a trade-off doc.",
                  tone: "from-fuchsia-500/25",
                },
                {
                  w: "Sprint 3",
                  t: "Interview drills + mock loops",
                  d: "DSA patterns + 2 mocks/week with feedback and improvements.",
                  tone: "from-emerald-500/25",
                },
                {
                  w: "Sprint 4",
                  t: "Flagship project ship",
                  d: "Build a production-grade app with auth, observability, and tests.",
                  tone: "from-cyan-500/20",
                },
              ].map((s, idx) => (
                <div
                  key={s.w}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={[
                        "mt-0.5 grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-gradient-to-br",
                        s.tone,
                        "to-transparent",
                      ].join(" ")}
                    >
                      <span className="text-xs font-semibold">{idx + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="truncate text-sm font-semibold">{s.t}</div>
                        <div className="flex-none rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-white/60">
                          {s.w}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-white/65">{s.d}</div>
                      <div className="mt-3 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/60">
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                          Deliverables
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                          Resources
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                          Checkpoints
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold">Next checkpoint</div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-100">
                  In 7 days
                </div>
              </div>
              <div className="mt-2 text-xs text-white/65">
                Submit updated portfolio + 1 system design doc. CareerPilot recalculates your score and
                shifts your roadmap.
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Mentor */}
      <section id="mentor" className="relative mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">
              AI MENTOR CHATBOT
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Mentor-grade guidance, anytime.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/70 md:text-base">
              Get actionable feedback: “What should I build next?”, “What’s blocking my score?”, “How do I
              explain this project in interviews?”—with roadmap-aware answers.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-cyan-200">
                  <Icon name="chat" className="h-5 w-5" />
                  <div className="text-sm font-semibold text-white">Roadmap-aware</div>
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Your mentor knows your sprints, gaps, and deadlines—so advice is always contextual.
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-emerald-200">
                  <Icon name="shield" className="h-5 w-5" />
                  <div className="text-sm font-semibold text-white">Evidence-first</div>
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Suggestions come with proof-of-work tasks, resources, and measurable checkpoints.
                </div>
              </div>
            </div>
          </div>

          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/60">Preview</div>
                <div className="mt-1 text-lg font-semibold tracking-tight">CareerPilot Mentor</div>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                Typing…
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs font-semibold text-white/80">You</div>
                <div className="mt-1 text-sm text-white/70">
                  I’m targeting <span className="text-white">{role}</span>. What’s the fastest way to boost my score
                  in 14 days?
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/5 to-emerald-500/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-white/80">CareerPilot AI</div>
                  <div className="text-[10px] text-white/60">Action plan</div>
                </div>
                <div className="mt-2 text-sm text-white/75">
                  Focus on one proof-of-work sprint: ship a production-grade feature with measurable impact, then
                  document trade-offs. I’ll generate a 14-day micro-roadmap now.
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    "Day 1–2: baseline audit + target keywords",
                    "Day 3–5: build feature + tests",
                    "Day 6: add metrics + dashboard",
                    "Day 7: publish write-up + README",
                    "Day 8–10: system design doc + review",
                    "Day 11–14: mock interviews + iterate",
                  ].map((t) => (
                    <div key={t} className="rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/70">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/50">
                Ask your mentor…
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-5 py-3 text-sm font-semibold text-black cp-animate-gradient">
                Send
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
                  <span className="text-cyan-200">
                    <Icon name="spark" className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    CareerPilot <span className="text-cyan-200">AI</span>
                  </div>
                  <div className="text-xs text-white/60">AI Career Intelligence Platform</div>
                </div>
              </div>
              <p className="mt-4 max-w-xl text-sm text-white/70">
                A modern, futuristic landing experience built with Tailwind CSS, glassmorphism, and gradient
                motion—made to feel hackathon-winning from the first scroll.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/60">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Career Score</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Skill Gaps</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Roadmaps</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Mentor AI</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Platform</div>
              <div className="mt-3 grid gap-2 text-sm text-white/70">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href} className="hover:text-white">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Get started</div>
              <div className="mt-3 grid gap-2 text-sm text-white/70">
                <a href="#career-score" className="hover:text-white">
                  Generate score
                </a>
                <a href="#roadmap" className="hover:text-white">
                  Build roadmap
                </a>
                <a href="#mentor" className="hover:text-white">
                  Talk to mentor
                </a>
                <a href="#features" className="hover:text-white">
                  Explore features
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center">
            <div className="text-xs text-white/55">
              © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
            </div>
            <div className="text-xs text-white/55">
              Crafted for a national-level hackathon vibe • Dark • Glass • Gradients • Motion
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
