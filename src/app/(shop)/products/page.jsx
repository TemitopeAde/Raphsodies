"use client";

import Product from "@/components/main/Product";
import ProductKit from "@/components/main/ProductKit";
import ProtectedRoute from "@/components/main/ProtectedRoute";
import { useProducts } from "@/hooks/admin/useProducts";
import { useAuth } from "@/hooks/store/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [products, setProducts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [location, setLocation] = useState(null); 
  const [countryCode, setCountryCode] = useState("")
  const searchParams = useSearchParams();
  const limit = 100;
  const router = useRouter();
  const [productCategory, setProductCategory] = useState("")

  const category = searchParams.get("category")
  useEffect(()=> {
    setProductCategory(category)
  }, [category])


  

  
  const { data, isLoading, isError } = useProducts({
    page,
    limit,
    category: productCategory,
    search: searchTerm,
    minPrice: minPrice || null,
    maxPrice: maxPrice || null,
  });

  console.log({data});
  
  
  useEffect(() => {
    setLocation(data?.location)
    console.log(data?.location);
    
    setCountryCode(data?.location?.countryCode)
    if (data?.products) {
      setProducts(data.products.products);
    }
  }, [data]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }

  const Kits = {
    id: 1,
    label: "Face & Body Rejuvenation Kit",
    images: [
      {
        id: "cm7h850fj000jl503f54p8u1b",
        src: "/images/face/37.png",
      },
      {
        id: "cm7klov5y000jjv03dmm376a4",
        src: "/images/face/38.png",
      },
      {
        id: "cm7h83h2z000hl503z6wk6ngi",
        src: "/images/face/39.png",
      },
      {
        src: "/images/face/40.png",
      },
      {
        src: "/images/face/41.png",
      },
    ],
    price: "57,500",
    priceDollar: "39"
  };

  return (
    // <ProtectedRoute>
      <section>
        <section className="relative h-screen w-screen">
          <div className="absolute inset-0">
            <img className="w-full h-full object-cover" src="/images/lp.png" />
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center px-8 lg:px-24 lg:justify-start">
            <div className="text-white flex flex-col gap-10 text-center">
              <div className="flex flex-col gap-6 lg:px-16">
                <h1 className="text-[28px] lg:px-6 font-unbounded font-bold text-center lg:text-[52px] lg:leading-[68px]">
                  Research Based African Inspired Beauty Brand for the Clearest,
                  Stunning Skin
                </h1>
                <h3 className="font-freize font-normal text-[15px] lg:px-32 leading-[28px] lg:text-[18px] lg:leading-[35px]">
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
            {products.length > 0 ? (
              <Product data={products} countryCode={countryCode}/>
            ) : (
              <p className='font-freize font-semibold text-base text-center'>No products found.</p>
            )}

            <ProductKit data={Kits} />
          </div>
        </section>
      </section>
    // </ProtectedRoute>
  );
};

export default Page;