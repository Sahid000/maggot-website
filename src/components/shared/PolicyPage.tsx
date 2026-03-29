import React from "react";
import { PolicyContent } from "@/content/policies";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

const PolicyPage = ({ content }: { content: PolicyContent }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8 transition-colors"
        >
          <FiArrowLeft size={15} />
          হোমে ফিরে যান
        </Link>

        {/* Header */}
        <div
          className="rounded-2xl px-8 py-8 mb-8"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}
        >
          <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-2">
            ম্যাগট-ফ্রি রেসকিউ কিট
          </p>
          <h1 className="text-3xl font-bold text-white">{content.title}</h1>
          <p className="text-white/50 text-sm mt-2">সর্বশেষ আপডেট: {content.lastUpdated}</p>
        </div>

        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-8 text-[15px]">{content.intro}</p>

        {/* Sections */}
        <div className="space-y-6">
          {content.sections.map((section) => (
            <div
              key={section.heading}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm px-7 py-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">{section.heading}</h2>
              <ul className="space-y-2.5">
                {section.body.map((line, i) => (
                  <li key={i} className="flex gap-3 text-[14.5px] text-gray-600 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-xs mt-10">
          কোনো প্রশ্ন থাকলে{" "}
          <Link href="/#contact" className="text-yellow-500 hover:underline">
            আমাদের সাথে যোগাযোগ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PolicyPage;
