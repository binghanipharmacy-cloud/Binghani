"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, BadgePercent, Globe, HeartPulse } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MissionPoint {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function MissionValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stringPathsRef = useRef<(SVGPathElement | null)[]>([]);
  const glowPathsRef = useRef<(SVGPathElement | null)[]>([]);

  // State to track clicked/active bullet point
  const [activeBulletIndex, setActiveBulletIndex] = useState<number | null>(null);

  const missionPoints: MissionPoint[] = [
    {
      id: "genuine-medicines",
      number: "01",
      title: "Genuine Medicines",
      description:
        "100% verified, authentic pharmaceuticals procured exclusively from certified multinational and DRAP-approved manufacturers.",
      icon: <ShieldCheck className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-gray-900" />,
    },
    {
      id: "affordable-products",
      number: "02",
      title: "Affordable Products",
      description:
        "Competitive, transparent pricing ensuring vital daily treatments and chronic care remain within reach of every family.",
      icon: <BadgePercent className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-gray-900" />,
    },
    {
      id: "easy-access",
      number: "03",
      title: "Easy Access to Local & Imported Products",
      description:
        "A comprehensive inventory of certified local remedies and premier multinational formulations under one dependable roof.",
      icon: <Globe className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-gray-900" />,
    },
    {
      id: "healthy-society",
      number: "04",
      title: "Healthy Society",
      description:
        "Proactive community healthcare, chronic disease guidance, and patient-first wellness support for a thriving tomorrow.",
      icon: <HeartPulse className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-gray-900" />,
    },
  ];

  const updateStrings = () => {
    if (!containerRef.current || !hubRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const hRect = hubRef.current.getBoundingClientRect();

    // Start point: right perimeter of the frosted circle hub
    const startX = hRect.right - cRect.left - 4;
    const startY = hRect.top + hRect.height / 2 - cRect.top;

    bulletRefs.current.forEach((bulletEl, i) => {
      const pathEl = stringPathsRef.current[i];
      const glowEl = glowPathsRef.current[i];
      if (!bulletEl || !pathEl) return;

      const bRect = bulletEl.getBoundingClientRect();
      // End point: directly at the left edge of each bullet point disc
      const endX = bRect.left - cRect.left + 2;
      const endY = bRect.top + bRect.height / 2 - cRect.top;

      const dx = endX - startX;
      // Clean, elegant organic Bézier curves emerging simply from the circle
      const cp1x = startX + dx * 0.44;
      const cp1y = startY;
      const cp2x = startX + dx * 0.56;
      const cp2y = endY;

      const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;
      pathEl.setAttribute("d", d);
      if (glowEl) glowEl.setAttribute("d", d);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    // Initial path coordinates calculation
    updateStrings();

    const ctx = gsap.context(() => {
      // 1. Center Hub: Silky smooth scale and dissolve
      gsap.fromTo(
        ".mission-center-hub",
        { scale: 0.88, opacity: 0, filter: "blur(6px)" },
        {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.25,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // Smooth 1 full revolution (360°) spin as user scrolls to Our Mission section
      gsap.fromTo(
        ".mission-circle-spin",
        {
          rotation: -360,
          transformOrigin: "50% 50%",
        },
        {
          rotation: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Mission Bullet Cards: Highly smooth coordinated cascade
      cardRefs.current.forEach((cardEl, i) => {
        if (!cardEl) return;
        gsap.fromTo(
          cardEl,
          {
            opacity: 0,
            x: 42,
            y: 8,
            filter: "blur(5px)",
            scale: 0.96,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            delay: 0.35 + i * 0.16,
            ease: "power3.out",
            clearProps: "filter",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
            },
          }
        );
      });

      // 3. GSAP String animations: lines simply emerge and draw smoothly
      stringPathsRef.current.forEach((pathEl, i) => {
        const glowEl = glowPathsRef.current[i];
        if (!pathEl) return;

        const totalLength = pathEl.getTotalLength() || 260;
        gsap.set(pathEl, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
          opacity: 1,
        });

        if (glowEl) {
          gsap.set(glowEl, {
            strokeDasharray: totalLength,
            strokeDashoffset: totalLength,
            opacity: 0.5,
          });
        }

        // Draw the connecting string smoothly outward towards the bullet point
        const stringTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
          },
        });

        stringTl.to(
          [pathEl, glowEl].filter(Boolean),
          {
            strokeDashoffset: 0,
            duration: 1.35,
            delay: 0.2 + i * 0.15,
            ease: "power2.out",
          }
        );
      });
    }, sectionRef);

    // Re-calculate paths dynamically on resize
    const handleResize = () => {
      updateStrings();
      stringPathsRef.current.forEach((pathEl, i) => {
        const glowEl = glowPathsRef.current[i];
        if (pathEl) {
          const len = pathEl.getTotalLength();
          gsap.set(pathEl, { strokeDasharray: len });
          if (glowEl) gsap.set(glowEl, { strokeDasharray: len });
        }
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  // Animate the extra orange round cursor when a bullet point is clicked
  useEffect(() => {
    if (activeBulletIndex !== null) {
      gsap.fromTo(
        ".mission-active-cursor",
        { scale: 0, rotate: -60, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: "back.out(2.5)" }
      );
    }
  }, [activeBulletIndex]);

  // Click on bullet point: toggle or activate extra orange round cursor
  const handleCardClick = (index: number) => {
    const isNew = activeBulletIndex !== index;
    setActiveBulletIndex(isNew ? index : null);

    const innerCard = cardInnerRefs.current[index];
    const bullet = bulletRefs.current[index];
    const pathEl = stringPathsRef.current[index];
    const glowEl = glowPathsRef.current[index];

    if (isNew) {
      // Elastic click response on card & bullet
      if (innerCard) {
        gsap.fromTo(
          innerCard,
          { scale: 0.98 },
          {
            scale: 1.02,
            backgroundColor: "rgba(24, 38, 56, 0.98)",
            borderColor: "rgba(235, 84, 6, 0.8)",
            boxShadow: "0 16px 36px -4px rgba(235, 84, 6, 0.35), 0 0 25px rgba(235, 84, 6, 0.3)",
            duration: 0.45,
            ease: "back.out(2)",
          }
        );
      }
      if (bullet) {
        gsap.fromTo(
          bullet,
          { scale: 0.9 },
          {
            scale: 1.12,
            boxShadow: "0 0 18px rgba(235, 84, 6, 0.6)",
            duration: 0.45,
            ease: "back.out(2.5)",
          }
        );
      }
      if (pathEl) {
        gsap.fromTo(
          pathEl,
          { strokeWidth: 5, stroke: "#ffffff" },
          {
            strokeWidth: 3.4,
            stroke: "#ffffff",
            filter: "drop-shadow(0 0 12px #eb5406)",
            duration: 0.5,
            ease: "power2.out",
          }
        );
      }
      if (glowEl) {
        gsap.fromTo(
          glowEl,
          { strokeWidth: 14, opacity: 1 },
          { strokeWidth: 9, opacity: 0.95, duration: 0.5, ease: "power2.out" }
        );
      }
    } else {
      // Deselect and return to resting state
      if (innerCard) {
        gsap.to(innerCard, {
          scale: 1,
          backgroundColor: "rgba(17, 28, 42, 0.90)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (bullet) {
        gsap.to(bullet, {
          scale: 1,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (pathEl) {
        gsap.to(pathEl, {
          strokeWidth: 2.2,
          stroke: "url(#missionStringGrad)",
          filter: "none",
          duration: 0.5,
          ease: "power2.out",
        });
      }
      if (glowEl) {
        gsap.to(glowEl, {
          strokeWidth: 5,
          opacity: 0.5,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    }
  };

  // Hover transitions (preserving active state if card is clicked)
  const handleCardMouseEnter = (index: number) => {
    if (activeBulletIndex === index) return;

    const innerCard = cardInnerRefs.current[index];
    const bullet = bulletRefs.current[index];
    const pathEl = stringPathsRef.current[index];
    const glowEl = glowPathsRef.current[index];

    if (innerCard) {
      gsap.to(innerCard, {
        x: 6,
        scale: 1.015,
        backgroundColor: "rgba(22, 34, 50, 0.96)",
        borderColor: "rgba(235, 84, 6, 0.6)",
        boxShadow: "0 14px 28px -6px rgba(0, 0, 0, 0.5), 0 0 20px -2px rgba(235, 84, 6, 0.25)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (bullet) {
      gsap.to(bullet, {
        scale: 1.08,
        boxShadow: "0 4px 14px rgba(235, 84, 6, 0.45)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (pathEl) {
      gsap.to(pathEl, {
        strokeWidth: 3.2,
        stroke: "#ffffff",
        filter: "drop-shadow(0 0 10px #eb5406)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (glowEl) {
      gsap.to(glowEl, {
        strokeWidth: 9,
        opacity: 0.95,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleCardMouseLeave = (index: number) => {
    if (activeBulletIndex === index) return;

    const innerCard = cardInnerRefs.current[index];
    const bullet = bulletRefs.current[index];
    const pathEl = stringPathsRef.current[index];
    const glowEl = glowPathsRef.current[index];

    if (innerCard) {
      gsap.to(innerCard, {
        x: 0,
        scale: 1,
        backgroundColor: "rgba(17, 28, 42, 0.90)",
        borderColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (bullet) {
      gsap.to(bullet, {
        scale: 1,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.35)",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (pathEl) {
      gsap.to(pathEl, {
        strokeWidth: 2.2,
        stroke: "url(#missionStringGrad)",
        filter: "none",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (glowEl) {
      gsap.to(glowEl, {
        strokeWidth: 5,
        opacity: 0.5,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  return (
    <section
      id="mission"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-b border-gray-800 scroll-mt-[62px] flex items-center justify-center lg:h-[calc(100vh-62px)] lg:min-h-[calc(100vh-62px)] lg:max-h-[calc(100vh-62px)] py-8 lg:py-0"
    >
      {/* Background Picture with highlighted, warm, active family health theme */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/mission-bg.jpg"
        alt="Healthy active family exercising outdoors - Bin Ghani Pharmacy Mission"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none brightness-115 contrast-[1.05] saturate-115"
      />

      {/* Lighter, Highlighted Backdrop Overlay ensuring vibrant photo visibility + high text readability */}
      <div className="absolute inset-0 bg-[#070e17]/35 backdrop-blur-[0.5px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#070e17]/70 via-[#070e17]/25 to-[#070e17]/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(7,14,23,0.5)_100%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col justify-center">
        
        {/* Section Header (Compact to fit on laptop screen) */}
        <div className="text-center max-w-xl mx-auto mb-3 sm:mb-4 lg:mb-5">
          <h2 className="text-xl sm:text-2xl lg:text-[26px] font-serif font-bold text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Our Mission & Core Purpose
          </h2>
          <p className="text-gray-200 text-[11px] sm:text-xs font-normal mt-1 leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Every operational decision at Bin Ghani Pharmacy is anchored in authenticity, accessibility, and community wellness.
          </p>
        </div>

        {/* Infographic Main Container: Left Center Hub + Simple Clean Connecting Lines + Right 4 Cards */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          {/* Full-width responsive SVG overlay for clean connecting lines */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full overflow-visible pointer-events-none z-15"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="missionStringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="55%" stopColor="#ff8243" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#eb5406" stopOpacity="1" />
              </linearGradient>
              <filter id="stringGlowFilter" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {missionPoints.map((_, i) => (
              <g key={`string-group-${i}`}>
                {/* Luminous Glow aura behind line */}
                <path
                  ref={(el) => {
                    glowPathsRef.current[i] = el;
                  }}
                  d=""
                  fill="none"
                  stroke="rgba(235, 84, 6, 0.45)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#stringGlowFilter)"
                />
                {/* Main dynamic GSAP line that simply emerges and connects */}
                <path
                  ref={(el) => {
                    stringPathsRef.current[i] = el;
                  }}
                  d=""
                  fill="none"
                  stroke="url(#missionStringGrad)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </g>
            ))}
          </svg>

          {/* Left Side: Central White Circular Hub with Frosted Opaque Halo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start relative z-20">
            <div
              ref={hubRef}
              className="mission-center-hub relative flex items-center justify-center will-change-transform"
            >
              {/* Outer Frosted Halo Ring */}
              <div className="mission-circle-spin will-change-transform w-52 h-52 sm:w-60 sm:h-60 lg:w-[260px] lg:h-[260px] rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-3 sm:p-3.5 flex items-center justify-center relative">
                
                {/* Inner Solid White Disc with Bin Ghani Logo and Mission Title */}
                <div className="w-full h-full rounded-full bg-white shadow-2xl flex flex-col items-center justify-center p-4 text-center text-gray-900 border border-gray-100">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-1 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo.png"
                      alt="Bin Ghani Pharmacy Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.25em] text-[#eb5406] uppercase">
                    Bin Ghani
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-black tracking-tight text-gray-900 leading-tight">
                    OUR MISSION
                  </h3>
                  <div className="w-12 h-[1.5px] bg-gray-200 my-1.5"></div>
                  <p className="text-[10px] sm:text-[10.5px] text-gray-500 font-medium leading-tight max-w-[160px]">
                    Preserving community health through genuine medicines and compassionate pharmaceutical care.
                  </p>
                </div>

              </div>

            </div>
          </div>

          {/* Right Side: 4 Mission Cards connected to strings (Compact, refined size) */}
          <div className="lg:col-span-7 flex flex-col space-y-2 sm:space-y-2.5 max-w-[490px] relative z-20">
            {missionPoints.map((point, index) => {
              const isActive = activeBulletIndex === index;
              return (
                <div
                  key={point.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  onClick={() => handleCardClick(index)}
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  className="mission-card-anim relative group flex items-center cursor-pointer will-change-transform"
                >
                  {/* Extra Orange Round Cursor / Badge that appears when clicked */}
                  {isActive && (
                    <div className="mission-active-cursor absolute -top-2 right-4 z-30 flex items-center justify-center pointer-events-none">
                      {/* Pulsing radar aura */}
                      <span className="absolute w-7 h-7 rounded-full bg-[#eb5406]/40 animate-ping" />
                      {/* The solid orange round cursor badge */}
                      <div className="relative w-6 h-6 rounded-full bg-gradient-to-tr from-[#eb5406] to-[#ff7e39] text-white text-[9.5px] font-black flex items-center justify-center shadow-[0_0_16px_rgba(235,84,6,0.95)] border-2 border-white">
                        {point.number}
                      </div>
                    </div>
                  )}

                  {/* Main Card Body with Opaque Translucent Glassmorphism & Arrow Cut on Right */}
                  <div 
                    ref={(el) => {
                      cardInnerRefs.current[index] = el;
                    }}
                    className={`relative w-full flex items-center bg-[#111c2a]/90 backdrop-blur-md border ${
                      isActive ? "border-[#eb5406] shadow-[0_12px_28px_rgba(235,84,6,0.3)]" : "border-white/20 shadow-lg"
                    } text-white pl-1.5 pr-6 sm:pr-7 py-1.5 sm:py-2 rounded-l-full rounded-r-xl will-change-transform transition-colors duration-300`}
                    style={{
                      clipPath: "polygon(0% 0%, calc(100% - 11px) 0%, 100% 50%, calc(100% - 11px) 100%, 0% 100%)",
                    }}
                  >
                    {/* Embossed 3D White Circular Icon Disc (Target anchor for strings) */}
                    <div
                      ref={(el) => {
                        bulletRefs.current[index] = el;
                      }}
                      className="relative w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-full bg-gradient-to-b from-white via-gray-50 to-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.35)] border border-white flex items-center justify-center shrink-0 mr-2.5 will-change-transform"
                    >
                      {point.icon}
                      
                      {/* Extra Orange Round Ring Cursor on the bullet disc when active */}
                      {isActive && (
                        <div className="absolute -inset-1 rounded-full border-2 border-[#eb5406] shadow-[0_0_12px_#eb5406] animate-pulse pointer-events-none" />
                      )}
                    </div>

                    {/* Card Content: Title & Bullet Explanation */}
                    <div className="flex-1 pr-1.5">
                      <h4 className={`text-xs sm:text-[13px] font-bold ${
                        isActive ? "text-[#ff8243]" : "text-white"
                      } tracking-wide leading-tight group-hover:text-[#ff8243] transition-colors duration-300`}>
                        {point.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-gray-300 font-normal leading-snug mt-0.5">
                        {point.description}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
