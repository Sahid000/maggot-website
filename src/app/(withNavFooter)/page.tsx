import AboutProduct from "@/components/Home/AboutProduct";
import Banner from "@/components/Home/Banner";
import ContactUs from "@/components/Home/ContactUs";
import FAQ from "@/components/Home/FAQ";
import MotiveOfTheProduct from "@/components/Home/MotiveOfTheProduct";
import ProductOverview from "@/components/Home/ProductOverview";

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
