"use client";

import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section>
      <section className="relative h-screen w-screen">
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

        <div className="absolute inset-0 z-10 flex items-center justify-center px-8 lg:px-24 lg:justify-start">
          <div className="text-white flex flex-col gap-10 text-center lg:text-left">
            <div>
              <h3 className="font-freize font-normal text-[15px] leading-[28px] lg:text-[18px] lg:leading-[35px]">
                Welcome to the era of African-inspired beauty
              </h3>
              <h1 className="text-[28px] font-unbounded font-bold text-center lg:text-left lg:text-[52px] lg:leading-[68px] lg:w-[70%]">
                Harnessing Africa’s Wisdom into Skincare Innovations
              </h1>
            </div>

            <div className="flex justify-center items-center lg:justify-start">
              <button className="flex items-center gap-2">
                <span className="font-freize underline font-normal text-[22px]">
                  Watch Video
                </span>
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
      </section>

      <div className="bg-custom-bg px-10  lg:px-24 lg:py-24 py-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12 items-center">
          <div className="basis-1/2">
            <img
              src="/images/story.png"
              alt=""
              className="w-full h-[316px] object-cover rounded-[24px]"
            />
          </div>

          <div className="basis-1/2">
            <p className="font-freize font-normal text-[15px] leading-[35px] lg:pr-20">
              From Cleopatra's legendary milk baths to the to the century old
              beauty rituals of Local Nigerian tribes and vibrant red women of
              Namibia. The thing is its always been here in Africa. Throughout
              the ages, from the reigns of Queen Amina, Cleopatra, Nefertiti, to
              the majestic kingdoms of Ashanti, Benin, Mali, and ancient Egypt,
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-unbounded text-[28px] text-center leading-[40px] my-24">
            Africa has been the timeless custodian of integral wellness and
            ageless beauty secrets
          </h1>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12 items-center">
          <div className="basis-1/2">
            <img
              src="/images/product-bottle.png"
              alt=""
              className="w-full h-[316px] object-cover rounded-[24px]"
            />
          </div>

          <div className="basis-1/2">
            <p className="font-freize font-normal text-[15px] leading-[35px] lg:pr-20">
              In the tapestry of history, Africa has always held the key to
              unparalleled beauty rituals and holistic well-being. Despite the
              shift, driven by media proliferation and globalization, African
              Rhapsody stands as a beacon, reminding the world that Africa is
              the true home of wellness and beauty.
            </p>
          </div>
        </div>

        <div>
          <h1 className="font-unbounded text-[28px] text-center leading-[40px] my-24">
            At African Rhapsody we research and transform Africa's botanical
            wisdom
          </h1>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12 items-center">
          <div className="basis-1/2">
            <img
              src="/images/image-1.png"
              alt=""
              className="w-full h-[316px] object-cover rounded-[24px]"
            />
          </div>

          <div className="basis-1/2 flex flex-col gap-3">
            <p className="font-freize font-normal text-[15px] leading-[35px] lg:leading-[25px] lg:pr-20">
              At African Rhapsody we research and transform Africa's botanical
              wisdom with cutting-edge cosmetic science into innovative skincare
              solutions. More than a beauty brand; it's a journey to rediscover
              the wonders of the earth, once lost but now found, hidden yet
              Uncovered. Welcome to the era of African-inspired beauty - every
              product is a celebration that transcends time and embraces the
              genuine essence of caring, nourishing, and healing from within
            </p>

            <Link
              href="/shop"
              className={`flex w-fit items-center gap-3 px-4 py-2 text-[10px] rounded-[10px] text-base font-normal transition-all duration-300 bg-background text-primary hover:bg-teal-300"
                    }`}
            >
              <span className="flex items-center text-[9px] lg:text-[18px]">
                Shop Now
              </span>
              <span className="lg:block hidden">
                <svg
                  width="17"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.17101 2.23247C8.87749 1.94021 8.87646 1.46534 9.16872 1.17181C9.43442 0.904974 9.85103 0.879871 10.1451 1.09709L10.2294 1.16953L16.2794 7.19353C16.547 7.46002 16.5714 7.87813 16.3524 8.1722L16.2794 8.25643L10.2294 14.2814C9.93593 14.5737 9.46105 14.5727 9.16877 14.2792C8.90305 14.0124 8.87971 13.5957 9.09817 13.3025L9.17096 13.2186L14.687 7.7247L9.17101 2.23247Z"
                    fill="#292F4A"
                  />
                  <path
                    d="M0 7.72461C0 7.34491 0.282154 7.03112 0.648229 6.98146L0.75 6.97461L15.75 6.97461C16.1642 6.97461 16.5 7.3104 16.5 7.72461C16.5 8.10431 16.2178 8.4181 15.8518 8.46776L15.75 8.47461L0.75 8.47461C0.335786 8.47461 0 8.13882 0 7.72461Z"
                    fill="#292F4A"
                  />
                </svg>
              </span>
              <span className="block lg:hidden">
                <svg
                  width="10"
                  height="15"
                  viewBox="0 0 17 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.17101 2.23247C8.87749 1.94021 8.87646 1.46534 9.16872 1.17181C9.43442 0.904974 9.85103 0.879871 10.1451 1.09709L10.2294 1.16953L16.2794 7.19353C16.547 7.46002 16.5714 7.87813 16.3524 8.1722L16.2794 8.25643L10.2294 14.2814C9.93593 14.5737 9.46105 14.5727 9.16877 14.2792C8.90305 14.0124 8.87971 13.5957 9.09817 13.3025L9.17096 13.2186L14.687 7.7247L9.17101 2.23247Z"
                    fill="#292F4A"
                  />
                  <path
                    d="M0 7.72461C0 7.34491 0.282154 7.03112 0.648229 6.98146L0.75 6.97461L15.75 6.97461C16.1642 6.97461 16.5 7.3104 16.5 7.72461C16.5 8.10431 16.2178 8.4181 15.8518 8.46776L15.75 8.47461L0.75 8.47461C0.335786 8.47461 0 8.13882 0 7.72461Z"
                    fill="#292F4A"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
