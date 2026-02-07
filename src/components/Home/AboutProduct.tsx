"use client";

import { useRef } from "react";

import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import Container from "../ui/Container";
import AnimatedUnderline from "../ui/AnimatedUnderline";
import { AllImages } from "../../../public/assets/AllImages";
import OrderNowButton from "./OrderNowButton";

const intro = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const introChildren = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, type: "spring" },
  },
};

const features = [
  "সহজ ও দ্রুত সমাধান: কুকুর ও বিড়ালের ম্যাগট আক্রমণের যন্ত্রণাদায়ক সমস্যার তাৎক্ষণিক চিকিৎসা।",
  "সম্পূর্ণ কিট: প্রয়োজনীয় সব ওষুধ ও পাউডারসহ সম্পূর্ণ সেট, যা আপনাকে আলাদা কিছু কিনতে হবে না।",
  "সহজে ব্যবহারযোগ্য: ধাপে ধাপে নির্দেশিকাসহ, সবাই সহজেই এটি ব্যবহার করতে পারবে।",
  "স্বাস্থ্যকর পণ্য: কুকুর ও বিড়ালের জন্য নিরাপদ ও কার্যকরী।",
  "প্রত্যন্ত এলাকায় কার্যকরী: রাস্তার প্রাণীদের চিকিৎসা দিতে দ্রুত সাহায্য।",
  "সাশ্রয়ী এবং অ্যাক্সেসযোগ্য: ছোট-বড় যেকোনো পরিমাণে অর্ডার করলে বিশেষ ছাড় এবং সারা দেশে শিপিং।",
  "প্রথমবারের জন্য উপলব্ধ: বাংলাদেশে প্রথমবারের মতো ম্যাগট আক্রমণ প্রতিরোধের এই ধরনের পণ্য।",
];

const AboutProduct = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div id="about-product" className="overflow-hidden mb-16">
      <Container>
        <div className="mb-10 ">
          <div>
            <h5 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-secondary-color mb-0.5">
              ম্যাগট-ফ্রি রেসকিউ কিট কি
            </h5>
            <AnimatedUnderline className="ml-12" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-secondary-color py-1 mt-4">
            কুকুর ও বিড়ালের ম্যাগট আক্রমণ দ্রুত ও কার্যকরভাবে চিকিৎসার জন্য
            প্রস্তুত সম্পূর্ণ কিট।
          </h1>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
        >
          <div>
            <motion.div
              variants={intro}
              initial="hidden"
              animate={isInView ? "visible" : ""}
              className="flex flex-col items-start gap-1 pt-10"
            >
              {features.map((point, index) => (
                <motion.div
                  key={index}
                  variants={introChildren}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div>
                    <IoCheckmarkCircleSharp className=" w-5 h-5 text-secondary-color" />
                  </div>

                  <div className="py-0 text-left">
                    <p className="mt-1 text-base xl:text-lg">{point}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Button  */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : ""}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-fit mt-5"
            >
              {" "}
              <OrderNowButton />
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src={AllImages.about}
              width={0}
              height={0}
              alt="hero-banner"
              className="rounded-xl w-full h-full max-h-[600px] aspect-square object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default AboutProduct;
