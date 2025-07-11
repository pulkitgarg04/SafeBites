"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, CreditCard, ImageIcon, Brain, Shield, AlertTriangle, AlertCircle, AlertOctagon, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  isSubscribed: boolean;
  profileComplete: boolean;
  allergens: string[];
  customAllergens: string[];
  age?: number;
  sex?: string;
  bodyWeight?: number;
  diseases: string[];
}

interface AIChatProps {
  user: User;
  remainingCredits: number;
}

type Allergen = {
  name: string
  severity: "high" | "medium" | "low"
}

type AllergenListProps = {
  allergens: Allergen[]
}

function AllergenList({ allergens }: AllergenListProps) {
  if (allergens.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-3">
          <div className="bg-emerald-100 p-3 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-slate-800 mb-1">No Allergens Detected</h3>
        <p className="text-slate-500">This food appears to be free from common allergens.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800">Potential Allergens</h3>
      <ul className="space-y-3">
        {allergens.map((allergen, index) => (
          <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-slate-50">
            {allergen.severity === "high" && <AlertOctagon className="h-5 w-5 text-red-500 mt-0.5" />}
            {allergen.severity === "medium" && <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />}
            {allergen.severity === "low" && <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">{allergen.name}</span>
                <Badge
                  className={
                    allergen.severity === "high"
                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                      : allergen.severity === "medium"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {allergen.severity.charAt(0).toUpperCase() + allergen.severity.slice(1)} Risk
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {allergen.severity === "high"
                  ? "Commonly causes severe allergic reactions."
                  : allergen.severity === "medium"
                    ? "May cause moderate allergic reactions in sensitive individuals."
                    : "Usually causes mild reactions in some individuals."}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

type Alternative = {
  name: string;
  description: string;
};

type AlternativesListProps = {
  alternatives: Alternative[];
};

function AlternativesList({ alternatives }: AlternativesListProps) {
  if (alternatives.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-slate-500">No alternatives to suggest at this time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 h-full flex-1 overflow-y-auto">
      <h3 className="text-lg font-medium text-slate-800">Suggested Alternatives</h3>
      <div className="overflow-y-auto max-h-[300]">
      <ul className="space-y-3">
        {alternatives.map((alternative, index) => (
          <li key={index} className="p-3 rounded-md bg-slate-50">
            <h4 className="font-medium text-slate-800">{alternative.name}</h4>
            <p className="text-sm text-slate-600 mt-1">{alternative.description}</p>
          </li>
        ))}
      </ul>
      </div>
    </div>
  )
}

export default function AIChat({ user, remainingCredits }: AIChatProps) {
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ allergens: Allergen[]; alternatives: Alternative[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) {
      toast.error("Please enter a food item or ingredient list.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/subscription", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, creditsUsed: 1 }),
      });

      const res = await fetch("/api/check-allergens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodInput: textInput.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to analyze allergens");
      }
      const data = await res.json();
      setResult(data);
    } catch {
      toast.error("Failed to analyze food. Please try again.");
    } finally {
      setLoading(false);
      setTextInput("");
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please upload an image first.");
      return;
    }
    setLoading(true);
    try {
      await fetch("/api/subscription", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, creditsUsed: 1 }),
      });

      const res = await fetch("/api/check-allergens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodInput: selectedImage.name }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to analyze allergens");
      }
      const data = await res.json();
      setResult(data);
    } catch {
      toast.error("Failed to analyze food. Please try again.");
    } finally {
      setLoading(false);
      setSelectedImage(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#FAEFE6] text-[#856C62] border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#7A6B63] text-sm">Available Credits</p>
                <p className="text-2xl font-bold text-[#856C62]">{remainingCredits}</p>
              </div>
              <CreditCard className="w-8 h-8 text-[#856C62]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#D3E6FF] text-[#485562] border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#545b5c] text-sm">Queries Used (this month)</p>
                <p className="text-2xl font-bold">{100 - remainingCredits}</p>
              </div>
              <Brain className="w-8 h-8 text-[#485562]" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#b3d2c6] text-[#3d6e5d] border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#3d6e5d] text-sm">Food Compatibility</p>
                <p className="text-2xl font-bold">-</p>
              </div>
              <Shield className="w-8 h-8 text-[#3d6e5d]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6 min-h-0 flex-1">
        <Card className="w-96 border-0 shadow-xl flex-shrink-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">AI Food Analyzer</CardTitle>
            <Badge className="w-fit">{remainingCredits} Credits Remaining</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" className="data-[state=active]:bg-white">
                  Text Query
                </TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:bg-white">
                  Image Upload
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-4">
                <div className="h-80 flex flex-col">
                  <form onSubmit={handleTextSubmit} className="space-y-4 flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium mb-2 block">Describe the food or enter ingredients</label>
                      <Textarea
                        placeholder="e.g., 'Chocolate chip cookies with wheat flour, eggs, milk, and nuts', 'Granola bar with peanut allergies?'"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="flex-1 resize-none"
                        disabled={loading}
                      />
                    </div>
                    <Button type="submit" disabled={loading || !textInput.trim()} className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Food"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value="image" className="mt-4">
                <div className="h-80 flex flex-col">
                  <form onSubmit={handleImageSubmit} className="space-y-4 flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                      <label className="text-sm font-medium mb-2 block">Upload food image or ingredient label</label>
                      <div className="flex-1 border-2 border-dashed rounded-lg p-6 flex items-center justify-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          ref={fileInputRef}
                          className="hidden"
                        />
                        {selectedImage ? (
                          <div className="space-y-2 text-center">
                            <ImageIcon className="w-8 h-8 mx-auto" />
                            <p className="text-sm font-medium truncate overflow-hidden whitespace-nowrap max-w-[200px] mx-auto">{selectedImage?.name}</p>
                          </div>
                        ) : (
                          <div className="space-y-2 text-center">
                            <Upload className="w-8 h-8 mx-auto" />
                            <p className="text-sm">Click to upload an image of food or ingredient label</p>
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                              Choose Image
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button type="submit" disabled={loading || !selectedImage} className="w-full">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Image"
                      )}
                    </Button>
                  </form>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="w-96 border-0 shadow-xl flex-shrink-0 flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">Analysis Results</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : result ? (
              <Tabs defaultValue="allergens" className="w-full flex-1 flex flex-col">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="allergens">Allergens</TabsTrigger>
                  <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                </TabsList>
                <div className="flex-1 min-h-0">
                  <TabsContent value="allergens" className="h-full overflow-y-auto">
                    <AllergenList allergens={result.allergens} />
                  </TabsContent>
                  <TabsContent value="alternatives" className="h-full overflow-y-auto flex-1">
                    <AlternativesList alternatives={result.alternatives} />
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto bg-gray-100">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ready to Analyze Food!</h3>
                    <p className="text-sm max-w-md">
                      Enter a food description or upload an image to get instant allergen analysis and safety
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}