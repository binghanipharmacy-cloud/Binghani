"use client";

import React, { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Mission", href: "#mission" },
    { name: "Products", href: "#products" },
    { name: "Our Team", href: "#team" },
    { name: "Leadership", href: "#leadership" },
    { name: "Return Policy", href: "#return-policy" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#" || href === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("resetHeroSlider"));
      return;
    }
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        const navHeight = 62;
        const targetPos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("resetHeroSlider"));
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="w-full h-[62px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Logo with White Background Container */}
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center border border-gray-200/80 shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="Bin Ghani Pharmacy Logo" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-bold font-serif tracking-tight text-[#eb5406]">
              Bin Ghani
            </span>
            <span className="text-[9px] font-bold tracking-[0.25em] text-gray-500 uppercase">
              Pharmacy
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs sm:text-sm font-medium text-gray-700 hover:text-[#eb5406] transition-colors relative py-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="inline-flex items-center justify-center px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-[#eb5406] hover:bg-[#d44800] rounded shadow-xs transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Mobile menu toggle button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-gray-900 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[62px] bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile full-width dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[62px] left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 max-h-[calc(100vh-62px)] overflow-y-auto">
          <div className="px-5 py-3 flex flex-col divide-y divide-gray-100">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="flex items-center justify-between py-3 text-[15px] font-semibold text-gray-800 hover:text-[#eb5406] active:text-[#eb5406] transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-gray-300 text-xs font-mono">→</span>
              </a>
            ))}
          </div>

          <div className="p-4 bg-[#faf9f6] border-t border-gray-100 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleNavClick(e, "#contact");
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-[#eb5406] hover:bg-[#d44800] rounded-lg shadow-md active:scale-[0.99] transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact Us</span>
            </a>
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono px-1">
              <span>Bin Ghani Pharmacy</span>
              <span className="text-[#eb5406] font-semibold">Open Daily 9 AM - 2 AM</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
