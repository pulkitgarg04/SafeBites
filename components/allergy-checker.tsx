"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle } from "lucide-react"
import { checkAllergies } from "@/lib/allergy-service"
import toast from "react-hot-toast"
import AllergenList from "@/components/allergen-list"
import AlternativesList from "@/components/alternatives-list"

export default function AllergyChecker() {
  const [foodInput, setFoodInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{
    allergens: { name: string; severity: "high" | "medium" | "low" }[]
    alternatives: { name: string; description: string }[]
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!foodInput.trim()) {
      toast.error("Please enter a food item or ingredient list.")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/check-allergens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodInput }),
      })

      if (response.ok) {
        const data = await response.json()
        setResult(data)
      } else {
        const data = await checkAllergies(foodInput)
        setResult(data)
      }
    } catch (error) {
      console.error("Error analyzing allergens:", error)

      try {
        const data = await checkAllergies(foodInput)
        setResult(data)
      } catch {
        toast.error("Failed to analyze allergens. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="food-input" className="block text-sm font-medium text-slate-700 mb-1">
                Enter food item or ingredients
              </label>
              <Textarea
                id="food-input"
                placeholder="E.g., Chocolate chip cookies with almond flour, butter, eggs, and vanilla extract"
                className="min-h-[120px] resize-y"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Check for Allergens"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <Tabs defaultValue="allergens" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="allergens">Allergens</TabsTrigger>
              <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
            </TabsList>
            <TabsContent value="allergens" className="p-4">
              <AllergenList allergens={result.allergens} />
            </TabsContent>
            <TabsContent value="alternatives" className="p-4">
              <AlternativesList alternatives={result.alternatives} />
            </TabsContent>
          </Tabs>
        </Card>
      )}

      {!result && !isLoading && (
        <div className="bg-slate-50 rounded-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-2">No Results Yet</h3>
          <p className="text-slate-500">Enter a food item or ingredient list above to check for potential allergens.</p>
        </div>
      )}
    </div>
  )
}