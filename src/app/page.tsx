"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Wrench,
  PhoneCall,
  Star,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
  Images,
  ClipboardCheck,
  Maximize2,
  X,
  MessageCircle
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  const [schedulePhone, setSchedulePhone] = useState("");
  const [scheduleService, setScheduleService] = useState("Facilities Management (Housekeeping, Electrical, Garden, Plumber)");
  const [scheduleCity, setScheduleCity] = useState("Hyderabad / Shankarpalle");
  const [scheduleNotes, setScheduleNotes] = useState("");
  const [lastSubmittedUrl, setLastSubmittedUrl] = useState("");
  const [activeLightboxImg, setActiveLightboxImg] = useState<{
    id: string;
    title: string;
    subtitle: string;
    category: string;
    badge: string;
    badgeType?: string;
    image: string;
    tags?: string[];
  } | null>(null);
  const servicesScrollRef = useRef<HTMLDivElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);

  const howItWorksSteps = [
    {
      step: "01",
      title: "Requirement & Free Audit",
      shortDesc: "Submit your needs or call us. Our area supervisor visits your premises within 2-4 hours for a zero-cost physical audit.",
      actionText: "Book Free Audit",
      actionType: "modal",
      turnaround: "2-4 Hours",
      icon: PhoneCall,
      circleStyle: "bg-[#FAF2DB] border border-[#c59b27]/40 text-[#c59b27]",
      lineStyle: "w-[1.5px] bg-slate-200/90"
    },
    {
      step: "02",
      title: "Customized Proposal & SLA",
      shortDesc: "Receive an itemized, transparent quote covering verified manpower, equipment, and supplies with zero hidden fees.",
      actionText: "Explore Services",
      actionType: "link",
      actionHref: "/#services",
      turnaround: "Same Day",
      icon: ClipboardCheck,
      circleStyle: "border-2 border-dashed border-[#c59b27] bg-[#faf8f3] text-[#c59b27]",
      lineStyle: "w-0 border-l-2 border-dashed border-[#c59b27]/45"
    },
    {
      step: "03",
      title: "Rapid Staff Deployment",
      shortDesc: "100% police-verified, uniformed staff deployed within 24-48 hours, fully equipped with machines and supplies.",
      actionText: "Deployment Standards",
      actionType: "link",
      actionHref: "/#services",
      turnaround: "24-48 Hours",
      icon: Users,
      circleStyle: "border-2 border-[#0e3b2e] bg-[#071f16] text-[#e5c46b] shadow-sm",
      lineStyle: "w-[1.5px] bg-[#0e3b2e]/30"
    },
    {
      step: "04",
      title: "Supervision & 24/7 SLA",
      shortDesc: "A dedicated on-site supervisor manages daily checklists, attendance, preventive care, and standby reliever backup.",
      actionText: "Contact Support",
      actionType: "link",
      actionHref: "/#contact",
      turnaround: "24/7 Support",
      icon: ShieldCheck,
      circleStyle: "border-2 border-[#c59b27] bg-[#FAF2DB] text-[#92400e] shadow-xs",
      lineStyle: "w-[1.5px] bg-[#c59b27]/30"
    }
  ];

  const customerReviews = [
    {
      id: "1",
      initial: "R",
      avatarBg: "bg-[#fef3c7] text-[#92400e]",
      name: "Rajeshwar G.",
      role: "Facility Director",
      location: "Apex Tech Parks, Hydershakote",
      rating: 5,
      quote: "The facility maintenance and electrical upkeep is incredible! No breakdown issues and their on-site supervisor ensures all shift checklists are signed off daily. Their customer care team on WhatsApp is also extremely responsive."
    },
    {
      id: "2",
      initial: "K",
      avatarBg: "bg-[#071f16] text-[#e5c46b]",
      name: "Kiran K.",
      role: "Secretary",
      location: "Maple Town Resident, Hyderabad",
      rating: 5,
      quote: "Super quick deployment and excellent security guarding. The guards are disciplined, police-verified, and handle visitor management with great vigilance. Will definitely continue our annual maintenance contract!"
    },
    {
      id: "3",
      initial: "S",
      avatarBg: "bg-[#e5c46b] text-[#071f16]",
      name: "Sandhya Y.",
      role: "Administration Head",
      location: "Manikonda Branch, Hyderabad",
      rating: 5,
      quote: "Absolutely outstanding customer support! They dispatched their deep cleaning team late evening and got all marble floors scrubbed and washrooms descaled looking pristine before our regional executive audit."
    },
    {
      id: "4",
      initial: "V",
      avatarBg: "bg-[#0e3b2e] text-[#f3d47a]",
      name: "Vikramaditya Rao",
      role: "Operations VP",
      location: "Sunrise Business Hub, Pune",
      rating: 5,
      quote: "Direct wholesale housekeeping chemical supply from DVS has cut our monthly operational overheads significantly. Hospital-grade disinfectants, microfiber mops, and dependable monthly restocking without fail."
    },
    {
      id: "5",
      initial: "A",
      avatarBg: "bg-[#fde68a] text-[#78350f]",
      name: "Ananya Deshmukh",
      role: "Society President",
      location: "Green Meadows Society, Chennai",
      rating: 5,
      quote: "Zero absenteeism is true with DVS Facilities. Whenever any regular housekeeping personnel or security guard takes leave, their standby reliever staff arrives seamlessly. Highly recommended!"
    },
    {
      id: "6",
      initial: "P",
      avatarBg: "bg-[#1a382d] text-white",
      name: "Praveen Nambiar",
      role: "Commercial Manager",
      location: "Cyber Gateway, Bangalore",
      rating: 5,
      quote: "Single-disc rotary machine scrubbing and glass descaling restored our commercial building lobby to brand new condition. The emergency breakdown support team is top-tier and fast."
    }
  ];

  const scrollServices = (direction: "left" | "right") => {
    if (servicesScrollRef.current) {
      const scrollAmount = 305;
      servicesScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsScrollRef.current) {
      const scrollAmount = 380;
      testimonialsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const handleOpenModal = (serviceName?: string) => {
    router.push(`/contact${serviceName ? `?service=${encodeURIComponent(serviceName)}` : ""}`);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ownerWhatsAppNumber = "918919439071";
    const textMessage = 
`*NEW BOOKING / SERVICE ENQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Customer Name:* ${scheduleName}
📞 *Phone Number:* ${schedulePhone}
🛠️ *Selected Service:* ${scheduleService}
📍 *Location / City:* ${scheduleCity}
📝 *Requirement Details:* ${scheduleNotes.trim() ? scheduleNotes.trim() : "Standard inspection and quotation requested."}
━━━━━━━━━━━━━━━━━━━━━━━━
🌐 *Source:* DVS Facilities Homepage`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedText}`;
    setLastSubmittedUrl(whatsappUrl);
    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);
  };

  const galleryItems = [
    {
      id: "box-1",
      title: "Trained Security Personnel & Guard Vigilance",
      subtitle: "Disciplined guarding, digital visitor logbook, and police-verified staff with ex-military supervision.",
      category: "Security Services",
      badge: "POLICE VERIFIED",
      image: "/images/security-services.jpg",
      tags: ["Access Control", "Patrol Checks"]
    },
    {
      id: "box-2",
      title: "Single-Disc Rotary Floor Scrubbing",
      subtitle: "Marble descaling, buffing, and high-gloss crystallization for corporate lobbies and campuses.",
      category: "Deep Cleaning",
      badge: "ROTARY MACHINE",
      image: "/images/floor-cleaning.jpg",
      tags: ["Marble Buffing", "Diamond Pads"]
    },
    {
      id: "box-3",
      title: "24/7 Substation & Commercial Facility Management",
      subtitle: "Daily preventive maintenance, power distribution logs, and zero-breakdown SLA assurance across premises.",
      category: "Integrated Facilities",
      badge: "LIVE OPERATIONAL SITE",
      image: "/images/indian-facility-maintenance.jpg",
      tags: ["11KV HT Substation", "Preventive Maintenance", "Zero Downtime SLA"]
    },
    {
      id: "box-4",
      title: "Commercial Kitchen & Glass Sanitization",
      subtitle: "Hard-water descaling, high-reach glass facade wipe, and executive kitchen degreasing.",
      category: "Deep Cleaning",
      badge: "SANITIZED",
      image: "/images/deep-cleaning.jpg",
      tags: ["Glass Facades", "Degreasing"]
    },
    {
      id: "box-5",
      title: "Direct Wholesale Housekeeping Supplies",
      subtitle: "Hospital-grade bio-enzymatic disinfectants, microfiber, and monthly dependable restocking.",
      category: "Stores & Materials",
      badge: "BIO-ENZYMATIC",
      image: "/images/housekeeping-materials.jpg",
      tags: ["Wholesale Restock", "MSDS Certified"]
    },
    {
      id: "box-6",
      title: "Dedicated On-Site Facility Supervisor",
      subtitle: "Daily shift sign-offs, biometric attendance, and guaranteed standby reliever backup for zero absenteeism.",
      category: "Supervision & SLA",
      badge: "24/7 SLA SUPERVISOR",
      image: "/images/indian-service-supervisor.jpg",
      tags: ["Shift Checklists", "Reliever Staff", "Audit Reports"]
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1a2e26] selection:bg-[#c59b27] selection:text-[#071f16]">

      {/* Top Floating Transparent Navbar */}
      <Navbar onOpenQuote={() => handleOpenModal("General Enquiry")} />

      {/* 100% FULL-SCREEN HERO SECTION - Split Layout */}
      <section className="relative w-full min-h-screen flex items-center bg-[#071f16] overflow-hidden">

        {/* Hero Background Image — 100% Full Screen */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg-indoor.jpg"
            alt="DVS Facilities Professional Team"
            fill
            priority
            unoptimized
            className="object-cover object-top"
          />
          {/* Soft neutral black fade on left only — ZERO green tint, 100% natural photo colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 via-30% to-transparent pointer-events-none" />
          {/* Gold shimmer top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c59b27]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content — Perfectly Positioned on Left */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center min-h-screen pt-28 pb-16">

          {/* Clean content block — Constrained width with drop shadow for crisp readability */}
          <div className="max-w-md text-white space-y-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">

            {/* Company Tag */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-[2px] bg-[#e5c46b] shrink-0" />
              <span className="inline-flex items-center gap-1.5 text-[#ffd966] text-xs font-black uppercase tracking-[0.2em] bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-[#e5c46b]/40 shadow-[0_0_12px_rgba(0,0,0,0.6)] drop-shadow-none">
                DVS Facilities Management
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight leading-[1.15] text-white">
              India&apos;s Trusted<br />
              <span className="text-[#e5c46b]">Facility &amp; Cleaning</span><br />
              <span className="text-white/90">Experts.</span>
            </h1>

            {/* Short Subtext */}
            <p className="text-sm sm:text-base text-white font-semibold leading-relaxed max-w-md drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
              Complete facility solutions — Housekeeping, Electrical, Security Guards, Deep Cleaning &amp; more across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => handleOpenModal("Schedule an Inspection")}
                className="inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs sm:text-sm shadow-2xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
              >
                <span>Book Free Inspection</span>
                <div className="w-7 h-7 rounded-full bg-[#071f16]/20 flex items-center justify-center group-hover:bg-[#071f16] group-hover:text-[#e5c46b] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              <Link
                href="/#services"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <span>Our Services</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Compact Stats Row */}
            <div className="flex items-center gap-5 pt-3 border-t border-white/15">
              <div>
                <span className="text-xl font-black text-[#e5c46b]">500+</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5">Staff</span>
              </div>
              <div className="w-px h-6 bg-white/15" />
              <div>
                <span className="text-xl font-black text-[#e5c46b]">150+</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5">Clients</span>
              </div>
              <div className="w-px h-6 bg-white/15" />
              <div>
                <span className="text-xl font-black text-[#e5c46b]">24/7</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5">Support</span>
              </div>
              <div className="w-px h-6 bg-white/15" />
              <div>
                <span className="text-xl font-black text-[#e5c46b]">5★</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider ml-1.5">Rated</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Section 2: Services We Offer — Directly After Hero */}
      <section id="services" className="py-20 bg-[#faf8f3] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row: Title */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0e3b2e] tracking-tight">
              Services we <span className="text-[#c59b27]">offer</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-2xl">
              Complete facility upkeep, certified technical personnel, and dedicated commercial sanitization across India.
            </p>
          </div>

          {/* Relative Carousel Track with Left and Right Navigation Arrows */}
          <div className="relative">
            {/* Left Navigation Arrow */}
            <button
              type="button"
              onClick={() => scrollServices("left")}
              aria-label="Previous service"
              className="absolute -left-1 sm:-left-5 lg:-left-6 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-[#FAF2DB] text-[#071f16] border border-[#c59b27]/40 hover:border-[#c59b27] shadow-lg sm:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-800" />
            </button>

            {/* Cards Carousel Container */}
            <div
              ref={servicesScrollRef}
              className="flex gap-5 overflow-x-auto scrollbar-none custom-h-scrollbar scroll-smooth pb-4 snap-x snap-mandatory pt-1 px-1 sm:px-2"
            >

            {/* Card 1: Facilities Management (Forest Green) */}
            <div className="snap-start shrink-0 w-[250px] sm:w-[275px] lg:w-[295px] rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 group bg-[#071f16] text-white border border-[#c59b27]/30">
              {/* Photo with signature angled geometric cut */}
              <div
                className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 74%, 0 100%)" }}
              >
                <Image
                  src="/images/facility-management.jpg"
                  alt="Facilities Management"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <span className="text-[10px] font-black text-[#e5c46b] uppercase tracking-wider">
                    Service 01
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 group-hover:text-[#e5c46b] transition-colors leading-tight">
                    Facilities Management
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Housekeeping, certified electrical maintenance, plumbing solutions, and landscape care managed by verified personnel.
                  </p>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <Link
                    href="/services/facility-management"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#e5c46b] hover:text-white transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Security Services (Warm Gold) */}
            <div className="snap-start shrink-0 w-[250px] sm:w-[275px] lg:w-[295px] rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 group bg-[#f0ca65] text-[#071f16] border border-[#c59b27]/40">
              {/* Photo with reverse angled geometric cut */}
              <div
                className="relative h-44 sm:h-48 w-full overflow-hidden bg-amber-900"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 74%)" }}
              >
                <Image
                  src="/images/security-services.jpg"
                  alt="Security Services"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <span className="text-[10px] font-black text-[#071f16]/75 uppercase tracking-wider">
                    Service 02
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#071f16] mt-0.5 group-hover:text-black transition-colors leading-tight">
                    Security Guard Supply
                  </h3>
                  <p className="text-xs text-[#071f16]/85 mt-2 leading-relaxed font-medium">
                    Disciplined, police-verified security guards, vigilant supervisors, and 24/7 gate access management.
                  </p>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <Link
                    href="/services/security-services"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#071f16] hover:text-black transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: Deep Cleaning Services (Forest Green) */}
            <div className="snap-start shrink-0 w-[250px] sm:w-[275px] lg:w-[295px] rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 group bg-[#071f16] text-white border border-[#c59b27]/30">
              {/* Photo with signature angled geometric cut */}
              <div
                className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 74%, 0 100%)" }}
              >
                <Image
                  src="/images/deep-cleaning.jpg"
                  alt="Deep Cleaning Services"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <span className="text-[10px] font-black text-[#e5c46b] uppercase tracking-wider">
                    Service 03
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 group-hover:text-[#e5c46b] transition-colors leading-tight">
                    Deep Cleaning Services
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    Intensive machine scrubbing and chemical descaling for commercial kitchens, washrooms, marble floors, and glass.
                  </p>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <Link
                    href="/services/deep-cleaning"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#e5c46b] hover:text-white transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 4: Housekeeping Material Supply (Warm Gold) */}
            <div className="snap-start shrink-0 w-[250px] sm:w-[275px] lg:w-[295px] rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 group bg-[#f0ca65] text-[#071f16] border border-[#c59b27]/40">
              {/* Photo with reverse angled geometric cut */}
              <div
                className="relative h-44 sm:h-48 w-full overflow-hidden bg-amber-900"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 74%)" }}
              >
                <Image
                  src="/images/housekeeping-materials.jpg"
                  alt="Housekeeping Material Supply"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                <div>
                  <span className="text-[10px] font-black text-[#071f16]/75 uppercase tracking-wider">
                    Product Supply
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#071f16] mt-0.5 group-hover:text-black transition-colors leading-tight">
                    Housekeeping Materials
                  </h3>
                  <p className="text-xs text-[#071f16]/85 mt-2 leading-relaxed font-medium">
                    Direct wholesale supply of certified hospital-grade cleaning chemicals, microfiber mops, and hygiene refills.
                  </p>
                </div>
                <div className="pt-1.5 flex items-center justify-between">
                  <Link
                    href="/products/housekeeping-material"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#071f16] hover:text-black transition-colors"
                  >
                    <span>View details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scrollServices("right")}
            aria-label="Next service"
            className="absolute -right-1 sm:-right-5 lg:-right-6 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#0e3b2e] hover:bg-[#071f16] text-[#e5c46b] border border-[#c59b27]/50 shadow-lg sm:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
          </button>
        </div>

        </div>
      </section>

      {/* Section 3: About DVS Facilities & Why Choose Us */}
      <section id="about" className="py-20 bg-[#FAF2DB] relative border-y border-[#c59b27]/20 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Content: Clean, Balanced & Concise */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/20 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Why Choose DVS Facilities</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
                Why Should <span className="text-[#c59b27]">You Choose</span> <br className="hidden sm:inline" />
                Our Services?
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Disciplined Indian workforce, proven maintenance standards, and wholesale supplies for spotless, reliable premises.
              </p>

              {/* 4 Feature Points - Concise & Well-Proportioned */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#c59b27]/20 shadow-xs hover:border-[#c59b27] transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e]">100% Verified Indian Workforce</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Police-verified, background-checked, and trained in site etiquette.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#c59b27]/20 shadow-xs hover:border-[#c59b27] transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-sm">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e]">End-to-End Operational Care</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Full-service coverage for housekeeping, electrical maintenance, and plumbing.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#c59b27]/20 shadow-xs hover:border-[#c59b27] transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-sm">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e]">Trained Security Personnel</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Disciplined guards ensuring perimeter safety, visitor logging, and 24/7 security.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#c59b27]/20 shadow-xs hover:border-[#c59b27] transition-all">
                  <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-sm">
                    <Package className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e]">Direct Material Supply</h3>
                    <p className="text-[11px] sm:text-xs text-slate-500">
                      Hospital-grade cleaning chemicals and hygiene refills at wholesale pricing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Images Collage: 4-Pebble Stadium Cluster matching user reference design */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4">
              
              <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xl mx-auto">
                
                {/* 1. Left Card: Tall Stadium / Pebble Shape */}
                <div className="flex-1 h-[270px] sm:h-[340px] md:h-[370px] relative rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                  <Image
                    src="/images/about-electrician.jpg"
                    alt="Facilities Maintenance & Electricians"
                    fill
                    className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                    <span className="text-[10px] sm:text-xs font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2.5 py-1 rounded-full shadow">
                      Facilities
                    </span>
                  </div>
                </div>

                {/* 2. Middle Column: 2 Stacked Rounded Pebble Cards */}
                <div className="flex-1 flex flex-col gap-2.5 sm:gap-3.5">
                  {/* Middle Top Card */}
                  <div className="h-[140px] sm:h-[180px] md:h-[195px] relative rounded-[22px] sm:rounded-[30px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                    <Image
                      src="/images/security-services.jpg"
                      alt="Trained Security Guards"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 sm:p-3">
                      <span className="text-[9px] sm:text-[10px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2 py-0.5 rounded-full shadow">
                        Security
                      </span>
                    </div>
                  </div>

                  {/* Middle Bottom Card */}
                  <div className="h-[140px] sm:h-[180px] md:h-[195px] relative rounded-[22px] sm:rounded-[30px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                    <Image
                      src="/images/floor-cleaning.jpg"
                      alt="Deep Cleaning Experts"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 sm:p-3">
                      <span className="text-[9px] sm:text-[10px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2 py-0.5 rounded-full shadow">
                        Deep Clean
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Right Card: Medium Landscape Stadium Card (Vertically Centered) */}
                <div className="flex-1 h-[230px] sm:h-[290px] md:h-[315px] relative rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                  <Image
                    src="/images/housekeeping-materials.jpg"
                    alt="Housekeeping Material Supplies"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                    <span className="text-[10px] sm:text-xs font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2.5 py-1 rounded-full shadow">
                      Materials
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section: Website Original Content in Modern Column Layout */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-[#c59b27]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Section Header - 100% Original Website Content */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/20 border border-[#c59b27]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Simple Steps</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e3b2e] tracking-tight leading-tight">
              How It <span className="text-[#c59b27]">Works</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              From initial audit to daily on-site upkeep, our systematic workflow ensures zero downtime, transparent pricing, and verified Indian staff.
            </p>
          </div>

          {/* Steps Container matching reference design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 max-w-7xl mx-auto">
            {howItWorksSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;

              return (
                <div key={idx} className="flex items-start gap-3.5 lg:gap-4 group">
                  {/* Left Column: Icon Circle + Vertical Descending Line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-110 ${stepItem.circleStyle}`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    {/* Vertical Connector Line */}
                    <div className={`flex-1 min-h-[140px] sm:min-h-[160px] mt-2.5 ${stepItem.lineStyle}`} />
                  </div>

                  {/* Right Column: Step #, Title, Description & Action Link */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#c59b27]">
                        Step {stepItem.step}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">•</span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {stepItem.turnaround}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#071f16] group-hover:text-[#c59b27] transition-colors leading-snug">
                      {stepItem.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {stepItem.shortDesc}
                    </p>

                    <div className="mt-4 sm:mt-5">
                      {stepItem.actionType === "modal" ? (
                        <button
                          onClick={() => handleOpenModal("Schedule an Inspection")}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#071f16] hover:text-[#c59b27] transition-colors group/btn cursor-pointer"
                        >
                          <span>{stepItem.actionText}</span>
                          <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <Link
                          href={stepItem.actionHref || "/#services"}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#071f16] hover:text-[#c59b27] transition-colors group/btn"
                        >
                          <span>{stepItem.actionText}</span>
                          <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 6: Testimonials (Exact Screenshot Layout in DVS Theme) */}
      <section id="testimonials" className="py-24 bg-[#FAF2DB] relative overflow-hidden border-y border-[#c59b27]/20">
        
        {/* Subtle Decorative Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Top Pill Badge */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#f6e9bc] text-[#8c6b12] border border-[#d4af37]/35 shadow-xs mb-3">
              CUSTOMER REVIEWS
            </span>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0e3b2e] tracking-tight leading-tight">
              What Our Customers <span className="text-[#c59b27]">Say</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-xl mx-auto leading-relaxed">
              Read feedback from hundreds of satisfied facility directors, corporate leaders, and residential communities across India.
            </p>
          </div>

          {/* 3-Card Carousel with Side Arrow Buttons */}
          <div className="relative flex items-center justify-center">

            {/* Left Circular Arrow Button */}
            <button
              onClick={() => scrollTestimonials("left")}
              aria-label="Previous review"
              className="hidden sm:flex -ml-2 lg:-ml-6 w-11 h-11 rounded-full bg-white hover:bg-[#faf8f3] text-[#071f16] border border-gray-200/90 hover:border-[#c59b27] shadow-md hover:shadow-lg items-center justify-center transition-all active:scale-95 cursor-pointer z-20 shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            {/* Cards Horizontal Container */}
            <div
              ref={testimonialsScrollRef}
              className="flex-1 flex gap-6 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 snap-x snap-mandatory"
            >
              {customerReviews.map((item) => (
                <div
                  key={item.id}
                  className="snap-start shrink-0 w-[290px] sm:w-[330px] lg:w-[365px] bg-white rounded-3xl p-7 border border-[#c59b27]/25 shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-[#c59b27]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: 5 Gold Stars & Verified Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                        ))}
                      </div>

                      <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-[10px] font-black tracking-wider uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#137333]" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    {/* Review Quote Text in Italic */}
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed my-5 font-normal">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Bottom User Info Row */}
                  <div className="pt-3.5 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-[#071f16] leading-snug">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Circular Arrow Button */}
            <button
              onClick={() => scrollTestimonials("right")}
              aria-label="Next review"
              className="hidden sm:flex -mr-2 lg:-mr-6 w-11 h-11 rounded-full bg-white hover:bg-[#faf8f3] text-[#071f16] border border-gray-200/90 hover:border-[#c59b27] shadow-md hover:shadow-lg items-center justify-center transition-all active:scale-95 cursor-pointer z-20 shrink-0"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

          </div>

          {/* Mobile Bottom Navigation Controls */}
          <div className="flex sm:hidden items-center justify-center gap-3 mt-6">
            <button
              onClick={() => scrollTestimonials("left")}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full bg-white text-[#071f16] border border-gray-200 shadow-sm flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
            <button
              onClick={() => scrollTestimonials("right")}
              aria-label="Next review"
              className="w-10 h-10 rounded-full bg-white text-[#071f16] border border-gray-200 shadow-sm flex items-center justify-center active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-slate-700" />
            </button>
          </div>

        </div>
      </section>

      {/* Gallery Section - 6-Block Bento Layout Matching Design */}
      <section id="gallery" className="py-20 bg-[#faf8f3] relative overflow-hidden border-t border-[#c59b27]/20 scroll-mt-20">
        
        {/* Subtle Ambient Golden Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#c59b27]/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/25 border border-[#c59b27]/40 px-4 py-1.5 rounded-full mb-3 shadow-xs">
              <Images className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Real Work Showcase</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0e3b2e] tracking-tight leading-tight">
              Our Operational <span className="text-[#c59b27]">Work Gallery</span>
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Authentic glimpses of our trained Indian technicians, security guards, heavy rotary deep cleaning crews, and wholesale store restocking.
            </p>
          </div>

          {/* Exact 6-Box Bento Grid without text on images */}
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Row 1: Top 2 Rounded Boxes */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5">
              {/* Box 1 (Top-Left) */}
              <div
                onClick={() => setActiveLightboxImg(galleryItems[0])}
                className="group relative h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden border border-[#c59b27]/30 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                <Image
                  src={galleryItems[0].image}
                  alt={galleryItems[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Box 2 (Top-Right) */}
              <div
                onClick={() => setActiveLightboxImg(galleryItems[1])}
                className="group relative h-[180px] sm:h-[240px] md:h-[280px] rounded-3xl overflow-hidden border border-[#c59b27]/30 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                <Image
                  src={galleryItems[1].image}
                  alt={galleryItems[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Row 2: Middle Full-Width Banner (Box 3) */}
            <div
              onClick={() => setActiveLightboxImg(galleryItems[2])}
              className="group relative w-full h-[240px] sm:h-[300px] md:h-[360px] rounded-3xl overflow-hidden border border-[#c59b27]/35 bg-slate-900 shadow-lg hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              <Image
                src={galleryItems[2].image}
                alt={galleryItems[2].title}
                fill
                className="object-cover object-[40%_18%] group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Row 3: Bottom Section (2 stacked on left, 1 tall on right) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 items-stretch">
              
              {/* Left Column: 2 Stacked Boxes */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Box 4 (Bottom-Left Upper) */}
                <div
                  onClick={() => setActiveLightboxImg(galleryItems[3])}
                  className="group relative h-[160px] sm:h-[200px] md:h-[230px] rounded-3xl overflow-hidden border border-[#c59b27]/30 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    src={galleryItems[3].image}
                    alt={galleryItems[3].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Box 5 (Bottom-Left Lower) */}
                <div
                  onClick={() => setActiveLightboxImg(galleryItems[4])}
                  className="group relative h-[160px] sm:h-[200px] md:h-[230px] rounded-3xl overflow-hidden border border-[#c59b27]/30 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <Image
                    src={galleryItems[4].image}
                    alt={galleryItems[4].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Right Column: 1 Tall Box (Box 6) */}
              <div
                onClick={() => setActiveLightboxImg(galleryItems[5])}
                className="group relative h-full min-h-[336px] sm:min-h-[420px] md:min-h-[480px] rounded-3xl overflow-hidden border border-[#c59b27]/35 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              >
                <Image
                  src={galleryItems[5].image}
                  alt={galleryItems[5].title}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

            </div>

          </div>

          {/* View More Gallery Button */}
          <div className="mt-10 sm:mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>View More Gallery</span>
              <ArrowRight className="w-4 h-4 text-[#071f16] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <FAQSection onOpenQuote={handleOpenModal} />

      {/* Section 8: Schedule Your Appointment (Reduced Size & Gold Theme) */}
      <section id="contact" className="py-14 sm:py-16 bg-[#FAF2DB] text-[#071f16] relative border-t border-[#c59b27]/20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left Form Card: Gold Gradient Theme */}
            <div className="lg:col-span-7 bg-gradient-to-br from-[#edd58c] via-[#e5c46b] to-[#c59b27] border-2 border-[#fff0b8] text-[#0e3b2e] p-6 sm:p-7 rounded-3xl shadow-2xl flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#e5c46b] bg-[#0e3b2e] border border-[#0e3b2e]/30 px-3 py-1 rounded-full mb-2.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#e5c46b]" />
                  <span>Fast Booking</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-[#0e3b2e]">
                  Schedule <span className="text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">Your Appointment</span> Today!
                </h2>

                <p className="text-xs sm:text-sm text-[#0e3b2e]/90 font-medium mt-1 mb-4">
                  Fill out the quick form below for an immediate site visit and transparent proposal.
                </p>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[#0e3b2e] border-2 border-[#c59b27] text-white text-center space-y-4 shadow-xl animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-full bg-[#c59b27] text-[#071f16] flex items-center justify-center mx-auto shadow-lg">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white">Booking Information Sent!</h4>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-sm mx-auto">
                        Thank you, <strong className="text-[#e5c46b]">{scheduleName}</strong>. Your enquiry for <strong className="text-[#e5c46b]">{scheduleService}</strong> has been forwarded to our WhatsApp.
                      </p>
                    </div>

                    <div className="p-3 bg-[#071f16] rounded-xl border border-[#c59b27]/40 text-left text-xs text-slate-200 space-y-1 max-w-md mx-auto">
                      <div><strong className="text-[#e5c46b]">Phone:</strong> {schedulePhone}</div>
                      <div><strong className="text-[#e5c46b]">Location:</strong> {scheduleCity}</div>
                      {scheduleNotes && <div><strong className="text-[#e5c46b]">Details:</strong> {scheduleNotes}</div>}
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
                          setScheduleName("");
                          setSchedulePhone("");
                          setScheduleNotes("");
                        }}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors"
                      >
                        Submit Another Booking
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleScheduleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={scheduleName}
                          onChange={(e) => setScheduleName(e.target.value)}
                          placeholder="e.g. Suresh Patel"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] placeholder-slate-400 border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={schedulePhone}
                          onChange={(e) => setSchedulePhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white text-sm text-[#0e3b2e] placeholder-slate-400 border border-[#0e3b2e]/25 focus:outline-none focus:ring-2 focus:ring-[#0e3b2e]/30 shadow-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Select Service *</label>
                        <select
                          value={scheduleService}
                          onChange={(e) => setScheduleService(e.target.value)}
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
                          <option value="Product: Housekeeping Material Supply">
                            Product: Housekeeping Material Supply
                          </option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-black text-[#0e3b2e] uppercase tracking-wider mb-1">Location / City *</label>
                        <select
                          value={scheduleCity}
                          onChange={(e) => setScheduleCity(e.target.value)}
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
                        value={scheduleNotes}
                        onChange={(e) => setScheduleNotes(e.target.value)}
                        placeholder="Property size, number of staff needed, or deep cleaning requirements..."
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

            {/* Right Card: Google Maps Location Embed */}
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

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Gallery Image Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#071f16] border border-[#c59b27]/50 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#c59b27] text-white hover:text-[#071f16] flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/20"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-res Image Preview */}
            <div className="relative w-full h-[280px] sm:h-[420px] rounded-2xl overflow-hidden bg-black border border-white/10">
              <Image
                src={activeLightboxImg.image}
                alt={activeLightboxImg.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#c59b27]/60 text-[#e5c46b] text-xs font-black uppercase tracking-wider">
                {activeLightboxImg.badge}
              </div>
            </div>

            {/* Modal Body */}
            <div className="pt-5 pb-1">
              <div className="flex flex-wrap gap-2 mb-2">
                {activeLightboxImg.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-semibold text-white/90 bg-white/10 px-3 py-0.5 rounded-full border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-xs font-black uppercase tracking-widest text-[#e5c46b] block">
                {activeLightboxImg.category}
              </span>

              <h3 className="text-lg sm:text-xl font-black text-white mt-1">
                {activeLightboxImg.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                {activeLightboxImg.subtitle}
              </p>

              <div className="pt-4 mt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#e5c46b] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                  <span>Police-Verified Crew & Dedicated Supervisor SLA</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919949641444"
                    className="px-4 py-2 rounded-full border border-[#c59b27]/60 text-white hover:bg-white/10 text-xs font-bold transition-all"
                  >
                    Call 24/7 Desk
                  </a>
                  <button
                    onClick={() => {
                      const serviceTitle = activeLightboxImg.title;
                      setActiveLightboxImg(null);
                      handleOpenModal(serviceTitle);
                    }}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-[#edd58c] via-[#e5c46b] to-[#c59b27] text-[#071f16] text-xs font-black shadow-md hover:brightness-105 cursor-pointer"
                  >
                    Request Audit Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
