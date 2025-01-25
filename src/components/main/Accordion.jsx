"use client";

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Chevron icons

const AccordionSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Tell me about African Rhapsody / can I see your products?",
      content:
        "African Rhapsody offers a range of skincare products made from natural ingredients. Visit our website to explore the full product catalog."
    },
    {
      title: "I am battling with serious Acne, pimples what can I use?",
      content:
        "We recommend our Tea Tree Oil Cleanser and Anti-Acne Herbal Cream, formulated to combat acne and reduce pimples effectively."
    },
    {
      title: "I am battling with sunburn, what can I use?",
      content:
        "Our Aloe Vera Soothing Gel and Sunscreen Lotion can help relieve sunburn and protect your skin from further damage."
    },
    {
      title: "I am battling with hyperpigmentation, what can I use?",
      content:
        "Try our Brightening Serum with Vitamin C and Kojic Acid to help fade hyperpigmentation and even out your skin tone."
    },
    {
      title: "I am battling with white patches, what can I use?",
      content:
        "Our Herbal Skin Repair Cream is formulated to address white patches and restore your skin’s natural pigmentation."
    },
    {
      title: "I am battling with Eczema, what can I use?",
      content:
        "Our Soothing Eczema Balm with Shea Butter and Chamomile helps to calm eczema flare-ups and deeply moisturize the skin."
    },
    {
      title: "Do you have something for kids?",
      content:
        "Yes, we offer a gentle baby care line including Baby Moisturizing Lotion and Mild Shampoo, perfect for sensitive skin."
    },
    {
      title: "I have dull skin what can I use?",
      content:
        "Our Radiance Boosting Scrub and Hydrating Face Mask will help revive dull skin and restore its natural glow."
    },
    {
      title:
        "What is the difference between African sea salt exfoliator & Botanical exfoliator?",
      content:
        "African sea salt exfoliator is ideal for deep cleansing and removing dead skin, while botanical exfoliator provides a gentle exfoliation with plant-based ingredients."
    }
  ];

  return (
    <div className="space-y-4">
      {accordionItems.map((item, index) =>
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden"
        >
          <div
            onClick={() => handleToggle(index)}
            className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
          >
            <h2 className="font-bold lg:leading-[32px] lg:text-[20px] font-unbounded text-[#212121]">
              {item.title}
            </h2>
            <span>
              {openIndex === index
                ? <FaChevronUp className="text-xl" />
                : <FaChevronDown className="text-xl" />}
            </span>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex ===
            index
              ? "max-h-[1000px] p-4"
              : "max-h-0"}`}
          >
            <div>
              <h3 className="font-unbounded lg:text-lg font-normal">
                {item.content}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionSection;
