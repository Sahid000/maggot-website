import * as motion from "motion/react-client";
import Image from "next/image";
import Container from "../ui/Container";
import Revel from "../ui/Animation/Revel";
import React from "react";

interface SectionBannerProps {
  image: string;
  title: string;
  description?: string;
}

const SectionBanner: React.FC<SectionBannerProps> = ({
  image,
  title,
  description = "",
}) => {
  return (
    <div>
      {" "}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative  h-full lg:h-[65vh] object-cover flex items-center justify-center select-none"
      >
        <Image
          src={image}
          alt="banner-image"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#0000008A] via-[#0000008A] to-[#0000009A]"></div>

        <div className="absolute w-full h-full z-10 flex items-end">
          <Container>
            <div className="flex justify-between items-center gap-2 mb-[2%]">
              <div className="">
                <Revel>
                  <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-start text-primary-color tracking-wider">
                    {title}
                  </h1>
                  <p className="text-primary-color mt-2">{description}</p>
                </Revel>
              </div>
            </div>
          </Container>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionBanner;
