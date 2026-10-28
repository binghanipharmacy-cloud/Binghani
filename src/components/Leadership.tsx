"use client";

import React from "react";
import { Award, GraduationCap, FileBadge, Heart, Stethoscope, Mail, Phone } from "lucide-react";

export default function Leadership() {
  const leaders = [
    {
      name: "Dr. Tariq Bin Ghani",
      role: "Founder & Pharmacist-in-Chief",
      credentials: "Pharm.D, M.Phil Clinical Pharmacy, RPh #7284",
      bio: "With over 26 years of dedicated pharmaceutical practice, Dr. Tariq established Bin Ghani Pharmacy to set an uncompromising benchmark for genuine medicines in the capital. He has served as a visiting lecturer on pharmacovigilance and actively champions anti-counterfeit advocacy across national healthcare forums.",
      philosophy: "A pharmacy is not merely a dispensary of chemical compounds—it is the final, vital checkpoint between diagnosis and healing.",
      badges: ["26+ Years Experience", "Gold Medalist Pharm.D", "Hospital Formulations Consultant"]
    },
    {
      name: "Dr. Fatima Bin Ghani",
      role: "Lead Clinical Pharmacotherapy Specialist",
      credentials: "Pharm.D, Board Certified Pharmacotherapy Specialist (BCPS)",
      bio: "Specializing in chronic disease medication therapy management and pediatric dosage scaling, Dr. Fatima oversees patient consultations at Bin Ghani. Her work focuses on preventing multi-drug interactions in elderly cardiac and diabetic patients.",
      philosophy: "Our obligation to the patient only begins when the medicine is handed over. True clinical care means ensuring the patient understands why, when, and how to heal.",
      badges: ["BCPS Certified", "Diabetic Care Fellow", "Pediatric Dosing Lead"]
    },
    {
      name: "M. Salman Farooq",
      role: "Director of Cold-Chain & Quality Assurance",
      credentials: "M.Sc Pharmaceutical Quality Management",
      bio: "Managing Bin Ghani's proprietary 24/7 IoT thermal sensor infrastructure, Salman directs all distributor audit protocols, batch serial verification, and ensures full DRAP (Drug Regulatory Authority) compliance across all supply lines.",
      philosophy: "A single hour outside the required 2°C to 8°C thermal window can render a life-saving biologic ineffective. Quality control is non-negotiable.",
      badges: ["ISO 9001 Lead Auditor", "Cold-Chain Specialist", "DRAP Regulatory Liaison"]
    }
  ];

  return (
    <section id="leadership" className="py-12 sm:py-16 bg-[#faf9f6] border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[2px] bg-[#eb5406]"></span>
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#eb5406] uppercase">
              Clinical Leadership & Pharmacists
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#111827] tracking-tight">
            Guided by Licensed Clinical Pharmacists
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            The Bin Ghani reputation rests upon the academic rigor, ethical leadership, and clinical expertise of our registered pharmacists.
          </p>
        </div>

        {/* Featured Founder Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Portrait Placeholder with High Aesthetic Initials & Brand Seal */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-gradient-to-br from-[#121820] to-[#1e293b] p-2 shadow-xl flex items-center justify-center text-white overflow-hidden group">
                <div className="absolute inset-0 bg-[#eb5406]/10 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-center relative z-10 p-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#eb5406] text-white flex items-center justify-center font-serif text-3xl font-bold mb-3 shadow-md">
                    TBG
                  </div>
                  <div className="font-serif font-bold text-xl text-white">Dr. Tariq Bin Ghani</div>
                  <div className="text-xs text-orange-200 tracking-wider font-mono mt-1">Founder & Chief Pharmacist</div>
                  <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] text-gray-300 border border-white/10">
                    <GraduationCap className="w-3.5 h-3.5 text-[#eb5406]" />
                    Pharm.D, M.Phil
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Narrative & Biography */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100/70 text-[#eb5406] border border-orange-200">
                  Founder&apos;s Profile & Biography
                </span>
                <span className="text-xs text-gray-500 font-mono">
                  Registration #DRAP-PK-RPH-7284
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-gray-900 mb-1">
                Dr. Tariq Bin Ghani
              </h3>
              <div className="text-sm font-semibold text-[#eb5406] mb-4">
                Founder, Pharmacist-in-Chief & Community Health Advocate
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">
                Dr. Tariq Bin Ghani is a veteran clinical pharmacist with over a quarter-century of frontline healthcare service. After completing his Doctor of Pharmacy and post-graduate M.Phil in Clinical Pharmacy, Dr. Tariq observed a pressing void in community healthcare: patient counseling was neglected and retail dispensaries often lacked genuine temperature controls.
              </p>

              <blockquote className="p-4 border-l-4 border-[#eb5406] bg-[#faf9f6] rounded-r-xl italic text-gray-800 text-sm sm:text-base font-serif mb-6">
                &ldquo;When a patient walks into our pharmacy, they are seeking more than a medicine strip—they are placing their family&apos;s health in our hands. That sacred trust cannot be compromised by margins or negligence.&rdquo;
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {leaders[0].badges.map((b, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-xs font-semibold text-gray-700 border border-gray-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Clinical Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {leaders.slice(1).map((leader, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs hover:border-[#eb5406]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#eb5406] flex items-center justify-center font-bold text-lg font-serif">
                    {leader.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-serif text-gray-900">
                      {leader.name}
                    </h4>
                    <div className="text-xs text-[#eb5406] font-semibold">
                      {leader.role}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-gray-500 mb-3 bg-gray-50 px-2.5 py-1 rounded-md inline-block">
                  {leader.credentials}
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {leader.bio}
                </p>

                <p className="text-xs italic text-gray-700 font-serif border-l-2 border-[#eb5406] pl-3 py-1 mb-6">
                  &ldquo;{leader.philosophy}&rdquo;
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {leader.badges.map((b, i) => (
                  <span key={i} className="px-2.5 py-0.5 bg-gray-50 text-[11px] font-medium text-gray-600 rounded border border-gray-200">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
