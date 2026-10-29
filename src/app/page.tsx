"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import MainHeroSlider from "@/components/MainHeroSlider";
import WhoWeAre from "@/components/WhoWeAre";
import LandingPage from "@/components/LandingPage";
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

  // Handle user clicking Explore: immediately reveals main page without loader delay
  const handleExplore = () => {
    setHasExplored(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white relative">
      {/* Landing Splash Page - Storefront Exterior Picture & Explore Button */}
      {!hasExplored && (
        <LandingPage onExplore={handleExplore} />
      )}

      {/* Main Website Content - Revealed directly without loading delay */}
      <div className="flex flex-col">
        {/* Main Navigation Bar with Logo and Links */}
        <Navbar />

        {/* 1. Main Hero Slider with smooth auto-scrolling images and GSAP text */}
        <MainHeroSlider isActive={hasExplored} />

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
