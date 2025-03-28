import Link from 'next/link';
import React from 'react';
import AnimateOnScroll from "@/components/main/AnimateOnScroll"; // Import AnimateOnScroll

const Product = ({ data, type, countryCode }) => {
  console.log(countryCode);
  
  return (
    data ? (
      <div className={`grid grid-cols-1 ${type === "other" ? "" : "px-8 lg:px-24"} md:grid-cols-2 lg:grid-cols-4 gap-10 lg:justify-between`}>
        {data.map((item, index) => (
          <div key={index} className='bg-white rounded-[20px] p-3 text-center flex flex-col gap-5'>
            <Link href={`/products/${item.id}`}>
              <img src={item?.imageUrl} alt={item?.name} className='rounded-[20px]' />
            </Link>

            <div className='flex flex-col flex-grow justify-between gap-3 h-full'>
              <div className='mt-3'>
                <AnimateOnScroll animation="fade-up">
                  <h1 className="text-[#C78700] font-bold lg:text-base lg:leading-5 font-unbounded text-[15px]">
                    <Link href={`/products/${item.id}`}>
                      {item?.name}
                    </Link>
                  </h1>
                </AnimateOnScroll>
                <AnimateOnScroll animation="fade-up">
                  <h3 className='font-freize text-xs mt-1 lg:text-sm lg:leading-4'>{item?.label}</h3>
                </AnimateOnScroll>
              </div>
              <AnimateOnScroll animation="fade-up">
                <button className="mt-3 cursor-none font-unbounded w-full py-2 rounded-[20px] bg-[#292F4A] text-white lg:text-[18px] font-bold">
                  {countryCode === "NG"
                    ? item?.price !== undefined && item?.price !== null
                      ? `NGN ${parseFloat(item?.price).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"
                    : item?.priceDollar !== undefined && item?.priceDollar !== null
                      ? `$ ${parseFloat(item?.priceDollar).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"}
                </button>
              </AnimateOnScroll>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <AnimateOnScroll animation="fade-up">
        <h1 className='font-freize font-semibold text-base'>No products</h1>
      </AnimateOnScroll>
    )
  );
};

export default Product;