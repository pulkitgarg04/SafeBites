"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, MessageSquare, Settings, AlertTriangle, Shield } from "lucide-react"
import ProfileSetup from "@/components/dashboard/profile-setup"
import AIChat from "@/components/dashboard/ai-chat"
import SubscriptionCard from "@/components/dashboard/subscription-card"
import AllergyProfile from "@/components/dashboard/allergy-profile"

interface User {
  id: string;
  email: string;
  full_name: string | null;
  country?: string;
}
interface Subscription {
  status: string;
  credits: number;
  credits_used: number;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileComplete, setProfileComplete] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    try {
      // For demo purposes, we'll create a mock user
      // In production, you'd get this from authentication
      const mockUser: User = {
        id: "demo-user-123",
        email: "demo@safebites.com",
        full_name: "Demo User",
        country: "India",
      }
      setUser(mockUser)
      setProfileComplete(!!mockUser.full_name)
      // For demo, create a mock subscription
      setSubscription({
        status: "active",
        credits: 100,
        credits_used: 10,
      })
    } catch (error) {
      console.error("Error checking user:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileComplete = () => {
    setProfileComplete(true)
    checkUser()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!profileComplete) {
    return <ProfileSetup onComplete={handleProfileComplete} />
  }

  const hasActiveSubscription = subscription?.status === "active"
  const remainingCredits = subscription ? subscription.credits - subscription.credits_used : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">SafeBites Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user?.full_name || "User"}!</p>
            </div>
            <div className="flex items-center gap-4">
              {hasActiveSubscription ? (
                <Badge variant="default" className="bg-green-500">
                  <Shield className="w-3 h-3 mr-1" />
                  Active Plan
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  No Active Plan
                </Badge>
              )}
              {hasActiveSubscription && (
                <Badge variant="outline">
                  <CreditCard className="w-3 h-3 mr-1" />
                  {remainingCredits} Credits
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="allergies">Allergies</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subscription Status</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{hasActiveSubscription ? "Active" : "Inactive"}</div>
                  <p className="text-xs text-muted-foreground">
                    {hasActiveSubscription ? "SafeBites Plan" : "Subscribe to access features"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{remainingCredits}</div>
                  <p className="text-xs text-muted-foreground">Credits remaining this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Queries</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{subscription?.credits_used || 0}</div>
                  <p className="text-xs text-muted-foreground">Queries used this month</p>
                </CardContent>
              </Card>
            </div>

            {!hasActiveSubscription && <SubscriptionCard />}
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChat
              hasActiveSubscription={hasActiveSubscription}
              remainingCredits={remainingCredits}
              onCreditUpdate={checkUser}
            />
          </TabsContent>

          <TabsContent value="allergies">
            <AllergyProfile />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">{user?.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <p className="text-sm text-muted-foreground">{user?.country}</p>
                  </div>
                </div>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}