"use client";

import { useRef } from "react";

import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "../ui/Container";
import AnimatedUnderline from "../ui/AnimatedUnderline";
import { AllImages } from "../../../public/assets/AllImages";
import { BsCartCheck } from "react-icons/bs";
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
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.2, type: "spring" },
  },
};

const features = [
  "A-Mectin Vet Ivermectin Drop — ১টি",
  "Alice 12 mg ট্যাবলেট (Ivermectin) — ২টি",
  "Scabo 6 mg ট্যাবলেট (Ivermectin) — ২টি",
  "Moxacil 500 mg Capsule — ৫টি",
  "Nebanol Powder — ১টি",
  "Profenid-E 50 mg Tablet — ২টি",
  "Step-by-step Guide Book — ১টি",
];

const ProductOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <div id="kit" className="overflow-hidden my-16">
      <Container>
        <div className="mb-10 ">
          <div>
            <h5 className="text-xs sm:text-sm lg:text-base xl:text-lg font-semibold text-secondary-color mb-0.5">
              কিটে যা পাবেন:
            </h5>
            <AnimatedUnderline className="ml-12" />
          </div>
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 text-secondary-color py-1 mt-4">
            প্রতিটি কিটে প্রয়োজনীয় সব ওষুধ ও সরঞ্জাম একসাথে
          </h1>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start"
        >
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : ""}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Image
              src={AllImages.about}
              width={0}
              height={0}
              alt="hero-banner"
              className="rounded-xl w-full h-full max-h-[600px]  aspect-square object-cover "
            />
          </motion.div>
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
                    <BsCartCheck className=" w-5 h-5 text-secondary-color" />
                  </div>

                  <div className="text-left">
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
        </div>
      </Container>
    </div>
  );
};

export default ProductOverview;
