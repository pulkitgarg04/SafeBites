"use client";

import { ChevronRightIcon } from "lucide-react";
import { Navbar } from "@/components/ui/dashboard-header";
import { Link } from "../ui/link";

export function Header() {
  return (
      <Navbar
        banner={
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full bg-fuchsia-950/35 px-3 py-0.5 text-sm/6 font-medium text-white data-[hover]:bg-fuchsia-950/30"
          >
            Pro
            <ChevronRightIcon className="size-4" />
          </Link>
        }
      />
  );
}