"use client";

import React from "react";

export default function PageSkeleton() {
  return (
    <div
      className="fixed inset-0 z-40 bg-white overflow-hidden flex flex-col pointer-events-none select-none animate-fadeIn"
      aria-hidden="true"
    >
      {/* ─── 1. NAVBAR SKELETON ──────────────────────────────────────────────── */}
      <header className="h-[62px] w-full border-b border-gray-100 px-4 sm:px-8 lg:px-12 py-2 flex items-center justify-between bg-white/95 backdrop-blur-md">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg skeleton-shimmer shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className="w-24 h-4 rounded-md skeleton-shimmer" />
            <div className="w-16 h-2 rounded-md skeleton-shimmer" />
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="w-14 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-16 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-16 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-20 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-20 h-3.5 rounded-full skeleton-shimmer" />
          <div className="w-16 h-3.5 rounded-full skeleton-shimmer" />
        </div>

        {/* Right CTA / Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block w-32 h-9 rounded-full skeleton-shimmer" />
          <div className="lg:hidden w-8 h-8 rounded-md skeleton-shimmer" />
        </div>
      </header>

      {/* ─── 2. HERO SLIDER SKELETON ────────────────────────────────────────── */}
      <div className="relative w-full h-[540px] sm:h-[620px] bg-[#0c131d] overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Ambient Dark Shimmer Backdrop */}
        <div className="absolute inset-0 skeleton-shimmer-dark opacity-60" />

        {/* Top Tagline Pill */}
        <div className="relative z-10 w-48 sm:w-64 h-6 rounded-full skeleton-shimmer-dark border border-white/10" />

        {/* Main Headline & Description Bars */}
        <div className="relative z-10 max-w-3xl space-y-4 my-auto">
          {/* Big Headline */}
          <div className="w-3/4 h-8 sm:h-12 rounded-xl skeleton-shimmer-dark border border-white/10" />
          <div className="w-1/2 h-8 sm:h-12 rounded-xl skeleton-shimmer-dark border border-white/10" />

          {/* Subtitle Lines */}
          <div className="space-y-2 pt-2">
            <div className="w-full max-w-xl h-3.5 rounded-md skeleton-shimmer-dark opacity-80" />
            <div className="w-4/5 max-w-lg h-3.5 rounded-md skeleton-shimmer-dark opacity-80" />
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <div className="w-36 h-11 rounded-full skeleton-shimmer-dark border border-white/15" />
            <div className="w-32 h-11 rounded-full skeleton-shimmer-dark border border-white/15" />
          </div>
        </div>

        {/* Bottom Carousel Dots */}
        <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-2.5 rounded-full skeleton-shimmer-dark" />
            <div className="w-2.5 h-2.5 rounded-full skeleton-shimmer-dark" />
            <div className="w-2.5 h-2.5 rounded-full skeleton-shimmer-dark" />
          </div>
          <div className="w-28 h-3 rounded-md skeleton-shimmer-dark" />
        </div>
      </div>

      {/* ─── 3. WHO WE ARE SKELETON PREVIEW ─────────────────────────────────── */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 opacity-40">
        <div className="lg:col-span-5 h-64 rounded-2xl skeleton-shimmer" />
        <div className="lg:col-span-7 space-y-4">
          <div className="w-32 h-4 rounded-md skeleton-shimmer" />
          <div className="w-3/4 h-8 rounded-xl skeleton-shimmer" />
          <div className="w-full h-16 rounded-xl skeleton-shimmer" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="h-16 rounded-xl skeleton-shimmer" />
            <div className="h-16 rounded-xl skeleton-shimmer" />
            <div className="h-16 rounded-xl skeleton-shimmer" />
            <div className="h-16 rounded-xl skeleton-shimmer" />
          </div>
        </div>
      </div>

      {/* ─── 4. FLOATING MICRO-STATUS CAPSULE ────────────────────────────────── */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white shadow-2xl text-xs font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#eb5406] animate-ping" />
          <span>Loading Bin Ghani Dispensary...</span>
        </div>
      </div>
    </div>
  );
}
