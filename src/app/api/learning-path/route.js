import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { skill, domain } = await req.json();

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion =
      await client.chat.completions.create({
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content:
              "You are an expert career mentor. Return ONLY valid JSON."
          },

          {
            role: "user",
            content: `
Skill:
${skill}

Student Domain:
${domain}

Return ONLY JSON:

{
  "description": "",

  "courses": [
    {
      "title": "",
      "provider": ""
    }
  ],

  "youtubeLinks": [
    {
      "title": "",
      "url": ""
    }
  ],

  "freeCourseLinks": [
  {
    "title": "",
    "url": ""
  }
]
  "project": "",

  "checkpoint": "",

  "nextSkill": ""
}

Rules:

1. Explain the skill in simple language.
2. Suggest 3 learning resources.
3. Suggest 1 beginner-friendly project.
4. Suggest 1 checkpoint.
5. Suggest the next skill to learn.
6. Provide 2-3 YouTube learning resources.
7. Provide 2-3 free online courses with URLs.
8. Prefer Coursera, edX, freeCodeCamp, MIT OpenCourseWare, Fast.ai, AWS Skill Builder, Google Cloud Skills Boost, or other free learning platforms.
9. Return valid URLs.
`
          }
        ]
      });

    const text =
      completion.choices?.[0]?.message?.content || "{}";

    return NextResponse.json(
      JSON.parse(text)
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}