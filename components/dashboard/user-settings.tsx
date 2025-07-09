"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Shield, Save, Edit } from "lucide-react"
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
  country?: string;
  phone?: string;
  emergency_contact?: string;
  emergency_phone?: string;
}

interface UserSettingsProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export default function UserSettings({ user, onUserUpdate }: UserSettingsProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.name || "",
    email: user?.email || "",
    age: user?.age?.toString() || "",
    sex: user?.sex || "",
    country: user?.country || "",
    phone: user?.phone || "",
    emergency_contact: user?.emergency_contact || "",
    emergency_phone: user?.emergency_phone || "",
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
  ]

  const handleSave = async () => {
    setLoading(true);
    try {
      // Call user API to update user info
      const res = await fetch("/api/user", {
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
      if (res.ok) {
        toast.success("Profile updated!");
        setEditing(false);
        onUserUpdate(await res.json());
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: user?.name || "",
      email: user?.email || "",
      age: user?.age?.toString() || "",
      sex: user?.sex || "",
      country: user?.country || "",
      phone: user?.phone || "",
      emergency_contact: user?.emergency_contact || "",
      emergency_phone: user?.emergency_phone || "",
    })
    setEditing(false)
  }

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">Profile Status</p>
                <p className="text-2xl font-bold">Complete</p>
              </div>
              <User className="w-8 h-8 text-indigo-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Account Security</p>
                <p className="text-2xl font-bold">High</p>
              </div>
              <Shield className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Member Since</p>
                <p className="text-2xl font-bold">2024</p>
              </div>
              <MapPin className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Form */}
      <div className="flex-1 flex gap-6">
        <Card className="flex-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <User className="w-5 h-5 text-blue-500" />
              Personal Information
            </CardTitle>
            {!editing ? (
              <Button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancel} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full_name" className="text-gray-700">
                  Full Name
                </Label>
                {editing ? (
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user?.name || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <p className="text-gray-800">{user?.email}</p>
                </div>
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-gray-700">
                  Age
                </Label>
                {editing ? (
                  <Input
                    id="age"
                    type="number"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user?.age || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sex" className="text-gray-700">
                  Sex
                </Label>
                {editing ? (
                  <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-800 font-medium">{user?.sex?.replace("_", " ") || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-700">
                  Country
                </Label>
                {editing ? (
                  <Select
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                  >
                    <SelectTrigger className="bg-white">
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
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{user?.country || "Not set"}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number
                </Label>
                {editing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{user?.phone || "Not set"}</p>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-800">Emergency Contact Information</h3>
              </div>
              <p className="text-sm text-gray-600">
                This information is crucial in case of an allergic reaction emergency.
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact" className="text-gray-700">
                    Emergency Contact Name
                  </Label>
                  {editing ? (
                    <Input
                      id="emergency_contact"
                      value={formData.emergency_contact}
                      onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                      className="bg-white"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{user?.emergency_contact || "Not set"}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergency_phone" className="text-gray-700">
                    Emergency Contact Phone
                  </Label>
                  {editing ? (
                    <Input
                      id="emergency_phone"
                      type="tel"
                      value={formData.emergency_phone}
                      onChange={(e) => setFormData({ ...formData, emergency_phone: e.target.value })}
                      className="bg-white"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-800 font-medium">{user?.emergency_phone || "Not set"}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="w-1/3 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Shield className="w-5 h-5 text-green-500" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Change Password
              </Button>

              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>

              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">Subscription</h4>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">SafeBites Premium</span>
                </div>
                <p className="text-xs text-green-700">Active until next month</p>
              </div>

              <Button
                variant="outline"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
              >
                Cancel Subscription
              </Button>
            </div>

            <Separator />

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Safety Tip</h4>
              <p className="text-xs text-blue-700">
                Keep your emergency contact information up to date. It could save your life in case of a severe allergic
                reaction.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}