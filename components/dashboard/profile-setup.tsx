"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, AlertTriangle } from "lucide-react"
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

interface ProfileSetupProps {
  user: User;
  onComplete: () => void;
}

export default function ProfileSetup({ user, onComplete }: ProfileSetupProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    sex: "",
    country: "",
    phone: "",
    emergency_contact: "",
    emergency_phone: "",
  });

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
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call user API to create/update profile
      await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: formData.full_name,
          age: formData.age ? parseInt(formData.age) : undefined,
          sex: formData.sex,
          country: formData.country,
          phone: formData.phone,
          emergency_contact: formData.emergency_contact,
          emergency_phone: formData.emergency_phone,
        }),
      });
      toast.success("Profile Created!");
      onComplete();
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
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
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
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
