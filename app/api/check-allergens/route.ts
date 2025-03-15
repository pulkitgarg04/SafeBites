import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request: NextRequest) {
  try {
    const { foodInput } = await request.json();

    if (!foodInput) {
      return NextResponse.json({ error: "Food input is required" }, { status: 400 });
    }

    const prompt = `
      Analyze the following food item or ingredient list for common allergens:
      "${foodInput}"
      
      Respond with a JSON object containing:
      1. "allergens": An array of objects with "name" and "severity" (high, medium, or low) for each allergen found
      2. "alternatives": An array of objects with "name" and "description" for allergen-free alternatives
      
      Only include allergens that are actually present or likely to be present.
    `;

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
    });

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/);

    if (jsonMatch) {
      const jsonStr = jsonMatch[1] || jsonMatch[0];
      return NextResponse.json(JSON.parse(jsonStr));
    }

    return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
  } catch (error) {
    console.error("Error in allergen check:", error);
    return NextResponse.json({ error: "Failed to analyze allergens" }, { status: 500 });
  }
}