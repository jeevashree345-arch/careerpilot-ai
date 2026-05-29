"use client";

import { useMemo, useState } from "react";

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
    case "user":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20 21a8 8 0 10-16 0"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 11a4 4 0 100-8 4 4 0 000 8z"
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
    case "briefcase":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 6V5a2 2 0 012-2h2a2 2 0 012 2v1"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 8h14a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common} stroke="currentColor" strokeWidth="1.6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16V4m0 0l-4 4m4-4l4 4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3"
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
    default:
      return null;
  }
}

function Spinner({ className = "h-4 w-4" }) {
  return (
    <svg
      className={["animate-spin", className].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-90"
        d="M22 12a10 10 0 0 1-10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GlassCard({ className = "", children }) {
  return (
    <div
      className={[
        "group relative rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_-50px_rgba(0,0,0,0.9)]",
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

function StatChip({ label, value, tone = "cyan" }) {
  const toneClasses =
    tone === "emerald"
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-50"
      : tone === "fuchsia"
        ? "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-50"
        : "border-cyan-400/20 bg-cyan-400/10 text-cyan-50";
  return (
    <div className={["rounded-xl border px-4 py-3", toneClasses].join(" ")}>
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="mt-1 text-sm font-semibold">{value}</div>
    </div>
  );
}

function ProgressRow({ label, value, tone = "cyan" }) {
  const grad =
    tone === "emerald"
      ? "from-emerald-500/70 via-emerald-300/40"
      : tone === "fuchsia"
        ? "from-fuchsia-500/70 via-fuchsia-300/40"
        : "from-cyan-500/70 via-cyan-300/40";
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between gap-3 text-sm">
        <div className="font-semibold text-white">{label}</div>
        <div className="text-white/70">{value}%</div>
      </div>
      <div className="mt-2 h-2 rounded-full bg-white/10">
        <div
          className={["h-2 rounded-full bg-gradient-to-r", grad, "to-white/10"].join(" ")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ score, subtitle }) {
  const ring = useMemo(() => {
    const r = 46;
    const c = 2 * Math.PI * r;
    const offset = c - (score / 100) * c;
    return { r, c, offset };
  }, [score]);

  return (
    <div className="relative grid place-items-center">
      <svg viewBox="0 0 120 120" className="h-44 w-44">
        <defs>
          <linearGradient id="cpDashScore" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
            <stop offset="50%" stopColor="rgba(217,70,239,0.92)" />
            <stop offset="100%" stopColor="rgba(52,211,153,0.95)" />
          </linearGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r={ring.r}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r={ring.r}
          stroke="url(#cpDashScore)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={ring.c}
          strokeDashoffset={ring.offset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-semibold tracking-tight">{score}</div>
        <div className="mt-1 text-xs text-white/60">{subtitle}</div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [track, setTrack] = useState("Full Stack Developer");
  const [resumeName, setResumeName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [mentorQuestion, setMentorQuestion] = useState("");
const [mentorAnswer, setMentorAnswer] = useState("");
const [mentorLoading, setMentorLoading] = useState(false);
const [jobDescription, setJobDescription] = useState("");
const [jdResult, setJdResult] = useState(null);
const [jdLoading, setJdLoading] = useState(false);
const [challenge, setChallenge] = useState(null);
const [challengeLoading, setChallengeLoading] = useState(false);
const [challengeAnswer, setChallengeAnswer] = useState("");
const [evaluation, setEvaluation] = useState(null);
const [evaluating, setEvaluating] = useState(false);
const [internships, setInternships] = useState([]);
const [internshipLoading, setInternshipLoading] = useState(false);
const [learningPath, setLearningPath] =
  useState(null);

const [loadingPath, setLoadingPath] =
  useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const fallbackScore = useMemo(() => {
    const base =
      track.includes("Data") ? 76 : track.includes("AI") ? 73 : track.includes("Product") ? 78 : 84;
    const jitter = resumeName ? 3 : 0;
    return Math.max(40, Math.min(97, base + jitter));
  }, [track, resumeName]);

  const score =
    analysis && Number.isFinite(Number(analysis.careerReadinessScore))
      ? Math.max(0, Math.min(100, Math.round(Number(analysis.careerReadinessScore))))
      : fallbackScore;

  const scoreLabel =
    score >= 86 ? "Interview-ready trajectory" : score >= 72 ? "Strong momentum" : "Build core depth";

  const topGaps = useMemo(() => {
    const missing = Array.isArray(analysis?.missingSkills) ? analysis.missingSkills : null;
    if (missing?.length) {
      const tones = [
        "from-fuchsia-500/25 via-cyan-500/10 to-transparent",
        "from-cyan-500/25 via-emerald-500/10 to-transparent",
        "from-emerald-500/25 via-fuchsia-500/10 to-transparent",
      ];
      return missing.slice(0, 3).map((m, idx) => ({
        name: m?.skill ?? "Missing skill",
        impact: (m?.priority ?? "medium").toString(),
        confidence: null,
        action:
          typeof m?.reason === "string" && m.reason
            ? m.reason
            : Array.isArray(m?.learningTasks) && m.learningTasks.length
              ? `Tasks: ${m.learningTasks.slice(0, 3).join(" • ")}`
              : "Add this skill to your roadmap with proof-of-work.",
        tone: tones[idx % tones.length],
      }));
    }

    return [
      {
        name: "System Design Depth",
        impact: "High",
        confidence: 84,
        action: "Ship: scalable API + cache + rate-limits + trade-off doc",
        tone: "from-fuchsia-500/25 via-cyan-500/10 to-transparent",
      },
      {
        name: "DSA Patterns",
        impact: "Core",
        confidence: 76,
        action: "Ship: 30 problems + pattern notes + timed mocks",
        tone: "from-cyan-500/25 via-emerald-500/10 to-transparent",
      },
      {
        name: "Project Observability",
        impact: "Portfolio",
        confidence: 71,
        action: "Ship: metrics + logs + dashboards + perf report",
        tone: "from-emerald-500/25 via-fuchsia-500/10 to-transparent",
      },
    ];
  }, [analysis]);

  const recommendedRoles = useMemo(() => {
    if (
      analysis?.suggestedCareerRoles &&
      Array.isArray(analysis.suggestedCareerRoles)
    ) {
      return analysis.suggestedCareerRoles.map((role) => ({
        role: role.title,
        match: role.fitScore||75,
        reason: role.rationale,
      }));
    }
  
    return [];
  }, [analysis]);
  const roadmapData = useMemo(() => {
    return Array.isArray(analysis?.roadmap)
      ? analysis.roadmap
      : [];
  }, [analysis]);
  const careerPath = analysis?.careerPathDiscovery || null;
  const technicalSkills = useMemo(() => {
    const t = analysis?.technicalSkills;
    if (!t || typeof t !== "object") return null;
    const pick = (arr) => (Array.isArray(arr) ? arr.filter(Boolean).slice(0, 10) : []);
    return {
      languages: pick(t.languages),
      frameworks: pick(t.frameworks),
      tools: pick(t.tools),
      concepts: pick(t.concepts),
    };
  }, [analysis]);
  async function handleResumeUpload(file) {
    if (!file) return;
  
    try {
      setAnalyzeError("");
      setResumeName(file.name);
  
      const formData = new FormData();
      formData.append("resume", file);
  
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed to extract PDF");
      }
  
      setResumeText(data.text || "");
    } catch (error) {
      console.error(error);
      setAnalyzeError(error.message || "PDF upload failed");
    }
  }
  async function onAnalyze() {
    setAnalyzeError("");
    const text = resumeText.trim();
  
    if (!text) {
      setAnalyzeError("Please paste your resume text before analyzing.");
      return;
    }
  
    setIsAnalyzing(true);
  
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });
  
      const data = await res.json();
  
      console.log("AI RESPONSE:", data);
  
      // Handle backend errors
      if (!res.ok) {
        throw new Error(
          data?.error || "AI analysis failed"
        );
      }
  
      // Save AI response
      setAnalysis(data);
  
    } catch (error) {
      console.error(error);
  
      setAnalyzeError(
        error.message || "Something went wrong"
      );
    } finally {
      setIsAnalyzing(false);
    }
  }
  async function askMentor() {
    if (!mentorQuestion.trim()) return;
  
    setMentorLoading(true);
  
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: mentorQuestion,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Mentor failed");
      }
  
      setMentorAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setMentorAnswer("Unable to get mentor response.");
    } finally {
      setMentorLoading(false);
    }
  }
  async function analyzeJDMatch() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      alert("Please provide both resume and job description.");
      return;
    }
  
    setJdLoading(true);
  
    try {
      const res = await fetch("/api/jd-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "JD Match failed");
      }
  
      setJdResult(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setJdLoading(false);
    }
  }
  async function generateChallenge() {
    if (!analysis?.careerPathDiscovery?.domain) {
      alert("Analyze a resume first.");
      return;
    }
  
    setChallengeLoading(true);
  
    try {
      const res = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: analysis.careerPathDiscovery.domain,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Challenge generation failed");
      }
  
      setChallenge(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setChallengeLoading(false);
    }
  }

  async function evaluateChallenge() {
    if (!challenge || !challengeAnswer.trim()) {
      alert("Please answer the challenge first.");
      return;
    }
  
    setEvaluating(true);
  
    try {
      const res = await fetch("/api/evaluate-challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challenge: `
  Title: ${challenge.title}
  
  Scenario:
  ${challenge.scenario}
  
  Question:
  ${challenge.question}
  `,
          answer: challengeAnswer,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Evaluation failed");
      }
  
      setEvaluation(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setEvaluating(false);
    }
  }
  async function getInternships() {
    if (!analysis) {
      alert("Analyze a resume first.");
      return;
    }
  
    setInternshipLoading(true);
  
    try {
      const res = await fetch("/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain:
            analysis?.careerPathDiscovery?.domain,
  
          skills: [
            ...(analysis?.technicalSkills?.tools || []),
            ...(analysis?.technicalSkills?.concepts || [])
          ]
        }),
      });
  
      const data = await res.json();
  
      setInternships(
        data.internships || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setInternshipLoading(false);
    }
  }
  async function getLearningPath(skill) {
    try {
      setLoadingPath(true);
  
      const response = await fetch(
        "/api/learning-path",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            skill,
            domain:
              analysis?.careerPathDiscovery?.domain,
          }),
        }
      );
  
      const data =
        await response.json();
  
      console.log(
        "LEARNING PATH:",
        data
      );
  
      setLearningPath(data);
  
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPath(false);
    }
  }
  return (
    <main className="relative min-h-screen bg-[#070A12] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_58%)] blur-2xl" />
        <div className="absolute -top-16 left-[8%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute top-[22%] right-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_70%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A12]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-emerald-500/20 blur-sm" />
              <span className="relative text-cyan-200">
                <Icon name="spark" className="h-5 w-5" />
              </span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">
                CareerPilot <span className="text-cyan-200">AI</span> Dashboard
              </div>
              <div className="text-[11px] text-white/55">Career Intelligence • Student View</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400/90 shadow-[0_0_14px_rgba(52,211,153,0.55)]" />
              Live signals connected
            </div>
            <a
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10"
            >
              Landing
            </a>
          </div>
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-semibold tracking-wider text-white/60">STUDENT COMMAND CENTER</div>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Your career pipeline, glowing in real time.
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/70 md:text-base">
              Monitor readiness, track skills, close gaps, and generate sprint roadmaps—built for hackathon-level
              wow.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <div className="text-[11px] text-white/60">Career Track</div>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="mt-1 w-[240px] max-w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/40"
              >
                <option>Full Stack Developer</option>
                <option>Backend Engineer</option>
                <option>Data Analyst</option>
                <option>AI/ML Engineer</option>
                <option>Product Manager</option>
              </select>
            </div>
            <div className="rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 p-[1px] shadow-[0_30px_90px_-50px_rgba(34,211,238,0.55)]">
              <button
                type="button"
                className="cp-shimmer w-full rounded-2xl bg-[#070A12] px-5 py-3 text-sm font-semibold text-white/90"
              >
                Generate AI Report
              </button>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {/* Left rail */}
          <div className="space-y-4 lg:col-span-4">
            {/* Profile card */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-emerald-500/20 blur-sm" />
                    <span className="relative text-cyan-200">
                      <Icon name="user" className="h-6 w-6" />
                    </span>
                  </div>
                  <div>
                    <div className="text-base font-semibold tracking-tight">Jeevashree</div>
                    <div className="text-xs text-white/60">Final-year • B.Tech • India</div>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
                  Active
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <StatChip label="Target Track" value={track} tone="cyan" />
                <StatChip label="Streak" value="6 days" tone="emerald" />
                <StatChip label="Projects" value="8 shipped" tone="fuchsia" />
                <StatChip label="ATS Fit" value="Optimized" tone="cyan" />
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Next checkpoint</div>
                  <div className="text-xs text-white/60">In 7 days</div>
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Ship one measurable feature + a system design note. CareerPilot will re-score and adapt your roadmap.
                </div>
              </div>
            </GlassCard>

            {/* Resume + AI analysis */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-cyan-200">
                    <Icon name="upload" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Resume Analyzer</div>
                    <div className="text-xs text-white/60">Paste text → Gemini → structured insights</div>
                  </div>
                </div>
                <div className="text-[11px] text-white/60">PDF recommended</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold text-white/80">Resume text</div>
                    <div className="text-[11px] text-white/55">
                      {resumeText.trim().length.toLocaleString()} chars
                    </div>
                  </div>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here (skills, projects, experience, education)…"
                    className="mt-3 h-40 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/85 outline-none placeholder:text-white/35 focus:border-cyan-400/40"
                  />
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:bg-white/10">
                      <span className="inline-flex items-center gap-2">
                        <Icon name="upload" className="h-4 w-4" />
                        Choose file (name only)
                      </span>
                      
                    </label>
                    <button
                      type="button"
                      onClick={onAnalyze}
                      disabled={isAnalyzing}
                      className={[
                        "cp-shimmer inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold",
                        "bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 text-black",
                        "disabled:cursor-not-allowed disabled:opacity-70",
                      ].join(" ")}
                    >
                      {isAnalyzing ? (
                        <>
                          <Spinner className="h-4 w-4" />
                          Analyzing…
                        </>
                      ) : (
                        <>
                          <Icon name="spark" className="h-4 w-4" />
                          Analyze with AI
                        </>
                      )}
                    </button>
                  </div>
                  {resumeName ? (
                    <div className="mt-3 text-xs text-white/70">
                      File selected: <span className="text-white">{resumeName}</span>
                    </div>
                  ) : null}
                  {analyzeError ? (
                    <div className="mt-3 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                      {analyzeError}
                    </div>
                  ) : null}
                  {/* JD MATCH SECTION */}
<div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
  <div className="text-xs font-semibold text-white/80">
    Job Description
  </div>

  <textarea
    value={jobDescription}
    onChange={(e) => setJobDescription(e.target.value)}
    placeholder="Paste job description here..."
    className="mt-3 h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/85 outline-none"
  />

  <button
    type="button"
    onClick={analyzeJDMatch}
    disabled={jdLoading}
    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-black"
  >
    {jdLoading
      ? "Analyzing Match..."
      : "Analyze Resume vs JD"}
  </button>
</div>

                </div>
                {jdResult && (
  <GlassCard className="p-5">
    <div className="flex items-center justify-between">
      <div className="text-sm font-semibold">
        JD Match Result
      </div>

      <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
        {jdResult.matchScore}% Match
      </div>
    </div>

    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs font-semibold text-white/70">
        Strengths
      </div>

      <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
        {(jdResult.strengths || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-4 text-xs font-semibold text-white/70">
        Missing Skills
      </div>

      <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
        {(jdResult.missingSkills || []).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="mt-4 text-xs font-semibold text-white/70">
        Recommendation
      </div>

      <div className="mt-2 text-sm text-white/80">
        {jdResult.recommendation}
      </div>
    </div>
  </GlassCard>
)}
                {/* Technical skills */}
                <GlassCard className="p-5">
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold">Technical Skills</div>
                    <div className="text-[11px] text-white/55">
                      {analysis ? "From Gemini analysis" : "Analyze to unlock"}
                    </div>
                  </div>

                  {technicalSkills ? (
                    <div className="mt-4 space-y-3">
                      {[
                        { k: "Languages", v: technicalSkills.languages, tone: "from-cyan-500/18" },
                        { k: "Frameworks", v: technicalSkills.frameworks, tone: "from-fuchsia-500/18" },
                        { k: "Tools", v: technicalSkills.tools, tone: "from-emerald-500/18" },
                        { k: "Concepts", v: technicalSkills.concepts, tone: "from-cyan-500/14" },
                      ].map((row) => (
                        <div key={row.k} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-xs font-semibold text-white/80">{row.k}</div>
                            <div className="text-[11px] text-white/55">
                              {row.v.length ? `${row.v.length} items` : "—"}
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {row.v.length ? (
                              row.v.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
                                >
                                  {chip}
                                </span>
                              ))
                            ) : (
                              <div className="text-xs text-white/55">
                                Paste resume text and run analysis to populate.
                              </div>
                            )}
                          </div>
                          <div className={["mt-3 h-px bg-gradient-to-r", row.tone, "via-white/5 to-transparent"].join(" ")} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
                      Run analysis to extract and categorize your technical skills.
                    </div>
                  )}
                </GlassCard>
              </div>
            </GlassCard>
          </div>

          {/* Center */}
          <div className="space-y-4 lg:col-span-5">
            {/* Career readiness score */}
            <GlassCard className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-white/60">CAREER READINESS</div>
                  <div className="mt-2 text-lg font-semibold tracking-tight">Career Readiness Score</div>
                  <div className="mt-1 text-sm text-white/70">
                    {analysis?.summary ? analysis.summary : scoreLabel}
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {analysis ? "AI computed" : "Updated now"}
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-center">
                <ScoreRing score={score} subtitle="Score / 100" />
                <div className="space-y-3">

  {[
    {
      label: "Projects & Impact",
      value: Math.min(95, score + 6),
      tone: "emerald",
    },
    {
      label: "Core Fundamentals",
      value: Math.max(54, score - 8),
      tone: "cyan",
    },
    {
      label: "System Design",
      value: Math.max(42, score - 18),
      tone: "fuchsia",
    },
    {
      label: "Communication",
      value: Math.max(52, score - 6),
      tone: "cyan",
    },
  ].map((metric) => (

    <div
      key={metric.label}
      onClick={() =>
        setSelectedMetric(metric.label)
      }
      className="cursor-pointer"
    >
      <ProgressRow
        label={metric.label}
        value={metric.value}
        tone={metric.tone}
      />
    </div>

  ))}

</div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <StatChip label="Signal Quality" value="High" tone="emerald" />
                <StatChip label="Roadmap Fit" value="Excellent" tone="cyan" />
                <StatChip label="Interview Risk" value="Low" tone="fuchsia" />
              </div>
            </GlassCard>

            {selectedMetric &&
 analysis?.readinessImprovement && (

  <GlassCard className="p-6">

    <div className="flex items-center justify-between">

      <div>
        <div className="text-sm font-semibold">
          Improvement Plan
        </div>

        <div className="text-xs text-white/60">
          Skills required to increase your score
        </div>
      </div>

      <button
        onClick={() =>
          setSelectedMetric(null)
        }
        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
      >
        Close
      </button>

    </div>

    <div className="mt-5 space-y-3">

      {(selectedMetric === "Projects & Impact"
        ? analysis.readinessImprovement.projectsImpact

        : selectedMetric === "Core Fundamentals"
        ? analysis.readinessImprovement.coreFundamentals

        : selectedMetric === "System Design"
        ? analysis.readinessImprovement.systemDesign

        : analysis.readinessImprovement.communication
      )?.map((item, index) => (

        <div
          key={index}
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3"
        >
          ✓ {item}
        </div>

      ))}

    </div>

  </GlassCard>
)}
            {careerPath && (
  <GlassCard className="p-6">
    <div className="text-lg font-semibold">
      Career Path Discovery
    </div>

    <div className="mt-4">
      <div className="text-xs text-white/60">Domain</div>
      <div className="text-lg font-semibold">
        {careerPath.domain}
      </div>
    </div>

    <div className="mt-4">
      <div className="text-xs text-white/60">
        Primary Career Path
      </div>
      <div className="text-lg font-semibold text-cyan-300">
        {careerPath.primaryPath}
      </div>
    </div>

    <div className="mt-4">
      <div className="text-xs text-white/60">
        Alternative Career Paths
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {(careerPath.alternativePaths || []).map((path, index) => (
          <span
            key={index}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm"
          >
            {path}
          </span>
        ))}
      </div>
    </div>
  </GlassCard>
)}
<GlassCard className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-semibold">
        AI Skill Challenge
      </div>

      <div className="text-xs text-white/60">
        Domain-specific problem solving
      </div>
    </div>

    <button
      type="button"
      onClick={generateChallenge}
      disabled={challengeLoading}
      className="rounded-xl bg-cyan-500 px-3 py-2 text-xs font-semibold text-black"
    >
      {challengeLoading
        ? "Generating..."
        : "Generate Challenge"}
    </button>
  </div>

  {challenge && (
    <div className="mt-5 space-y-4">
      <div>
        <div className="text-lg font-semibold">
          {challenge.title}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Scenario
        </div>

        <div className="mt-2 text-sm text-white/80">
          {challenge.scenario}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Question
        </div>

        <div className="mt-2 text-sm text-white/80">
          {challenge.question}
        </div>
      </div>
      {/* ADD THIS BELOW QUESTION */}

    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-white/60">
        Your Answer
      </div>

      <textarea
        value={challengeAnswer}
        onChange={(e) => setChallengeAnswer(e.target.value)}
        placeholder="Write your solution..."
        className="mt-3 h-32 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
      />

      <button
        type="button"
        onClick={evaluateChallenge}
        disabled={evaluating}
        className="mt-3 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black"
      >
        {evaluating
          ? "Evaluating..."
          : "Evaluate Answer"}
      </button>
    </div>

    {evaluation && (
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-lg font-semibold text-cyan-300">
          Score: {evaluation.score}/100
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60">
            Strengths
          </div>

          <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
            {(evaluation.strengths || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <div className="text-xs text-white/60">
            Improvements
          </div>

          <ul className="mt-2 list-disc pl-5 text-sm text-white/80">
            {(evaluation.improvements || []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-sm text-white/80">
          {evaluation.feedback}
        </div>
      </div>
    )}
    </div>
    
  )}
</GlassCard>
<GlassCard className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-semibold">
        Internship Recommendations
      </div>

      <div className="text-xs text-white/60">
        AI matched opportunities
      </div>
    </div>

    <button
      type="button"
      onClick={getInternships}
      disabled={internshipLoading}
      className="rounded-xl bg-fuchsia-500 px-3 py-2 text-xs font-semibold text-black"
    >
      {internshipLoading
        ? "Loading..."
        : "Find Internships"}
    </button>
  </div>

  {internships.length > 0 && (
    <div className="mt-5 space-y-3">
      {internships.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-black/20 p-4"
        >
          <div className="flex items-start justify-between gap-3">
  <div className="min-w-0">
    <div className="text-sm font-semibold">
      {item.role}
    </div>

    <div className="mt-1 text-xs text-cyan-300">
      {item.company}
    </div>
  </div>

  <a
    href={item.applyLink}
    target="_blank"
    rel="noreferrer"
    className="rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-3 py-2 text-xs font-semibold text-black"
  >
    Apply Now
  </a>
</div>

<div className="mt-3 text-sm text-white/75">
  {item.whyMatch}
</div>

<div className="mt-2 text-xs text-white/50 break-all">
  {item.applyLink}
</div>
        </div>
      ))}
    </div>
  )}
</GlassCard>
            {/* Skill gap analysis */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-fuchsia-200">
                    <Icon name="shield" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Skill Gap Analysis</div>
                    <div className="text-xs text-white/60">
                      {analysis ? "AI-identified missing skills" : "Ranked by impact × effort"}
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {analysis ? "Gemini" : "Confidence-weighted"}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {topGaps.map((g) => (
                  <div
                    key={g.name}
                    className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4"
                  >
                    <div
                      className={[
                        "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-70 blur-2xl",
                        g.tone,
                      ].join(" ")}
                    />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                      <div>
  <button
    onClick={() => getLearningPath(g.name)}
    className="text-left text-sm font-semibold hover:text-cyan-300 transition"
  >
    {g.name}
  </button>

  <div className="mt-1 text-xs text-white/60">
    Priority:{" "}
    <span className="text-white/80">
      {String(g.impact).toUpperCase()}
    </span>
  </div>
</div>
                        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right">
  <div className="text-[10px] text-white/60">Confidence</div>

  <div className="text-sm font-semibold">
    {typeof g.confidence === "number"
      ? `${g.confidence}%`
      : g.impact === "HIGH"
      ? "95%"
      : g.impact === "MEDIUM"
      ? "80%"
      : "65%"}
  </div>
</div>
                      </div>
                      <div className="mt-3 text-sm text-white/70">{g.action}</div>
                      <div className="mt-3 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/60">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Resources</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Mini-project</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Checkpoint</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            {learningPath && (
  <GlassCard className="p-6">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-sm font-semibold">
        Learning Path Explorer
      </div>

      <div className="text-xs text-white/60">
        AI-generated roadmap for mastering the selected skill
      </div>
    </div>

    <button
      onClick={() => setLearningPath(null)}
      className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
    >
      Close
    </button>
  </div>

  <div className="mt-5 grid gap-4 md:grid-cols-2">

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Description
        </div>

        <div className="mt-2 text-sm text-white/80">
          {learningPath.description}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Recommended Courses
        </div>

        <div className="mt-3 space-y-2">
          {(learningPath.courses || []).map(
            (course, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="text-sm font-semibold">
                  {course.title}
                </div>

                <div className="text-xs text-cyan-300">
                  {course.provider}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
  <div className="text-xs text-white/60">
    YouTube Resources
  </div>

  <div className="mt-3 space-y-2">
    {(learningPath.youtubeLinks || []).map(
      (video, index) => (
        <a
          key={index}
          href={video.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
        >
          <div className="text-sm font-semibold">
            {video.title}
          </div>

          <div className="text-xs text-cyan-300">
            Open YouTube Resource
          </div>
        </a>
      )
    )}
  </div>
</div>
<div className="rounded-2xl border border-white/10 bg-black/20 p-4">
  <div className="text-xs text-white/60">
    Free Courses
  </div>

  <div className="mt-3 space-y-2">
    {(learningPath.freeCourseLinks || []).map(
      (course, index) => (
        <a
          key={index}
          href={course.url}
          target="_blank"
          rel="noreferrer"
          className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10"
        >
          <div className="text-sm font-semibold">
            {course.title}
          </div>

          <div className="text-xs text-emerald-300">
            Open Course
          </div>
        </a>
      )
    )}
  </div>
</div>
      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Mini Project
        </div>

        <div className="mt-2 text-sm text-white/80">
          {learningPath.project}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs text-white/60">
          Checkpoint
        </div>

        <div className="mt-2 text-sm text-white/80">
          {learningPath.checkpoint}
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4">
        <div className="text-xs text-cyan-100">
          Next Skill To Learn
        </div>

        <div className="mt-2 text-lg font-semibold text-cyan-300">
          {learningPath.nextSkill}
        </div>
      </div>

    </div>
  </GlassCard>
)}
            {/* Roadmap cards */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-200">
                    <Icon name="route" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">AI Roadmap</div>
                    <div className="text-xs text-white/60">Sprint-ready mission cards</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 transition hover:bg-white/10"
                >
                  Regenerate
                </button>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {(roadmapData.length
  ? roadmapData.map((item, index) => ({
    tag:
    item.week?.startsWith("Week")
      ? item.week
      : `Week ${index + 1}`,
      title: item.goal || "Roadmap Goal",
      desc: Array.isArray(item.tasks)
        ? item.tasks.join(" • ")
        : "Complete the planned activities",
      tone: [
        "from-cyan-500/22 via-fuchsia-500/10",
        "from-fuchsia-500/22 via-emerald-500/10",
        "from-emerald-500/22 via-cyan-500/10",
        "from-cyan-500/18 via-emerald-500/10",
      ][index % 4],
    }))
  : [
      {
        tag: "Sprint 1",
        title: "Portfolio 2.0 + ATS alignment",
        desc: "Upgrade projects, quantify impact, and align keywords to target roles.",
        tone: "from-cyan-500/22 via-fuchsia-500/10",
      },
      {
        tag: "Sprint 2",
        title: "System Design foundations",
        desc: "Design scalable APIs; write trade-offs, caching, rate-limits, and diagrams.",
        tone: "from-fuchsia-500/22 via-emerald-500/10",
      },
      {
        tag: "Sprint 3",
        title: "Flagship project: production-grade",
        desc: "Auth + RBAC, tests, observability, and performance report.",
        tone: "from-emerald-500/22 via-cyan-500/10",
      },
      {
        tag: "Sprint 4",
        title: "Interview loop: mock + iterate",
        desc: "DSA patterns + 2 mocks/week + feedback-driven improvements.",
        tone: "from-cyan-500/18 via-emerald-500/10",
      },
    ]
).map((r,index) => (
  <div
  key={`${r.title}-${index}`}
  className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-4"
>
                    <div
                      className={[
                        "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-70 blur-2xl",
                        r.tone,
                        "to-transparent",
                      ].join(" ")}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between gap-3">
                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
                          {r.tag}
                        </div>
                        <div className="text-[11px] text-white/55">~7 days</div>
                      </div>
                      <div className="mt-3 text-sm font-semibold">{r.title}</div>
                      <div className="mt-1 text-xs text-white/65">{r.desc}</div>
                      <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-white/60">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Deliverables</span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Checklist</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right rail */}
          <div className="space-y-4 lg:col-span-3">
            {/* Recommended roles */}
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-200">
                    <Icon name="briefcase" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Recommended Roles</div>
                    <div className="text-xs text-white/60">
                      {analysis ? "AI matched from resume" : "Best-fit targets"}
                    </div>
                  </div>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {analysis ? "Gemini" : "AI matched"}
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {recommendedRoles.map((rr) => (
                  <div key={rr.role} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">{rr.role}</div>
                        <div className="mt-1 text-xs text-white/60">
                          {rr.reason || "Matched by skill signals, projects, and readiness score."}
                        </div>
                      </div>
                      <div className="flex-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                        <div className="text-[10px] text-white/60">Match</div>
                        <div className="text-sm font-semibold">{rr.match}%</div>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white/10">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-emerald-500/70 via-cyan-500/40 to-white/10"
                        style={{ width: `${rr.match}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            
            <GlassCard className="p-6">
  <div className="flex items-center gap-2">
    <span className="text-cyan-200">
      <Icon name="spark" />
    </span>
    <div>
      <div className="text-sm font-semibold">
        AI Mentor
      </div>
      <div className="text-xs text-white/60">
        Ask career-related questions
      </div>
    </div>
  </div>

  <div className="mt-4">
    <textarea
      value={mentorQuestion}
      onChange={(e) =>
        setMentorQuestion(e.target.value)
      }
      placeholder="What skills should I learn for AI internships?"
      className="h-24 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none"
    />
  </div>

  <button
    type="button"
    onClick={askMentor}
    disabled={mentorLoading}
    className="mt-3 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 text-sm font-semibold text-black"
  >
    {mentorLoading
      ? "Thinking..."
      : "Ask AI Mentor"}
  </button>

  {mentorAnswer && (
    <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-white/60">
        Mentor Response
      </div>

      <div className="mt-2 text-sm text-white/80 whitespace-pre-wrap">
        {mentorAnswer}
      </div>
    </div>
  )}
</GlassCard>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 bg-[#070A12]/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-white/55 md:px-6">
          © {new Date().getFullYear()} CareerPilot AI • Dashboard prototype • Glowing glass + gradients
        </div>
      </footer>
    </main>
  );
}
