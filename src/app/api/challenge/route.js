import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { domain } = await req.json();

    const client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Generate realistic domain-specific career challenges. Return ONLY valid JSON."
        },
        {
          role: "user",
          content: `
Generate a challenge for a student from:

${domain}

Return JSON:

{
  "title": "",
  "scenario": "",
  "question": "",
  "expectedSkills": []
}
`
        }
      ]
    });

    const text =
      completion.choices?.[0]?.message?.content || "{}";

    return NextResponse.json(JSON.parse(text));
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}