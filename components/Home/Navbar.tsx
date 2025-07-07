"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 shadow-sm rounded-b-xl"
          : "bg-transparent"
      }`}
    >
      <div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold">
          <Link href="/" className="text-xl">
            SafeBites
          </Link>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </Link>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link href="/auth/signup">
            <Button className="rounded-full">
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
        >
          <div className="w-full py-4 flex flex-col gap-4 px-4">
            <Link
              href="#features"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="py-2 text-sm font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Link
                href="/auth/login"
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
              <Link href="/auth/signup" className="block">
                <Button className="rounded-full w-full">
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
