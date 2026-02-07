import React, { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import Image from "next/image";
import OrderNowButton from "@/components/Home/OrderNowButton";

const MotiveOfTheProductCards = ({
  i,
  index,
  title,
  description,
  src,
  color,
  progress,
  range,
  targetScale,
  widthPercentage,
}: {
  i: number;
  index: number;
  title: string;
  description: string;
  src: string;
  color: string;
  progress: number;
  range: number[];
  targetScale: number;
  widthPercentage: number;
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const progressMotion = useMotionValue(progress);
  const scale = useTransform(progressMotion, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="h-screen flex !w-full justify-center items-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          width: `${widthPercentage}%`,
        }}
        className="relative top-[25%] !rounded-3xl !bg-primary-color"
      >
        <div
          className=" p-6 origin-top !rounded-3xl"
          style={{ boxShadow: "2px 2px 15px rgba(0, 0, 0, 0.5)" }}
        >
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">
              <div className="relative text-black">
                <h1 className="mb-5 text-3xl mt-5">
                  <span className="text-secondary-color text-5xl">
                    {index}.
                  </span>{" "}
                  <span> {title}</span>
                </h1>
                <p className="text-black mb-5">{description}</p>
                <OrderNowButton />
              </div>

              <div className="relative h-full overflow-hidden rounded-3xl">
                <motion.div
                  className="w-full h-[300px] lg:h-[400px]"
                  style={{ scale: imageScale }}
                >
                  <Image
                    fill
                    src={src}
                    alt="image"
                    className=" w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MotiveOfTheProductCards;
