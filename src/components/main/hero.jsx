"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero-one.png",
    heading: "From Africa's Roots to Radiant Skin",
    buttons: [
      { id: 1, text: "Our Products", link: "/products", icon: (<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.17101 2.23247C8.87749 1.94021 8.87646 1.46534 9.16872 1.17181C9.43442 0.904974 9.85103 0.879871 10.1451 1.09709L10.2294 1.16953L16.2794 7.19353C16.547 7.46002 16.5714 7.87813 16.3524 8.1722L16.2794 8.25643L10.2294 14.2814C9.93593 14.5737 9.46105 14.5727 9.16877 14.2792C8.90305 14.0124 8.87971 13.5957 9.09817 13.3025L9.17096 13.2186L14.687 7.7247L9.17101 2.23247Z" fill="#292F4A"/>
        <path d="M0 7.72461C0 7.34491 0.282154 7.03112 0.648229 6.98146L0.75 6.97461L15.75 6.97461C16.1642 6.97461 16.5 7.3104 16.5 7.72461C16.5 8.10431 16.2178 8.4181 15.8518 8.46776L15.75 8.47461L0.75 8.47461C0.335786 8.47461 0 8.13882 0 7.72461Z" fill="#292F4A"/>
      </svg>) },
      { id: 2, text: "Our Story", link: "/story", icon: (<svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.171 5.97213C12.8775 5.69205 12.8765 5.23696 13.1687 4.95567C13.4344 4.69995 13.851 4.67589 14.1451 4.88406L14.2294 4.95348L20.2794 10.7265C20.547 10.9819 20.5714 11.3826 20.3524 11.6644L20.2794 11.7451L14.2294 17.519C13.9359 17.7992 13.4611 17.7982 13.1688 17.5169C12.9031 17.2612 12.8797 16.8619 13.0982 16.581L13.171 16.5005L18.687 11.2355L13.171 5.97213Z" fill="white"/>
        <path d="M4 11.2363C4 10.8725 4.28215 10.5717 4.64823 10.5241L4.75 10.5176H19.75C20.1642 10.5176 20.5 10.8394 20.5 11.2363C20.5 11.6002 20.2178 11.9009 19.8518 11.9485L19.75 11.9551L4.75 11.9551C4.33579 11.9551 4 11.6333 4 11.2363Z" fill="white"/>
        </svg>
        ) }
    ],
    description: "Research Based. African Inspired."
  },
  // {
  //   id: 2,
  //   image: "/images/hero-two.jpg",
  //   heading: "Beauty Inspired by Nature",
  //   buttons: [
  //     { id: 1, text: "Shop Now", link: "/products" },
  //     { id: 2, text: "Learn More", link: "/learn" }
  //   ],
  //   description: "Sustainably Sourced. Ethically Made."
  // }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative gap-6 z-10 flex flex-col items-center justify-end h-full text-center px-4 text-white pb-20">
            <h1 className="text-white leading-[44px] lg:leading-[86px] font-bold text-[38px] lg:w-4/5 lg:text-[70px] font-unbounded">{slide.heading}</h1>
            
           <div className="flex gap-6 flex-col">
              <div className="mt-6 flex gap-3">
                {slide.buttons.map((button) => (
                  <Link
                    key={button.id}
                    href={button?.link}
                    className={`flex h-[54px] items-center gap-1 justify-between lg:gap-3 px-6 py-4 rounded-[18px] text-base font-normal transition-all duration-300 ${
                      button.id === 2
                        ? "bg-transparent border-white border text-white"
                        : "bg-background text-primary hover:bg-teal-300"
                    }`}
                  >
                    <span className="font-freize font-normal text-xs lg:text-base">
                      {button.text}
                    </span>
                    <span>
                      {button?.icon}
                    </span>
                  </Link>
                ))}
              </div>

              <p className="text-white font-light text-[15px] lg:text-[18px] font-freize">{slide.description}</p>
           </div>
          </div>
        </div>
      ))}

      {/* Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-background":"bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}