"use client";

import React, { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  // Official Bin Ghani Pharmacy WhatsApp number
  const phoneNumber = "923322022221";
  const defaultMessage = encodeURIComponent(
    "Hello Bin Ghani Pharmacy, I would like to inquire about prescription medicines & healthcare assistance."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="WhatsApp live chat support"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 print:hidden"
    >
      {/* Floating Tooltip Label */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-[#1a1f2c]/95 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-xl border border-white/10 transition-all duration-300 pointer-events-none select-none ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-3"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
        <span>Chat with Pharmacist</span>
      </div>

      {/* WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly on WhatsApp with Bin Ghani Pharmacy"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-2xl hover:shadow-[0_10px_25px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
      >
        {/* Soft Animated Ping Ring */}
        <span
          className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp Official Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16c0 2.64.72 5.11 1.97 7.23L2 30l7-1.83C11.04 29.35 13.44 30 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm0 25.55c-2.24 0-4.32-.62-6.11-1.69l-.44-.26-4.55 1.19 1.21-4.43-.29-.46C4.66 20.08 4.05 18.1 4.05 16c0-6.59 5.36-11.95 11.95-11.95 6.59 0 11.95 5.36 11.95 11.95 0 6.59-5.36 11.95-11.95 11.95zm6.55-8.96c-.36-.18-2.12-1.05-2.45-1.17-.33-.12-.57-.18-.81.18-.24.36-.93 1.17-1.14 1.41-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.9-1.79-1.07-.95-1.8-2.13-2.01-2.49-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.61-.81-.62-.21-.01-.45-.01-.69-.01-.24 0-.63.09-.96.45-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.88 6.16 5.44.86.37 1.53.59 2.06.76.87.28 1.66.24 2.29.15.7-.1 2.12-.87 2.42-1.71.3-.84.3-1.56.21-1.71-.09-.15-.33-.24-.69-.42z" />
        </svg>

        {/* Online Indicator Badge */}
        <span
          className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-xs"
          title="Pharmacist online"
        />
      </a>
    </aside>
  );
}
