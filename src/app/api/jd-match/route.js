import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OpenRouter API Key" },
        { status: 500 }
      );
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and Job Description are required" },
        { status: 400 }
      );
    }

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey,
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS and recruiter expert. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Compare this resume against the job description.

Return ONLY JSON in this format:

{
  "matchScore": 85,
  "strengths": [],
  "missingSkills": [],
  "recommendation": ""
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`,
        },
      ],
    });

    const text =
      completion.choices?.[0]?.message?.content || "{}";

    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("JD Match Error:", error);

    return NextResponse.json(
      {
        error: error.message || "JD Match failed",
      },
      { status: 500 }
    );
  }
}