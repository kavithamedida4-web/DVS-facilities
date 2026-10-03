"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Building2,
  Package,
  ArrowRight
} from "lucide-react";

export default function Navbar({ onOpenQuote, forceSolid = false }: { onOpenQuote?: () => void; forceSolid?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [storesDropdown, setStoresDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setServicesDropdown(false);
    setStoresDropdown(false);
    setIsOpen(false);
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${targetId}`);
      }
    }
  };

  const isSolid = scrolled || forceSolid;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid
      ? "bg-[#071f16]/95 backdrop-blur-md shadow-2xl py-3.5 border-b border-[#c59b27]/30"
      : "bg-transparent py-5"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Brand Logo with Green & Gold Luxury Accent */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            D
          </div>
          <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
            DVS <span className="text-[#e5c46b] font-extrabold">FACILITIES</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-semibold text-white">

          {/* 1. Home */}
          <Link
            href="/"
            className="hover:text-[#e5c46b] transition-colors"
          >
            Home
          </Link>

          {/* 2. Services (with dropdown for 3 main services) */}
          <div
            className="relative group"
            onMouseEnter={() => { setServicesDropdown(true); setStoresDropdown(false); }}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <div className="flex items-center gap-1 hover:text-[#e5c46b] py-1 transition-colors cursor-pointer">
              <Link
                href="/#services"
                onClick={(e) => handleAnchorClick(e, "services")}
                className="hover:text-[#e5c46b] transition-colors flex items-center"
              >
                <span>Services</span>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setServicesDropdown(!servicesDropdown);
                }}
                className="p-0.5 hover:text-[#e5c46b] transition-colors cursor-pointer"
                aria-label="Toggle Services menu"
              >
                <ChevronDown className={`w-3.5 h-3.5 text-[#e5c46b] transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} />
              </button>
            </div>

            {servicesDropdown && (
              <div
                className="absolute top-full -left-6 w-80 bg-[#071f16] rounded-2xl shadow-2xl border border-[#c59b27]/30 py-3 px-2 text-left transition-all duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-[#e5c46b] uppercase tracking-wider px-3 pb-2 border-b border-[#0e3b2e]">
                  <span>Our 3 Main Services</span>
                  <Link
                    href="/#services"
                    onClick={(e) => handleAnchorClick(e, "services")}
                    className="hover:underline text-[10px] lowercase font-normal text-slate-300 hover:text-[#e5c46b]"
                  >
                    view all →
                  </Link>
                </div>

                <Link
                  href="/services/facility-management"
                  onClick={() => setServicesDropdown(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0e3b2e] transition-colors group/item"
                >
                  <div className="p-2 rounded-lg bg-[#0e3b2e] text-[#e5c46b] group-hover/item:bg-[#c59b27] group-hover/item:text-[#071f16] transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover/item:text-[#e5c46b]">
                      1. Facilities Management
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Housekeeping, Electrical, Garden, Plumber
                    </p>
                  </div>
                </Link>

                <Link
                  href="/services/security-services"
                  onClick={() => setServicesDropdown(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0e3b2e] transition-colors group/item"
                >
                  <div className="p-2 rounded-lg bg-[#0e3b2e] text-[#e5c46b] group-hover/item:bg-[#c59b27] group-hover/item:text-[#071f16] transition-colors">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover/item:text-[#e5c46b]">
                      2. Security Services
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Trained Security Guards & Personnel Supply
                    </p>
                  </div>
                </Link>

                <Link
                  href="/services/deep-cleaning"
                  onClick={() => setServicesDropdown(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0e3b2e] transition-colors group/item"
                >
                  <div className="p-2 rounded-lg bg-[#0e3b2e] text-[#e5c46b] group-hover/item:bg-[#c59b27] group-hover/item:text-[#071f16] transition-colors">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover/item:text-[#e5c46b]">
                      3. Deep Cleaning Services
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Kitchen, Toilet, Cupboards, Floor, Glass & Rooms
                    </p>
                  </div>
                </Link>

                {/* Direct quick link to Services section */}
                <div className="pt-2 mt-1 border-t border-[#0e3b2e] px-2">
                  <Link
                    href="/#services"
                    onClick={(e) => handleAnchorClick(e, "services")}
                    className="flex items-center justify-between text-xs font-semibold text-[#e5c46b] hover:text-white p-1.5 rounded-lg hover:bg-[#0e3b2e] transition-colors"
                  >
                    <span>View All Services on Homepage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* 3. Product ⌵ */}
          <div
            className="relative group"
            onMouseEnter={() => { setStoresDropdown(true); setServicesDropdown(false); }}
            onMouseLeave={() => setStoresDropdown(false)}
          >
            <div className="flex items-center gap-1 hover:text-[#e5c46b] py-1 transition-colors cursor-pointer">
              <Link
                href="/products/housekeeping-material"
                onClick={() => { setStoresDropdown(false); setServicesDropdown(false); }}
                className="hover:text-[#e5c46b] transition-colors flex items-center"
              >
                <span>Product</span>
              </Link>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setStoresDropdown(!storesDropdown);
                }}
                className="p-0.5 hover:text-[#e5c46b] transition-colors cursor-pointer"
                aria-label="Toggle Product menu"
              >
                <ChevronDown className={`w-3.5 h-3.5 text-[#e5c46b] transition-transform duration-200 ${storesDropdown ? "rotate-180" : ""}`} />
              </button>
            </div>

            {storesDropdown && (
              <div
                className="absolute top-full -left-6 w-80 bg-[#071f16] rounded-2xl shadow-2xl border border-[#c59b27]/30 py-3 px-2 text-left transition-all duration-200 animate-in fade-in slide-in-from-top-2"
              >
                <div className="text-[10px] font-bold text-[#e5c46b] uppercase tracking-wider px-3 pb-2 border-b border-[#0e3b2e]">
                  Products & Supplies
                </div>

                <Link
                  href="/products/housekeeping-material"
                  onClick={() => setStoresDropdown(false)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#0e3b2e] transition-colors group/item"
                >
                  <div className="p-2 rounded-lg bg-[#0e3b2e] text-[#e5c46b] group-hover/item:bg-[#c59b27] group-hover/item:text-[#071f16] transition-colors">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover/item:text-[#e5c46b]">
                      Housekeeping Material Supply
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Chemicals, Mops, Machines & Consumables
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 4. About */}
          <Link
            href="/about"
            className="hover:text-[#e5c46b] transition-colors"
          >
            About
          </Link>

          {/* 6. Gallery */}
          <Link
            href="/gallery"
            className="hover:text-[#e5c46b] transition-colors"
          >
            Gallery
          </Link>

          {/* 7. Contact */}
          <Link
            href="/contact"
            className="hover:text-[#e5c46b] transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right Gold CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Book Now</span>
            <div className="w-6 h-6 rounded-full bg-[#071f16] text-[#e5c46b] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-3 bg-[#071f16] border-b border-[#c59b27]/30 px-5 pt-4 pb-6 space-y-3 shadow-2xl text-white">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold border-b border-[#0e3b2e]"
          >
            Home
          </Link>

          <div className="py-2 border-b border-[#0e3b2e] space-y-2">
            <Link
              href="/#services"
              onClick={(e) => handleAnchorClick(e, "services")}
              className="flex items-center justify-between text-xs font-bold text-[#e5c46b] uppercase tracking-wider hover:text-white transition-colors"
            >
              <span>Services (View All)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/services/facility-management"
              onClick={() => setIsOpen(false)}
              className="block pl-3 py-1 text-xs font-medium text-slate-300 hover:text-[#e5c46b]"
            >
              1. Facilities Management (Housekeeping, Electrical, Garden, Plumber)
            </Link>
            <Link
              href="/services/security-services"
              onClick={() => setIsOpen(false)}
              className="block pl-3 py-1 text-xs font-medium text-slate-300 hover:text-[#e5c46b]"
            >
              2. Security Services (Supply)
            </Link>
            <Link
              href="/services/deep-cleaning"
              onClick={() => setIsOpen(false)}
              className="block pl-3 py-1 text-xs font-medium text-slate-300 hover:text-[#e5c46b]"
            >
              3. Deep Cleaning (Kitchen, Toilet, Cupboards, Rooms, Floor, Glass)
            </Link>
          </div>

          <div className="py-2 border-b border-[#0e3b2e] space-y-1">
            <Link
              href="/products/housekeeping-material"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-xs font-bold text-[#e5c46b] uppercase tracking-wider hover:text-white transition-colors"
            >
              <span>Product</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/products/housekeeping-material"
              onClick={() => setIsOpen(false)}
              className="block pl-3 py-1 text-xs font-medium text-slate-300 hover:text-[#e5c46b]"
            >
              Housekeeping Material Supply (Chemicals, Mops, Hardware)
            </Link>
          </div>

          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold border-b border-[#0e3b2e]"
          >
            About
          </Link>

          <Link
            href="/gallery"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold border-b border-[#0e3b2e]"
          >
            Gallery
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-2 text-sm font-semibold border-b border-[#0e3b2e]"
          >
            Contact
          </Link>

          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c59b27] text-[#071f16] font-black text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book An Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
