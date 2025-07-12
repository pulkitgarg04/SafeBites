"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "@/components/ui/link";
import {
  PlusGrid,
  PlusGridItem,
  PlusGridRow,
} from "@/components/ui/plusgrid";
import Image from "next/image";

const links = [
  { href: "/dashboard", label: "AI Assistant" },
  { href: "/dashboard/settings", label: "Settings" },
];

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950  bg-blend-multiply data-[hover]:bg-black/[2.5%] dark:text-white"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
    </nav>
  );
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-[hover]:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  );
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: "easeInOut",
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link
              href={href}
              className="text-base font-medium text-gray-950 dark:text-white"
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5 dark:border-white/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5 dark:border-white/5" />
      </div>
    </DisclosurePanel>
  );
}

export function Navbar() {
  return (
    <Disclosure as="header">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between items-center">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <div className="flex items-center space-x-2">
                  <div className="-mt-1">
                    <Image
                      src="/favicon.png"
                      alt="SafeBites Logo"
                      width={40}
                      height={40}
                      className="mr-2"
                    />
                  </div>
                  <span className="hidden font-bold md:inline-block text-xl">
                    SafeBites
                  </span>
                </div>
              </Link>
            </PlusGridItem>
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  );
}