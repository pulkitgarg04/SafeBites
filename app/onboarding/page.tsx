"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/subscription", {
        productId: "890596"
      });

      toast.success("Redirecting to checkout...");

      window.open(response.data.checkoutUrl, "_blank");
    } catch(err) {
      console.log(err);
      toast.error("Failed to process your subscription request");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "100 AI-powered food analyses per month",
    "Scan ingredient labels with image recognition",
    "Personalized allergy profile management",
    "Safe food alternative recommendations",
    "Real-time allergen detection alerts",
    "Priority customer support",
    "Emergency contact integration",
    "Detailed analysis history",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center items-center">
              <Image
                src="/favicon.ico"
                alt="SafeBites Logo"
                width={48}
                height={48}
                className="mb-2"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Welcome to SafeBites
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Your journey to safer eating starts here. Get AI-powered allergen
              detection and personalized food recommendations for just $5.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"></div>

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
                <CardTitle className="text-2xl mb-2">
                  SafeBites Premium
                </CardTitle>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-5xl font-bold">$5</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground">
                  Everything you need to eat safely and confidently
                </p>

                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button
                    onClick={handleGetStarted}
                    disabled={loading}
                    className="w-full h-12 text-base font-semibold bg-black cursor-pointer"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        Get Started Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">
                    How accurate is the AI detection?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI is trained on extensive food databases and achieves
                    95%+ accuracy in allergen detection, with continuous
                    improvements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">
                    What if I use all my credits?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    You get 100 credits monthly. If you need more, you can
                    simply email the developer :)
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Is my data secure?</h4>
                  <p className="text-sm text-muted-foreground">
                    Absolutely. We use enterprise-grade encryption and never
                    share your personal health information with third parties.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
