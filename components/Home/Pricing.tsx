import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

          <div className="container px-4 md:px-6 relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Transparent <span className="bg-gradient-to-b from-[rgba(255,167,86,1)] to-[rgba(238,96,44,1)] bg-clip-text text-transparent">Pricing</span></h2>
              <p className="max-w-[800px] text-muted-foreground md:text-lg">
                One affordable plan. All features.
              </p>
            </motion.div>

            <div className="mx-auto max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative overflow-hidden h-full border-primary shadow-lg bg-gradient-to-b from-background to-muted/10 backdrop-blur">
                  <CardContent className="p-6 flex flex-col h-full">
                    <h3 className="text-2xl font-bold">SafeBites Plan</h3>
                    <div className="flex items-baseline mt-4">
                      <span className="text-4xl font-bold">$5</span>
                      <span className="text-muted-foreground ml-1">/month</span>
                    </div>
                    <p className="text-muted-foreground mt-2">Allergy detection, safe alternatives, and more for one low price.</p>
                    <ul className="space-y-3 my-6 flex-grow">
                      <li className="flex items-center">
                        <Check className="mr-2 size-4 text-primary" />
                        Scan ingredients for allergens
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 size-4 text-primary" />
                        Personal allergy profile
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 size-4 text-primary" />
                        Safe alternative suggestions
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 size-4 text-primary" />
                        Priority support
                      </li>
                    </ul>
                    <Link href="/auth/signup">
                    <Button className="cursor-pointer w-full mt-auto rounded-full bg-primary hover:bg-primary/90" variant="default">
                      Get Started
                    </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
  )
}
