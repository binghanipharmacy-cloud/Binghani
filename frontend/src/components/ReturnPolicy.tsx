"use client";

import React from "react";
import { ShieldCheck, PhoneCall } from "lucide-react";

export default function ReturnPolicy() {
  const policies = [
    {
      id: "bill-3days",
      title: "3-Day Window & Original Bill",
      tagline: "Mandatory Proof of Purchase",
      rule: "For return or exchange, it is mandatory to bring the item within 3 days along with the original receipt (Bill).",
      items: [
        "Must be within 3 calendar days of purchase timestamp",
        "Original cash receipt / billing invoice is mandatory",
        "Physical item must be returned to the pharmacy counter",
        "Verification against original printed serial and batch data",
      ],
    },
    {
      id: "cold-cosmetics",
      title: "Cosmetics & Refrigerator Items",
      tagline: "Strictly Non-Returnable Products",
      rule: "All items that fall under cosmetics or refrigerator items—such as perfume, shampoo, vaccine, insulin—and items that do not come in a sealed (Seal) state from the company, cannot be returned at all.",
      items: [
        "Refrigerator items: Insulin, vaccines, and cold biologics",
        "Cosmetics: Perfumes, shampoos, and personal grooming",
        "Unsealed goods: Any item without company factory seal",
        "Cold-chain temperature integrity cannot be compromised",
      ],
    },
    {
      id: "open-used",
      title: "Open Items & Used Medicines",
      tagline: "Patient Safety & Infection Control",
      rule: "The return of open (OPEN) items or used medicines is also not possible under any circumstances.",
      items: [
        "Open bottles, loose tablets, or broken seal rings",
        "Partially consumed medicine strips or blister packs",
        "Protects community from cross-contamination risks",
        "Complies strictly with DRAP dispensary regulations",
      ],
    },
  ];

  return (
    <section
      id="return-policy"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-white text-gray-900 border-b border-gray-200 scroll-mt-[62px] isolate"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* ================================================== */}
        {/* Section Header */}
        {/* ================================================== */}
        <div className="mb-8 lg:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#eb5406]"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#eb5406] uppercase font-mono">
              Pharmacy Guidelines
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-gray-900 tracking-tight leading-tight">
            Return &amp; Exchange Policy
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-none md:whitespace-nowrap">
            Strict adherence to DRAP standards ensuring cold-chain integrity, authentic stock, and patient health safety.
          </p>
        </div>

        {/* ================================================== */}
        {/* Policy Cards: Exactly matching ProductsCatalog box styling */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="group relative bg-[#faf9f6] rounded-none p-5 sm:p-6 lg:p-6 xl:p-7 border border-gray-200 hover:border-[#eb5406]/80 hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between will-change-transform cursor-pointer"
            >
              <div>
                {/* Title & Tagline */}
                <h3 className="font-serif text-base sm:text-lg lg:text-[18px] xl:text-[20px] font-bold text-gray-900 group-hover:text-[#eb5406] transition-colors leading-snug">
                  {policy.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#eb5406] font-medium mt-1 leading-tight">
                  {policy.tagline}
                </p>

                {/* Core Rule Box */}
                <div className="mt-3.5 p-3 bg-white border border-gray-200/90 border-l-3 border-l-[#eb5406] text-xs sm:text-[13px] font-semibold text-gray-800 leading-snug shadow-2xs">
                  {policy.rule}
                </div>

                {/* Sub-item List */}
                <ul className="space-y-2.5 sm:space-y-3 mt-4 pt-3.5 border-t border-gray-200/70 text-xs sm:text-[13px] text-gray-700">
                  {policy.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eb5406] mt-1.5 shrink-0 opacity-80 group-hover:scale-110 transition-transform" />
                      <span className="font-medium group-hover:text-gray-950 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box Footer Status */}
              <div className="mt-5 pt-3.5 border-t border-gray-200/60 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                <span className="text-gray-500 font-medium">Bin Ghani Standard</span>
                <span className="text-[#eb5406] font-semibold">Strict Protocol</span>
              </div>
            </div>
          ))}
        </div>

        {/* ================================================== */}
        {/* Bottom Advisory Strip */}
        {/* ================================================== */}
        <div className="mt-6 lg:mt-8 p-3.5 sm:p-4 rounded-none bg-[#faf9f6] border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#eb5406] shrink-0" />
            <span className="text-xs sm:text-sm">
              <strong className="text-gray-900">Patient Protection:</strong> These regulations prevent counterfeit re-entry, cross-contamination, and degraded storage potency.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/923322022221?text=Hello%20Bin%20Ghani%20Pharmacy,%20I%20have%20an%20inquiry%20regarding%20my%20recent%20bill."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#eb5406] hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
