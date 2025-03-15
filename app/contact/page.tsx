import { Mail, Phone, MapPin } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="flex-1">
        <section className="bg-emerald-500 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Reach out to us with any questions, feedback, or concerns. We{"\'"}re here to help!
          </p>
        </section>

        <section className="container max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Phone className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-800">Phone</h3>
            <p className="text-slate-600">+91 98xxx-xxxxx</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <Mail className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-800">Email</h3>
            <p className="text-slate-600">business.pulkitgarg@gmail.com</p>
          </div>
          <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <MapPin className="w-10 h-10 text-emerald-500 mb-4" />
            <h3 className="text-lg font-medium text-slate-800">Address</h3>
            <p className="text-slate-600">Barnala, Punjab, India</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}