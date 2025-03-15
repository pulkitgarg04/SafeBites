import { Suspense } from "react"
import AllergyChecker from "@/components/allergy-checker"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">SafeBites</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Input any food item or ingredient list and SafeBites will identify potential allergens and suggest safe
            alternatives for you.
          </p>
        </section>

        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <AllergyChecker />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}