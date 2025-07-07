"use client"

import { useState, useEffect } from "react"
// import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, Plus, X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
const useToast = () => ({ toast: (args: { title: string; description?: string; variant?: string }) => alert(args.title + (args.description ? '\n' + args.description : '')) });

type Allergy = { id: string; name: string; category: string };
type UserAllergy = { id: string; allergy_id: string; severity: string; notes?: string; allergies: Allergy };

export default function AllergyProfile() {
  const [allergies] = useState<Allergy[]>([{
    id: "1", name: "Peanuts", category: "Nuts"
  }, {
    id: "2", name: "Milk", category: "Dairy"
  }, {
    id: "3", name: "Eggs", category: "Protein"
  }])
  const [userAllergies, setUserAllergies] = useState<UserAllergy[]>([])
  const [selectedAllergy, setSelectedAllergy] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // loadAllergies()
    // loadUserAllergies()
  }, [])

  // const loadAllergies = async () => { ... }
  // const loadUserAllergies = async () => { ... }

  const addAllergy = async () => {
    if (!selectedAllergy || !selectedSeverity) return
    setLoading(true)
    try {
      // Demo: add to local state
      const allergy = allergies.find(a => a.id === selectedAllergy)
      if (!allergy) throw new Error("Allergy not found")
      setUserAllergies(prev => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          allergy_id: allergy.id,
          severity: selectedSeverity,
          notes: notes || undefined,
          allergies: allergy,
        },
      ])
      toast({
        title: "Allergy Added",
        description: "Your allergy profile has been updated.",
      })
      setSelectedAllergy("")
      setSelectedSeverity("")
      setNotes("")
      // loadUserAllergies()
    } catch (error) {
      console.error("Error adding allergy:", error)
      toast({
        title: "Error",
        description: "Failed to add allergy. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeAllergy = async (userAllergyId: string) => {
    try {
      setUserAllergies(prev => prev.filter(ua => ua.id !== userAllergyId))
      toast({
        title: "Allergy Removed",
        description: "Your allergy profile has been updated.",
      })
      // loadUserAllergies()
    } catch (error) {
      console.error("Error removing allergy:", error)
      toast({
        title: "Error",
        description: "Failed to remove allergy. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800 border-green-200"
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "severe":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "life_threatening":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Your Allergy Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {userAllergies.length > 0 ? (
            <div className="space-y-3">
              {userAllergies.map((userAllergy) => (
                <div key={userAllergy.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{userAllergy.allergies.name}</p>
                      <p className="text-sm text-muted-foreground">{userAllergy.allergies.category}</p>
                      {userAllergy.notes && <p className="text-sm text-muted-foreground mt-1">{userAllergy.notes}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(userAllergy.severity)}>
                      {userAllergy.severity?.replace("_", " ")}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => removeAllergy(userAllergy.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No allergies added yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Allergy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Allergen</label>
              <Select value={selectedAllergy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedAllergy(e.target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select allergen..." />
                </SelectTrigger>
                <SelectContent>
                  {allergies
                    .filter((allergy) => !userAllergies.some((ua) => ua.allergy_id === allergy.id))
                    .map((allergy) => (
                      <SelectItem key={allergy.id} value={allergy.id}>
                        {allergy.name} ({allergy.category})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Severity</label>
              <Select value={selectedSeverity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSeverity((e as React.ChangeEvent<HTMLSelectElement>).target.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                  <SelectItem value="life_threatening">Life Threatening</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Notes (Optional)</label>
            <Textarea
              placeholder="Any additional notes about this allergy..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>
          <Button onClick={addAllergy} disabled={loading || !selectedAllergy || !selectedSeverity} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            {loading ? "Adding..." : "Add Allergy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
