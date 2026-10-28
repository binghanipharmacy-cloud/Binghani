"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Mail, Phone } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Photo entrance animation: glides in smoothly from left with subtle scale
      gsap.fromTo(
        ".who-photo-anim",
        { opacity: 0, x: -30, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // 2. Minimal "Who We Are?" animated text badge on the photo
      gsap.fromTo(
        ".who-badge-anim",
        { opacity: 0, y: 22, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.4)",
          delay: 0.25,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );

      // 3. Stagger right side editorial content
      gsap.fromTo(
        ".who-content-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-white w-full overflow-hidden border-b border-gray-100 flex items-center justify-center min-h-[calc(100vh-50px)] scroll-mt-[62px] py-6 lg:py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full my-auto">

          {/* Left Column: Image with Sharp (Non-Rounded) Straight Conical Edges & Minimal GSAP Tag */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[300px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[380px]">

              {/* Main Photo Container with Sharp Right-Angled (Non-Rounded) Edges */}
              <div className="who-photo-anim relative z-10 w-full aspect-[4/5] max-h-[360px] sm:max-h-[400px] lg:max-h-[420px] xl:max-h-[450px] rounded-none overflow-hidden shadow-xl bg-gray-100 border border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/who-we-are.jpg"
                  alt="United Medical Team Hands in Healthcare Partnership"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient shade at bottom for crisp contrast with the typographic lockup */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none"></div>

                {/* Editorial "WHO ARE WE ?" Typographic Lockup matching reference design */}
                <div
                  className="who-badge-anim absolute bottom-6 sm:bottom-8 inset-x-3 sm:inset-x-4 flex flex-col items-center text-center z-20 pointer-events-none"
                >
                  {/* WHO / ARE WE + ? Lockup */}
                  <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2">
                    <div className="flex flex-col text-left">
                      <span className="text-[#eb5406] font-serif font-black tracking-[0.06em] text-2xl sm:text-3xl lg:text-[38px] leading-[0.92] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        WHO
                      </span>
                      <span className="text-gray-300 font-serif font-semibold tracking-[0.14em] text-xl sm:text-2xl lg:text-[30px] leading-[0.92] mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                        WE ARE
                      </span>
                    </div>
                    <span className="text-[#eb5406] font-serif font-light text-5xl sm:text-6xl lg:text-[76px] leading-[0.75] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] select-none">
                      ?
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Brand Narrative & 2x2 Stats Grid (Compact to fit on laptop/mobile) */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            {/* Top Tagline */}
            <div className="who-content-item flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#eb5406]"></span>
              <span className="text-xs font-bold tracking-[0.2em] text-[#eb5406] uppercase">
                About Us
              </span>
            </div>

            {/* Headline */}
            <h2 className="who-content-item text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-serif font-bold text-gray-900 tracking-tight leading-[1.2] mb-2.5 sm:mb-3">
              Genuine healthcare, within every family&apos;s reach.
            </h2>

            {/* Paragraphs */}
            <p className="who-content-item text-xs sm:text-[13.5px] text-gray-700 font-normal leading-relaxed mb-2">
              Established in 2001, Bin Ghani Pharmacy is a trusted name in Peshawar, providing quality local and imported medicines, medical supplies, herbal remedies, health supplements, skincare, cosmetics, baby care, and lifestyle products at competitive prices, with a commitment to affordability, accessibility, and customer satisfaction.
            </p>
            {/* 2x2 Stats Grid - Professional Clean Sizing */}
            <div className="who-content-item grid grid-cols-2 gap-y-2.5 gap-x-6 pt-3 border-t border-gray-100">
              <div className="border-r border-gray-100 pr-4">
                <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  2001
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  Established
                </div>
              </div>

              <div className="pl-2">
                <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  25+
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  Years of Service
                </div>
              </div>

              <div className="border-r border-gray-100 pr-4 border-t border-gray-100 pt-2.5">
                <div className="text-base sm:text-lg font-bold text-[#eb5406] tracking-tight leading-snug">
                  180,000+
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  Pharmaceutical Products
                </div>
              </div>

              <div className="pl-2 border-t border-gray-100 pt-2.5">
                <div className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  100%
                </div>
                <div className="text-[11px] sm:text-xs text-gray-500 font-normal">
                  Genuine Medicines
                </div>
              </div>
            </div>

            {/* About Developer Section */}
            <div className="who-content-item mt-4 pt-3.5 border-t border-gray-100 bg-gradient-to-r from-orange-50/50 via-gray-50/80 to-transparent rounded-2xl p-3.5 sm:p-4 border border-orange-100/70 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#eb5406] flex items-center justify-center text-white shadow-xs shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-[#eb5406] uppercase">
                      About Developer
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-gray-900 leading-tight">
                      Fahad • Web Engineering & Design
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
                  <a
                    href="mailto:fahad_125397@yahoo.com"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:text-[#eb5406] hover:border-[#eb5406]/40 font-medium transition-all shadow-2xs group"
                    title="Email Fahad"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#eb5406]" />
                    <span className="font-mono text-[11px] sm:text-xs">fahad_125397@yahoo.com</span>
                  </a>
                  <a
                    href="tel:03417700233"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200/80 text-gray-700 hover:text-[#eb5406] hover:border-[#eb5406]/40 font-medium transition-all shadow-2xs group"
                    title="Call Fahad"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#eb5406]" />
                    <span className="font-mono text-[11px] sm:text-xs">03417700233</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
