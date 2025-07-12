import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request: NextRequest) {
  try {
    const { foodInput } = await request.json();
    if (!foodInput || typeof foodInput !== "string" || foodInput.trim().length === 0) {
      return NextResponse.json({ error: "Valid food input is required" }, { status: 400 });
    }

    const prompt = `
      Analyze the following food item or ingredient list for common allergens:
      "${foodInput.trim()}"
      
      Respond with a valid JSON object containing:
      1. "allergens": An array of objects with "name" (string) and "severity" ("high", "medium", or "low") for each allergen found.
      2. "alternatives": An array of objects with "name" (string) and "description" (string) for allergen-free alternatives.
      
      Only include allergens that are actually present or likely to be present.
      Ensure the response is valid JSON, enclosed in \`\`\`json\n...\n\`\`\`.
      If no allergens are found, return an empty "allergens" array and provide general alternatives.
    `;

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      prompt: prompt,
    });

    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*?}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 500 });
    }

    const jsonStr = jsonMatch[1] || jsonMatch[0];
    let result;
    try {
      result = JSON.parse(jsonStr);
      if (!result.allergens || !result.alternatives) {
        throw new Error("Incomplete JSON structure");
      }
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in allergen check:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: `Failed to analyze allergens: ${message}` }, { status: 500 });
  }
}