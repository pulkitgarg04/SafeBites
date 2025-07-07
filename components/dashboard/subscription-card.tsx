"use client"

import { useState } from "react"
// import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Zap } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
const useToast = () => ({ toast: (args: { title: string; description?: string; variant?: string }) => alert(args.title + (args.description ? '\n' + args.description : '')) });

export default function SubscriptionCard() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    setLoading(true)

    try {
      // Simulate subscription process
      // In production, you'd integrate with Stripe or another payment processor

      // For demo, we'll create an active subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // const { error } = await supabase.from("subscriptions").upsert({ ... })
      // if (error) throw error

      toast({
        title: "Subscription Activated!",
        description: "Welcome to SafeBites! You now have 100 credits to use.",
      })

      // Refresh the page to update subscription status
      window.location.reload()
    } catch (error) {
      console.error("Subscription error:", error)
      toast({
        title: "Subscription Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Unlock SafeBites Features
          </CardTitle>
          <Badge className="bg-primary/10 text-primary border-primary/20">$5/month</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-muted-foreground">
          Subscribe to access AI-powered allergen detection, personalized recommendations, and more.
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">100 AI queries per month</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Image analysis for ingredient labels</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Personalized allergy profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Safe alternative recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-sm">Priority email support</span>
          </div>
        </div>

        <Button onClick={handleSubscribe} disabled={loading} className="w-full" size="lg">
          {loading ? "Processing..." : "Subscribe Now"}
          <CreditCard className="w-4 h-4 ml-2" />
        </Button>

        <p className="text-xs text-muted-foreground text-center">Cancel anytime. No questions asked.</p>
      </CardContent>
    </Card>
  )
}
