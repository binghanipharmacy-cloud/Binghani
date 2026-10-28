"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CeoMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftFistRef = useRef<HTMLImageElement>(null);
  const rightFistRef = useRef<HTMLImageElement>(null);
  const impactRippleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Text elements entrance animation
      gsap.fromTo(
        ".leadership-anim-item",
        { opacity: 0, y: 22 },
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

      // 2. Animated Hands Fist-Bump Contact
      if (leftFistRef.current && rightFistRef.current) {
        // Initial separated positions along diagonal axis
        gsap.set(leftFistRef.current, { x: -85, y: 75, opacity: 0.8 });
        gsap.set(rightFistRef.current, { x: 85, y: -75, opacity: 0.8 });
        if (impactRippleRef.current) {
          gsap.set(impactRippleRef.current, { scale: 0, opacity: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        // Hands smoothly glide together
        tl.to([leftFistRef.current, rightFistRef.current], {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.15,
          ease: "power3.inOut",
        })
          // Gentle contact impact (micro-recoil)
          .to(
            leftFistRef.current,
            {
              x: -4,
              y: 3,
              duration: 0.08,
              ease: "power1.in",
            },
            "-=0.08"
          )
          .to(
            rightFistRef.current,
            {
              x: 4,
              y: -3,
              duration: 0.08,
              ease: "power1.in",
            },
            "<"
          );

        // Soft impact ripple expands at touch point
        if (impactRippleRef.current) {
          tl.to(
            impactRippleRef.current,
            {
              scale: 2.2,
              opacity: 0.8,
              duration: 0.22,
              ease: "power2.out",
            },
            "<"
          ).to(
            impactRippleRef.current,
            {
              opacity: 0,
              duration: 0.35,
              ease: "power1.out",
            },
            ">"
          );
        }

        // Fists settle softly together
        tl.to(
          [leftFistRef.current, rightFistRef.current],
          {
            x: 0,
            y: 0,
            duration: 0.45,
            ease: "elastic.out(1.2, 0.4)",
          },
          "<"
        );

        timelineRef.current = tl;
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReplayFistBump = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  };

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="relative w-full lg:h-[calc(100vh-62px)] py-10 lg:py-0 bg-[#faf9f6] text-gray-900 border-b border-gray-200 scroll-mt-[62px] flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative Brand Orange Monotone Shape (Matching Reference Poster Style) */}
      <div
        className="absolute -bottom-12 -right-12 w-[65%] sm:w-[50%] lg:w-[44%] h-[55%] sm:h-[65%] lg:h-[70%] bg-gradient-to-tl from-[#d84800] to-[#eb5406] [clip-path:polygon(32%_0,100%_0,100%_100%,0_100%)] rounded-tl-[70px] sm:rounded-tl-[100px] pointer-events-none opacity-95 shadow-2xl"
        aria-hidden="true"
      />

      {/* Subtle paper grain ambient texture */}
      <div
        className="absolute top-0 left-0 w-80 h-80 bg-[#eb5406]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

          {/* ================================================== */}
          {/* Left Column: Dialogue Box for CEO Message */}
          {/* ================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center leadership-anim-item">

            {/* Dialogue Box Container */}
            <div className="relative bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-md max-w-lg w-full">

              {/* Optional Subtle Dialogue Pointer Arrow towards hands */}
              <div
                className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[12px] border-l-white drop-shadow-xs"
                aria-hidden="true"
              />

              {/* CEO Message Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-5 h-[2px] bg-[#eb5406]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#eb5406] uppercase">
                  CEO Message
                </span>
              </div>

              {/* Decorative Quotation Mark */}
              <div className="text-[#eb5406]/20 select-none font-serif text-5xl sm:text-6xl leading-none absolute top-4 right-5">
                “
              </div>

              {/* CEO Message Content */}
              <p className="text-gray-800 font-serif text-base sm:text-lg lg:text-[19px] leading-relaxed relative z-10 mb-6">
                At Bin Ghani Pharmacy, our mission is rooted in moral integrity and healthcare excellence. We are strictly committed to serving our community with 100% genuine medicines at honest prices because your health is our greatest responsibility, <span className="font-[family-name:var(--font-cursive)] text-[#eb5406] font-bold text-xl sm:text-2xl inline-block">that's why people trust us.</span>
              </p>

              {/* CEO Cursive Signature */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <div className="font-[family-name:var(--font-cursive)] text-2xl sm:text-3xl text-[#eb5406] font-bold select-none pr-1">
                  Muhammad Ghani
                </div>
              </div>

            </div>

          </div>

          {/* ================================================== */}
          {/* Right Column: Animated Hands Fist-Bump Contact */}
          {/* ================================================== */}
          <div className="lg:col-span-6 relative flex justify-center items-center">

            {/* Fist-Bump Stage Container (Sized to fit screen height) */}
            <div
              className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px] flex items-center justify-center cursor-pointer select-none group"
              onClick={handleReplayFistBump}
              title="Click to replay hands coming together"
            >

              {/* Circular Path Rotating Text around Knuckles Touchpoint (Matching Reference) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <svg
                  viewBox="0 0 200 200"
                  className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 xl:w-52 xl:h-52 animate-[spin_24s_linear_infinite]"
                >
                  <path
                    id="fistTextCircle"
                    d="M 100, 100 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] uppercase font-bold tracking-[0.24em] fill-gray-700">
                    <textPath href="#fistTextCircle">
                      • BIN GHANI PHARMACY • CLINICAL INTEGRITY • COMPASSION •
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Gentle Impact Pulse Ring (Triggers on Contact) */}
              <div
                ref={impactRippleRef}
                className="absolute top-[49%] left-[51%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-[#eb5406] pointer-events-none z-20"
              />

              {/* Left Hand: Bottom-Left to Center */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={leftFistRef}
                src="/fist-left.png"
                alt="Leadership Hand Left"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-md"
              />

              {/* Right Hand: Top-Right to Center */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={rightFistRef}
                src="/fist-right.png"
                alt="Leadership Hand Right"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-md"
              />

              {/* Monotone Brand Accent Caption inside the Orange Zone */}
              <div className="absolute bottom-2 right-2 sm:right-4 text-right z-30 pointer-events-none">
                <div className="font-[family-name:var(--font-cursive)] text-xl sm:text-2xl md:text-[26px] font-bold text-white drop-shadow-xs leading-tight">
                  Bin Ghani Leadership
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/85 font-sans tracking-wide">
                  Pharmacy License: 6777-A/2021
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
