"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/dashboard/header";
import UserSettings from "@/components/dashboard/user-settings";
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

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get("/api/user/getInfo");
        setUser(userRes.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-6 py-8 h-[calc(100vh-120px)]">
        <UserSettings user={user} onUserUpdate={handleUserUpdate} />
      </div>
    </div>
  );
}
