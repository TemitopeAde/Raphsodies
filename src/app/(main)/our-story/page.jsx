"use client";

import React from "react";

const Page = () => {
  return (
    <div className="relative h-screen w-screen">
      
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          src="/videos/video.mp4"
          muted
          loop
          autoPlay
        />
      </div>

      
      <div className="absolute inset-0 bg-black bg-opacity-80" />

      
      <div className="absolute inset-0 z-10 flex items-center justify-center px-8 lg:justify-start">
        <div className="text-white flex flex-col gap-10 text-center lg:text-left">
          <div>
            <h3 className="font-freize font-normal text-[15px] leading-[28px] lg:text-[18px] lg:leading-[35px]">Welcome to the era of African-inspired beauty</h3>
            <h1 className="text-[28px] font-unbounded font-bold text-center lg:text-left lg:text-[52px] lg:leading-[68px] lg:w-[70%]">Harnessing Africa’s Wisdom into Skincare Innovations</h1>
          </div>

          <div className="flex justify-center items-center lg:justify-start">
            <button className="flex items-center gap-2">
              <span className="font-freize underline font-normal text-[22px]">Watch Video</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="36"
                  height="36"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="white"
                    strokeWidth="5"
                    fill="none"
                  />
                  <polygon points="40,30 70,50 40,70" fill="white" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
