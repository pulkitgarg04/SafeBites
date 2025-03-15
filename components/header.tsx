import { Shield } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="container max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-emerald-600" />
          <span className="font-bold text-xl text-slate-800">SafeBites</span>
        </Link>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                href="/"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-slate-600 hover:text-emerald-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
