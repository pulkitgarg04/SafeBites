"use client"

// import type React from "react"
import { useState } from "react"
// import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ReactNode, SelectHTMLAttributes } from "react";
type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;
type SelectContentProps = { children: ReactNode };
type SelectItemProps = { value: string; children: ReactNode };
type SelectTriggerProps = { children: ReactNode };
type SelectValueProps = { placeholder: string };
const Select = (props: SelectProps) => <select {...props} />;
const SelectContent = (props: SelectContentProps) => <>{props.children}</>;
const SelectItem = (props: SelectItemProps) => <option value={props.value}>{props.children}</option>;
const SelectTrigger = (props: SelectTriggerProps) => <>{props.children}</>;
const SelectValue = (props: SelectValueProps) => <>{props.placeholder}</>;
import { User, AlertTriangle } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
const useToast = () => ({ toast: (args: { title: string; description?: string; variant?: string }) => alert(args.title + (args.description ? '\n' + args.description : '')) });

interface ProfileSetupProps {
  // user: { id: string; email: string }; // Remove if not used
  onComplete: () => void;
}

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    sex: "",
    country: "",
    phone: "",
    emergency_contact: "",
    emergency_phone: "",
  })
  const { toast } = useToast()

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
    "Other",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Demo: simulate saving profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // const { error } = await supabase.from("users").upsert({ ... })
      // if (error) throw error
      toast({
        title: "Profile Created!",
        description: "Your profile has been set up successfully.",
      })
      onComplete()
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <p className="text-muted-foreground">
            Help us personalize your SafeBites experience by providing some basic information.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select value={formData.sex} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, sex: e.target.value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, country: e.target.value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <Label className="text-sm font-medium">Emergency Contact Information</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                This information can be crucial in case of an allergic reaction emergency.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact">Emergency Contact Name</Label>
                  <Input
                    id="emergency_contact"
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_phone">Emergency Contact Phone</Label>
                  <Input
                    id="emergency_phone"
                    type="tel"
                    value={formData.emergency_phone}
                    onChange={(e) => setFormData({ ...formData, emergency_phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Complete Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
