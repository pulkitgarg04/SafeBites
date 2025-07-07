"use client"

import Navbar from "@/components/Home/Navbar"
import Hero from "@/components/Home/Hero"
import Footer from "@/components/Home/Footer"
import Features from "@/components/Home/Features"
import FAQ from "@/components/Home/FAQ"
import Pricing from "@/components/Home/Pricing"

export default function LandingPage() {

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <Hero />
        <Features />
        <FAQ />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}