import React from 'react'
import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Can I cancel at anytime?",
      answer:
        "Yes, you can cancel anytime. No questions are asked while you cancel, but we would highly appreciate your feedback.",
    },
    {
      question: "How does SafeBites detect allergens?",
      answer:
        "SafeBites uses a smart analyzer to scan food items and ingredient lists for common allergens based on your personal profile.",
    },
    {
      question: "Can I use SafeBites for multiple allergies?",
      answer:
        "Yes! You can add multiple allergens to your profile and SafeBites will check for all of them whenever you scan a food or ingredient list.",
    },
    {
      question: "Is my allergy information private?",
      answer:
        "Absolutely. Your allergy profile and scan history are private and never shared with third parties.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "All users get priority email support. We're here to help with any questions or issues you have!",
    },
    {
      question: "Can SafeBites recommend safe alternatives?",
      answer:
        "Yes! If an allergen is detected, SafeBites will suggest safe alternatives whenever possible.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">Frequently<br />asked questions</h2>
            <p className="mt-1 hidden md:block text-gray-600">Answers to the most frequently asked questions.</p>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`pt-6 pb-3 ${i === 0 ? "border-t-0" : "border-t"}`}
              >
                <button
                  className={`group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 ${openIndex === i ? "" : ""}`}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-content-${i}`}
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                >
                  {faq.question}
                  <svg className={`shrink-0 size-5 text-gray-600 group-hover:text-gray-500 transition-transform ${openIndex === i ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <div
                  id={`faq-content-${i}`}
                  className={`overflow-hidden transition-[height] duration-300 ${openIndex === i ? "max-h-40" : "max-h-0"}`}
                  role="region"
                  aria-labelledby={`faq-heading-${i}`}
                >
                  <p className="text-gray-600 px-1 pb-2 pt-0.5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
