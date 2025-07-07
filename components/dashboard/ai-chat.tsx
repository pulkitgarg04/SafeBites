"use client"

// import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Upload, CreditCard, AlertTriangle, Send, ImageIcon } from "lucide-react"
// If you don't have a useToast hook, comment this out and use a placeholder
// import { useToast } from "@/components/ui/use-toast"
type ToastArgs = { title: string; description?: string; variant?: string };
const useToast = () => ({ toast: (args: ToastArgs) => alert(args.title + (args.description ? '\n' + args.description : '')) });

// Placeholder for supabase client
// import { supabase } from "@/lib/supabase-client"

interface Message {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  // user: User; // Removed because it is not used
  hasActiveSubscription: boolean;
  remainingCredits: number;
  onCreditUpdate: () => void;
}

export default function AIChat({ hasActiveSubscription, remainingCredits, onCreditUpdate }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [textInput, setTextInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const analyzeFood = async (query: string, type: "text" | "image") => {
    if (!hasActiveSubscription) {
      toast({
        title: "Subscription Required",
        description: "Please subscribe to use the AI assistant.",
        variant: "destructive",
      })
      return
    }

    if (remainingCredits <= 0) {
      toast({
        title: "No Credits Remaining",
        description: "You've used all your credits for this month.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Get user's allergies for context
      // const { data: userAllergies } = await supabase
      //   .from("user_allergies")
      //   .select(`
      //     severity,
      //     notes,
      //     allergies (name, category)
      //   `)
      //   .eq("user_id", user.id)
      const userAllergies: { allergies: { name: string }, severity?: string }[] = [] // placeholder

      const allergyContext =
        userAllergies?.map((ua: { allergies: { name: string }, severity?: string }) => `${ua.allergies.name} (${ua.severity || "unknown severity"})`).join(", ") ||
        "No specific allergies listed"

      // Simulate AI response (in production, you'd call your AI service)
      const mockResponse = generateMockResponse(query, allergyContext)

      const newMessage: Message = {
        id: Date.now(),
        type: "ai",
        content: mockResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() - 1,
          type: "user",
          content: type === "image" ? "Uploaded image for analysis" : query,
          timestamp: new Date(),
        },
        newMessage,
      ])

      // Save query to database (commented out)
      // await supabase.from("ai_queries").insert({
      //   user_id: user.id,
      //   query_type: type,
      //   query_content: query,
      //   response: mockResponse,
      //   credits_used: 1,
      // })

      // Update credits (commented out)
      // await supabase
      //   .from("subscriptions")
      //   .update({
      //     credits_used: remainingCredits === 0 ? 1 : 100 - remainingCredits + 1,
      //   })
      //   .eq("user_id", user.id)

      onCreditUpdate()
    } catch (error) {
      console.error("Error analyzing food:", error)
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze food. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setTextInput("")
      setSelectedImage(null)
    }
  }

  const generateMockResponse = (query: string, allergies: string) => {
    const responses = [
      `Based on your allergies (${allergies}), I've analyzed "${query}". ⚠️ **POTENTIAL ALLERGENS DETECTED**: This food may contain traces of nuts and dairy. I recommend checking the ingredient list carefully and considering safer alternatives like rice-based products.`,
      `Analysis complete for "${query}". ✅ **LOOKS SAFE**: Based on your allergy profile (${allergies}), this food appears to be safe for you. However, always verify ingredient lists as formulations can change.`,
      `I've examined "${query}" against your allergies (${allergies}). ⚠️ **CAUTION ADVISED**: This product contains wheat and may contain soy. Consider alternatives like quinoa-based products or certified gluten-free options.`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (textInput.trim()) {
      analyzeFood(textInput.trim(), "text")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleImageSubmit = () => {
    if (selectedImage) {
      analyzeFood(`Image analysis: ${selectedImage.name}`, "image")
    }
  }

  if (!hasActiveSubscription) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="w-12 h-12 text-orange-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Subscription Required</h3>
          <p className="text-muted-foreground text-center mb-4">
            Subscribe to SafeBites to access AI-powered allergen detection and food analysis.
          </p>
          <Button>Subscribe Now</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              AI Food Analyzer
            </CardTitle>
            <Badge variant="outline">
              <CreditCard className="w-3 h-3 mr-1" />
              {remainingCredits} Credits
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Text Query</TabsTrigger>
              <TabsTrigger value="image">Image Upload</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-4">
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Describe the food or enter ingredients</label>
                  <Textarea
                    placeholder="e.g., 'Chocolate chip cookies with wheat flour, eggs, milk, and nuts' or 'Is this granola bar safe for someone with peanut allergies?'"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" disabled={loading || !textInput.trim()}>
                  {loading ? "Analyzing..." : "Analyze Food"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload food image or ingredient label</label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    {selectedImage ? (
                      <div className="space-y-2">
                        <ImageIcon className="w-8 h-8 mx-auto text-green-500" />
                        <p className="text-sm font-medium">{selectedImage.name}</p>
                        <Button onClick={handleImageSubmit} disabled={loading}>
                          {loading ? "Analyzing..." : "Analyze Image"}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload an image of food or ingredient label
                        </p>
                        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                          Choose Image
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      {messages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}