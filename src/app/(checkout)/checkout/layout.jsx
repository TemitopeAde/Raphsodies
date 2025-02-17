
import HeaderTwo from "@/components/main/header-two";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <HeaderTwo />
      {children}
    </div>
  );
};

export default layout;
