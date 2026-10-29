"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import MainHeroSlider from "@/components/MainHeroSlider";
import WhoWeAre from "@/components/WhoWeAre";
import LandingPage from "@/components/LandingPage";
import PageSkeleton from "@/components/PageSkeleton";
import Footer from "@/components/Footer";

// ─── PERFORMANCE CODE-SPLITTING: Below-the-fold dynamic chunks ────────────────
const MissionValues = dynamic(() => import("@/components/MissionValues"), { ssr: true });
const ProductsCatalog = dynamic(() => import("@/components/ProductsCatalog"), { ssr: true });
const LicensedPharmacist = dynamic(() => import("@/components/LicensedPharmacist"), { ssr: true });
const CeoMessage = dynamic(() => import("@/components/CeoMessage"), { ssr: true });
const ReturnPolicy = dynamic(() => import("@/components/ReturnPolicy"), { ssr: true });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: true });
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  const [hasExplored, setHasExplored] = useState(false);
  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);

  useEffect(() => {
    if (!hasExplored) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hasExplored]);

  // Handle user clicking Explore: shows pure layout shimmer skeleton without any loader writing
  const handleExplore = () => {
    setHasExplored(true);
    setIsLoadingSkeleton(true);

    setTimeout(() => {
      setIsLoadingSkeleton(false);
    }, 1200);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white relative">
      {/* Landing Splash Page - Storefront Exterior Picture & Explore Button */}
      {!hasExplored && (
        <LandingPage onExplore={handleExplore} />
      )}

      {/* Pure Layout Shimmer Skeleton (Without any loader text or writing) */}
      {isLoadingSkeleton && <PageSkeleton />}

      {/* Main Website Content - Smoothly fades in as skeleton finishes */}
      <div
        className={`flex flex-col transition-opacity duration-700 ${
          isLoadingSkeleton ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
        }`}
      >
        {/* Main Navigation Bar with Logo and Links */}
        <Navbar />

        {/* 1. Main Hero Slider with smooth auto-scrolling images and GSAP text */}
        <MainHeroSlider isActive={hasExplored && !isLoadingSkeleton} />

        {/* 2. Who We Are Section */}
        <WhoWeAre />

        {/* 3. Mission Infographic Section */}
        <MissionValues />

        {/* 4. Products & Formulations Showcase */}
        <ProductsCatalog />

        {/* 5. Licensed Clinical Pharmacist Profile & Verification */}
        <LicensedPharmacist />

        {/* 6. Message from the Founder & CEO */}
        <CeoMessage />

        {/* 7. Return & Exchange Policy */}
        <ReturnPolicy />

        {/* 8. Contact Section & FAQs */}
        <ContactSection />

        {/* 9. Footer */}
        <Footer />

        {/* 9. Floating WhatsApp Live Chat Support at Bottom-Right */}
        <WhatsAppButton />
      </div>
    </main>
  );
}
