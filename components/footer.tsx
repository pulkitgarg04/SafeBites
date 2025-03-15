import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold text-slate-800">SafeBites</span>
          </div>
          <div className="text-sm text-slate-500 text-center">
            &copy; {new Date().getFullYear()} SafeBites. All rights reserved.
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
          Made with ❤️ by {" "}
            <a
              href="https://github.com/pulkitgarg04"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              Pulkit Garg
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}