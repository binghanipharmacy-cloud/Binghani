"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  id: number;
  image: string;
  badge: string;
  headline: string;
  highlight: string;
  description: string;
  tag: string;
}

interface MainHeroSliderProps {
  isActive?: boolean;
}

export default function MainHeroSlider({ isActive = true }: MainHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  const slides: SlideData[] = [
    {
      id: 1,
      image: "/hero-interior-panoramic.jpg",
      badge: "Bin Ghani Healthcare • Community Dispensary",
      headline: "Always Here at Your Service for Your",
      highlight: "Health & Wellbeing.",
      description: "Welcome to Bin Ghani Pharmacy. Fully equipped with 100% authentic medicines, precision cold-chain storage, and qualified clinical pharmacists dedicated to your family's care, comfort, and wellbeing 365 days a year.",
      tag: "At Your Service 365 Days",
    },
    {
      id: 2,
      image: "/hero-staff-counter.jpg",
      badge: "Expert Healthcare Team • Licensed Pharmacists",
      headline: "Knowledgeable, Caring & Highly",
      highlight: "Experienced Pharmacy Staff.",
      description: "Our certified clinical team brings decades of combined pharmaceutical expertise to every consultation—ensuring accurate dosage verification, drug interaction screening, precision dispensing, and warm patient-first care.",
      tag: "Certified Clinical Experts",
    },
    {
      id: 3,
      image: "/slide1.jpg",
      badge: "Bin Ghani Healthcare • Specialized Care",
      headline: "Dedicated Clinical Support for",
      highlight: "Diabetic Patient Care.",
      description: "Our licensed pharmacy team provides personalized blood glucose counseling, prescription insulin cold-chain integrity, medication therapy reviews, and continuous diabetic wellness support.",
      tag: "Diabetic Care Center",
    },
    {
      id: 4,
      image: "/slide2.jpg",
      badge: "Mother & Baby Wellness",
      headline: "Complete Maternal &",
      highlight: "Premium Baby Care.",
      description: "Discover our extensive collection of certified baby care essentials—including premier infant formulas, trusted diapers, gentle shampoos, dermatological oils, feeding accessories, and pediatric hygiene products for your little one.",
      tag: "Maternal & Infant Care",
    },
    {
      id: 5,
      image: "/slide3.jpg",
      badge: "Vitality & Nutritional Wellness",
      headline: "Targeted Multivitamins & Supplements for",
      highlight: "Men & Women's Wellbeing.",
      description: "Boost your daily energy, immunity, bone health, and overall vitality with our pharmacist-curated range of authentic multivitamins, omega-3 fatty acids, and essential micronutrients tailored for every stage of life.",
      tag: "Nutritional Health & Wellness",
    },
    {
      id: 6,
      image: "/slide4.jpg",
      badge: "Geriatric & Chronic Pain Support",
      headline: "Compassionate Elder Care &",
      highlight: "Pain & Bone Health.",
      description: "Supporting our seniors with tailored chronic pain management, bone density and calcium therapies, joint mobility solutions, and compassionate guidance for a healthy, active lifestyle.",
      tag: "Elderly Wellness & Mobility",
    },
    {
      id: 7,
      image: "/slide5.jpg",
      badge: "Clinical Equipment & Emergency Supplies",
      headline: "Certified Surgical Instruments &",
      highlight: "Emergency First Aid Kits.",
      description: "Equipping households, clinics, and workplaces with hospital-grade first aid kits, sterile surgical instruments, wound care dressings, bandages, antiseptics, and essential emergency medical supplies.",
      tag: "Surgical & Emergency Care",
    },
    {
      id: 8,
      image: "/slide6.jpg",
      badge: "Personal Care & Daily Essentials",
      headline: "Premium Toiletries, Skincare &",
      highlight: "Personal Grooming Essentials.",
      description: "Explore our wide collection of leading branded shampoos, nourishing body lotions, aftershaves, signature perfumes, oral care toothpastes, and daily hygiene essentials for men and women.",
      tag: "Personal Care & Hygiene",
    },
    {
      id: 9,
      image: "/slide7.jpg",
      badge: "Maternal Comfort & Nursing Care",
      headline: "Comfortable Nursing &",
      highlight: "Mother's Feeding Essentials.",
      description: "Providing ease for nursing mothers with premium ergonomic breast pumps, anti-colic feeding bottles, milk storage systems, and specialized lactation multivitamins for maternal vitality.",
      tag: "Feeding Essentials & Nursing",
    },
  ];

  // GSAP animation for text transition on slide change
  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".slider-animated-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, [currentSlide]);

  // Reset to 1st slide whenever the hero section becomes active
  useEffect(() => {
    if (isActive) {
      setCurrentSlide(0);
    }
  }, [isActive]);

  // Listen for global reset events (e.g. logo clicked or back to top)
  useEffect(() => {
    const handleReset = () => {
      setCurrentSlide(0);
    };
    window.addEventListener("resetHeroSlider", handleReset);
    return () => window.removeEventListener("resetHeroSlider", handleReset);
  }, []);

  // Reset to 1st slide when user navigates/scrolls back to the hero section
  useEffect(() => {
    if (!slideContainerRef.current) return;
    let wasOutOfView = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && wasOutOfView) {
          setCurrentSlide(0);
          wasOutOfView = false;
        } else if (!entry.isIntersecting) {
          wasOutOfView = true;
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(slideContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // Automatic slide rotation only if active and multiple slides exist
  useEffect(() => {
    if (!isActive || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isActive, slides.length, currentSlide]);

  const handlePrev = () => {
    if (isTransitioningRef.current || slides.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioningRef.current || slides.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      id="hero"
      ref={slideContainerRef}
      className="relative w-full h-[calc(100dvh-60px)] min-h-[calc(100dvh-60px)] lg:h-[80vh] lg:min-h-[560px] lg:max-h-[720px] bg-[#0b1016] text-white overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image - clearly visible with object positioning */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.headline}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`w-full h-full object-cover ${
                slide.image === "/hero-interior-panoramic.jpg" || slide.image === "/hero-staff-counter.jpg"
                  ? "object-center"
                  : "object-center md:object-right"
              }`}
            />

            {/* Gradient Overlays: Darker on left for text readability, clear on right to showcase photo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b0fe6] via-[#070b0fb3] to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b0fe6] via-transparent to-black/30"></div>
          </div>
        );
      })}

      {/* Slide Content Layer */}
      <div
        ref={textRef}
        className="relative z-20 max-w-6xl mx-auto h-full px-5 sm:px-8 lg:px-12 flex flex-col justify-center pb-24 sm:pb-0"
      >
        <div className="max-w-2xl">

          {/* Headline */}
          <h2 className="slider-animated-item text-3xl sm:text-4xl lg:text-[46px] font-bold font-serif tracking-tight text-white leading-[1.12] mb-3">
            {slides[currentSlide].headline}{" "}
            <span className="italic font-normal text-[#eb5406]">
              {slides[currentSlide].highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="slider-animated-item text-xs sm:text-sm md:text-base text-gray-200 font-normal leading-relaxed max-w-xl drop-shadow-sm">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Manual Navigation Controls - only rendered if multiple slides exist */}
      {slides.length > 1 && (
        <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 right-auto sm:right-8 lg:right-12 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? "w-6 bg-[#eb5406]" : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
            <span className="text-[10px] font-mono text-gray-400 pl-1">
              0{currentSlide + 1}/0{slides.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 flex items-center justify-center text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
