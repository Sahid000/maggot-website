"use client";

import { useScroll } from "framer-motion";
import Lenis from "lenis";
import React, { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import MotiveOfTheProductCards from "../ui/Animation/MotiveOfTheProductCards";
import { AllImages } from "../../../public/assets/AllImages";
import AnimatedUnderline from "../ui/AnimatedUnderline";

const projects = [
  {
    index: 1,
    title: "দ্রুত ক্ষত সারানো",
    description:
      "ম্যাগট-ফ্রি রেসকিউ কিট বিশেষভাবে তৈরি, যা ব্যবহার করলে কয়েক ধাপেই ক্ষত সম্পূর্ণভাবে পরিষ্কার হয়। এটি ম্যাগট দূর করে, সংক্রমণ প্রতিরোধ করে এবং ক্ষত শুকানোর গতি বাড়ায়। জরুরি অবস্থায় প্রাণীকে ব্যথা ও যন্ত্রণা থেকে মুক্তি দিয়ে দ্রুত আরাম দেয়, যা তাদের জীবনের জন্য অত্যন্ত গুরুত্বপূর্ণ।",
    src: AllImages.motive1.src,
    link: "",
    color: "#fff",
  },
  {
    index: 2,
    title: "সম্পূর্ণ সমাধান",
    description:
      "এই কিটে রয়েছে প্রয়োজনীয় সব ওষুধ, পাউডার, অ্যান্টিবায়োটিক এবং চিকিৎসা সরঞ্জাম, যা আলাদা করে কিছু কিনতে হয় না। ক্ষত পরিষ্কারের প্রতিটি ধাপের জন্য প্রয়োজনীয় জিনিস এতে অন্তর্ভুক্ত, ফলে যেকোনো স্থানে সহজেই সম্পূর্ণ চিকিৎসা করা যায়। বিশেষ করে গ্রামীণ ও প্রত্যন্ত এলাকায় এটি অত্যন্ত কার্যকর।",
    src: AllImages.motive2.src,
    link: "",
    color: "#fff",
  },
  {
    index: 3,
    title: "সহজ ব্যবহারযোগ্য",
    description:
      "ম্যাগট-ফ্রি রেসকিউ কিট এমনভাবে ডিজাইন করা হয়েছে যাতে যে কেউ, এমনকি অভিজ্ঞতা ছাড়াই, এটি ব্যবহার করতে পারে। প্রতিটি কিটে ধাপে ধাপে ছবিসহ নির্দেশিকা থাকে, যেখানে ক্ষত পরিষ্কার, ম্যাগট অপসারণ এবং ওষুধ প্রয়োগের পদ্ধতি সহজ ভাষায় ব্যাখ্যা করা হয়েছে। এতে প্রাণীর যন্ত্রণা দ্রুত কমে এবং সুস্থ হওয়ার প্রক্রিয়া ত্বরান্বিত হয়।",
    src: AllImages.motive3.src,
    link: "",
    color: "#fff",
  },
];

const MotiveOfTheProduct = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
    <main
      id="how-it-works"
      ref={container}
      className="relative bg-secondary-color"
    >
      <Container>
        <div className="pt-20">
          <div>
            <h5 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-primary-color mb-0.5">
              ম্যাগট-ফ্রি রেসকিউ কিট এর কার্যকারিতা
            </h5>
            <AnimatedUnderline className="ml-12 bg-primary-color" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-primary-color py-1 mt-4">
            দ্রুত ক্ষত পরিষ্কার, ম্যাগট অপসারণ ও সংক্রমণ প্রতিরোধে প্রমাণিত
            কার্যকর সমাধান
          </h1>
        </div>

        {projects.map((project, i) => {
          const widthPercentage = 100 - i * 1.5;
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <MotiveOfTheProductCards
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress.get()}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
              widthPercentage={widthPercentage}
            />
          );
        })}
      </Container>
    </main>
  );
};

export default MotiveOfTheProduct;
