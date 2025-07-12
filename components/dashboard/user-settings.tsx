"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Shield, Save, Edit, Lock, Eye, EyeOff } from "lucide-react"
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

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
  const [exporting, setExporting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    full_name: user?.name || "",
    email: user?.email || "",
    age: user?.age?.toString() || "",
    sex: user?.sex || "",
    bodyWeight: user?.bodyWeight?.toString() || "",
    diseases: user?.diseases || [],
  });

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    setPasswordLoading(true);
    try {
      const response = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password changed successfully!");
        setShowPasswordModal(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        toast.error(data.error || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleExportData = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/user/export");
      
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to export data");
        return;
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'safebites-user-data.json';

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success("Data exported successfully!");
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Failed to export data. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name: formData.full_name,
          age: formData.age ? parseInt(formData.age) : undefined,
          sex: formData.sex,
          bodyWeight: formData.bodyWeight ? parseFloat(formData.bodyWeight) : undefined,
          diseases: formData.diseases,
        }),
      });
      if (res.ok) {
        toast.success("Profile updated!");
        setEditing(false);
        onUserUpdate(await res.json());
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Network error. Please try again.");
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
      bodyWeight: user?.bodyWeight?.toString() || "",
      diseases: user?.diseases || [],
    })
    setEditing(false)
  }

  const handleDiseaseChange = (disease: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, diseases: [...formData.diseases, disease] });
    } else {
      setFormData({ ...formData, diseases: formData.diseases.filter(d => d !== disease) });
    }
  };

  const commonDiseases = [
    "Diabetes",
    "Hypertension",
    "Heart Disease",
    "Asthma",
    "Celiac Disease",
    "Lactose Intolerance",
    "None"
  ];

  return (
    <div className="h-full flex flex-col gap-6">
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
                className="bg-blue-500 hover:bg-blue-600"
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
                  className="bg-green-500 hover:bg-green-600"
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
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-gray-800 font-medium">{user?.sex?.replace("_", " ") || "Not set"}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyWeight" className="text-gray-700">
                  Body Weight (kg)
                </Label>
                {editing ? (
                  <Input
                    id="bodyWeight"
                    type="number"
                    min="1"
                    max="500"
                    step="0.1"
                    value={formData.bodyWeight}
                    onChange={(e) => setFormData({ ...formData, bodyWeight: e.target.value })}
                    className="bg-white"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{user?.bodyWeight ? `${user.bodyWeight} kg` : "Not set"}</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Medical Conditions</h3>
              <p className="text-sm text-gray-600">
                Select any medical conditions that may affect your dietary needs.
              </p>

              {editing ? (
                <div className="grid gap-3 md:grid-cols-2">
                  {commonDiseases.map((disease) => (
                    <div key={disease} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={disease}
                        checked={formData.diseases.includes(disease)}
                        onChange={(e) => handleDiseaseChange(disease, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor={disease} className="text-sm text-gray-700">
                        {disease}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.diseases && user.diseases.length > 0 ? (
                    user.diseases.map((disease, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                        {disease}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500">No medical conditions listed</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-1/3 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Shield className="w-5 h-5 text-green-500" />
              Account Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={() => setShowPasswordModal(true)}
              >
                <Mail className="w-4 h-4 mr-2" />
                Change Password
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-start bg-transparent"
                onClick={handleExportData}
                disabled={exporting}
              >
                <User className="w-4 h-4 mr-2" />
                {exporting ? "Exporting..." : "Export Data"}
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-800">Subscription</h4>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-800">SafeBites Pro</span>
                </div>
                <p className="text-xs text-green-700">Active</p>
              </div>
            </div>

            <Separator />

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Safety Tip</h4>
              <p className="text-xs text-blue-700">
                Keep your medical conditions updated to receive more accurate allergen recommendations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                Change Password
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-700">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                disabled={passwordLoading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePasswordChange}
                disabled={passwordLoading || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                {passwordLoading ? "Changing..." : "Change Password"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}