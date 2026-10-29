"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

interface LandingPageProps {
  onExplore: () => void;
  onExploreStart?: () => void;
}

export default function LandingPage({ onExplore, onExploreStart }: LandingPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  // Cinematic GSAP Entrance: Image animates upward into clarity while text cascades in
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Storefront picture: Glides upward into place from y: 50 with scale & clarity reveal
    if (bgImageRef.current) {
      tl.fromTo(
        bgImageRef.current,
        {
          scale: 1.12,
          y: 45,
          opacity: 0,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.9,
          ease: "power2.out",
        },
        0
      );
    }

    // 2. Top header: Glides down smoothly
    if (headerRef.current) {
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: -22 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        0.25
      );
    }

    // 3. Staggered text reveal: Headline, cursive brand name, subtitle, and trust line
    if (contentRef.current) {
      const items = contentRef.current.querySelectorAll(".landing-text-anim");
      tl.fromTo(
        items,
        {
          opacity: 0,
          y: 28,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          stagger: 0.16,
          ease: "power3.out",
        },
        0.45
      );
    }

    // 4. Explore button: Pops into view with subtle spring
    if (buttonRef.current) {
      tl.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "back.out(1.5)",
        },
        0.95
      );
    }
  }, []);

  const handleExploreClick = () => {
    if (isExiting) return;
    setIsExiting(true);

    // Immediately trigger skeleton before the exit animation begins
    onExploreStart?.();

    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          onExplore();
        },
      });

      // Cinematic exit transition: content fades & scales slightly, background slides up
      tl.to(contentRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      })
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
    } else {
      onExplore();
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-full overflow-hidden bg-[#070b10] flex flex-col justify-between select-none"
    >
      {/* Background Main Storefront Picture - Animated entrance & crystal clear */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none will-change-transform"
      >
        {/* Mobile View: Full widescreen storefront displayed completely without cropping the sides */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing-storefront-exterior-mobile.jpg?v=5"
          alt="Bin Ghani Pharmacy Storefront Exterior"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="sm:hidden w-full h-full object-cover object-center brightness-[1.03] contrast-[1.06] saturate-[1.10]"
        />

        {/* Laptop / Desktop View: Full landscape storefront image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/landing-storefront-exterior.jpg?v=5"
          alt="Bin Ghani Pharmacy Storefront Exterior"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="hidden sm:block w-full h-full object-cover object-[center_75%] brightness-[1.03] contrast-[1.06] saturate-[1.10]"
        />

        {/* Ambient Overlays: Bottom gradient + left-side hero shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
        {/* Left-side hero shadow: darkens the left portion for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Top Bar with Clean Logo Container & Official License Badge */}
      <header ref={headerRef} className="relative z-10 w-full px-5 sm:px-10 py-5 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-md rounded-xl p-1.5 flex items-center justify-center shadow-xl border border-white/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Bin Ghani Pharmacy Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col leading-tight drop-shadow-md">
            <span className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#eb5406]">
              Bin Ghani
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-white/90 uppercase">
              Pharmacy
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-white shadow-lg whitespace-nowrap">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium hidden sm:inline">Licensed Drug Dispensary • </span>
          <span className="font-medium">Lic. 6777-A/2021</span>
        </div>
      </header>

      {/* Centerpiece: Positioned elevated on mobile for balanced prominence and easy thumb reach */}
      <main
        ref={contentRef}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-end mt-auto mb-24 sm:mb-8 pb-4 sm:pb-2"
      >
        {/* Headline */}
        <h1 className="landing-text-anim text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-white leading-tight mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          Welcome to{" "}
          <span className="text-[#eb5406] italic font-normal font-[family-name:var(--font-cursive)] text-3xl sm:text-5xl md:text-6xl block sm:inline mt-0.5 sm:mt-0 drop-shadow-[0_4px_16px_rgba(235,84,6,0.5)]">
            Bin Ghani Pharmacy
          </span>
        </h1>

        <p className="landing-text-anim text-xs sm:text-sm text-gray-200 max-w-md sm:max-w-lg mx-auto mb-5 sm:mb-6 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-2">
          <span>Guaranteed authenticity and fair pricing on every medicine</span>
          <span className="block mt-1 sm:mt-1.5 font-[family-name:var(--font-cursive)] italic text-base sm:text-xl text-[#eb5406] font-normal tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            that&apos;s why people trust us.
          </span>
        </p>

        {/* Simple & Clean Explore Button */}
        <div ref={buttonRef}>
          <button
            onClick={handleExploreClick}
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-white hover:bg-[#eb5406] text-[#eb5406] hover:text-white font-bold text-sm sm:text-base tracking-wider uppercase shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            aria-label="Explore Bin Ghani Pharmacy Website"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 stroke-[2.4] transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </main>
    </div>
  );
}
