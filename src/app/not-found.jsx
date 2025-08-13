import Container from "@/components/ui/Container";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex justify-center items-center flex-col text-center min-h-screen m-auto text-base-color bg-gradient-to-r from-gray-200 via-white to-gray-100">
      <Container>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-[150px] font-extrabold text-secondary-color tracking-widest">
            404
          </h1>
          <div className="bg-primary-color border border-secondary-color text-secondary-color px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
          </div>
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl mb-5 font-bold">
          <span className="text-secondary-color">OOPS!</span> NOTHING WAS FOUND
        </h3>
        <p className="text-base lg:text-xl font-semibold">
          <span>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.{" "}
          </span>
        </p>
        <button className="mt-5">
          <Link
            href="/"
            className="relative inline-block text-lg font-medium text-secondary-color group focus:outline-none focus:ring rounded"
          >
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary-color group-hover:translate-y-0 group-hover:translate-x-0 rounded"></span>

            <span className="relative block px-8 py-3 bg-primary-color border border-current rounded">
              Go Home
            </span>
          </Link>
        </button>
      </Container>
    </div>
  );
};

export default NotFoundPage;
