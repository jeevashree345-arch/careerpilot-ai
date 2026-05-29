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

  "technicalSkills": {
    "languages": [],
    "frameworks": [],
    "tools": [],
    "concepts": []
  },

  "suggestedCareerRoles": [
    {
      "title": "",
      "fitScore": 0,
      "rationale": ""
    }
  ],

  "missingSkills": [
    {
      "skill": "",
      "priority": "",
      "reason": ""
    }
  ],
  "roadmap": [
  {
    "week": "",
    "goal": "",
    "tasks": []
  }
]
}
Generate a personalized 4-week roadmap.
Each roadmap item must contain:
- week
- goal
- 3 to 5 actionable tasks

Base the roadmap on the candidate's missing skills, technical strengths, and target career path.
Resume:
${resumeText}
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