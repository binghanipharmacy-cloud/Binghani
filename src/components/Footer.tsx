"use client";

import React from "react";
import { ShieldCheck, ArrowUp, FileText } from "lucide-react";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        const navHeight = 62;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    }
  };

  const portions = [
    { name: "About Us", href: "#about" },
    { name: "Mission & Values", href: "#mission" },
    { name: "Our Products", href: "#products" },
    { name: "Our Team", href: "#team" },
    { name: "Leadership", href: "#leadership" },
    { name: "Return Policy", href: "#return-policy" },
    { name: "Contact Us", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#101720] text-gray-400 text-xs sm:text-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-lg p-1 flex items-center justify-center shadow-xs shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Bin Ghani Pharmacy Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-bold font-serif tracking-tight text-[#eb5406]">
                  Bin Ghani
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] text-gray-400 uppercase">
                  Pharmacy
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Your trusted partner in health. A licensed community pharmacy dedicated to 100% authentic medicine sourcing, precision cold-chain management, and empathetic clinical pharmacist consultations.
            </p>

            <div className="flex flex-col gap-2 pt-1.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 w-fit">
                <ShieldCheck className="w-4 h-4 text-[#eb5406]" />
                <span>Drug License: <strong className="text-white font-semibold">6777-A/2021</strong></span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-gray-300 w-fit">
                <FileText className="w-4 h-4 text-[#eb5406]" />
                <span>NTN: <strong className="text-white font-semibold">1730127706629</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Navigation - Actual Page Portions */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-mono">
              Portions
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {portions.map((portion) => (
                <li key={portion.name}>
                  <a
                    href={portion.href}
                    onClick={(e) => handleNavClick(e, portion.href)}
                    className="hover:text-[#eb5406] transition-colors"
                  >
                    {portion.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Specialities */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-mono">
              Care Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>General Medicines</li>
              <li>Medication Therapy Management</li>
              <li>Elderly Dose Packaging</li>
              <li>Pediatric Dosing Scaler</li>
              <li>Imported Medicines</li>
              <li>Toiletries</li>
              <li>Skin care</li>
              <li>Baby Care</li>
              <li>Mother Care</li>
              <li>Surgical Equipments</li>
              <li>First Aid Kits</li>
              <li>Medical Electronic Devices</li>
            </ul>
          </div>

          {/* Store Hours & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 font-mono">
              Store Timings 9am To 2am
            </h4>
            <div className="space-y-2 text-xs text-gray-400">
              <p><strong className="text-white">Monday – Sunday:</strong></p>
              <p>9:00 AM to 2:00 AM</p>
              <p className="text-emerald-400 font-semibold pt-1">Open 365 Days / Year</p>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 leading-relaxed mb-8">
          <strong className="text-gray-300">Regulatory & Medical Notice:</strong> Bin Ghani Pharmacy operates strictly under the Drug Regulatory Authority of Pakistan (Drug License: <strong className="text-gray-200">6777-A/2021</strong> | NTN: <strong className="text-gray-200">1730127706629</strong>) and provincial health department laws. Prescription medications require a valid, non-expired doctor&apos;s prescription. Information provided on this website is for educational and communication purposes and should not substitute professional direct medical advice from your physician.
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          {/* Left: Back to Top & Copyright */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group"
              aria-label="Scroll back to top"
            >
              <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#eb5406] group-hover:border-[#eb5406] flex items-center justify-center transition-colors">
                <ArrowUp className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
              <span className="font-medium group-hover:text-white">Back to Top</span>
            </button>

            <span className="text-gray-500">
              © 2026 Bin Ghani Pharmacy. All rights reserved.
            </span>
          </div>

          {/* Right: Verification Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#eb5406]" />
              <span>Drug License: <strong className="text-white font-semibold">6777-A/2021</strong></span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
              <FileText className="w-3.5 h-3.5 text-[#eb5406]" />
              <span>STRN: <strong className="text-white font-semibold">3277876378373</strong></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
