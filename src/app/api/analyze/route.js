import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    // Check API key
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing OpenRouter API Key",
        },
        { status: 500 }
      );
    }

    // Read request body
    const body = await req.json();
    const resumeText = body.resumeText;
    const jobDescription = body.jobDescription || "";
    // Validate resume text
    if (!resumeText) {
      return NextResponse.json(
        {
          success: false,
          error: "Resume text is required",
        },
        { status: 400 }
      );
    }

    // OpenRouter client
    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: apiKey,
    });

    // AI request
    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content:
            "You are an expert AI resume analyzer. Return ONLY valid JSON without markdown or explanations.",
        },

        {
          role: "user",
          content: `
Analyze this resume and return ONLY valid JSON.

Required JSON format:

{
  "careerReadinessScore": 85,
  "summary": "Short career summary",

  "careerPathDiscovery": {
  "domain": "",
  "primaryPath": "",
  "alternativePaths": [],
  "emergingOpportunities": []
},

  "technicalSkills": {
    "languages": [],
    "frameworks": [],
    "tools": [],
    "concepts": []
  },

  "suggestedCareerRoles": [
  {
    "title": "",
    "fitScore": 75,
    "rationale": "",
    "domainAlignment": ""
  },
  {
    "title": "",
    "fitScore": 75,
    "rationale": "",
    "domainAlignment": ""
  },
  {
    "title": "",
    "fitScore": 75,
    "rationale": "",
    "domainAlignment": ""
  },
  {
    "title": "",
    "fitScore": 75,
    "rationale": "",
    "domainAlignment": ""
  }
]Return EXACTLY 4 career roles.
Do not return fewer than 4.
All roles must belong to the detected domain.
fitScore must be a realistic number between 60 and 100 based on the candidate's skills, projects, experience, and domain alignment,

  "missingSkills": [
  {
    "skill": "",
    "priority": "",
    "confidence": 90,
    "reason": ""
  },
  {
    "skill": "",
    "priority": "",
    "confidence": 90,
    "reason": ""
  },
  {
    "skill": "",
    "priority": "",
    "confidence": 90,
    "reason": ""
  }
]Return AT LEAST 3 missing skills.
Rank them by importance.
Do not return fewer than 3 items
For each missing skill return:
- priority (HIGH/MEDIUM/LOW)
- confidence (0-100)
- reason,
  "roadmap": [
  {
    "week": "Week 1",
    "goal": "",
    "tasks": []
  },
  {
    "week": "Week 2",
    "goal": "",
    "tasks": []
  },
  {
    "week": "Week 3",
    "goal": "",
    "tasks": []
  },
  {
    "week": "Week 4",
    "goal": "",
    "tasks": []
  }
],
"readinessImprovement": {
  "projectsImpact": [],
  "coreFundamentals": [],
  "systemDesign": [],
  "communication": []
}
}
Identify the student's academic domain.

Possible domains:
- Computer Science
- Information Technology
- Artificial Intelligence
- Electronics
- Electrical
- Mechanical
- Civil
- Biotechnology
- Commerce
- Management
- Arts and Humanities

Recommend:
1. Domain
2. Primary Career Path
3. Three Alternative Career Paths
4. Three Emerging Industry Opportunities
Suggested career roles MUST match the detected academic domain.

Examples:

Mechanical Engineering:
- Design Engineer
- Manufacturing Engineer
- Production Engineer
- CAD Engineer
- Robotics Engineer

Civil Engineering:
- Structural Engineer
- Site Engineer
- Construction Manager
- Quantity Surveyor

Electronics & Communication:
- Embedded Systems Engineer
- VLSI Engineer
- IoT Engineer
- Hardware Engineer

Electrical Engineering:
- Power Systems Engineer
- Electrical Design Engineer
- Control Systems Engineer

Biotechnology:
- Research Associate
- Bioinformatics Analyst
- Clinical Research Assistant

Commerce:
- Financial Analyst
- Business Analyst
- Risk Analyst
- Investment Analyst

Management / MBA:
- Product Manager
- Marketing Manager
- Business Consultant

Computer Science / IT:
- Full Stack Developer
- Backend Developer
- AI Engineer
- Data Scientist

DO NOT recommend software engineering roles unless the resume contains software engineering skills.
Generate a personalized 4-week roadmap based on the candidate's missing skills, technical strengths, and target career path.

Resume:
${resumeText}

Target Job Description:
${jobDescription}

IMPORTANT:
If a job description is provided:

1. Compare resume skills with job requirements.
2. Identify skills missing from the resume.
3. Use those missing skills in the Skill Gap Analysis.
4. Build the 4-week roadmap around those missing skills.
5. Adjust career readiness score based on JD match.
6. Recommended roles must align with both the resume and the job description.
7. Generate readinessImprovement recommendations.

For readinessImprovement:

- projectsImpact should contain 4-6 actions that improve project quality, portfolio strength, deployment, documentation, and measurable impact.

- coreFundamentals should contain 4-6 concepts the student should learn to strengthen fundamentals in their domain.

- systemDesign should contain 4-6 skills that improve architecture, scalability, design thinking, or domain-specific system design.

- communication should contain 4-6 skills that improve technical communication, presentations, interviews, teamwork, and documentation.

Return actionable skills only.
Do not leave any readinessImprovement array empty.
`,
        },
      ],
    });

    // AI raw response
    const text =
      completion.choices?.[0]?.message?.content || "{}";

    // Parse AI JSON
    let analysis;

    try {
      analysis = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return NextResponse.json(
        {
          success: false,
          error: "AI returned invalid JSON",
          raw: text,
        },
        { status: 500 }
      );
    }

    // Return JSON response
    return NextResponse.json(analysis);

  } catch (error) {
    console.error("OpenRouter Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "AI analysis failed",
      },
      { status: 500 }
    );
  }
}