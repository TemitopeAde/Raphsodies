'use client'

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Optional, for chevron icons

const AccordionSections = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Close if already open, else open
  };

  const accordionItems = [
    {
      title: "Item 1",
      content: "Content for item 1",
    },
    {
      title: "Item 2",
      content: "Content for item 2",
    },
    {
      title: "Item 3",
      content: "Content for item 3",
    },
  ];

  return (
    <div className="space-y-4">
      {accordionItems.map((item, index) => (
        <div key={index} className="overflow-hidden">
          <div
            onClick={() => handleToggle(index)}
            className="flex items-center justify-between p-4 cursor-pointer bg-white"
          >
            <h2 className="font-semibold">{item.title}</h2>
            <span>
              {openIndex === index ? (
                <FaChevronUp className="text-xl" />
              ) : (
                <FaChevronDown className="text-xl" />
              )}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[1000px]" : "max-h-0"
            }`}
          >
            <div className="p-4">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionSections;
