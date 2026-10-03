"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function QuickBookingModal({
  isOpen,
  onClose,
  defaultService = "Facilities Management (Housekeeping, Electrical, Garden, Plumber)"
}: QuickBookingModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);
  const [city, setCity] = useState("Bangalore");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

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
📝 *Requirement Details:* ${message.trim() ? message.trim() : "Standard inspection and quotation requested."}
━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* DVS Facilities Website Modal`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0e3b2e]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#c59b27]/30">
        
        {/* Top Header */}
        <div className="bg-[#0e3b2e] px-6 py-5 text-white flex items-center justify-between border-b border-[#c59b27]/40">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e5c46b]">
              <Sparkles className="w-3.5 h-3.5 text-[#e5c46b]" />
              <span>DVS Facilities Direct Booking</span>
            </div>
            <h3 className="text-xl font-black mt-1 text-white">Get Free Site Inspection & Quote</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#e5c46b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-[#0e3b2e]">Enquiry Received!</h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                Thank you, <strong>{name || "Valued Client"}</strong>. Our facility supervisor will call you within 15 minutes at <strong>{phone}</strong>.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0e3b2e] text-[#e5c46b] text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Indian Workforce Guaranteed</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0e3b2e] uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b27]/30 focus:border-[#c59b27] bg-[#faf8f3]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0e3b2e] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b27]/30 focus:border-[#c59b27] bg-[#faf8f3]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0e3b2e] uppercase tracking-wider mb-1.5">
                    City / Location *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b27]/30 focus:border-[#c59b27] bg-[#faf8f3]"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Pune">Pune</option>
                    <option value="Delhi-NCR">Delhi - NCR</option>
                    <option value="Other">Other City in India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e3b2e] uppercase tracking-wider mb-1.5">
                  Select Service / Requirement *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b27]/30 focus:border-[#c59b27] bg-[#faf8f3]"
                >
                  <option value="Facilities Management">1. Facilities Management (Housekeeping, Electrical, Garden, Plumber)</option>
                  <option value="Security Services (Supply)">2. Security Services (Supply of Trained Guards)</option>
                  <option value="Deep Cleaning Services">3. Deep Cleaning (Kitchen, Toilet, Cupboards, Rooms, Floor, Glass)</option>
                  <option value="Housekeeping Material Supply">Product: Housekeeping Material Supply</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0e3b2e] uppercase tracking-wider mb-1.5">
                  Specific Requirements or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Need 4 security guards and daily office housekeeping staff..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#c59b27]/30 focus:border-[#c59b27] bg-[#faf8f3]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#0e3b2e] font-black text-sm hover:scale-[1.01] active:scale-95 shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
              >
                Submit & Request Callback
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
