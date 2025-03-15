import { generateText } from "ai"
import { google } from "@ai-sdk/google"

const mockAllergens = [
  { name: "Peanuts", severity: "high" as const },
  { name: "Tree Nuts", severity: "high" as const },
  { name: "Gluten", severity: "medium" as const },
  { name: "Dairy", severity: "medium" as const },
  { name: "Eggs", severity: "low" as const },
  { name: "Soy", severity: "low" as const },
  { name: "Shellfish", severity: "high" as const },
  { name: "Fish", severity: "medium" as const },
  { name: "Sesame", severity: "medium" as const },
]

const mockAlternatives = [
  {
    name: "Sunflower Seed Butter",
    description: "A great alternative to peanut butter with a similar texture and taste profile.",
  },
  {
    name: "Oat Milk",
    description: "Creamy dairy-free alternative that works well in most recipes requiring milk.",
  },
  {
    name: "Flax Eggs",
    description: "Mix 1 tbsp ground flaxseed with 3 tbsp water to replace one egg in baking.",
  },
  {
    name: "Coconut Yogurt",
    description: "Dairy-free alternative with probiotic benefits similar to regular yogurt.",
  },
]

export async function checkAllergies(foodInput: string) {
  try {
      const prompt = `
        Analyze the following food item or ingredient list for common allergens:
        "${foodInput}"
        
        Respond with a JSON object containing:
        1. "allergens": An array of objects with "name" and "severity" (high, medium, or low) for each allergen found
        2. "alternatives": An array of objects with "name" and "description" for allergen-free alternatives
        
        Only include allergens that are actually present or likely to be present.
      `

      const { text } = await generateText({
        model: google("gemini-1.5-flash"),
        prompt: prompt,
      })

      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/)

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0]
        return JSON.parse(jsonStr)
      }

      return getMockResults(foodInput)
  } catch (error) {
    console.error("Error analyzing allergens:", error)
    return getMockResults(foodInput)
  }
}

function getMockResults(foodInput: string) {
  const input = foodInput.toLowerCase()

  const detectedAllergens = mockAllergens.filter((allergen) => {
    const term = allergen.name.toLowerCase()
    return (
      input.includes(term) ||
      (term === "peanuts" && input.includes("peanut")) ||
      (term === "tree nuts" && (input.includes("almond") || input.includes("walnut") || input.includes("cashew"))) ||
      (term === "gluten" && (input.includes("wheat") || input.includes("flour") || input.includes("bread"))) ||
      (term === "dairy" &&
        (input.includes("milk") || input.includes("butter") || input.includes("cheese") || input.includes("cream"))) ||
      (term === "eggs" && input.includes("egg")) ||
      (term === "soy" && (input.includes("soy") || input.includes("tofu"))) ||
      (term === "shellfish" && (input.includes("shrimp") || input.includes("crab") || input.includes("lobster"))) ||
      (term === "fish" && (input.includes("salmon") || input.includes("tuna") || input.includes("cod"))) ||
      (term === "sesame" && input.includes("sesame"))
    )
  })

  const relevantAlternatives = mockAlternatives.filter((_, index) => {
    if (detectedAllergens.some((a) => a.name === "Peanuts") && index === 0) return true
    if (detectedAllergens.some((a) => a.name === "Dairy") && (index === 1 || index === 3)) return true
    if (detectedAllergens.some((a) => a.name === "Eggs") && index === 2) return true
    return false
  })

  return {
    allergens: detectedAllergens,
    alternatives: relevantAlternatives,
  }
}