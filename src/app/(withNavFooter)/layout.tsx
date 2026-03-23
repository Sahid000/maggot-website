import React from "react";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import "@ant-design/v5-patch-for-react-19";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="">
        <div className="fixed top-0 z-50 w-full">
          <Navbar />
        </div>
        <div>{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
