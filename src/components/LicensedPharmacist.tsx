"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  isCeo?: boolean;
  zIndex: number;
  desktopVClass: string;
  mobileVClass: string;
}

export default function LicensedPharmacist() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // 6 pictures aligned in V-formation with CEO Muhammad Ghani in the very front center
  const team: TeamMember[] = [
    {
      id: 1,
      name: "",
      role: "",
      image: "/pro-member-4.jpg",
      zIndex: 10,
      desktopVClass: "-translate-y-7 scale-[0.91]",
      mobileVClass: "-translate-y-3.5 scale-[0.88]",
    },
    {
      id: 2,
      name: "",
      role: "",
      image: "/pro-member-2.jpg",
      zIndex: 20,
      desktopVClass: "-translate-y-3.5 scale-[0.96]",
      mobileVClass: "-translate-y-1.5 scale-[0.93]",
    },
    {
      id: 3,
      name: "Muhammad Ghani",
      role: "Founder & CEO",
      image: "/ceo-ghani.jpg",
      isCeo: true,
      zIndex: 40,
      desktopVClass: "translate-y-3 scale-[1.16]",
      mobileVClass: "translate-y-1.5 scale-[1.18]",
    },
    {
      id: 4,
      name: "",
      role: "",
      image: "/pro-member-1.jpg",
      zIndex: 30,
      desktopVClass: "-translate-y-2 scale-[0.98]",
      mobileVClass: "-translate-y-1 scale-[0.95]",
    },
    {
      id: 5,
      name: "",
      role: "",
      image: "/pro-member-5.jpg",
      zIndex: 20,
      desktopVClass: "-translate-y-5 scale-[0.93]",
      mobileVClass: "-translate-y-2.5 scale-[0.90]",
    },
    {
      id: 6,
      name: "",
      role: "",
      image: "/pro-member-3.jpg",
      zIndex: 10,
      desktopVClass: "-translate-y-8 scale-[0.88]",
      mobileVClass: "-translate-y-4 scale-[0.85]",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header elements entrance
      gsap.fromTo(
        ".team-anim-item",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. V-formation Portraits entrance animation
      if (cardsContainerRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        // Portraits fan out in a V wave with CEO leading in the very front
        tl.fromTo(
          ".team-portrait-node",
          {
            opacity: 0,
            y: 45,
            scale: 0.6,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: {
              each: 0.08,
              from: "center",
            },
            ease: "back.out(1.7)",
          }
        )
          // CEO Role & Name slide up smoothly below the CEO portrait
          .fromTo(
            ".team-label-node",
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.25"
          );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="relative w-full lg:h-[calc(100vh-62px)] py-0 bg-[#faf9f6] text-gray-900 border-b border-gray-200 scroll-mt-[62px] flex flex-col justify-center overflow-hidden"
    >
      {/* Anchor aliases for smooth navigation */}
      <span id="pharmacist" className="absolute -top-[62px]" aria-hidden="true" />
      <span id="our-team" className="absolute -top-[62px]" aria-hidden="true" />

      {/* ================================================== */}
      {/* Angled Color Dividing Scheme (Desktop Only)        */}
      {/* ================================================== */}
      <div
        className="hidden md:block absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="pharmacistOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f05a10" />
              <stop offset="100%" stopColor="#eb5406" />
            </linearGradient>
          </defs>
          <polygon
            points="0,0 35,0 26,100 0,100"
            fill="url(#pharmacistOrangeGrad)"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* ================================================== */}
      {/* MOBILE VIEW: Solid Orange Header & Auto-Reel       */}
      {/* ================================================== */}
      <div className="block md:hidden w-full pb-8">
        {/* Mobile Header: Full-Width Solid Orange Strip with Pure White Typography */}
        <div className="w-full bg-[#eb5406] px-5 py-7 sm:py-8 text-center shadow-md mb-6">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-white/80" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white/95 uppercase">
              CLINICAL LEADERSHIP & PHARMACISTS
            </span>
            <span className="w-5 h-[2px] bg-white/80" />
          </div>

          <h2 className="font-[family-name:var(--font-cursive)] text-4xl text-white font-bold tracking-wide select-none leading-tight mb-2 drop-shadow-xs">
            Our Team
          </h2>

          <p className="text-white text-xs leading-relaxed max-w-sm mx-auto font-normal">
            Guided by licensed Pharm-D clinical pharmacists and quality specialists dedicated to 100% authentic medicines, precision dosage management, and trusted community care.
          </p>
        </div>

        {/* Mobile Infinite Auto-Scrolling Reel (Right to Left, Smooth Seamless Loop, No Scrollbar) */}
        <div className="w-full overflow-hidden no-scrollbar py-2">
          <div className="animate-team-reel flex items-center">
            {/* Track 1 */}
            <div className="flex items-center gap-4 shrink-0 pr-4">
              {team.map((member) => (
                <div
                  key={`mobile-t1-${member.id}`}
                  className="flex flex-col items-center shrink-0 w-28 text-center select-none"
                >
                  {/* Circular Headshot */}
                  <div
                    className={`relative w-24 h-24 rounded-full border-4 overflow-hidden bg-white shadow-md mb-2 ${member.isCeo
                        ? "border-[#eb5406] ring-3 ring-[#eb5406]/30 scale-105"
                        : "border-white"
                      }`}
                  >
                    <Image
                      src={member.image}
                      alt={member.isCeo ? "Muhammad Ghani - Founder & CEO" : `Team Member ${member.id}`}
                      width={110}
                      height={110}
                      loading="lazy"
                      sizes="110px"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Post Title (Only for CEO) */}
                  {member.isCeo ? (
                    <>
                      <h3 className="font-[family-name:var(--font-cursive)] text-xl sm:text-2xl text-[#eb5406] font-semibold leading-tight select-none">
                        {member.name}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 leading-tight line-clamp-1 mt-0.5">
                        {member.role}
                      </span>
                    </>
                  ) : (
                    <div className="h-7" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>

            {/* Track 2 (Identical clone for seamless loop) */}
            <div className="flex items-center gap-4 shrink-0 pr-4">
              {team.map((member) => (
                <div
                  key={`mobile-t2-${member.id}`}
                  className="flex flex-col items-center shrink-0 w-28 text-center select-none"
                >
                  {/* Circular Headshot */}
                  <div
                    className={`relative w-24 h-24 rounded-full border-4 overflow-hidden bg-white shadow-md mb-2 ${
                      member.isCeo
                        ? "border-[#eb5406] ring-3 ring-[#eb5406]/30 scale-105"
                        : "border-white"
                    }`}
                  >
                    <Image
                      src={member.image}
                      alt={member.isCeo ? "Muhammad Ghani - Founder & CEO" : `Team Member ${member.id}`}
                      width={110}
                      height={110}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Post Title (Only for CEO) */}
                  {member.isCeo ? (
                    <>
                      <h3 className="font-[family-name:var(--font-cursive)] text-xl sm:text-2xl text-[#eb5406] font-semibold leading-tight select-none">
                        {member.name}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-700 leading-tight line-clamp-1 mt-0.5">
                        {member.role}
                      </span>
                    </>
                  ) : (
                    <div className="h-7" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================== */}
      {/* DESKTOP VIEW: V-Formation with CEO in Front Center */}
      {/* ================================================== */}
      <div className="hidden md:flex relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex-col justify-center">
        {/* Desktop Section Header */}
        <div className="text-center max-w-xl mx-auto mb-4 sm:mb-6 lg:mb-7 team-anim-item">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-4 h-[2px] bg-[#eb5406]" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#eb5406] uppercase">
              CLINICAL LEADERSHIP & PHARMACISTS
            </span>
            <span className="w-4 h-[2px] bg-[#eb5406]" />
          </div>

          <h2 className="font-[family-name:var(--font-cursive)] text-4xl sm:text-5xl lg:text-[52px] text-[#eb5406] font-bold tracking-wide select-none leading-tight mb-2">
            Our Team
          </h2>

          <p className="text-gray-600 text-xs sm:text-[13px] md:text-sm leading-relaxed max-w-lg mx-auto">
            At Bin Ghani Pharmacy, your health and well-being are our highest priorities. Under the supervision of qualified pharmacist Shan Khan (Registration No. 6777-A/2021), our dedicated team provides quality medicines, trusted guidance, and compassionate care to every customer.
          </p>
        </div>

        {/* V-Shape Formation Container with GSAP Animation */}
        <div
          ref={cardsContainerRef}
          className="w-full overflow-hidden no-scrollbar pb-3 pt-2"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            {/* V-Formation Overlapping Circular Headshots */}
            <div className="flex items-center justify-center -space-x-4 md:-space-x-5 lg:-space-x-6 pt-7 pb-14">
              {team.map((member) => (
                <div
                  key={member.id}
                  className={`team-portrait-node group relative transition-all duration-300 hover:z-50 hover:-translate-y-5 cursor-pointer ${member.desktopVClass}`}
                  style={{ zIndex: member.zIndex }}
                >
                  <div
                    className={`relative ${member.isCeo
                        ? "w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 border-4 lg:border-[5px] border-[#eb5406] ring-4 ring-[#eb5406]/20 shadow-2xl"
                        : "w-22 h-22 md:w-26 md:h-26 lg:w-30 lg:h-30 xl:w-32 xl:h-32 border-3 sm:border-4 border-white shadow-lg"
                      } rounded-full overflow-hidden bg-white transition-all duration-300 group-hover:scale-105`}
                  >
                    <Image
                      src={member.image}
                      alt={member.isCeo ? "Muhammad Ghani - Founder & CEO" : `Team Member ${member.id}`}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={member.isCeo}
                    />
                  </div>

                  {/* CEO Role & Name Centered EXACTLY Under CEO Headshot */}
                  {member.isCeo && (
                    <div className="team-label-node absolute top-full left-1/2 -translate-x-1/2 mt-2.5 flex flex-col items-center text-center whitespace-nowrap pointer-events-none">
                      <h3 className="font-[family-name:var(--font-cursive)] text-2xl sm:text-[28px] md:text-3xl text-[#eb5406] font-semibold leading-tight select-none">
                        Muhammad Ghani
                      </h3>
                      <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-gray-800 leading-tight mt-0.5">
                        Founder & CEO
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
