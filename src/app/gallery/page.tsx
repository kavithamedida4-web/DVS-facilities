"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Images,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Sparkle
} from "lucide-react";

type GalleryCategory = "All" | "Facilities Management" | "Security Services" | "Deep Cleaning Services";

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Facilities Management" | "Security Services" | "Deep Cleaning Services";
  image: string;
}

const galleryItems: GalleryItem[] = [
  // 1. Facilities Management
  {
    id: "fm-1",
    title: "24/7 Facility Management Operations",
    subtitle: "On-site facility supervisor inspecting electrical and HVAC systems.",
    category: "Facilities Management",
    image: "/images/indian-facility-maintenance.jpg",
  },
  {
    id: "fm-2",
    title: "Professional Housekeeping Staff",
    subtitle: "Multi-zone cleaning with verified, uniformed facility staff.",
    category: "Facilities Management",
    image: "/images/scope-housekeeping-clean.jpg",
  },
  {
    id: "fm-3",
    title: "Electrical Panel & HT Maintenance",
    subtitle: "Certified electricians handling LT/HT distribution panels.",
    category: "Facilities Management",
    image: "/images/about-electrician.jpg",
  },
  {
    id: "fm-4",
    title: "Commercial Plumbing & Water Systems",
    subtitle: "Preventive maintenance for overhead tanks, booster pumps, and piping.",
    category: "Facilities Management",
    image: "/images/plumbing.jpg",
  },
  {
    id: "fm-5",
    title: "Corporate Landscape & Garden Upkeep",
    subtitle: "Dedicated gardeners maintaining lawns and indoor botanical plants.",
    category: "Facilities Management",
    image: "/images/gardening.jpg",
  },
  {
    id: "fm-6",
    title: "On-Site Facility Supervisors",
    subtitle: "Daily shift logs, hygiene sign-offs, and SLA client reporting.",
    category: "Facilities Management",
    image: "/images/indian-service-supervisor.jpg",
  },

  // 2. Security Services
  {
    id: "sec-1",
    title: "Trained Security Personnel",
    subtitle: "Police-verified guards with digital visitor logbook management.",
    category: "Security Services",
    image: "/images/security-services.jpg",
  },
  {
    id: "sec-2",
    title: "Corporate Gate & Perimeter Security",
    subtitle: "24/7 vigilant access control and vehicle movement checks.",
    category: "Security Services",
    image: "/images/scope-corporate-security.jpg",
  },
  {
    id: "sec-3",
    title: "Gated Residential Community Guards",
    subtitle: "Round-the-clock patrolling and resident safety assistance.",
    category: "Security Services",
    image: "/images/scope-residential-security.jpg",
  },
  {
    id: "sec-4",
    title: "Solo Security Guard Station",
    subtitle: "Disciplined uniform protocol and visitor verification.",
    category: "Security Services",
    image: "/images/scope-guard-solo.jpg",
  },

  // 3. Deep Cleaning Services
  {
    id: "dc-1",
    title: "Rotary Floor Machine Scrubbing",
    subtitle: "Marble descaling, tile buffing, and high-gloss crystallization.",
    category: "Deep Cleaning Services",
    image: "/images/floor-cleaning.jpg",
  },
  {
    id: "dc-2",
    title: "Kitchen & Glass Sanitization",
    subtitle: "Hard-water descaling and high-reach glass facade wipe.",
    category: "Deep Cleaning Services",
    image: "/images/deep-cleaning.jpg",
  },
  {
    id: "dc-3",
    title: "Heavy-Duty Commercial Sanitization",
    subtitle: "Heavy-duty residue clearing and deep sanitization for corporate spaces.",
    category: "Deep Cleaning Services",
    image: "/images/hero-deep-clean.jpg",
  },
  {
    id: "dc-4",
    title: "Hospital-Grade Chemical Supplies",
    subtitle: "Direct wholesale eco-friendly chemicals and hygiene refills.",
    category: "Deep Cleaning Services",
    image: "/images/housekeeping-materials.jpg",
  },
];

const categories: { id: GalleryCategory; label: string; icon: React.ElementType }[] = [
  { id: "All", label: "All Photos", icon: Sparkles },
  { id: "Facilities Management", label: "Facilities Management", icon: Building2 },
  { id: "Security Services", label: "Security Services", icon: ShieldCheck },
  { id: "Deep Cleaning Services", label: "Deep Cleaning Services", icon: Sparkle },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const activeItem = activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar forceSolid />

      {/* Breadcrumb Bar */}
      <div className="pt-24 pb-3 bg-white border-b border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#c59b27] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#0e3b2e] font-bold">Gallery</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-12 md:py-16 bg-[#071f16] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#e5c46b] bg-[#0e3b2e] border border-[#c59b27]/40 px-4 py-1.5 rounded-full mb-4 shadow-sm">
            <Images className="w-3.5 h-3.5" />
            <span>Real Work Showcase</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Our Operational <span className="text-[#e5c46b]">Work Gallery</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Authentic glimpses of our trained technicians, security guards, deep cleaning crews, and facility staff at work.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 3 Main Category Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === "All"
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setActiveLightboxIndex(null);
                  }}
                  className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer shadow-xs ${
                    isSelected
                      ? "bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] shadow-md shadow-amber-500/20 scale-105"
                      : "bg-white text-slate-700 hover:text-[#0e3b2e] hover:bg-[#faf2db] border border-gray-200/90 hover:border-[#c59b27]/50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "text-[#071f16]" : "text-[#c59b27]"}`} />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#071f16] text-[#e5c46b]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Gallery Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative h-[260px] sm:h-[290px] md:h-[320px] rounded-3xl overflow-hidden border border-[#c59b27]/30 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-end"
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Ambient Dark Gradient on Hover & Default */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/95 via-[#071f16]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Right Expand Icon */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Top Left Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#071f16]/85 backdrop-blur-sm border border-[#c59b27]/40 text-[#e5c46b] shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="relative z-10 p-5 sm:p-6 transform group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#e5c46b] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-16 text-center max-w-2xl mx-auto p-8 rounded-3xl bg-[#FAF2DB] border border-[#c59b27]/30 shadow-md">
            <h3 className="text-xl sm:text-2xl font-black text-[#0e3b2e]">
              Need Professional Facility Operations?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 mb-6">
              Our trained personnel, verified security guards, and deep cleaning machines are ready to deploy at your premises.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Book Free Site Inspection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* Lightbox Modal with Next / Previous Controls */}
      {activeItem && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white flex items-center justify-center transition-all z-20 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#071f16] border border-[#c59b27]/50 text-[#e5c46b] flex items-center justify-center transition-all z-20 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#071f16] border border-[#c59b27]/50 text-[#e5c46b] flex items-center justify-center transition-all z-20 cursor-pointer shadow-xl hover:scale-110 active:scale-95"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content Card */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-slate-900">
              <Image
                src={activeItem.image}
                alt={activeItem.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Bottom Caption Bar */}
            <div className="bg-[#071f16] border-t border-[#c59b27]/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-[#e5c46b] bg-[#0e3b2e] px-2.5 py-0.5 rounded-full border border-[#c59b27]/40">
                  {activeItem.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {activeItem.subtitle}
                </p>
              </div>

              <Link
                href="/contact"
                className="self-start sm:self-auto px-4 py-2 rounded-full bg-[#c59b27] hover:bg-[#d4af37] text-[#071f16] text-xs font-bold transition-all shadow shrink-0 cursor-pointer"
              >
                Enquire This Service
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
