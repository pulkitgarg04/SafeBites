import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
    <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold">
            SafeBites
          </div>
          <p className="text-sm text-muted-foreground">
            Your trusted companion for making informed food choices. Our mission is to empower everyone to enjoy food without fear.
          </p>
          <div className="flex gap-4">
            <Link href="https://x.com/pulkitgarg04" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24" className="size-5"><path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"/></svg>
              <span className="sr-only">X</span>
            </Link>
            <Link href="https://linkedin.com/in/pulkitgarg04" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24" height="24" className="size-5"><path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"/></svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-bold">Product</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SafeBites. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}
