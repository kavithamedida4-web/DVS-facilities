"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building2,
  ShieldCheck,
  Check
} from "lucide-react";

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Facilities Management (Housekeeping, Electrical, Garden, Plumber)");
  const [city, setCity] = useState("Hyderabad / Shankarpalle");
  const [notes, setNotes] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lastSubmittedUrl, setLastSubmittedUrl] = useState("");

  useEffect(() => {
    if (serviceParam) {
      const lower = serviceParam.toLowerCase();
      if (lower.includes("security")) {
        setService("Security Services (Supply of Trained Guards)");
      } else if (lower.includes("deep") || lower.includes("clean")) {
        setService("Deep Cleaning (Kitchen, Toilet, Cupboards, Floor, Glass)");
      } else if (lower.includes("material") || lower.includes("product") || lower.includes("supply")) {
        setService("Product: Housekeeping Material & Consumables Supply");
      } else if (lower.includes("facility") || lower.includes("housekeeping") || lower.includes("plumber") || lower.includes("electric")) {
        setService("Facilities Management (Housekeeping, Electrical, Garden, Plumber)");
      } else {
        setService(serviceParam);
      }
    }
  }, [serviceParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ownerWhatsAppNumber = "918919439071";

    const textMessage = 
`*NEW BOOKING / SERVICE ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${name}
📞 *Phone Number:* ${phone}
🛠️ *Selected Service:* ${service}
📍 *Location / City:* ${city}
📝 *Requirement Details:* ${notes.trim() ? notes.trim() : "Standard inspection and quotation requested."}
━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* DVS Facilities Official Website`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedText}`;
    setLastSubmittedUrl(whatsappUrl);

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar forceSolid />

      {/* Breadcrumb */}
      <div className="pt-24 pb-3 bg-white border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#c59b27] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#0e3b2e] font-bold">Contact & Booking</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 md:py-16 bg-[#071f16] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#e5c46b] bg-[#0e3b2e] border border-[#c59b27]/40 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Direct Owner Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Contact <span className="text-[#e5c46b]">DVS Facilities</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
            Schedule a free site visit or request quotation. Submitting this form connects you directly with our management on WhatsApp for instant confirmation.
          </p>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="tel:+918919439071" className="flex items-center gap-3 p-4 rounded-2xl border border-[#c59b27]/30 bg-[#FAF2DB] hover:border-[#c59b27] hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#c59b27]">Call Us (24/7 Desk)</div>
                <div className="text-sm font-bold text-[#0e3b2e]">+91 89194 39071</div>
              </div>
            </a>
            <a href="mailto:info@dvsfacilities.com" className="flex items-center gap-3 p-4 rounded-2xl border border-[#c59b27]/30 bg-[#FAF2DB] hover:border-[#c59b27] hover:shadow-md transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#c59b27]">Email Us</div>
                <div className="text-sm font-bold text-[#0e3b2e]">info@dvsfacilities.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-[#c59b27]/30 bg-[#FAF2DB]">
              <div className="w-10 h-10 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-black uppercase tracking-wider text-[#c59b27]">Working Hours</div>
                <div className="text-sm font-bold text-[#0e3b2e]">Mon – Sun, 24/7 Operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-14 sm:py-16 bg-[#FAF2DB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left: Booking Form */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#edd58c] via-[#e5c46b] to-[#c59b27] border-2 border-[#fff0b8] text-[#0e3b2e] p-6 sm:p-7 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#e5c46b] bg-[#0e3b2e] border border-[#0e3b2e]/30 px-3 py-1 rounded-full mb-2.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#e5c46b]" />
                  <span>Instant WhatsApp Booking</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[#0e3b2e]">
                  Schedule <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Your Appointment</span> Today!
                </h2>

                <p className="text-xs sm:text-sm text-[#0e3b2e]/90 font-medium mt-1 mb-4">
                  Fill out your details below. Submitting will send your service booking request directly to our management on WhatsApp (+91 89194 39071).
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#0e3b2e] border-2 border-[#c59b27] text-white text-center space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#c59b27] text-[#071f16] flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white">Booking Information Sent!</h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong className="text-[#e5c46b]">{name}</strong>. Your enquiry for <strong className="text-[#e5c46b]">{service}</strong> has been forwarded to our WhatsApp.
                      </p>
                    </div>

                    <div className="p-3 bg-[#071f16] rounded-xl border border-[#c59b27]/40 text-left text-xs text-slate-200 space-y-1 max-w-md mx-auto">
                      <div><strong className="text-[#e5c46b]">Phone:</strong> {phone}</div>
                      <div><strong className="text-[#e5c46b]">Location:</strong> {city}</div>
                      {notes && <div><strong className="text-[#e5c46b]">Details:</strong> {notes}</div>}
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      {lastSubmittedUrl && (
                        <a
                          href={lastSubmittedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg transition-all"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                          <span>Open WhatsApp Chat</span>
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setFormSubmitted(false);
                          setName("");
                          setPhone("");
                          setNotes("");
                        }}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors"
                      >
                        Submit Another Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Suresh Patel"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] placeholder-slate-400 border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] placeholder-slate-400 border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Select Service *</label>
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        >
                          <option value="Facilities Management (Housekeeping, Electrical, Garden, Plumber)">
                            1. Facilities Management (Housekeeping, Electrical, Garden, Plumber)
                          </option>
                          <option value="Security Services (Supply of Trained Guards)">
                            2. Security Services (Supply of Trained Guards)
                          </option>
                          <option value="Deep Cleaning (Kitchen, Toilet, Cupboards, Floor, Glass)">
                            3. Deep Cleaning (Kitchen, Toilet, Cupboards, Floor, Glass)
                          </option>
                          <option value="Product: Housekeeping Material & Consumables Supply">
                            Product: Housekeeping Material Supply
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Location / City *</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        >
                          <option value="Hyderabad / Shankarpalle">Hyderabad / Shankarpalle</option>
                          <option value="Cyberabad / HITEC City">Cyberabad / HITEC City</option>
                          <option value="Secunderabad">Secunderabad</option>
                          <option value="Telangana (Other Districts)">Telangana (Other Districts)</option>
                          <option value="Bangalore">Bangalore</option>
                          <option value="Other Location">Other Location</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Requirement Details & Notes</label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Property size (sq ft), number of housekeeping / security staff required, or specific deep cleaning needs..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white text-sm text-[#0e3b2e] placeholder-slate-400 border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[#0e3b2e] text-[#e5c46b] hover:bg-[#165b45] hover:text-white font-black text-sm shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Submit & Send to WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Google Map */}
            <div className="lg:col-span-5 relative flex flex-col justify-stretch">
              <div className="relative w-full h-full min-h-[380px] sm:min-h-[440px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#c59b27] bg-[#0e3b2e]">
                <iframe
                  title="DVS Facilities Services Location"
                  src="https://maps.google.com/maps?q=DVS%20FACILITIES%20SERVICES%20Professional%20Cleaning%20Service%2C%20Tangutoor%2C%20Shankarpalle%2C%20Telangana%20501203&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f3]" />}>
      <ContactFormContent />
    </Suspense>
  );
}
