"use client";
import React from "react";
import Container from "../ui/Container";
import * as motion from "motion/react-client";
import FAQGenerate from "./FAQGenerate";

const FAQ = () => {
  return (
    <motion.section
      id="faq"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-5 text-secondary-color">
              সাধারণ জিজ্ঞাসা (FAQ)
            </h3>
            <p className="mb-5 text-base lg:text-lg">
              ম্যাগট-ফ্রি রেসকিউ কিট সম্পর্কে যা যা জানার দরকার সব এখানে রয়েছে।
              আপনার প্রশ্নের উত্তর না পেলে আমাদের টিমের সাথে যোগাযোগ করুন।
            </p>
          </div>
          <div className="">
            <FAQGenerate />
          </div>
        </div>
      </Container>
    </motion.section>
  );
};

export default FAQ;
