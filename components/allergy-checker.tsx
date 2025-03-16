"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, AlertCircle, ImageUp } from "lucide-react";
import { checkAllergies } from "@/lib/allergy-service";
import toast from "react-hot-toast";
import AllergenList from "@/components/allergen-list";
import AlternativesList from "@/components/alternatives-list";

export default function AllergyChecker() {
  const [foodInput, setFoodInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    allergens: { name: string; severity: "high" | "medium" | "low" }[];
    alternatives: { name: string; description: string }[];
  } | null>(null);

  const handleTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!foodInput.trim()) {
      toast.error("Please enter a food item or ingredient list.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/check-allergens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodInput }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const data = await checkAllergies(foodInput);
        setResult(data);
      }
    } catch (error) {
      console.error("Error analyzing allergens:", error);

      try {
        const data = await checkAllergies(foodInput);
        setResult(data);
      } catch {
        toast.error("Failed to analyze allergens. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      const previewURL = URL.createObjectURL(selectedFile);
      setFilePreview(previewURL);
      setFile(selectedFile);
    } else {
      setFilePreview(null);
      setFile(null);
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload an image first.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(",")[1]);
        reader.onerror = () => reject("Failed to read the file.");
        reader.readAsDataURL(file);
      });
  
      if (!base64Image) {
        throw new Error("Failed to process the uploaded image.");
      }
  
      const response = await fetch("/api/check-allergens/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          base64Image,
          fileType: file.type,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to analyze allergens. Please try again.");
      }
    } catch (error) {
      console.error("Error analyzing allergens from the image:", error);
      toast.error("Failed to analyze allergens as your free image tier is finished. Please upgrade for plan to use image uploads.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="pt-6">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="text">Text Input</TabsTrigger>
              <TabsTrigger value="image">Image Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="p-4">
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="food-input"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
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
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
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
            </TabsContent>
            <TabsContent value="image" className="p-4">
              <form onSubmit={handleImageSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="image-upload"
                    className="relative w-full py-3 px-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 flex flex-col items-center"
                  >
                    <ImageUp className="text-3xl text-gray-500 mb-2" />
                    <span className="text-sm text-gray-500">
                      Click to upload or drag & drop an image
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>

                  {filePreview && (
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm mb-2">
                        Uploaded Image Preview:
                      </p>
                      <div className="flex justify-center">
                        <Image
                          height={500}
                          width={500}
                          src={filePreview}
                          alt="Uploaded Preview"
                          className="max-w-xs h-auto border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  disabled={isLoading}
                >
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
            </TabsContent>
          </Tabs>
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
          <h3 className="text-lg font-medium text-slate-700 mb-2">
            No Results Yet
          </h3>
          <p className="text-slate-500">
            Enter a food item or ingredient list above to check for potential
            allergens.
          </p>
        </div>
      )}
    </div>
  );
}
