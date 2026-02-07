import AboutProduct from "@/components/Home/AboutProduct";
import Banner from "@/components/Home/Banner";
import ContactUs from "@/components/Home/ContactUs";
import FAQ from "@/components/Home/FAQ";
import MotiveOfTheProduct from "@/components/Home/MotiveOfTheProduct";
import ProductOverview from "@/components/Home/ProductOverview";
import ViewOrderNowModal from "@/components/Home/ViewOrderNowModal";

const HomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const orderNow = params?.order || null;


  return (
    <div className="">
      <Banner />
      <AboutProduct />
      <MotiveOfTheProduct />
      <ProductOverview />
      <FAQ />
      <ContactUs />
      <ViewOrderNowModal isModalVisible={!!orderNow} />
    </div>
  );
};

export default HomePage;
