"use client";

import { useState, useEffect } from "react";
import AIChat from "@/components/dashboard/ai-chat";
import { Header } from "@/components/dashboard/header";
import axios from "axios";

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

interface Subscription {
  id: string;
  userId: string;
  credits: number;
  creditsUsed: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndSubscription = async () => {
      try {
        const userRes = await axios.get("/api/user");
        setUser(userRes.data);

        const subRes = await axios.get("/api/subscription/info");
        setSubscription(subRes.data);
      } catch {
        setUser(null);
        setSubscription(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndSubscription();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-700 animate-pulse">SafeBites</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold text-gray-700 animate-pulse">User not found</span>
        </div>
      </div>
    );
  }

  const remainingCredits = subscription
    ? subscription.credits - (subscription.creditsUsed || 0)
    : 0;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-8 h-[calc(100vh-120px)]">
        <AIChat
          user={user}
          remainingCredits={remainingCredits}
        />
      </div>
    </div>
  );
}
