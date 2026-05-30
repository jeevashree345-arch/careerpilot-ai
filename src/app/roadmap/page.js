"use client";

import { useState, useEffect } from "react";

export default function RoadmapPage() {

    const [career, setCareer] =
    useState("AI Engineer");
  
  const [roadmap, setRoadmap] =
    useState(null);
  
  const [loading, setLoading] =
    useState(false);
  
  const [learningPath, setLearningPath] =
    useState(null);
    useEffect(() => {

        const storedUser =
          localStorage.getItem(
            "loggedInUser"
          );
    
        if (!storedUser) {
    
          window.location.href =
            "/login";
        }
    
      }, []);
    async function generateRoadmap() {
        console.log("Generate Roadmap Clicked");
        try {
      
          setLoading(true);
      
          const response =
            await fetch(
              "/api/career-roadmap",
              {
                method: "POST",
      
                headers: {
                  "Content-Type":
                    "application/json",
                },
      
                body: JSON.stringify({
      
                  domain: career,
      
                  careerPath: career,
      
                  missingSkills: [],
                }),
              }
            );
      
          const data =
            await response.json();
            console.log("ROADMAP RESPONSE:", data);
          console.log(
            "ROADMAP",
            data
          );
      
          setRoadmap(data);
      
        } catch (error) {
      
          console.error(error);
      
        } finally {
      
          setLoading(false);
        }
      }
      async function getLearningPath(skill) {

        try {
      
          const response =
            await fetch(
              "/api/learning-path",
              {
                method: "POST",
      
                headers: {
                  "Content-Type":
                    "application/json",
                },
      
                body: JSON.stringify({
                  skill,
                }),
              }
            );
      
          const data =
            await response.json();
      
          setLearningPath(data);
      
        } catch (error) {
      
          console.error(error);
        }
      }
  
      return (
        <main className="min-h-screen bg-[#050816] text-white">
      
          <div className="mx-auto max-w-6xl px-6 py-12">
      
            {/* Hero */}
            <div className="text-center">
      
              <h1 className="text-5xl font-bold">
                CareerPilot AI
              </h1>
      
              <p className="mt-3 text-white/60">
                Career Journey Explorer
              </p>
      
            </div>
      
            {/* Career Selector */}
            <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      
              <div className="text-sm font-semibold">
                Enter Your Dream Career
              </div>
              <div className="mt-1 text-xs text-white/60">
  Example: AI Engineer, Cybersecurity Engineer, Product Manager, Robotics Engineer
</div>
      
              <input
  type="text"
  value={career}
  onChange={(e) =>
    setCareer(e.target.value)
  }
  placeholder="Enter any career role..."
  className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3"
/>
      
              <button
                onClick={generateRoadmap}
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-emerald-500 px-4 py-3 font-semibold text-black"
              >
                {loading
                  ? "Generating..."
                  : "Generate Roadmap"}
              </button>
      
            </div>
      
            {/* Roadmap */}
            {roadmap?.nodes?.length > 0 && (
      
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
      
                <h2 className="text-2xl font-bold">
                  {roadmap.title}
                </h2>
      
                <p className="mt-2 text-sm text-white/60">
                  Click any roadmap step to explore learning resources
                </p>
      
                <div className="mt-8 flex flex-col items-center">
      
                  {roadmap.nodes.map((node, index) => (
      
                    <div
                      key={index}
                      className="flex flex-col items-center"
                    >
      
                      <button
                        onClick={() =>
                          getLearningPath(node.name)
                        }
                        className="rounded-2xl border border-white/10 bg-black/20 px-6 py-4 text-center transition hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
      
                        <div className="font-semibold">
                          {node.name}
                        </div>
      
                        <div className="mt-1 text-xs text-white/60">
                          {node.description}
                        </div>
      
                        <div className="mt-2 text-[10px] text-cyan-300">
                          {node.level}
                        </div>
      
                      </button>
      
                      {index !== roadmap.nodes.length - 1 && (
                        <div className="h-12 w-px bg-gradient-to-b from-cyan-500 to-fuchsia-500" />
                      )}
      
                    </div>
      
                  ))}
      
                </div>
      
              </div>
      
            )}
      
            {/* Learning Path */}
{learningPath && (

<div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">

  <h2 className="text-2xl font-bold">
    Learning Path Explorer
  </h2>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

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
        Recommended Project
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

    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs text-white/60">
        Next Skill
      </div>

      <div className="mt-2 text-sm text-cyan-300">
        {learningPath.nextSkill}
      </div>
    </div>

  </div>

  {/* Courses */}

  <div className="mt-8">

    <h3 className="text-lg font-semibold">
      Recommended Courses
    </h3>

    <div className="mt-4 grid gap-3">

      {(learningPath.courses || []).map(
        (course, index) => (

          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <a
  href={course.url}
  target="_blank"
  rel="noreferrer"
  className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-cyan-400"
>
  <div className="font-semibold">
    {course.title}
  </div>

  <div className="text-sm text-cyan-300">
    {course.provider}
  </div>
</a>

          </div>

        )
      )}

    </div>

  </div>

  {/* YouTube */}

  <div className="mt-8">

    <h3 className="text-lg font-semibold">
      YouTube Resources
    </h3>

    <div className="mt-4 space-y-3">

      {(learningPath.youtubeLinks || []).map(
        (video, index) => (

          <a
            key={index}
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-2xl border border-white/10 bg-black/20 p-4 hover:border-cyan-400"
          >

            <div className="font-semibold">
              {video.title}
            </div>

            <div className="text-sm text-cyan-300">
              Open YouTube Resource
            </div>

          </a>

        )
      )}

    </div>

  </div>

</div>

)}
      
          </div>
      
        </main>
      );
}