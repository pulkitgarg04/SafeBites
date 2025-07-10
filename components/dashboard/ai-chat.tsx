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
  hasActiveSubscription: boolean;
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
        <p className="text-slate-500">
          No alternatives to suggest at this time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800">
        Suggested Alternatives
      </h3>
      <ul className="space-y-3">
        {alternatives.map((alternative, index) => (
          <li key={index} className="p-3 rounded-md bg-slate-50">
            <h4 className="font-medium text-slate-800">{alternative.name}</h4>
            <p className="text-sm text-slate-600 mt-1">
              {alternative.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIChat({ user, remainingCredits }: AIChatProps) {
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ allergens: Allergen[]; alternatives: Alternative[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMockAllergenResponse = (
    query: string
  ): { allergens: Allergen[]; alternatives: Alternative[] } => {
    if (query.toLowerCase().includes("peanut")) {
      return {
        allergens: [
          { name: "Peanut", severity: "high" },
          { name: "Soy", severity: "medium" },
        ],
        alternatives: [
          { name: "Sunflower Seed Butter", description: "A nut-free spread alternative." },
          { name: "Pumpkin Seeds", description: "Safe for most nut allergies and high in protein." },
        ],
      };
    }
    if (query.toLowerCase().includes("milk")) {
      return {
        allergens: [
          { name: "Milk", severity: "high" },
          { name: "Wheat", severity: "medium" },
        ],
        alternatives: [
          { name: "Oat Milk", description: "A dairy-free milk alternative." },
          { name: "Almond Milk", description: "Check for nut allergies before use." },
        ],
      };
    }
    if (Math.random() > 0.5) {
      return {
        allergens: [],
        alternatives: [
          { name: "Quinoa", description: "A gluten-free grain alternative." },
        ],
      };
    }
    return {
      allergens: [
        { name: "Tree Nuts", severity: "high" },
        { name: "Egg", severity: "low" },
      ],
      alternatives: [
        { name: "Chia Seeds", description: "Can be used as an egg substitute in baking." },
      ],
    };
  };

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) {
      toast.error("Please enter a food item or ingredient list.");
      return;
    }
    setLoading(true);
    try {
      const mock = generateMockAllergenResponse(textInput.trim());
      setResult(mock);
      await fetch("/api/subscription", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, creditsUsed: 1 }),
      });
    } catch {
      toast.error("Failed to analyze food. Please try again.");
    } finally {
      setLoading(false);
      setTextInput("");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setFilePreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setFilePreview(null);
    }
  };

  // Handle image submit (mocked)
  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please upload an image first.");
      return;
    }
    setLoading(true);
    try {
      const mock = generateMockAllergenResponse(selectedImage.name);
      setResult(mock);
      await fetch("/api/subscription", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, creditsUsed: 1 }),
      });
    } catch {
      toast.error("Failed to analyze food. Please try again.");
    } finally {
      setLoading(false);
      setSelectedImage(null);
      setFilePreview(null);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
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
              {/* 

                let score = 100;
                if (directAllergenMatch) score -= 50;
                if (mayContainMatch) score -= 20;
                if (crossContaminationRisk) score -= 10;
                if (severeAllergy) score -= 20;
                score = Math.max(0, score);
              
              */}
              <Shield className="w-8 h-8 text-[#3d6e5d]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left: Analyzer */}
        <Card className="min-w-[340px] max-w-[400px] w-full border-0 shadow-xl flex-shrink-0">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              AI Food Analyzer
            </CardTitle>
            <Badge className="w-fit">
              {remainingCredits} Credits Remaining
            </Badge>
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

              <TabsContent value="text" className="space-y-4 mt-4">
                <form onSubmit={handleTextSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Describe the food or enter ingredients
                    </label>
                    <Textarea
                      placeholder="e.g., 'Chocolate chip cookies with wheat flour, eggs, milk, and nuts', 'Granola bar with peanut allergies?'"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      rows={4}
                      className="resize-none overflow-auto max-h-40"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !textInput.trim()}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Analyze Food
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="image" className="space-y-4 mt-4">
                <form onSubmit={handleImageSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Upload food image or ingredient label
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      {filePreview ? (
                        <div className="space-y-2">
                          <ImageIcon className="w-8 h-8 mx-auto" />
                          <p className="text-sm font-medium">{selectedImage?.name}</p>
                          <div className="flex justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={filePreview}
                              alt="Uploaded Preview"
                              className="max-w-xs h-auto border border-gray-300 rounded-lg"
                            />
                          </div>
                          <Button
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              "Analyze Image"
                            )}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-8 h-8 mx-auto" />
                          <p className="text-sm">Click to upload an image of food or ingredient label</p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Choose Image
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right: Results */}
        <Card className="flex-1 min-w-0 border-0 shadow-xl flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col">
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
              </div>
            ) : result ? (
              <Tabs defaultValue="allergens" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-2">
                  <TabsTrigger value="allergens">Allergens</TabsTrigger>
                  <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                </TabsList>
                <TabsContent value="allergens">
                  <AllergenList allergens={result.allergens} />
                </TabsContent>
                <TabsContent value="alternatives">
                  <AlternativesList alternatives={result.alternatives} />
                </TabsContent>
              </Tabs>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
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