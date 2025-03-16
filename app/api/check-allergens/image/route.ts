import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64Image, fileType } = body;

    if (!base64Image || !fileType) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = await genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
    });

    const prompt = `
      Analyze the image food item or ingredient list for common allergens.

      Respond with a strict JSON object containing:
      {
        "allergens": [
          { "name": "example allergen", "severity": "high, medium, or low" }
        ],
        "alternatives": [
          { "name": "example alternative", "description": "description for allergen-free alternatives" }
        ]
      }

      Only include allergens that are actually present or likely to be present.
      Don't add any other text other than JSON response.
    `;

    const response = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: fileType,
        },
      },
    ]);

    if (response?.response?.text()) {
      const cleanedText = response.response.text().replace(/```json|```/g, '').trim();
      const data = JSON.parse(cleanedText);
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Failed to analyze allergens from the image.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json(
      { error: 'Internal server error. Failed to analyze allergens.' },
      { status: 500 }
    );
  }
}