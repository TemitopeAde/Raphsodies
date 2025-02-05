
import HeaderThree from "@/components/main/header-three";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
        <HeaderThree />
        {children}
    </div>
  );
};

export default layout;
