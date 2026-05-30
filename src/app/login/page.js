"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function LoginPage() {

  const router = useRouter();

  const [profile, setProfile] =
    useState("Student");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    async function handleLogin() {

        try {
      
          const { data, error } =
            await supabase
              .from("users")
              .select("*")
              .eq("email", email)
              .single();
      
          if (error || !data) {
      
            alert(
              "User not found"
            );
      
            return;
          }
      
          if (
            data.password !== password
          ) {
      
            alert(
              "Invalid credentials"
            );
      
            return;
          }
      
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(data)
          );
      
          if (
            data.profile ===
            "Career Explorer"
          ) {
      
            router.push("/roadmap");
      
          } else {
      
            router.push("/dashboard");
          }
      
        } catch (error) {
      
          console.error(error);
      
          alert(
            "Login failed"
          );
        }
      }

  return (

    <main className="min-h-screen bg-[#050816] text-white">

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">

        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">

          {/* Logo */}

          <div className="mb-8 text-center">

  <div className="mb-4 flex justify-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-emerald-500 text-2xl font-bold text-black">
      CP
    </div>
  </div>

  <h1 className="text-4xl font-bold">
    CareerPilot AI
  </h1>

  <p className="mt-2 text-white/60">
    Navigate Your Career With AI
  </p>

</div>

          {/* Description */}

          <div className="mb-8 text-center text-white/70">

            Discover career paths,
            analyze resumes,
            identify skill gaps,
            and become industry ready.

          </div>

          {/* Profile Selection */}

          <div>

            <h2 className="mb-4 text-sm font-semibold">
              Select Your Profile
            </h2>

            <div className="grid gap-3 md:grid-cols-3">

              {[
                "Student",
                "Job Seeker",
                "Career Explorer",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    setProfile(item)
                  }
                  className={`rounded-2xl border p-4 text-left transition

                  ${
                    profile === item
  ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                      : "border-white/10 bg-white/5"
                  }
                  `}
                >

<div className="text-lg font-semibold">
  {item}
</div>

<div className="mt-2 text-xs text-white/60">

  {item === "Student" &&
    "Resume Analysis • Skill Gap • Learning Hub"}

  {item === "Job Seeker" &&
    "Resume vs JD • Career Readiness • Internships"}

  {item === "Career Explorer" &&
    "Explore Career Paths • Roadmaps • Resources"}

</div>

                </button>

              ))}

            </div>

          </div>

          {/* Email */}

          <div className="mt-6">

            <label className="mb-2 block text-sm">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />

          </div>

          {/* Password */}

          <div className="mt-4">

            <label className="mb-2 block text-sm">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"
            />

          </div>

          {/* Button */}

          <button
            onClick={handleLogin}
            
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 font-semibold text-black"
          >
            Continue
          </button>
          <button
  onClick={() =>
    router.push("/roadmap")
  }
  className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
>
  Explore Career Roadmaps
</button>

          {/* Register */}

          <div className="mt-6 text-center text-sm text-white/60">

            Don't have an account?

            <span
              className="ml-2 cursor-pointer text-cyan-300"
              onClick={() =>
                router.push("/register")
              }
            >
              Register
            </span>

          </div>
{/* Platform Statistics */}

<div className="mt-8 grid grid-cols-3 gap-3">

  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">

    <div className="text-xl font-bold text-cyan-300">
      500+
    </div>

    <div className="text-xs text-white/60">
      Career Roadmaps
    </div>

  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">

    <div className="text-xl font-bold text-fuchsia-300">
      100+
    </div>

    <div className="text-xs text-white/60">
      Skill Tracks
    </div>

  </div>

  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">

    <div className="text-xl font-bold text-emerald-300">
      AI
    </div>

    <div className="text-xs text-white/60">
      Powered Guidance
    </div>

  </div>

</div>
        </div>

      </div>

    </main>
  );
}