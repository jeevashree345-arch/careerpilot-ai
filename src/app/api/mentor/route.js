import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

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
              "You are an AI Career Mentor. Give concise, practical career guidance for students and job seekers.",
          },
          {
            role: "user",
            content: question,
          },
        ],
      });

    return NextResponse.json({
      answer:
        completion.choices?.[0]?.message?.content ||
        "No response",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Mentor AI failed",
      },
      { status: 500 }
    );
  }
}