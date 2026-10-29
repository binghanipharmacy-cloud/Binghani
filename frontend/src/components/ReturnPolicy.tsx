"use client";

import React from "react";
import {
  Receipt,
  CalendarClock,
  Snowflake,
  Sparkles,
  PackageX,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";

export default function ReturnPolicy() {
  const policies = [
    {
      id: "window-receipt",
      number: "01",
      badge: "Mandatory Requirement",
      badgeColor: "bg-orange-50 text-[#eb5406] border-orange-200/80",
      icon: Receipt,
      iconColor: "text-[#eb5406]",
      iconBg: "bg-orange-500/10 border-orange-500/20",
      title: "3-Day Window & Original Receipt (Bill)",
      coreRule:
        "For return or exchange, it is mandatory to bring the item within 3 days along with the original receipt (Bill).",
      details: [
        "Present the original printed cash receipt / tax invoice issued at the counter.",
        "Request must be initiated within 72 hours (3 calendar days) from the purchase timestamp.",
        "External packaging and batch numbers must match the records on your purchase receipt.",
      ],
      tag: "Verification Required",
    },
    {
      id: "cold-cosmetics",
      number: "02",
      badge: "Strictly Non-Returnable",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
      icon: Snowflake,
      iconColor: "text-sky-600",
      iconBg: "bg-sky-500/10 border-sky-500/20",
      title: "Cosmetics & Refrigerator Items",
      coreRule:
        "All items that fall under cosmetics or refrigerator items—such as perfume, shampoo, vaccine, insulin—and items that do not come in a sealed (Seal) state from the company, cannot be returned at all.",
      details: [
        "Cold-Chain Products (Insulin, Vaccines, Biologics): Temperature variations outside certified storage degrade efficacy and cannot be re-verified.",
        "Cosmetics & Grooming (Perfumes, Shampoos, Skin Care): Non-returnable to uphold strict hygienic and dermatological safety.",
        "Unsealed Goods: Products without manufacturer factory seals or tamper-evident shrink-wraps cannot be accepted.",
      ],
      tag: "Cold-Chain & Hygiene Protocol",
    },
    {
      id: "opened-used",
      number: "03",
      badge: "Zero Tolerance Safety Rule",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      icon: PackageX,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-500/10 border-rose-500/20",
      title: "Open Items & Used Medicines",
      coreRule:
        "The return of open (OPEN) items or used medicines is also not possible under any circumstances.",
      details: [
        "Broken or unsealed bottles, opened blister foils, and partially used medicine strips are strictly non-refundable.",
        "Prevents cross-contamination, accidental tampering, and environmental degradation.",
        "Complies fully with Drug Regulatory Authority of Pakistan (DRAP) dispensary safety regulations.",
      ],
      tag: "Patient Safety First",
    },
  ];

  return (
    <section
      id="return-policy"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#faf9f6] to-white border-t border-gray-200/80 relative overflow-hidden"
    >
      {/* Subtle Background Accent Graphics */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* ================================================== */}
        {/* Section Header */}
        {/* ================================================== */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#eb5406]"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#eb5406] uppercase font-mono">
              Pharmacy Guidelines & Transparency
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-gray-900 tracking-tight leading-tight">
            Return & Exchange Policy
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base mt-2.5 leading-relaxed">
            To ensure patient well-being, cold-chain medication potency, and full compliance with
            provincial healthcare and DRAP standards, Bin Ghani Pharmacy operates under the following
            clear, uncompromising return and exchange protocols:
          </p>
        </div>

        {/* ================================================== */}
        {/* 3 Core Policy Cards */}
        {/* ================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.id}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 lg:p-8 border border-gray-200/90 hover:border-[#eb5406]/60 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top: Card Number & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border ${policy.iconBg} ${policy.iconColor} transition-transform duration-300 group-hover:scale-110 shadow-xs`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black font-mono text-gray-200 group-hover:text-[#eb5406]/30 transition-colors">
                      {policy.number}
                    </span>
                  </div>

                  <div className="mb-3">
                    <span
                      className={`inline-block text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border ${policy.badgeColor} tracking-wide uppercase font-mono`}
                    >
                      {policy.badge}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 group-hover:text-[#eb5406] transition-colors leading-snug mb-3">
                    {policy.title}
                  </h3>

                  {/* Core Rule Quote Box */}
                  <div className="p-3.5 rounded-xl bg-gray-50/90 border border-gray-200/70 mb-4 text-xs sm:text-[13px] text-gray-800 font-semibold leading-relaxed border-l-4 border-l-[#eb5406]">
                    &ldquo;{policy.coreRule}&rdquo;
                  </div>

                  {/* Clarification Points */}
                  <ul className="space-y-2.5 pt-2 text-xs sm:text-xs text-gray-600 leading-relaxed">
                    {policy.details.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer Tag */}
                <div className="pt-5 mt-6 border-t border-gray-100 flex items-center justify-between text-[11px] font-medium text-gray-400 font-mono">
                  <span>{policy.tag}</span>
                  <span className="text-emerald-600 font-bold">DRAP Compliant</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================== */}
        {/* Healthcare Rationale & Pharmacist Advisory Banner */}
        {/* ================================================== */}
        <div className="rounded-2xl bg-gradient-to-r from-[#101720] to-[#1e293b] p-6 sm:p-8 text-white shadow-xl border border-gray-800 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#eb5406]/20 border border-[#eb5406]/40 flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6 text-[#eb5406]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight">
                  Why Are Pharmacy Return Policies Stricter Than General Retail?
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 mt-1.5 leading-relaxed">
                  Medicines are life-saving chemical compounds. Cold-chain treatments like insulin,
                  hormones, and vaccines deteriorate rapidly if unbroken cold storage is compromised.
                  By strictly barring returns of unsealed, cosmetic, or refrigerator items, we guarantee
                  that every patient walking into Bin Ghani Pharmacy receives 100% genuine, unadulterated,
                  and therapeutically potent medications.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:items-end">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#eb5406] hover:bg-[#d44800] text-white text-xs sm:text-sm font-semibold transition-colors shadow-md w-full sm:w-auto"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Questions About a Bill?</span>
              </a>
              <a
                href="https://wa.me/923322022221?text=Hello%20Bin%20Ghani%20Pharmacy,%20I%20have%20an%20inquiry%20regarding%20my%20recent%20bill%20and%20purchase."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold transition-colors w-full sm:w-auto"
              >
                <PhoneCall className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Duty Pharmacist</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
