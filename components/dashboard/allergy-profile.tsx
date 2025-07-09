// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { AlertTriangle, Plus, X, Shield, Heart, Zap } from "lucide-react"
// import { toast } from "react-hot-toast";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   emailVerified: boolean;
//   image?: string;
//   createdAt: string;
//   updatedAt: string;
//   isSubscribed: boolean;
//   profileComplete: boolean;
//   allergens: string[];
//   customAllergens: string[];
//   age?: number;
//   sex?: string;
//   bodyWeight?: number;
//   diseases: string[];
// }

// interface AllergyProfileProps {
//   user: User;
// }

// interface Allergy {
//   id: string;
//   name: string;
//   category: string;
// }

// interface UserAllergy {
//   id: string;
//   allergies: Allergy;
//   severity: string;
//   notes?: string;
// }

// export default function AllergyProfile({ user }: AllergyProfileProps) {
//   const [allergies, setAllergies] = useState<Allergy[]>([]);
//   const [userAllergies, setUserAllergies] = useState<UserAllergy[]>([]);
//   const [selectedAllergy, setSelectedAllergy] = useState("");
//   const [selectedSeverity, setSelectedSeverity] = useState("");
//   const [notes, setNotes] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadAllergies();
//     loadUserAllergies();
//     // eslint-disable-next-line
//   }, []);

//   // Fetch all possible allergies (mocked for now)
//   const loadAllergies = async () => {
//     setAllergies([
//       { id: "1", name: "Peanuts", category: "Nuts" },
//       { id: "2", name: "Milk", category: "Dairy" },
//       { id: "3", name: "Eggs", category: "Protein" },
//       { id: "4", name: "Wheat", category: "Grains" },
//       { id: "5", name: "Soy", category: "Legumes" },
//       // ...add more as needed
//     ]);
//   };

//   // Fetch user allergies from user prop (for demo, just use state)
//   const loadUserAllergies = async () => {
//     // For demo, do nothing (state is local)
//     // If you want to pre-populate from user.allergens, you can do so here
//   };

//   const addAllergy = async () => {
//     if (!selectedAllergy || !selectedSeverity) return;
//     setLoading(true);
//     try {
//       const allergy = allergies.find((a) => a.id === selectedAllergy);
//       if (!allergy) return;
//       setUserAllergies((prev) => [
//         ...prev,
//         {
//           id: uuidv4(),
//           allergies: allergy,
//           severity: selectedSeverity,
//           notes: notes.trim(),
//         },
//       ]);
//       toast.success("Allergy Added! 🎉");
//       setSelectedAllergy("");
//       setSelectedSeverity("");
//       setNotes("");
//     } catch {
//       toast.error("Failed to add allergy. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeAllergy = async (userAllergyId: string) => {
//     try {
//       setUserAllergies((prev) => prev.filter((ua) => ua.id !== userAllergyId));
//       toast.success("Allergy Removed");
//     } catch {
//       toast.error("Failed to remove allergy. Please try again.");
//     }
//   };

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "mild":
//         return "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
//       case "moderate":
//         return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0"
//       case "severe":
//         return "bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
//       case "life_threatening":
//         return "bg-gradient-to-r from-red-500 to-red-600 text-white border-0"
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200"
//     }
//   }

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case "mild":
//         return <Heart className="w-3 h-3" />
//       case "moderate":
//         return <Zap className="w-3 h-3" />
//       case "severe":
//         return <AlertTriangle className="w-3 h-3" />
//       case "life_threatening":
//         return <Shield className="w-3 h-3" />
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="h-full flex flex-col gap-6">
//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-red-100 text-sm">Total Allergies</p>
//                 <p className="text-2xl font-bold">{userAllergies.length}</p>
//               </div>
//               <AlertTriangle className="w-8 h-8 text-red-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-orange-100 text-sm">Severe Allergies</p>
//                 <p className="text-2xl font-bold">
//                   {userAllergies.filter((ua) => ua.severity === "severe" || ua.severity === "life_threatening").length}
//                 </p>
//               </div>
//               <Shield className="w-8 h-8 text-orange-200" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-100 text-sm">Profile Complete</p>
//                 <p className="text-2xl font-bold">{userAllergies.length > 0 ? "100%" : "0%"}</p>
//               </div>
//               <Heart className="w-8 h-8 text-blue-200" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="flex-1 flex gap-6">
//         {/* Current Allergies */}
//         <Card className="flex-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-gray-800">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               Your Allergy Profile
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="h-[calc(100%-80px)]">
//             {userAllergies.length > 0 ? (
//               <div className="space-y-4 h-full overflow-y-auto pr-2">
//                 {userAllergies.map((userAllergy) => (
//                   <div key={userAllergy.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <h3 className="font-semibold text-gray-800">{userAllergy.allergies.name}</h3>
//                           <Badge className={getSeverityColor(userAllergy.severity)}>
//                             {getSeverityIcon(userAllergy.severity)}
//                             <span className="ml-1 capitalize">{userAllergy.severity?.replace("_", " ")}</span>
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-600 mb-1">
//                           <span className="font-medium">Category:</span> {userAllergy.allergies.category}
//                         </p>
//                         {userAllergy.notes && (
//                           <p className="text-sm text-gray-600">
//                             <span className="font-medium">Notes:</span> {userAllergy.notes}
//                           </p>
//                         )}
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => removeAllergy(userAllergy.id)}
//                         className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <X className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="h-full flex items-center justify-center text-center">
//                 <div className="space-y-4">
//                   <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto">
//                     <AlertTriangle className="w-8 h-8 text-red-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2">No Allergies Added Yet</h3>
//                     <p className="text-gray-600 text-sm max-w-md">
//                       Add your allergies to get personalized food safety analysis and recommendations.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Add New Allergy */}
//         <Card className="w-1/3 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-gray-800">
//               <Plus className="w-5 h-5 text-green-500" />
//               Add New Allergy
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Allergen</label>
//               <Select value={selectedAllergy} onValueChange={setSelectedAllergy}>
//                 <SelectTrigger className="bg-white">
//                   <SelectValue placeholder="Select allergen..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {allergies
//                     .filter((allergy) => !userAllergies.some((ua) => ua.allergies.id === allergy.id))
//                     .map((allergy) => (
//                       <SelectItem key={allergy.id} value={allergy.id}>
//                         {allergy.name} ({allergy.category})
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Severity Level</label>
//               <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
//                 <SelectTrigger className="bg-white">
//                   <SelectValue placeholder="Select severity..." />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="mild">
//                     <div className="flex items-center gap-2">
//                       <Heart className="w-4 h-4 text-green-500" />
//                       Mild
//                     </div>
//                   </SelectItem>
//                   <SelectItem value="moderate">
//                     <div className="flex items-center gap-2">
//                       <Zap className="w-4 h-4 text-yellow-500" />
//                       Moderate
//                     </div>
//                   </SelectItem>
//                   <SelectItem value="severe">
//                     <div className="flex items-center gap-2">
//                       <AlertTriangle className="w-4 h-4 text-orange-500" />
//                       Severe
//                     </div>
//                   </SelectItem>
//                   <SelectItem value="life_threatening">
//                     <div className="flex items-center gap-2">
//                       <Shield className="w-4 h-4 text-red-500" />
//                       Life Threatening
//                     </div>
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Additional Notes</label>
//               <Textarea
//                 placeholder="Any specific symptoms, triggers, or important details..."
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 rows={3}
//                 className="resize-none bg-white"
//               />
//             </div>

//             <Button
//               onClick={addAllergy}
//               disabled={loading || !selectedAllergy || !selectedSeverity}
//               className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               {loading ? "Adding..." : "Add Allergy"}
//             </Button>

//             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Pro Tip</h4>
//               <p className="text-xs text-blue-700">
//                 Be as specific as possible with your allergies. This helps our AI provide more accurate analysis and
//                 safer recommendations.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
