"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Sparkles, ArrowRight, ShieldCheck, Wrench, Users, Package, PhoneCall, ClipboardCheck } from "lucide-react";


const whyPoints = [
  { icon: ShieldCheck, title: "100% Verified Indian Workforce", desc: "Police-verified, background-checked, and trained in site etiquette and professional conduct." },
  { icon: Wrench, title: "End-to-End Operational Care", desc: "Full-service coverage for housekeeping, electrical maintenance, plumbing, and garden upkeep." },
  { icon: Users, title: "Trained Security Personnel", desc: "Disciplined guards ensuring perimeter safety, visitor logging, and 24/7 supervisory coverage." },
  { icon: Package, title: "Direct Material Supply", desc: "Hospital-grade cleaning chemicals and hygiene refills at wholesale pricing, delivered on time." },
];

const howItWorksSteps = [
  {
    step: "01",
    title: "Requirement & Free Audit",
    shortDesc: "Submit your needs or call us. Our area supervisor visits your premises within 2-4 hours for a zero-cost physical audit.",
    actionText: "Book Free Audit",
    actionType: "link",
    actionHref: "/contact",
    turnaround: "2-4 Hours",
    icon: PhoneCall,
    circleStyle: "bg-[#FAF2DB] border border-[#c59b27]/40 text-[#c59b27]",
    lineStyle: "w-[1.5px] bg-slate-200/90",
  },
  {
    step: "02",
    title: "Customized Proposal & SLA",
    shortDesc: "Receive an itemized, transparent quote covering verified manpower, equipment, and supplies with zero hidden fees.",
    actionText: "Explore Services",
    actionType: "link",
    actionHref: "/services",
    turnaround: "Same Day",
    icon: ClipboardCheck,
    circleStyle: "border-2 border-dashed border-[#c59b27] bg-[#faf8f3] text-[#c59b27]",
    lineStyle: "w-0 border-l-2 border-dashed border-[#c59b27]/45",
  },
  {
    step: "03",
    title: "Rapid Staff Deployment",
    shortDesc: "100% police-verified, uniformed staff deployed within 24-48 hours, fully equipped with machines and supplies.",
    actionText: "Deployment Standards",
    actionType: "link",
    actionHref: "/services",
    turnaround: "24-48 Hours",
    icon: Users,
    circleStyle: "border-2 border-[#0e3b2e] bg-[#071f16] text-[#e5c46b] shadow-sm",
    lineStyle: "w-[1.5px] bg-[#0e3b2e]/30",
  },
  {
    step: "04",
    title: "Supervision & 24/7 SLA",
    shortDesc: "A dedicated on-site supervisor manages daily checklists, attendance, preventive care, and standby reliever backup.",
    actionText: "Contact Us",
    actionType: "link",
    actionHref: "/contact",
    turnaround: "24/7 Support",
    icon: ShieldCheck,
    circleStyle: "border-2 border-[#c59b27] bg-[#FAF2DB] text-[#92400e] shadow-xs",
    lineStyle: "w-[1.5px] bg-[#c59b27]/30",
  },
];




export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar forceSolid />

      {/* ── HERO ── */}
      <section className="pt-28 pb-0 bg-[#FAF2DB] relative overflow-hidden">
        {/* Subtle decorative dots */}
        <div className="absolute top-16 left-[12%] w-3 h-3 rounded-full bg-[#c59b27]/40" />
        <div className="absolute top-24 right-[18%] w-2 h-2 rounded-full bg-[#c59b27]/30" />
        <div className="absolute top-32 right-[30%] w-4 h-4 rounded-full border-2 border-[#c59b27]/30" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/30 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3 text-[#c59b27]" />
            <span>Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0e3b2e] tracking-tight leading-tight mb-4">
            About <span className="text-[#c59b27]">DVS Facilities</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto mb-10">
            Since 2014, we have been delivering disciplined Indian workforce, proven maintenance standards, and wholesale supply solutions for spotless, safe, and reliable premises across India.
          </p>
        </div>

        {/* 3-Photo Cards Row */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-3 gap-4 sm:gap-5">
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-4 border-white group">
              <Image src="/images/about-electrician.jpg" alt="DVS Facilities Management Team" fill className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-4 border-white group mt-6">
              <Image src="/images/scope-security-guard-supply.jpg" alt="DVS Security Personnel" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border-4 border-white group">
              <Image src="/images/deep-cleaning.jpg" alt="DVS Deep Cleaning Team" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE / STORY SECTION ── */}
      <section className="py-16 md:py-20 bg-[#faf8f3] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left: Why Choose text */}
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#0e3b2e] bg-[#e5c46b]/25 border border-[#c59b27]/40 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#c59b27]" />
                <span>Why Choose DVS Facilities</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0e3b2e] tracking-tight leading-tight">
                Why Should <span className="text-[#c59b27]">You Choose</span><br className="hidden sm:inline" /> Our Services?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
                Disciplined Indian workforce, proven maintenance standards, and wholesale supplies for spotless, reliable premises.
              </p>
              <div className="space-y-2.5 pt-1">
                {whyPoints.map((pt, i) => (
                  <div key={i} className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#c59b27]/20 shadow-xs hover:border-[#c59b27] transition-all">
                    <div className="w-8 h-8 rounded-xl bg-[#0e3b2e] text-[#e5c46b] flex items-center justify-center shrink-0 shadow-sm">
                      <pt.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#0e3b2e]">{pt.title}</h3>
                      <p className="text-[11px] sm:text-xs text-slate-500">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Right: Pebble collage — 1 tall + 2 stacked + 1 medium */}
            <div className="relative flex items-center justify-center py-4">
              <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-xl mx-auto">

                {/* Col 1: Tall pebble */}
                <div className="flex-1 h-[270px] sm:h-[340px] md:h-[370px] relative rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                  <Image src="/images/about-electrician.jpg" alt="Facilities Maintenance" fill className="object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[10px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2.5 py-1 rounded-full">Facilities</span>
                  </div>
                </div>

                {/* Col 2: 2 stacked */}
                <div className="flex-1 flex flex-col gap-2.5 sm:gap-3.5">
                  <div className="h-[140px] sm:h-[180px] md:h-[195px] relative rounded-[22px] sm:rounded-[30px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                    <Image src="/images/security-services.jpg" alt="Security Guards" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[9px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2 py-0.5 rounded-full">Security</span>
                    </div>
                  </div>
                  <div className="h-[140px] sm:h-[180px] md:h-[195px] relative rounded-[22px] sm:rounded-[30px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                    <Image src="/images/floor-cleaning.jpg" alt="Deep Cleaning" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[9px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2 py-0.5 rounded-full">Deep Clean</span>
                    </div>
                  </div>
                </div>

                {/* Col 3: Medium pebble */}
                <div className="flex-1 h-[230px] sm:h-[290px] md:h-[315px] relative rounded-[32px] sm:rounded-[42px] overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                  <Image src="/images/housekeeping-materials.jpg" alt="Housekeeping Materials" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071f16]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[10px] font-black text-[#071f16] bg-gradient-to-r from-[#d4af37] to-[#c59b27] px-2.5 py-1 rounded-full">Materials</span>
                  </div>
                </div>

              </div>
            </div>



          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-t border-[#c59b27]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
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

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 max-w-7xl mx-auto">
            {howItWorksSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;

              return (
                <div key={idx} className="flex items-start gap-3.5 lg:gap-4 group">
                  {/* Left Column: Icon Circle + Vertical Connector Line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:scale-110 ${stepItem.circleStyle}`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    {/* Vertical Connector Line */}
                    <div className={`flex-1 min-h-[120px] sm:min-h-[140px] mt-2.5 ${stepItem.lineStyle}`} />
                  </div>

                  {/* Right Column: Step #, Title, Description & Action */}
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
                      <Link
                        href={stepItem.actionHref || "/contact"}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#071f16] hover:text-[#c59b27] transition-colors group/btn"
                      >
                        <span>{stepItem.actionText}</span>
                        <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
