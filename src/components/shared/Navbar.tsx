"use client";

import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AllImages } from "../../../public/assets/AllImages";
import { usePathname } from "next/navigation";
import * as motion from "motion/react-client";
import { useScroll, useMotionValueEvent } from "motion/react";
import OrderNowButton from "../Home/OrderNowButton";

const NavItems = [
  { id: "1", name: "ম্যাগট-ফ্রি সম্পর্কে", route: "#about-product" },
  { id: "2", name: "কার্যকারিতা", route: "#how-it-works" },
  { id: "3", name: "কিট সম্পর্কে", route: "#kit" },
  { id: "4", name: "সাধারণ জিজ্ঞাসা", route: "#faq" },
  { id: "5", name: "যোগাযোগ", route: "#contact-us" },
];

const Navbar: React.FC = () => {
  const path = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [height, setHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (
      previous !== undefined &&
      latest > previous &&
      latest > 150 &&
      !mobileMenuOpen
    ) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    if (latest > 10) {
      setScrolled(true);
    } else setScrolled(false);
  });

  useEffect(() => {
    // Calculate the height of the content when it opens or closes
    if (mobileMenuOpen) {
      setHeight(navbarRef.current!.scrollHeight); // Set to the content's height when open
    } else {
      setHeight(0); // Set to 0 when closed
    }
  }, [mobileMenuOpen]);
  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`z-[99999999] !text-base-color ${scrolled ? " !shadow-md duration-300  py-1.5" : " duration-300 py-0.5"
        } ${mobileMenuOpen || scrolled ? "bg-primary-color" : "bg-transparent"}`}
    >
      <Container>
        <header className="text-base mx-auto  flex justify-between items-center z-[99999] ">
          {/* //*Company name */}
          <div className="">
            <Link href="/" className=" cursor-pointer flex items-center gap-1 ">
              <Image
                src={AllImages.logo}
                alt="logo"
                width={1000}
                height={1000}
                sizes="100vw"
                className="h-10 w-auto"
              />
              <h1 className="font-bold text-lg mt-[4px] !text-[#589283]">
                ম্যাগট-ফ্রি কিট
              </h1>
            </Link>
          </div>

          {/* //*Nav links */}
          <nav>
            {/* //* For Laptop or Desktop */}
            <div className="hidden lg:block">
              <ul className="flex justify-center items-center gap-8 lg:flex-row flex-col lg:py-0 py-10">
                {NavItems.map((navItem, i) => (
                  <li
                    key={i}
                    className={`lg:mb-0 mb-5 cursor-pointer group relative hover:text-secondary-color transition-all font-bold duration-300 
                      ${path === navItem.route
                        ? "!text-secondary-color border-b-2 border-secondary-color"
                        : "text-[#707070] border-b-2 border-transparent"
                      }
                      `}
                  >
                    <Link
                      href={navItem.route}
                      className="after-underline-after"
                    >
                      {navItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* //*For Tab or Mobile */}
            <div
              style={{
                height: `${height}px`, // Dynamic height
                overflow: "hidden",
                transition: "height 0.3s ease", // Smooth transition effect for height
              }}
              ref={navbarRef}
              className="block lg:hidden bg-primary-color w-full lg:static absolute top-[52px] left-0 lg:bg-none transition-all duration-500 lg:z-0 -z-[9999] lg:border-none shadow-md"
            >
              <ul className="flex justify-end items-center gap-5 lg:flex-row flex-col lg:py-0 py-5">
                {NavItems.map((navItem, i) => (
                  <li
                    key={i}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`lg:mb-0 mb-0 cursor-pointer  group relative  transition-all duration-300 ${path === navItem.route
                      ? "!text-secondary-color border-b-2 border-secondary-color"
                      : "text-[#707070] border-b-2 border-transparent"
                      }`}
                  >
                    <Link
                      href={navItem.route}
                      className="after-underline-after"
                    >
                      {navItem.name}
                    </Link>
                  </li>
                ))}
                <div className="w-full flex items-center justify-center gap-1">
                  <OrderNowButton />
                </div>
              </ul>
            </div>
          </nav>
          <div className="lg:flex items-center gap-2 hidden">
            <div className="w-full flex items-center gap-1">
              <OrderNowButton />
            </div>
          </div>
          {/* //*Icons */}
          <div className="lg:hidden select-none flex items-center gap-5">
            {mobileMenuOpen ? (
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#2B4257"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            ) : (
              <div onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#2B4257"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            )}
          </div>
        </header>
      </Container>
    </motion.div>
  );
};

export default Navbar;
