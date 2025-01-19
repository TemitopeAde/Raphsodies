import Product from "@/components/main/Product";
import ProductKit from "@/components/main/ProductKit";
import React from "react";

const page = () => {
  const products = [
    {
      id: 1,
      name: "pH Refreshing Face Wash",
      label: "Detoxifying Cleanser for Women",
      price: 10999,
      image: "/images/image-1.png"
    },
    {
      id: 2,
      name: "Acne Control Plant",
      label: "For Acne-Prone Skin",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 3,
      name: "Skin Trouble Oil",
      label: "Repair & Hydrate",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 4,
      name: "Stretch Marks",
      label: "Smooth & Even Tone",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 5,
      name: "Age Defying Barrier Serum",
      label: "Anti-Aging Formula",
      price: 12000,
      image: "/images/image-1.png"
    },
    {
      id: 6,
      name: "Herbal Face Food",
      label: "Plant-Based Nutrients",
      price: 14999,
      image: "/images/image-1.png"
    },
    {
      id: 7,
      name: "Black Skin Repair Complex",
      label: "Restore & Repair",
      price: 15000,
      image: "/images/image-1.png"
    },
    {
      id: 8,
      name: "Stretch Rescue Body Cream",
      label: "Hydrate & Protect",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 9,
      name: "Exfoliating Skincare",
      label: "Gentle Daily Exfoliation",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 10,
      name: "African Bee Toxin",
      label: "Natural Anti-Aging Solution",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 11,
      name: "Botanical Exfoliator",
      label: "Smooth & Renew",
      price: 12499,
      image: "/images/image-1.png"
    },
    {
      id: 12,
      name: "Age Defying Barrier Serum",
      label: "Anti-Aging Formula",
      price: 12000,
      image: "/images/image-1.png"
    },
    {
      id: 13,
      name: "Grapefruit Butter",
      label: "Moisturize & Brighten",
      price: 12999,
      image: "/images/image-1.png"
    },
    {
      id: 14,
      name: "Plant-Based Clarifying Toner",
      label: "Cleanse & Purify",
      price: 12999,
      image: "/images/image-1.png"
    },
    {
      id: 15,
      name: "Acne Treatment Kit",
      label: "Complete Acne Solution",
      price: 47500,
      image: "/images/image-1.png"
    },
    {
      id: 16,
      name: "Hyperpigmentation Treatment Kit",
      label: "Fade Dark Spots",
      price: 37500,
      image: "/images/image-1.png"
    }
  ];

  const Kits = {
    id: 1,
    label: "Face & Body Rejuvenation Kit",
    images: [
      {
        src: "/images/image-1.png"
      },
      {
        src: "/images/image-1.png"
      },
      {
        src: "/images/image-1.png"
      },
      {
        src: "/images/image-1.png"
      },
      {
        src: "/images/image-1.png"
      }
    ],
    price: "45643"
  };

  return (
    <section>
      <section className="relative h-screen w-screen">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="/images/image-1.png"
          />
        </div>

        <div className="absolute inset-0 bg-black bg-opacity-80" />
        <div className="absolute inset-0 z-10 flex items-center justify-center px-8 lg:px-24 lg:justify-start">
          <div className="text-white flex flex-col gap-10 text-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-[28px] font-unbounded font-bold text-center lg:text-[52px] lg:leading-[68px]">
                Research Based African Inspired Beauty Brand for the Clearest,
                Stunning Skin
              </h1>
              <h3 className="font-freize font-normal text-[15px] leading-[28px] lg:text-[18px] lg:leading-[35px]">
                Our products include a luxurious collection of soaps, oils, body
                milk, salves, scrubs, serums and body butters.
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-custom-bg">
        <div className="flex flex-col gap-6 items-center py-20">
          <h1 className="font-unbounded font-bold text-[28px] lg:text-[48px] lg:leading-[55px]">
            Our Products
          </h1>
          <p className="lg:text-2xl font-freize lg:leading-[35px] text-[15px]">
            African Rhapsody Products
          </p>
        </div>

        <div className="flex flex-col gap-48 pb-20">
          <Product data={products} />

          <ProductKit data={Kits} />
        </div>
      </section>
    </section>
  );
};

export default page;
