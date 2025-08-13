import Container from "../ui/Container";
import Revel from "../ui/Animation/Revel";
import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import Link from "next/link";
import { Button } from "antd";
import { BsCartCheckFill } from "react-icons/bs";

export default function Banner() {
  return (
    <section className="h-screen w-full z-10 text-base-color flex justify-start items-center mx-auto">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="w-full">
            <Revel>
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 text-secondary-color py-1">
                রাস্তার অসহায় কুকুর বিড়ালের জন্য ম্যাগট-মুক্ত জীবন
              </h1>
            </Revel>
            <Revel delay={0.5}>
              <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mb-6">
                আপনার বাসার আশে পাশে বসবাস করে রাস্তার কুকুর। আপনার আদরের কুকুর
                বা বিড়াল কি ব্যথায় কাতরাচ্ছে? ম্যাগট সংক্রমণ শুধু
                যন্ত্রণাদায়ক নয়, এটি জীবনহানির কারণও হতে পারে! কিন্তু চিন্তার
                কিছু নেই—আমাদের ম্যাগট-ফ্রি রেসকিউ কিট আপনার প্রিয় পোষাকে
                প্রানিটির সেই কষ্ট থেকে মুক্তি দিতে প্রস্তুত!
              </h4>
            </Revel>
            <Link href="#order-now">
              <Button className="group flex items-center !py-4 !px-2 gap-1 border-2 !border-secondary-color !bg-secondary-color !text-primary-color rounded-full">
                <p className="font-semibold mt-1">অর্ডার করতে চাই</p>
                <BsCartCheckFill className=" text-xl text-primary-color" />
              </Button>
            </Link>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={AllImages.product}
              alt="banner-image"
              className="w-auto h-[400px] object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
