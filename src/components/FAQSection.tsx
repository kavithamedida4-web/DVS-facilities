"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const DVS_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What services are covered under DVS Integrated Facilities Management?",
    answer: "Our integrated contract provides complete on-site operational coverage under a single trusted partner. It combines disciplined daily Housekeeping & waste segregation, certified Electrical Maintenance (LT/HT panel audits, UPS backup, wiring audits), Horticultural Garden & Landscaping upkeep, and rapid Plumbing & water pump servicing. Every site is managed by a dedicated, on-site DVS supervisor who oversees daily checklists and quality audits.",
    highlights: ["Daily Housekeeping & Waste Segregation", "Certified Electrical & Panel Audits", "Garden & Irrigation Care", "Plumbing & Motor Maintenance", "Dedicated On-Site Supervisor"]
  },
  {
    id: "faq-2",
    question: "Are all security guards and facility technicians background-checked and police-verified?",
    answer: "Yes, 100% of our security personnel, housekeeping crew, and technical engineers undergo complete background checks and mandatory police verification before deployment. Our security staff receive rigorous physical drills, customer etiquette coaching, fire safety protocols, and visitor app management (MyGate, NoBroker, Biometric logs) supervised by seasoned ex-defense officers.",
    highlights: ["100% Police Verification Records", "Fire Safety & First Aid Trained", "Visitor & Vehicle App Management", "Disciplined Uniform & High Vigilance"]
  },
  {
    id: "faq-3",
    question: "What is your emergency breakdown response time for electrical and plumbing faults?",
    answer: "For all contracted facility clients, DVS guarantees a rapid on-site emergency response within 60 minutes. Our certified electricians and plumbers are stationed locally with toolkits and spare parts to swiftly resolve main panel tripping, water supply disruptions, motor failures, or emergency drain blockages.",
    highlights: ["60-Minute Rapid On-Site Response", "24/7 Operations Desk Helpline", "Standby Certified Technicians", "Swift Breakdown Escalation Protocol"]
  },
  {
    id: "faq-4",
    question: "Do you offer one-time deep cleaning or only Annual Maintenance Contracts (AMC)?",
    answer: "We provide both flexible solutions! You can book on-demand one-time deep cleaning for newly renovated homes, offices, pre-audit cleanups, or moving days. For ongoing premises upkeep and security guard supply, we provide customizable Monthly and Annual Maintenance Contracts (AMC) with dedicated personnel, transparent billing, and zero hidden costs.",
    highlights: ["Flexible One-Time Deep Cleaning", "Monthly & Annual Maintenance (AMC)", "Itemized Transparent Proposals", "Zero Hidden Charges"]
  },
  {
    id: "faq-5",
    question: "What machines and chemicals do you use for deep cleaning services?",
    answer: "We utilize industrial-grade single-disc rotary scrubbers for marble and tile restoration, high-suction wet & dry HEPA vacuum extractors, telescopic high-reach glass squeegees, and specialized steam sanitizers. All our chemicals are non-acidic, hospital-grade, and eco-certified (Taski/Diversey equivalent) that effectively eradicate stubborn kitchen grease and hard-water scale without damaging surfaces.",
    highlights: ["Single-Disc Rotary Floor Scrubbers", "Hospital-Grade & Eco-Safe Chemicals", "HEPA High-Suction Wet Vacuums", "Acid-Free Hard Water Descalers"]
  },
  {
    id: "faq-6",
    question: "How quickly can you inspect our facility and provide a customized quote?",
    answer: "Once you submit a request online or call our helpline, our area operations supervisor visits your facility within 2 to 4 hours to conduct a 100% free physical audit. We inspect the area, evaluate workforce and equipment needs, and provide an itemized, transparent proposal on the same day.",
    highlights: ["Zero-Cost Physical Site Audit", "Supervisor Visit within 2-4 Hours", "Same-Day Transparent Proposal", "No Obligation Consultation"]
  },
  {
    id: "faq-7",
    question: "Can we purchase housekeeping materials and cleaning chemicals in wholesale?",
    answer: "Yes, absolutely. DVS Facilities operates a direct wholesale supply division. You can procure commercial-grade floor cleaners, disinfectants (5L/50L cans), color-coded GSM microfiber cloths, flat mops, glass squeegees, hand soaps, jumbo tissue rolls, and urinal screen mats at bulk manufacturer pricing with guaranteed timely doorstep restocking.",
    highlights: ["Direct Wholesale & Bulk Rates", "5L / 50L Disinfectant Concentrates", "MSDS Certified Formulations", "Scheduled Monthly Restocking Deliveries"]
  },
  {
    id: "faq-8",
    question: "How does DVS Facilities handle staff absenteeism and emergency leaves?",
    answer: "We guarantee a strict Zero-Absenteeism SLA. DVS Facilities maintains an active pool of pre-verified, trained standby reliever staff across all our operational zones. If any assigned guard, housekeeper, or technician takes leave, a qualified reliever is immediately deployed on-site, ensuring zero operational disruption.",
    highlights: ["Guaranteed Standby Reliever Pool", "Zero Interruption in Shifts", "Biometric Attendance Tracking", "Supervisor Daily Headcount Sign-off"]
  }
];

export default function FAQSection({ onOpenQuote }: { onOpenQuote?: (serviceName?: string) => void }) {
  // First item active by default to match the exact visual style in the reference image
  const [openId, setOpenId] = useState<string | null>("faq-1");
  const [showAll, setShowAll] = useState<boolean>(false);

  // Show top 6 most common questions by default, expand to all 8 on click
  const displayedFAQs = showAll ? DVS_FAQS : DVS_FAQS.slice(0, 6);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Structured FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DVS_FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-white relative overflow-hidden scroll-mt-20">
      {/* Schema.org FAQPage JSON-LD for rich search engine snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badge: FAQS */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-[#e5c46b]/25 border border-[#c59b27]/40 text-[#c59b27] shadow-2xs">
            FAQS
          </span>
        </div>

        {/* Section Heading: Common Questions */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e3b2e] text-center tracking-tight mb-10 sm:mb-12">
          Common <span className="text-[#c59b27]">Questions</span>
        </h2>

        {/* Accordion List */}
        <div className="space-y-4">
          {displayedFAQs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl transition-all duration-200 border ${
                  isOpen
                    ? "bg-[#FAF2DB]/70 border-[#c59b27] shadow-sm ring-1 ring-[#c59b27]/30"
                    : "bg-white border-gray-200 hover:border-[#c59b27]/40"
                }`}
              >
                {/* Accordion Question Header Button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left cursor-pointer transition-colors group"
                >
                  <span
                    className={`text-base sm:text-lg font-bold pr-4 transition-colors ${
                      isOpen ? "text-[#c59b27]" : "text-[#0e3b2e] group-hover:text-[#c59b27]"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? "text-[#c59b27] rotate-180" : "text-gray-500 group-hover:text-[#c59b27]"
                    }`}
                  />
                </button>

                {/* Accordion Answer Content */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-1 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-[#c59b27]/25 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View More / View Less Toggle & Ask Our Team CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#FAF2DB]/50 hover:bg-[#FAF2DB] text-[#0e3b2e] hover:text-[#c59b27] border border-[#c59b27]/30 transition-all cursor-pointer"
          >
            <span>{showAll ? "Show Less Questions" : "View More Questions"}</span>
            <ChevronDown className={`w-4 h-4 text-[#c59b27] transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>

          {onOpenQuote && (
            <button
              type="button"
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0e3b2e] hover:bg-[#071f16] text-[#e5c46b] border border-[#c59b27]/50 shadow-sm transition-all cursor-pointer"
            >
              <span>Have a Specific Question? Contact Us</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
