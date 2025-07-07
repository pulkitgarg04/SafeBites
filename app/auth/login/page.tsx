import { LoginForm } from "@/components/forms/login-form"
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="flex w-full max-w-lg flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Image src="/favicon.ico" alt="SafeBites Logo" width={48} height={48} className="mb-2" />
          <span className="font-bold text-xl">SafeBites</span>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}