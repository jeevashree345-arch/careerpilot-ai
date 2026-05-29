import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {

    const {
      domain,
      careerPath,
      missingSkills
    } = await req.json();

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
              "Return ONLY valid JSON."
          },

          {
            role: "user",
            content: `
Generate a career roadmap.

Domain:
${domain}

Career Path:
${careerPath}

Missing Skills:
${missingSkills?.join(", ")}

Return JSON:

{
  "title": "",

  "nodes": [
    {
      "name": "",
      "level": "",
      "description": ""
    }
  ]
}

Rules:

- Generate 8 roadmap nodes.
- Order them from beginner to advanced.
- Last node must represent industry readiness.
- Each node must contain:
  - name
  - level (Beginner, Intermediate, Advanced)
  - description (one-line explanation)
- Descriptions should explain what the student learns in that stage.
`
          }
        ]
      });

    const text =
      completion.choices?.[0]?.message?.content || "{}";
      console.log("CAREER ROADMAP RAW:");
      console.log(text);
    return NextResponse.json(
      JSON.parse(text)
    );

  } catch (error) {
    console.log(
        "CAREER ROADMAP ERROR:",
        error
      );
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