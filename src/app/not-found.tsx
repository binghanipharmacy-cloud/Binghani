import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, PhoneCall } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | Bin Ghani Pharmacy",
  description: "The requested medical page could not be found. Return to Bin Ghani Pharmacy homepage or contact our clinical team.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070b10] text-white flex flex-col justify-between selection:bg-[#eb5406] selection:text-white">
      {/* Top Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl p-1.5 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Bin Ghani Pharmacy Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold font-serif text-[#eb5406]">
              Bin Ghani
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-white/80 uppercase">
              Pharmacy
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-400 hidden sm:block">
          Lic. 6777-A/2021 • Open 365 Days
        </div>
      </header>

      {/* Center 404 Display */}
      <main className="max-w-2xl mx-auto px-6 py-16 text-center flex flex-col items-center my-auto">
        <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#eb5406]/15 border border-[#eb5406]/30 text-[#eb5406] text-xs font-semibold uppercase tracking-widest mb-6">
          Error 404 • Resource Not Located
        </div>

        <h1 className="text-5xl sm:text-7xl font-serif font-black tracking-tight text-white mb-4">
          Page Not <span className="text-[#eb5406]">Found</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
          The page or medication link you are looking for may have been relocated or updated. Our qualified pharmacists are always available to assist you.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#eb5406] hover:bg-[#d44800] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            <span>Return to Storefront</span>
          </Link>

          <a
            href="tel:+923322022221"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm tracking-wider border border-white/20 transition-all duration-200"
          >
            <PhoneCall className="w-4 h-4 text-[#eb5406]" />
            <span>Call Pharmacist</span>
          </a>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="w-full px-6 py-5 text-center text-xs text-gray-500 border-t border-white/10">
        © 2026 Bin Ghani Pharmacy. All rights reserved. Licensed Drug Dispensary • NTN: 1730127706629
      </footer>
    </div>
  );
}
