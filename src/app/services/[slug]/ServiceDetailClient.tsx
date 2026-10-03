"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  ServiceDetail,
  ServiceGalleryItem,
  ServiceTestimonial
} from "@/data/servicesData";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Star,
  ClipboardCheck,
  Users,
  Wrench,
  Zap,
  Maximize2,
  Building2,
  PhoneCall,
  Clock,
  Images,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";

export default function ServiceDetailClient({ service }: { service: ServiceDetail }) {
  const router = useRouter();
  const [activeLightbox, setActiveLightbox] = useState<ServiceGalleryItem | null>(null);
  const [heroMuted, setHeroMuted] = useState(true);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const testimonialsScrollRef = useRef<HTMLDivElement>(null);
  const subsectionsScrollRef = useRef<HTMLDivElement>(null);

  const scrollSubsections = (direction: "left" | "right") => {
    if (subsectionsScrollRef.current) {
      const scrollAmount = 320;
      subsectionsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (heroPlaying) {
        heroVideoRef.current.pause();
        setHeroPlaying(false);
      } else {
        heroVideoRef.current.play();
        setHeroPlaying(true);
      }
    }
  };

  const toggleHeroMute = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !heroMuted;
      setHeroMuted(!heroMuted);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightbox(null);
      }
    };
    if (activeLightbox) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightbox]);

  const gallery = service.gallery || [];

  const handleOpenBooking = (subServiceName?: string) => {
    const serviceName = subServiceName ? `${service.title} - ${subServiceName}` : service.title;
    router.push(`/contact?service=${encodeURIComponent(serviceName)}`);
  };

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsScrollRef.current) {
      const scrollAmount = 350;
      testimonialsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

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
      actionHref: "#subsections",
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
      actionType: "modal",
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
      actionType: "modal",
      turnaround: "24/7 Support",
      icon: ShieldCheck,
      circleStyle: "border-2 border-[#c59b27] bg-[#FAF2DB] text-[#92400e] shadow-xs",
      lineStyle: "w-[1.5px] bg-[#c59b27]/30"
    }
  ];

  const customerReviews: ServiceTestimonial[] =
    service.testimonials && service.testimonials.length > 0
      ? service.testimonials
      : [
        {
          id: "1",
          name: "Rajeshwar G.",
          role: "Facility Director, Apex Tech Parks",
          rating: 5,
          quote: "The facility maintenance and technical upkeep are exceptional. The on-site supervisor inspects daily checklists, and breakdown tickets are resolved within 60 minutes."
        },
        {
          id: "2",
          name: "Kiran K.",
          role: "Secretary, Maple Town Community",
          rating: 5,
          quote: "Super quick deployment and disciplined staff. Their verified personnel handle daily operations with high vigilance and politeness. We renewed our annual contract with confidence."
        },
        {
          id: "3",
          name: "Sandhya Y.",
          role: "Administration Head, Corporate Hub",
          rating: 5,
          quote: "Top-notch professionalism and reliable service delivery. Even during peak hours and audit days, their team delivered spotless standards without any delay."
        },
        {
          id: "4",
          name: "Vikramaditya Rao",
          role: "Operations VP, Sunrise Business Hub",
          rating: 5,
          quote: "Direct consumable supply and certified technicians have lowered our overheads significantly. Prompt response and reliable standby staff whenever regular personnel take leave."
        }
      ];

  return (
    <div className="min-h-screen bg-white text-[#1a2e26] selection:bg-[#c59b27] selection:text-[#071f16]">
      <Navbar onOpenQuote={() => handleOpenBooking()} forceSolid={service.heroDarkText} />

      {/* 100% IMMERSIVE FULL-SCREEN HERO SECTION - Matching Design Style */}
      <section className="relative w-full min-h-screen flex items-center bg-[#071f16] overflow-hidden">

        {/* Hero Background Video or Image — Specific to this service */}
        <div className="absolute inset-0 z-0">
          {service.heroVideo ? (
            <video
              ref={heroVideoRef}
              src={service.heroVideo}
              autoPlay
              loop
              muted={heroMuted}
              playsInline
              poster={service.heroImage}
              className={`w-full h-full object-cover ${service.heroImagePosition || "object-center"}`}
            />
          ) : (
            <Image
              src={service.heroImage}
              alt={service.title}
              fill
              priority
              unoptimized
              className={`object-cover ${service.heroImagePosition || "object-center"}`}
            />
          )}
          {/* Soft black shadow ONLY for static images; completely removed for videos so the video has zero black shadow */}
          {!service.heroVideo && (
            <>
              <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 via-45% to-transparent pointer-events-none" />
              <div className="sm:hidden absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/75 via-black/40 to-transparent pointer-events-none" />
            </>
          )}

          {/* Gold shimmer top border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c59b27]/60 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content — Positioned at bottom on mobile, vertically centered on desktop */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 lg:px-12 flex flex-col justify-end sm:justify-center min-h-screen pb-8 sm:pb-14 pt-24">
          <div className="max-w-lg space-y-2.5 sm:space-y-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">

            {/* Service Tag with Gold Accent Line */}
            <div className="flex items-center gap-2">
              <div className="w-5 sm:w-6 h-[2px] bg-[#c59b27]" />
              <span className="text-[#c59b27] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]">
                {service.heroTagline || `DVS ${service.title.toUpperCase()}`}
              </span>
            </div>

            {/* Main Heading - Clean and compact on mobile */}
            <h1 className="text-xl sm:text-2xl lg:text-[36px] font-black tracking-tight leading-tight text-white">
              {service.heroHeadline} <span className="text-[#e5c46b]">{service.heroHighlight}</span>
            </h1>

            {/* Short Subtext - Desktop & Tablet only to keep mobile clean */}
            <p className="hidden sm:block text-xs sm:text-sm leading-relaxed max-w-sm text-slate-200">
              {service.heroDescription}
            </p>

            {/* Key Benefits Badges - Desktop & Tablet only */}
            {service.keyBenefits && service.keyBenefits.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2 pt-0.5">
                {service.keyBenefits.slice(0, 2).map((benefit, idx) => (
                  <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm bg-black/40 border border-white/10 text-slate-200">
                    <CheckCircle2 className="w-3 h-3 text-[#e5c46b] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-0.5 sm:pt-1">
              <button
                onClick={() => handleOpenBooking()}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-bold text-xs sm:text-sm shadow-md shadow-amber-500/10 hover:scale-105 active:scale-95 transition-all group cursor-pointer"
              >
                <span>Book Service</span>
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#071f16]/20 flex items-center justify-center group-hover:bg-[#071f16] group-hover:text-[#e5c46b] transition-colors">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>

              <a
                href="#subsections"
                className="inline-flex items-center gap-1 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-md font-medium text-xs sm:text-sm transition-all bg-white/10 hover:bg-white/20 border border-white/15 text-white"
              >
                <span>View Details</span>
                <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
            </div>

            {/* Compact Stats Row - Desktop & Tablet only */}
            {service.heroStats && service.heroStats.length > 0 && (
              <div className="hidden sm:flex items-center gap-4 pt-2.5 border-t border-white/15">
                {service.heroStats.map((stat, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="w-px h-5 bg-white/15" />}
                    <div>
                      <span className="text-base sm:text-lg font-black text-[#e5c46b]">{stat.value}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider ml-1 text-slate-400">{stat.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* Floating Video Controls when Video is Present */}
        {service.heroVideo && (
          <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 z-20 flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#071f16]/90 backdrop-blur-md border border-[#c59b27]/60 shadow-2xl text-white">
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#e5c46b] pr-2.5 border-r border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live 4K 60FPS Video
            </span>

            <button
              type="button"
              onClick={toggleHeroPlay}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              title={heroPlaying ? "Pause Video" : "Play Video"}
              aria-label={heroPlaying ? "Pause Video" : "Play Video"}
            >
              {heroPlaying ? <Pause className="w-3.5 h-3.5 text-[#e5c46b]" /> : <Play className="w-3.5 h-3.5 fill-current text-[#e5c46b]" />}
            </button>

            <button
              type="button"
              onClick={toggleHeroMute}
              className="p-1.5 rounded-full hover:bg-white/15 text-white transition-colors cursor-pointer"
              title={heroMuted ? "Unmute Sound" : "Mute Sound"}
              aria-label={heroMuted ? "Unmute Sound" : "Mute Sound"}
            >
              {heroMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-300" /> : <Volume2 className="w-3.5 h-3.5 text-[#e5c46b]" />}
            </button>
          </div>
        )}

      </section>


      {/* Subsections Horizontal Scroll: SHOW ALL SUBSECTIONS OF THIS SERVICE */}
      <section id="subsections" className="py-16 md:py-20 bg-[#faf8f3] scroll-mt-20 border-t border-[#c59b27]/20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row: Title & Subtitle on Left, Controls & Badge on Right */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/20 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>Detailed Subsections</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
                {service.title} <span className="text-[#c59b27]">Subsections & Scopes</span>
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Select any specific scope below to book dedicated staff or request immediate on-site inspection.
              </p>
            </div>

            {/* Controls and count indicator */}
            <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FAF2DB] border border-[#c59b27]/30 text-[#0e3b2e] shadow-xs">
                {service.subsections.length} Scopes Available
              </span>
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollSubsections("left")}
                  aria-label="Previous scope"
                  className="w-10 h-10 rounded-full bg-white hover:bg-[#FAF2DB] text-[#071f16] border border-[#c59b27]/30 hover:border-[#c59b27] shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollSubsections("right")}
                  aria-label="Next scope"
                  className="w-10 h-10 rounded-full bg-[#0e3b2e] hover:bg-[#071f16] text-[#e5c46b] border border-[#c59b27]/40 shadow-sm flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Relative Carousel Track with Flanking Floating Arrows */}
          <div className="relative">
            {/* Left Floating Arrow */}
            <button
              type="button"
              onClick={() => scrollSubsections("left")}
              aria-label="Previous scope"
              className="absolute -left-1 sm:-left-5 lg:-left-6 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-white/95 hover:bg-[#FAF2DB] text-[#071f16] border border-[#c59b27]/40 hover:border-[#c59b27] shadow-lg sm:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-slate-800" />
            </button>

            {/* Subsections Horizontal Scroll Container */}
            <div
              ref={subsectionsScrollRef}
              className="flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none custom-h-scrollbar scroll-smooth py-3 px-1 sm:px-2 snap-x snap-mandatory"
            >
              {service.subsections.map((sub, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={sub.id}
                    className={`snap-start shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] rounded-[24px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5 group border ${isEven
                      ? "bg-[#071f16] text-white border-[#c59b27]/30"
                      : "bg-[#f0ca65] text-[#071f16] border-[#c59b27]/40"
                      }`}
                  >
                    {/* Photo with signature angled geometric cut */}
                    <div
                      className={`relative h-44 sm:h-48 w-full overflow-hidden ${isEven ? "bg-slate-900" : "bg-amber-900"
                        }`}
                      style={{
                        clipPath: isEven
                          ? "polygon(0 0, 100% 0, 100% 74%, 0 100%)"
                          : "polygon(0 0, 100% 0, 100% 100%, 0 74%)"
                      }}
                    >
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
                      <div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider ${isEven ? "text-[#e5c46b]" : "text-[#071f16]/75"
                            }`}
                        >
                          Scope 0{idx + 1}
                        </span>
                        <h3
                          className={`text-lg sm:text-xl font-black mt-0.5 leading-tight transition-colors line-clamp-1 ${isEven
                            ? "text-white group-hover:text-[#e5c46b]"
                            : "text-[#071f16] group-hover:text-black"
                            }`}
                        >
                          {sub.name}
                        </h3>
                        <p
                          className={`text-xs mt-2 leading-relaxed line-clamp-3 min-h-[48px] ${isEven ? "text-slate-300" : "text-[#071f16]/85 font-medium"
                            }`}
                        >
                          {sub.shortDesc || sub.fullDesc}
                        </p>
                      </div>

                      {/* Bottom Action Row matching home card */}
                      <div className="pt-1.5 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleOpenBooking(sub.name)}
                          className={`inline-flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${isEven
                            ? "text-[#e5c46b] hover:text-white"
                            : "text-[#071f16] hover:text-black"
                            }`}
                        >
                          <span>Book Service</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Floating Arrow */}
            <button
              type="button"
              onClick={() => scrollSubsections("right")}
              aria-label="Next scope"
              className="absolute -right-1 sm:-right-5 lg:-right-6 top-[28%] sm:top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#0e3b2e] hover:bg-[#071f16] text-[#e5c46b] border border-[#c59b27]/50 shadow-lg sm:shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* Why Choose Us Section - Specific to this service */}
      {service.whyChooseUs && (
        <section id="why-choose-us" className="py-16 md:py-20 bg-[#FAF2DB] relative border-t border-[#c59b27]/20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Clean Header & 4 Concise Points strictly related to this service */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/25 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>{service.whyChooseUs.tagline}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
                  {service.whyChooseUs.title} <span className="text-[#c59b27]">{service.whyChooseUs.highlight}</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                  {service.whyChooseUs.description}
                </p>

                {/* 4 Crisp Service-Specific Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.whyChooseUs.points.map((pt, pIdx) => {
                    const IconComponent =
                      pt.iconName === "Zap" ? Zap :
                        pt.iconName === "Wrench" ? Wrench :
                          pt.iconName === "Users" ? Users :
                            pt.iconName === "ClipboardCheck" ? ClipboardCheck :
                              pt.iconName === "ShieldCheck" ? ShieldCheck :
                                pt.iconName === "Building2" ? Building2 :
                                  pt.iconName === "Clock" ? Clock :
                                    pt.iconName === "Sparkles" ? Sparkles : CheckCircle2;

                    return (
                      <div
                        key={pIdx}
                        className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#c59b27]/25 shadow-xs hover:border-[#c59b27] hover:shadow-md transition-all flex items-start gap-3 group"
                      >
                        <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e] leading-snug">
                            {pt.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">
                            {pt.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Visual Showcase Badge & Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-[28px] overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
                  <Image
                    src={service.whyChooseUs.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/90 via-[#071f16]/20 to-transparent" />

                  {/* Top Badge (Hidden on mobile) */}
                  <div className="hidden sm:block absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071f16]/85 backdrop-blur-md border border-[#c59b27]/50 text-[#e5c46b] text-[10px] font-black uppercase tracking-wider shadow">
                      <ShieldCheck className="w-3 h-3 text-[#e5c46b]" />
                      <span>{service.whyChooseUs.imageBadge}</span>
                    </span>
                  </div>

                  {/* Bottom Quick Callout */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#c59b27]/30 shadow-lg flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-wider text-[#c59b27]">
                        DVS Assurance
                      </div>
                      <div className="text-xs sm:text-sm font-black text-[#071f16]">
                        Verified & SLA Guaranteed
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenBooking(`Why Choose DVS - ${service.title}`)}
                      className="px-3.5 py-1.5 rounded-full bg-[#0e3b2e] text-[#e5c46b] hover:bg-black hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* How It Works Section: Exact Reference Design Matching Screenshot */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white relative overflow-hidden border-t border-[#c59b27]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Section Header */}
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

          {/* Steps Container matching exact screenshot design */}
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
                        STEP {stepItem.step}
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
                          onClick={() => handleOpenBooking(stepItem.title)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#071f16] hover:text-[#c59b27] transition-colors group/btn cursor-pointer"
                        >
                          <span>{stepItem.actionText}</span>
                          <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <Link
                          href={stepItem.actionHref || "#subsections"}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 bg-[#FAF2DB] relative overflow-hidden border-y border-[#c59b27]/20">
        {/* Subtle Decorative Ambient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#f6e9bc] text-[#8c6b12] border border-[#d4af37]/35 shadow-xs mb-3">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
              What Our Clients <span className="text-[#c59b27]">Say</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
              {service.testimonialSubtitle || "Trusted by corporate parks, gated residential societies, and commercial institutions across India."}
            </p>
          </div>

          {/* Testimonial Cards Carousel */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => scrollTestimonials("left")}
              aria-label="Previous review"
              className="hidden sm:flex -ml-2 lg:-ml-5 w-10 h-10 rounded-full bg-white hover:bg-[#faf8f3] text-[#071f16] border border-gray-200/90 hover:border-[#c59b27] shadow-md items-center justify-center transition-all active:scale-95 cursor-pointer z-20 shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            <div
              ref={testimonialsScrollRef}
              className="flex-1 flex gap-5 overflow-x-auto scrollbar-none scroll-smooth py-3 px-2 snap-x snap-mandatory"
            >
              {customerReviews.map((item) => (
                <div
                  key={item.id}
                  className="snap-start shrink-0 w-[290px] sm:w-[320px] lg:w-[350px] bg-white rounded-2xl p-6 border border-[#c59b27]/25 shadow-sm hover:shadow-xl hover:border-[#c59b27]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-[10px] font-black uppercase">
                        <CheckCircle2 className="w-3 h-3 text-[#137333]" />
                        <span>VERIFIED</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed my-4">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-xs sm:text-sm font-bold text-[#071f16]">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollTestimonials("right")}
              aria-label="Next review"
              className="hidden sm:flex -mr-2 lg:-mr-5 w-10 h-10 rounded-full bg-white hover:bg-[#faf8f3] text-[#071f16] border border-gray-200/90 hover:border-[#c59b27] shadow-md items-center justify-center transition-all active:scale-95 cursor-pointer z-20 shrink-0"
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

      {/* ── SERVICE-SPECIFIC GALLERY SECTION: strictly after Testimonials ── */}
      {gallery.length > 0 && (
        <section id="service-gallery" className="py-20 sm:py-24 bg-[#faf8f3] relative overflow-hidden border-b border-[#c59b27]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/20 border border-[#c59b27]/30 px-3.5 py-1.5 rounded-full mb-3 shadow-xs">
                <Images className="w-3.5 h-3.5 text-[#c59b27]" />
                <span>On-Site Work Showcase</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0e3b2e] tracking-tight leading-tight">
                {service.title} <span className="text-[#c59b27]">Gallery</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                Authentic glimpses of our trained workforce, specialized equipment, and active operations for {service.title.toLowerCase()} across client sites.
              </p>
            </div>

            {/* Wall Collage Gallery — Matching Exact Reference Framing (8x10 & 5x7 layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-5xl mx-auto items-start">

              {/* ── LEFT COLUMN: 8x10 Landscape Top + (5x7 + 8x10) Portraits Bottom ── */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Top: 8x10 Landscape Frame */}
                {gallery[0] && (
                  <div
                    onClick={() => setActiveLightbox(gallery[0])}
                    className="group relative w-full h-[210px] sm:h-[250px] md:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  >
                    <Image
                      src={gallery[0].image}
                      alt={gallery[0].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[0].objectPosition || "object-center"}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Bottom Row: 5x7 Portrait (Left) + 8x10 Portrait (Right) aligned to 100% width */}
                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-start">
                  {/* 5x7 Portrait */}
                  {gallery[1] && (
                    <div
                      onClick={() => setActiveLightbox(gallery[1])}
                      className="col-span-5 group relative aspect-[5/7] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                    >
                      <Image
                        src={gallery[1].image}
                        alt={gallery[1].title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[1].objectPosition || "object-center"}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* 8x10 Portrait */}
                  {gallery[2] && (
                    <div
                      onClick={() => setActiveLightbox(gallery[2])}
                      className="col-span-7 group relative aspect-[8/10] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                    >
                      <Image
                        src={gallery[2].image}
                        alt={gallery[2].title}
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[2].objectPosition || "object-center"}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN: (8x10 + 5x7) Portraits Top + 8x10 Landscape Bottom ── */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Top Row: 8x10 Portrait (Left) + 5x7 Portrait (Right) aligned to 100% width */}
                <div className="grid grid-cols-12 gap-3 sm:gap-4 items-start">
                  {/* 8x10 Portrait */}
                  {gallery[3] && (
                    <div
                      onClick={() => setActiveLightbox(gallery[3])}
                      className="col-span-7 group relative aspect-[8/10] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                    >
                      <Image
                        src={gallery[3].image}
                        alt={gallery[3].title}
                        fill
                        sizes="(max-width: 768px) 50vw, 30vw"
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[3].objectPosition || "object-center"}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}

                  {/* 5x7 Portrait */}
                  {gallery[4] && (
                    <div
                      onClick={() => setActiveLightbox(gallery[4])}
                      className="col-span-5 group relative aspect-[5/7] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                    >
                      <Image
                        src={gallery[4].image}
                        alt={gallery[4].title}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[4].objectPosition || "object-center"}`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom: 8x10 Landscape Frame */}
                {gallery[5] && (
                  <div
                    onClick={() => setActiveLightbox(gallery[5])}
                    className="group relative w-full h-[210px] sm:h-[250px] md:h-[280px] rounded-xl sm:rounded-2xl overflow-hidden border-4 sm:border-[5px] border-[#071f16] bg-slate-900 shadow-xl hover:shadow-2xl hover:border-[#c59b27] transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                  >
                    <Image
                      src={gallery[5].image}
                      alt={gallery[5].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover group-hover:scale-105 transition-transform duration-500 ${gallery[5].objectPosition || "object-center"}`}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-md border border-[#c59b27]/40 text-[#e5c46b] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:scale-105">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0e3b2e] text-[#0e3b2e] hover:bg-[#0e3b2e] hover:text-[#e5c46b] font-bold text-sm transition-all"
              >
                <span>View Full Company Gallery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleOpenBooking(service.title)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#c59b27] to-[#9e7a17] text-[#071f16] font-black text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                <span>Book {service.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </section>
      )}

      {/* FAQ Section */}
      <FAQSection onOpenQuote={(serviceName) => handleOpenBooking(serviceName)} />


      {/* Footer */}
      <Footer />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Lightbox Modal — ONLY images, no text */}
      {activeLightbox && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
        >
          <button
            onClick={() => setActiveLightbox(null)}
            aria-label="Close image preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-black/60 text-white hover:text-[#e5c46b] border border-white/20 hover:border-[#c59b27] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[88vh] w-full h-[60vh] sm:h-[75vh] md:h-[82vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-[#c59b27]/30 bg-black"
          >
            <Image
              src={activeLightbox.image}
              alt={activeLightbox.title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
