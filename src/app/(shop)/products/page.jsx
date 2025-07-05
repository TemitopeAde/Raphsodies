"use client";

import Product from "@/components/main/Product";
import ProductKit from "@/components/main/ProductKit";
import { useProducts } from "@/hooks/admin/useProducts";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import AnimateOnScroll from "@/components/main/AnimateOnScroll"; // Import AnimateOnScroll

const ProductPageContent = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [face, setFace] = useState()

  const searchParams = useSearchParams();
  const router = useRouter();
  const limit = 100;
  // console.log(process.env.EMAIL_USER);
  
  // Ensure category is read safely without hydration mismatch
  const productCategory = useMemo(() => searchParams.get("category") || "", [searchParams]);

  // Fetch products using the useProducts hook with the category and other filters
  const { data, isLoading, isError, refetch } = useProducts({
    page,
    limit,
    category: productCategory,
    search: searchTerm,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
  });

  const { data: reData, isLoading: reIsLoading, isError: reIsError, refetch: reRefetch } = useProducts({
    search: encodeURIComponent("Face & Body Rejuvenation Kit"),
  });
  

  // Update products and location when data changes
  useEffect(() => {

    setFace(reData?.products?.products[0])

    if (data) {
      setLocation(data?.location);
      setCountryCode(data?.location?.countryCode || "");
      setProducts(data?.products?.products || []);
    }
  }, [data, reData]);

  console.log(face);

  // Re-fetch data when productCategory changes
  useEffect(() => {
    refetch(); // Trigger re-fetch when category changes
  }, [productCategory, refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <AnimateOnScroll animation="fade-up">
          Failed to load products. Please try again later.
        </AnimateOnScroll>
      </div>
    );
  }

  return (
    <section>
      <section className="relative h-screen w-screen">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/images/lp.png" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-8 lg:px-24 lg:justify-start">
          <div className="text-white flex flex-col gap-10 text-center">
            <div className="flex flex-col gap-6 lg:px-16">
              <AnimateOnScroll animation="fade-up">
                <h1 className="text-[28px] lg:px-6 font-unbounded font-bold text-center lg:text-[52px] lg:leading-[68px]">
                  Research Based African Inspired Beauty Brand for the Clearest,
                  Stunning Skin
                </h1>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up">
                <h3 className="font-freize font-normal text-[15px] lg:px-32 leading-[28px] lg:text-[18px] lg:leading-[35px]">
                  Our products include a luxurious collection of soaps, oils, body
                  milk, salves, scrubs, serums and body butters.
                </h3>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-custom-bg">

        {productCategory === "kids" && (<div className="flex flex-col gap-6 items-center py-20">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-unbounded font-bold text-[28px] lg:text-[48px] lg:leading-[55px]">
            African Rhapsody for Kids:
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="lg:text-2xl text-center font-freize lg:leading-[35px] text-[15px]">
            Gentle yet powerful, <b>African Rhapsody for kids</b> shields young skin from bacteria and common issues like rashes, eczema, and pimples. Unlike harsh antibacterial soaps, our formula preserves the skin’s natural balance while delivering deep nourishment. Infused with Africa’s finest anti-inflammatory herbs, it soothes irritation, prevents breakouts, and promotes a healthy, radiant glow. 🌿

            </p>
          </AnimateOnScroll>
          </div>)}

          {productCategory === "grandma" && (<div className="flex flex-col gap-6 items-center py-20">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-unbounded text-center font-bold text-[28px] lg:text-[48px] lg:leading-[55px]">
              African Rhapsody for Skin Disorders: Grandma’s Secrets Collection
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="lg:text-2xl text-center font-freize lg:leading-[35px] text-[15px]">
            Unveil the secrets of African Botanical Healing Rituals, designed to heal skin disorders such as eczema, tinea versicolor, other inflammatory conditions, and deeply nourish your skin
            </p>
          </AnimateOnScroll>
          </div>)}


          {productCategory === "african" && (<div className="flex flex-col gap-6 items-center py-20">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-unbounded text-center font-bold text-[28px] lg:text-[48px] lg:leading-[55px]">
            Our Products
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="lg:text-2xl text-center font-freize lg:leading-[35px] text-[15px]">
            African Rhapsody Products
            </p>
          </AnimateOnScroll>
          </div>)}

        

        <div className="flex flex-col gap-20 pb-20">
          {products.length > 0 ? (
            <Product data={products} countryCode={countryCode} />
          ) : (
            <AnimateOnScroll animation="fade-up">
              <p className="font-freize font-semibold text-base text-center">
                No products found.
              </p>
            </AnimateOnScroll>
          )}

          { productCategory ==="kids" ? "": <ProductKit countryCode={countryCode} data={{ 
            id: `${face?.id}`, 
            label: `${face?.name}`, 
            images: [
              { id: "cm7h850fj000jl503f54p8u1b", src: "/images/face/37.png" },
              { id: "cm7klov5y000jjv03dmm376a4", src: "/images/face/38.png" },
              { id: "cm7h83h2z000hl503z6wk6ngi", src: "/images/face/39.png" },
              { src: "/images/face/40.png" },
              { src: "/images/face/41.png" },
            ],
            price: `${face?.price}`,
            priceDollar: `${face?.priceDollar}`
          }} />}
          
        </div>
      </section>
    </section>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>}>
      <ProductPageContent />
    </Suspense>
  );
};

export default Page;