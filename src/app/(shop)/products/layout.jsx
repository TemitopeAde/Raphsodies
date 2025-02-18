
import Footer from "@/components/main/footer";
import HeaderThree from "@/components/main/header-three";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
        <HeaderThree />
        {children}
        <Footer />
    </div>
  );
};

export default layout;
