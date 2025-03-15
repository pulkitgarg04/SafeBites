import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, AlertOctagon } from "lucide-react"
import { CheckCircle2 } from "lucide-react"

type Allergen = {
  name: string
  severity: "high" | "medium" | "low"
}

type AllergenListProps = {
  allergens: Allergen[]
}

export default function AllergenList({ allergens }: AllergenListProps) {
  if (allergens.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="flex justify-center mb-3">
          <div className="bg-emerald-100 p-3 rounded-full">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-slate-800 mb-1">No Allergens Detected</h3>
        <p className="text-slate-500">This food appears to be free from common allergens.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-slate-800">Potential Allergens</h3>
      <ul className="space-y-3">
        {allergens.map((allergen, index) => (
          <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-slate-50">
            {allergen.severity === "high" && <AlertOctagon className="h-5 w-5 text-red-500 mt-0.5" />}
            {allergen.severity === "medium" && <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />}
            {allergen.severity === "low" && <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">{allergen.name}</span>
                <Badge
                  className={
                    allergen.severity === "high"
                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                      : allergen.severity === "medium"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  }
                >
                  {allergen.severity.charAt(0).toUpperCase() + allergen.severity.slice(1)} Risk
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                {allergen.severity === "high"
                  ? "Commonly causes severe allergic reactions."
                  : allergen.severity === "medium"
                    ? "May cause moderate allergic reactions in sensitive individuals."
                    : "Usually causes mild reactions in some individuals."}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}