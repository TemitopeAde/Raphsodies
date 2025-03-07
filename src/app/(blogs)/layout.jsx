
import Footer from "@/components/main/footer";
import HeaderTwo from "@/components/main/header-two";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <HeaderTwo />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
