"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918919439071?text=Hello%20DVS%20Facilities,%20I%20would%20like%20to%20enquire%20about%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-600/50 transition-all duration-300 hover:scale-105 active:scale-95 group"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-300 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full"></span>
      </div>
      <span className="hidden sm:inline font-bold text-sm tracking-wide">
        Chat With Us
      </span>
    </a>
  );
}
