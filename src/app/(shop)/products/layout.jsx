import Header from "@/components/main/header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default layout;
