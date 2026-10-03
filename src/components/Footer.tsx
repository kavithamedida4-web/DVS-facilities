"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#141414] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14">
          
          {/* Column 1: Brand & About (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF2DB] to-white border-2 border-[#c59b27] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0">
                <div className="text-center leading-none">
                  <span className="block text-sm font-black text-[#0e3b2e] tracking-tight">DVS</span>
                  <span className="block text-[7px] font-black tracking-widest text-[#c59b27] uppercase">FACILITIES</span>
                </div>
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white group-hover:text-[#e5c46b] transition-colors leading-tight">
                  DVS <span className="text-[#c59b27]">FACILITIES</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                  Integrated Services
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">DVS Facilities Services</strong> is Hyderabad and Telangana&apos;s trusted facility management partner. With headquarters in <strong className="text-slate-200">Shankarpalle</strong> and operations across <strong className="text-slate-200">Hyderabad</strong>, we deliver professional Facilities Operations, Security Guard Supply, Deep Cleaning, and Wholesale Consumables ◆ all with verified Indian workforce, 24/7 supervisor reporting, and 150+ happy premises.
            </p>
          </div>

          {/* Column 2: Quick Links (2.5 cols on lg) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-400">
              <li>
                <Link href="/" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Work Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Book Inspection</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span className="text-[#e5c46b]">Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (2.5 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-400">
              <li>
                <Link href="/services/facility-management" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Facilities Management</span>
                </Link>
              </li>
              <li>
                <Link href="/services/security-services" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Security Guard Supply</span>
                </Link>
              </li>
              <li>
                <Link href="/services/deep-cleaning" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Deep Cleaning Services</span>
                </Link>
              </li>
              <li>
                <Link href="/products/housekeeping-material" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Housekeeping Materials</span>
                </Link>
              </li>
              <li>
                <Link href="/services/facility-management" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Electrical Maintenance</span>
                </Link>
              </li>
              <li>
                <Link href="/services/facility-management" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Plumbing & Water Systems</span>
                </Link>
              </li>
              <li>
                <Link href="/services/facility-management" className="hover:text-[#e5c46b] transition-colors flex items-center gap-1.5 group">
                  <span className="text-[#c59b27] font-bold group-hover:translate-x-0.5 transition-transform">&gt;</span>
                  <span>Garden & Landscape Care</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (3 cols on lg) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-4 tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-300">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#c59b27] mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:+918919439071" className="block text-slate-300 hover:text-[#e5c46b] transition-colors font-medium">
                    +91 89194 39071
                  </a>
                  <a href="tel:+919876543210" className="block text-slate-300 hover:text-[#e5c46b] transition-colors font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#c59b27] mt-0.5 shrink-0" />
                <a href="mailto:info@dvsfacilities.com" className="text-slate-300 hover:text-[#e5c46b] transition-colors font-medium">
                  info@dvsfacilities.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#c59b27] mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-300">Tangutoor, Shankarpalle, Hyderabad, Telangana 501203</div>
                  <a
                    href="https://maps.app.goo.gl/jtGY1Q7QZ4DV6Gwf8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#c59b27] font-bold hover:underline block mt-1"
                  >
                    View locations on Google Maps
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#c59b27] mt-0.5 shrink-0" />
                <div>
                  <div className="text-slate-300">Mon ◆ Sat: 8:00 AM ◆ 7:00 PM</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">Sunday / Emergency: 24/7 SLA</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar — Exact Copyright & "Designed & Developed by Edone Solutions" */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} DVS Facilities Services. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <Link href="/admin" className="text-slate-400 hover:text-[#c59b27] transition-colors">
              Admin Login
            </Link>
          </div>
          <div>
            Designed &amp; Developed by{" "}
            <a
              href="https://edonesolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c59b27] hover:text-[#e5c46b] font-bold transition-colors"
            >
              Edone Solutions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
