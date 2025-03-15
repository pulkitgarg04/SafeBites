import { ShieldCheck, Lightbulb, Users } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">About SafeBites</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            SafeBites is your trusted companion for making informed food choices. Designed to help individuals with
            allergies, SafeBites analyzes food items and ingredient lists to detect potential allergens and recommend
            safe alternatives. Our mission is to empower everyone to enjoy food without fear.
          </p>
        </section>
        <section className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-start">
            <ShieldCheck className="w-10 h-10 text-blue-500 mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Our Mission</h2>
              <p className="text-slate-600">
                At SafeBites, we believe that food should be safe and accessible for everyone. Our goal is to leverage
                technology to simplify the process of identifying allergens, making dining worry-free and enjoyable.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-start">
            <Lightbulb className="w-10 h-10 text-yellow-500 mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">How It Works</h2>
              <p className="text-slate-600">
                Simply input a food item or list of ingredients into SafeBites, and our smart analyzer will identify
                potential allergens. We also provide recommendations for alternative ingredients to help you create safe
                and delicious meals.
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex items-start">
            <Users className="w-10 h-10 text-green-500 mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 mb-2">Join Our Community</h2>
              <p className="text-slate-600">
                SafeBites is more than just a tool - its a community of food lovers and allergy-conscious individuals.
                Share your feedback, suggest improvements, and help us make SafeBites even better.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}