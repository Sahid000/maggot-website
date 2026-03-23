import type { Metadata } from "next";
import AboutProduct from "@/components/Home/AboutProduct";
import Banner from "@/components/Home/Banner";
import ContactUs from "@/components/Home/ContactUs";
import FAQ from "@/components/Home/FAQ";
import MotiveOfTheProduct from "@/components/Home/MotiveOfTheProduct";
import ProductOverview from "@/components/Home/ProductOverview";

export const metadata: Metadata = {
  title: "হোম",
  description:
    "কুকুর ও পশুর ক্ষতস্থানে ম্যাগট (পোকা) দেখা গেলে ঘাবড়াবেন না — আমাদের ম্যাগট-ফ্রি রেসকিউ কিট দিয়ে সহজেই ঘরে বসে চিকিৎসা করুন। নিরাপদ, কার্যকর এবং দ্রুত ডেলিভারি।",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  return (
    <div className="">
      <Banner />
      <AboutProduct />
      <MotiveOfTheProduct />
      <ProductOverview />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default HomePage;
