"use client";

import React from "react";

interface CategoryData {
  id: string;
  title: string;
  tagline: string;
  items: string[];
}

export default function ProductsCatalog() {
  const categories: CategoryData[] = [
    {
      id: "general",
      title: "General Medicines",
      tagline: "Prescription & Daily Healthcare",
      items: [
        "Allopathic Medicines",
        "Remedies & OTC",
        "Antibiotics & Anti-Infectives",
        "Vitamins & Minerals",
        "Health Supplements",
      ],
    },
    {
      id: "medical-supply",
      title: "Medical Supplies",
      tagline: "Surgical & Rehabilitation",
      items: [
        "Surgical Equipment",
        "First Aid Kits",
        "Orthopedic Products",
        "Pain Management Solutions",
      ],
    },
    {
      id: "herbal-beauty",
      title: "Herbal & Beauty",
      tagline: "Natural Wellness & Skin",
      items: [
        "Herbal Supplements",
        "Skincare Products",
        "Cosmetics",
        "Personal Care Items",
      ],
    },
    {
      id: "family-baby",
      title: "Family & Baby Care",
      tagline: "Maternal & Infant Essentials",
      items: [
        "Family Planning Products",
        "Baby Care Items",
        "Toiletries",
        "Feeding Essentials",
      ],
    },
    {
      id: "lifestyle",
      title: "Lifestyle & Grooming",
      tagline: "Personal Fragrance & Care",
      items: [
        "Branded Perfumes",
        "Deodorants",
        "Shampoos & Haircare",
        "Toothpastes & Oral Care",
        "Personal Electrical Items",
      ],
    },
  ];

  return (
    <section
      id="products"
      className="relative w-full lg:h-[calc(100vh-62px)] py-12 lg:py-0 bg-white text-gray-900 border-b border-gray-100 scroll-mt-[62px] flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center py-4 lg:py-0">

        {/* ================================================== */}
        {/* Section Header */}
        {/* ================================================== */}
        <div className="mb-6 lg:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#eb5406]"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#eb5406] uppercase">
              Inventory Items
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-gray-900 tracking-tight leading-tight">
            Our Products
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm mt-1.5 max-w-none md:whitespace-nowrap">
            Complete inventory of DRAP-verified medicines, medical supplies, cosmetics, infant care, and personal grooming.
          </p>
        </div>

        {/* ================================================== */}
        {/* Product Category Cards: 2-column vertical grid on mobile, 5-column single line on desktop */}
        {/* ================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 items-stretch">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`${idx === 4 ? "col-span-2 sm:col-span-1 lg:col-span-1" : "col-span-1"
                } group relative bg-[#faf9f6] rounded-none p-4 sm:p-5 lg:p-5 xl:p-6 border border-gray-200 hover:border-[#eb5406]/80 hover:bg-white hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between will-change-transform cursor-pointer`}
            >
              <div>
                {/* Title & Tagline */}
                <h3 className="font-serif text-base sm:text-lg lg:text-[17px] xl:text-[19px] font-bold text-gray-900 group-hover:text-[#eb5406] transition-colors leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#eb5406] font-medium mt-1 leading-tight">
                  {cat.tagline}
                </p>

                {/* Sub-item List */}
                <ul className="space-y-2.5 sm:space-y-3 mt-4 pt-3.5 border-t border-gray-200/70 text-xs sm:text-[13px] text-gray-700">
                  {cat.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#eb5406] mt-1.5 shrink-0 opacity-80 group-hover:scale-110 transition-transform" />
                      <span className="font-medium group-hover:text-gray-950 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
