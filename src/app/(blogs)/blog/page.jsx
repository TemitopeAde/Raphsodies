import Link from "next/link";
import React from "react";

const page = () => {
  const Blog = [
    {
      image: "/images/image-3.png",
      title:
        "Harnessing Africa Botanicals: Top Skincare Ingredients from the Continent"
    },
    {
      image: "/images/image-4.png",
      title: "Natural Skincare Tips for Different African Skin Types"
    }
  ];
  return (
    <section className="gap-16 pt-36 pb-8 px-4 bg-custom-bg flex flex-col justify-center text-center">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="font-unbounded font-bold text-[28px]">
            Unlock the Secrets to Radiant Skin
          </h1>
          <p className="font-freize text-[15px] font-normal">
            Discover tips, trends, and must-have products for the glowing skin
            you’ve always wanted!
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-around lg:w-[80%] mx-auto gap-10">
        {Blog.map((item, index) =>
          <div key={index} className="w-full flex flex-col text-center gap-4">
            <img src={item.image} className="w-full" />
            <Link href={`/blog/${index}`} className="font-unbounded font-bold lg:text-[26px] lg:leading-[37px]">
              {item.title}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
