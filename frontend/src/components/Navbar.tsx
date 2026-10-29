"use client";

import React, { useState } from "react";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Mission", href: "#mission" },
    { name: "Products", href: "#products" },
    { name: "Our Team", href: "#team" },
    { name: "Leadership", href: "#leadership" },
    { name: "Return Policy", href: "#return-policy" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
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
    <nav className="sticky top-0 z-40 h-[62px] bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all flex items-center">
      <div className="w-full px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between">
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
        <div className="hidden lg:flex items-center gap-6">
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

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="text-base font-medium text-gray-800 hover:text-[#eb5406] py-1 border-b border-gray-50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-[#eb5406] rounded-md shadow-sm"
              >
                <PhoneCall className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
