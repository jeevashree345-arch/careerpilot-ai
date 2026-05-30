"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [profile, setProfile] =
    useState("Student");

    async function handleRegister() {

        try {
            console.log({
                name,
                email,
                password,
                profile,
              });
          const { error } =
            await supabase
              .from("users")
              .insert([
                {
                  name,
                  email,
                  password,
                  profile,
                }
              ]);
      
              if (error) {

                console.log("SUPABASE ERROR:");
                console.log(JSON.stringify(error, null, 2));
              
                alert(error.message);
              
                return;
              }
      
          alert(
            "Registration Successful!"
          );
      
          router.push("/login");
      
        } catch (error) {
      
          console.error(error);
      
          alert(
            "Something went wrong"
          );
        }
      }

  return (
    <main className="min-h-screen bg-[#050816] text-white flex items-center justify-center">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">

        <h1 className="text-3xl font-bold text-center">
          CareerPilot AI
        </h1>

        <p className="mt-2 text-center text-white/60">
          Create Your Account
        </p>

        <input
          value={name}
          onChange={(e)=>
            setName(e.target.value)
          }
          placeholder="Name"
          className="mt-6 w-full rounded-xl bg-black/20 px-4 py-3"
        />

        <input
          value={email}
          onChange={(e)=>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="mt-4 w-full rounded-xl bg-black/20 px-4 py-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e)=>
            setPassword(e.target.value)
          }
          placeholder="Password"
          className="mt-4 w-full rounded-xl bg-black/20 px-4 py-3"
        />

        <select
          value={profile}
          onChange={(e)=>
            setProfile(e.target.value)
          }
          className="mt-4 w-full rounded-xl bg-black/20 px-4 py-3"
        >
          <option>Student</option>
          <option>Job Seeker</option>
          <option>Career Explorer</option>
        </select>

        <button
          onClick={handleRegister}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 font-semibold text-black"
        >
          Register
        </button>

      </div>

    </main>
  );
}