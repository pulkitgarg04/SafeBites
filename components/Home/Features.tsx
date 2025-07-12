import React from 'react'
import { Search, Shield, Heart, ListChecks, AlertTriangle, Star } from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function Features() {
  const features = [
    {
      title: "Allergen Detection",
      description: "Scan food items and ingredient lists to instantly detect common allergens.",
      icon: <AlertTriangle className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]",
    },
    {
      title: "Safe Alternatives",
      description: "Get personalized recommendations for safe food alternatives based on your allergies.",
      icon: <Heart className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]",
    },
    {
      title: "Ingredient Scanner",
      description: "Quickly scan and analyze ingredient labels for hidden allergens.",
      icon: <Search className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/2/8]",
    },
    {
      title: "Peace of Mind",
      description: "Empower yourself and your loved ones to eat confidently, anywhere.",
      icon: <Shield className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]",
    },
    {
      title: "Personalized Profiles",
      description: "Save your allergy profile for faster, more accurate checks every time.",
      icon: <ListChecks className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]",
    },
    {
      title: "Trusted by the Community",
      description: "Join a growing community of users who rely on SafeBites for safe eating.",
      icon: <Star className="h-6 w-6 text-black dark:text-neutral-400" />, 
      area: "xl:[grid-area:2/5/3/8] hidden xl:block",
    },
  ];

  return (
    <section id="features" className="w-full py-20 md:py-32 flex flex-col items-center justify-center">
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-4">Features for <span className="bg-gradient-to-b from-[rgba(255,167,86,1)] to-[rgba(238,96,44,1)] bg-clip-text text-transparent">Safer Eating</span></h2>
        <p className="max-w-[800px] text-muted-foreground md:text-lg mb-10 text-center mt-5">
          SafeBites offers powerful tools to help you detect allergens, find safe alternatives, and make confident food choices — anywhere, anytime.
        </p>
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 w-full">
          {features.map((feature, i) => (
            <GridItem
              key={i}
              area={feature.area}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
