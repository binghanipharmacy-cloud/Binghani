"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Phone, Mail, Code2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {

  const stageRef = useRef<HTMLDivElement>(null);
  const fabricSvgRef = useRef<SVGSVGElement>(null);
  const clothPathRef = useRef<SVGPathElement>(null);
  const flapPathRef = useRef<SVGPathElement>(null);
  const crease1Ref = useRef<SVGPathElement>(null);
  const crease2Ref = useRef<SVGPathElement>(null);
  const helloTextRef = useRef<SVGTextElement>(null);
  const subTextRef = useRef<SVGTextElement>(null);
  const personRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !stageRef.current) return;

    const ctx = gsap.context(() => {
      // Dynamic Fabric Physics State (viewBox 0 0 1000 500)
      const fabricState = {
        progress: 0,
      };

      const updateFabricPhysics = () => {
        const p = fabricState.progress;

        // When almost completely pulled away, hide the fabric layer cleanly
        if (p >= 0.98) {
          if (fabricSvgRef.current) fabricSvgRef.current.style.opacity = "0";
          if (personRef.current) personRef.current.style.opacity = "0";
          return;
        }

        if (fabricSvgRef.current) fabricSvgRef.current.style.opacity = "1";
        if (personRef.current) personRef.current.style.opacity = "1";

        // Hand position: Starts holding the top-right corner, pulls down-left
        // hx pulls from 940 down past left edge to -220
        // hy pulls from 60 down past bottom to 620
        const hx = 940 - p * 1180;
        const hy = 60 + p * 560;

        // Organic cloth wave / sag that reacts dynamically during mid-pull
        const sag = Math.sin(p * Math.PI) * 60;

        // 1. Main Fabric Sheet Shape (curves and billows as it's pulled)
        // Trailing bottom-right anchor gathers as fabric is pulled
        const rx = Math.max(-100, 1000 - p * 1150);
        const ry = 500;

        const mainD = `
          M 0 0
          C ${Math.max(0, hx * 0.35)} ${Math.max(0, hy * 0.2 + sag * 0.7)},
            ${Math.max(0, hx * 0.75)} ${Math.max(0, hy * 0.8 + sag)},
            ${hx} ${hy}
          C ${hx + (rx - hx) * 0.35} ${hy + (ry - hy) * 0.35 - sag * 0.4},
            ${hx + (rx - hx) * 0.75} ${hy + (ry - hy) * 0.75},
            ${rx} ${ry}
          L 0 500
          Z
        `;

        if (clothPathRef.current) {
          clothPathRef.current.setAttribute("d", mainD.trim());
        }

        // 2. Realistic Folded Cloth Flap (where fingers grip the corner)
        const flapD = `
          M ${hx - 65} ${hy - 30}
          C ${hx - 25} ${hy - 45}, ${hx + 30} ${hy - 20}, ${hx + 55} ${hy + 20}
          L ${hx} ${hy}
          Z
        `;

        if (flapPathRef.current) {
          flapPathRef.current.setAttribute("d", flapD.trim());
        }

        // 3. Dynamic Fabric Tension Creases radiating from the gripping hand
        const crease1D = `
          M ${hx} ${hy}
          C ${hx * 0.65} ${hy + 100 + sag * 0.5}, ${Math.max(20, hx * 0.3)} 320, 30 400
        `;
        const crease2D = `
          M ${hx} ${hy}
          C ${hx * 0.75} ${hy + 40}, ${Math.max(20, hx * 0.45)} 200, 15 180
        `;

        if (crease1Ref.current) crease1Ref.current.setAttribute("d", crease1D.trim());
        if (crease2Ref.current) crease2Ref.current.setAttribute("d", crease2D.trim());

        // 4. Man's Hand EXACTLY Pinpointed to (hx, hy)
        // person-pushing.png hand tip is at 58.3% X and 2.6% Y
        if (personRef.current) {
          personRef.current.style.left = `${(hx / 1000) * 100}%`;
          personRef.current.style.top = `${(hy / 500) * 100}%`;
        }

        // 5. Fade typography on the fabric as it is pulled off
        const textOpacity = Math.max(0, 1 - p * 1.8);
        if (helloTextRef.current) helloTextRef.current.style.opacity = `${textOpacity}`;
        if (subTextRef.current) subTextRef.current.style.opacity = `${textOpacity}`;
      };

      // Initialize fabric at rest
      updateFabricPhysics();

      if (cardsRef.current) {
        gsap.set(cardsRef.current, { opacity: 0.25, scale: 0.98 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(fabricState, {
        progress: 1,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: updateFabricPhysics,
      }, 0)
        // Reveal the 3 contact cards underneath smoothly
        .to(
          cardsRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
          },
          "-=1.6"
        );
    }, stageRef);

    return () => ctx.revert();
  }, []);



  return (
    <section id="contact" className="w-full scroll-mt-[62px] relative isolate overflow-hidden">


      {/* ========================================================== */}
      <div
        ref={stageRef}
        className="relative w-full overflow-hidden bg-white border-b border-gray-200 min-h-[calc(100vh-62px)] md:h-[calc(100vh-62px)] flex items-center justify-center select-none py-12 md:py-0 isolate"
      >
        {/* -------------------------------------------------------- */}
        {/* REVEALED BASE LAYER: 3 Contact Options (Underneath)      */}
        {/* -------------------------------------------------------- */}
        <div ref={cardsRef} className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">

            {/* 1. VISIT US */}
            <div className="flex flex-col items-center text-center px-6 sm:px-8 py-8 md:py-10 group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-orange-50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-xs border border-orange-100">
                <Home className="w-8 sm:w-10 h-8 sm:h-10 text-[#eb5406]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wider uppercase mb-2 font-sans">
                VISIT US
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs leading-relaxed mb-4">
                Visit our central community pharmacy for authetic, Imported & fair priced medicines.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-[#eb5406] hover:text-[#d44800] transition-colors hover:underline mt-auto"
              >
                Main Anum Sanam Chock, Gulbahar Road, Peshawar
              </a>
            </div>

            {/* 2. CALL US */}
            <div className="flex flex-col items-center text-center px-6 sm:px-8 py-8 md:py-10 group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-orange-50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-xs border border-orange-100">
                <Phone className="w-8 sm:w-10 h-8 sm:h-10 text-[#eb5406]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wider uppercase mb-2 font-sans">
                CALL US
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs leading-relaxed mb-4">
                Direct phone support for medicine inquiries, prescription scaling, dosage guidance, and express deliveries.
              </p>
              <a
                href="tel:+923322022221"
                className="text-xs sm:text-sm font-semibold text-[#eb5406] hover:text-[#d44800] transition-colors hover:underline mt-auto"
              >
                (+92) 332-2022221 (Whatsapp only)   (091)-7087235 (Call Us)


              </a>
            </div>

            {/* 3. CONTACT US */}
            <div className="flex flex-col items-center text-center px-6 sm:px-8 py-8 md:py-10 group">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-orange-50 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 shadow-xs border border-orange-100">
                <Mail className="w-8 sm:w-10 h-8 sm:h-10 text-[#eb5406]" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wider uppercase mb-2 font-sans">
                CONTACT US
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 max-w-xs leading-relaxed mb-4">
                Leave your email inquiry, send institutional prescription orders, or ask general healthcare questions anytime.
              </p>
              <a
                href="mailto:binghanipharmacy@gmail.com"
                className="text-xs sm:text-sm font-semibold text-[#eb5406] hover:text-[#d44800] transition-colors hover:underline mt-auto"
              >
                binghanipharmacy@gmail.com
              </a>
            </div>

          </div>

          {/* About Developer Section */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50/80 rounded-2xl px-5 py-3.5 border border-gray-200/60 max-w-2xl mx-auto shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#eb5406]/10 flex items-center justify-center text-[#eb5406] shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#eb5406] uppercase">
                  Website Developer
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                  Muhammad  Fahad • Website Developer
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

        {/* -------------------------------------------------------- */}
        {/* DYNAMIC ORANGE FABRIC SHEET OVERLAY (SVG Physics)         */}
        {/* -------------------------------------------------------- */}
        <svg
          ref={fabricSvgRef}
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden"
        >
          <defs>
            {/* Satin/Fabric Orange Gradient */}
            <linearGradient id="fabricOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f05a10" />
              <stop offset="45%" stopColor="#eb5406" />
              <stop offset="85%" stopColor="#d84800" />
              <stop offset="100%" stopColor="#bf3b00" />
            </linearGradient>

            {/* Underside Fold Shading */}
            <linearGradient id="fabricUndersideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d44800" />
              <stop offset="50%" stopColor="#b83800" />
              <stop offset="100%" stopColor="#8f2800" />
            </linearGradient>

            {/* Soft Fabric Drop Shadow */}
            <filter id="fabricShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-10" dy="14" stdDeviation="16" floodColor="#000000" floodOpacity="0.32" />
            </filter>
          </defs>

          {/* Main Fabric Sheet with Wave Contours */}
          <path
            ref={clothPathRef}
            fill="url(#fabricOrangeGrad)"
            filter="url(#fabricShadow)"
          />

          {/* Fabric Tension Creases from Hand Grip */}
          <path
            ref={crease1Ref}
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            ref={crease2Ref}
            fill="none"
            stroke="rgba(0, 0, 0, 0.12)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Typography Printed on Fabric */}
          <text
            ref={helloTextRef}
            x="130"
            y="210"
            fill="white"
            fontSize="76"
            fontWeight="bold"
            fontFamily="var(--font-cursive)"
            className="select-none"
          >
            Hello
          </text>
          <text
            ref={subTextRef}
            x="130"
            y="275"
            fill="white"
            fontSize="24"
            fontWeight="800"
            letterSpacing="2"
            fontFamily="sans-serif"
            className="select-none uppercase"
          >
            REACH OUT TO BIN GHANI PHARMACY!
          </text>

          {/* Folded Corner Underneath Hand Grip */}
          <path
            ref={flapPathRef}
            fill="url(#fabricUndersideGrad)"
            filter="url(#fabricShadow)"
          />
        </svg>

        {/* -------------------------------------------------------- */}
        {/* MAN EXACTLY CLAMPED TO THE FABRIC CORNER                */}
        {/* Hand tip of person-pushing.png is at 58.3% X and 2.6% Y */}
        {/* -------------------------------------------------------- */}
        <div
          ref={personRef}
          className="absolute z-30 w-48 sm:w-60 lg:w-72 h-[340px] sm:h-[420px] lg:h-[490px] pointer-events-none select-none"
          style={{
            transform: "translate(-58.3%, -2.6%)",
            transition: "opacity 0.2s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/person-pushing.png"
            alt="Man gripping fabric corner"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain object-top drop-shadow-2xl select-none"
          />
        </div>
      </div>



    </section>
  );
}
