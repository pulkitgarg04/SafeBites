"use client";

import { useState, useEffect } from "react";
import AIChat from "@/components/dashboard/ai-chat";
import { Header } from "@/components/dashboard/header";

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const userRes = await fetch("/api/user");
      const users = await userRes.json();
      setUser(users[0] || null);
      if (users[0]) {
        const subRes = await fetch(`/api/subscription?userId=${users[0].id}`);
        const subs = await subRes.json();
        setSubscription(subs[0] || null);
      } else {
        setSubscription(null);
      }
    } catch {
      setUser(null);
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <p className="text-gray-600 font-medium">User not found.</p>
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
          hasActiveSubscription={!!subscription}
          remainingCredits={remainingCredits}
          onCreditUpdate={refreshData}
        />
      </div>
    </div>
  );
}
