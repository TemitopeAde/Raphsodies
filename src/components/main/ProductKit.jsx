'use client'

import Link from 'next/link'
import React from 'react'

const ProductKit = ({data, countryCode}) => {
    
  return (
    <div className='px-10 lg:px-24'>
        {
            <div className='flex flex-col gap-8 items-center bg-white rounded-[20px] p-3 pb-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 lg:grid-cols-5'>
                    {
                        data?.images?.map((item, index) => (
                            <img key={index} src={item?.src} alt={item?.name} className='rounded-[20px]' />
                        ))
                    }
                </div>

                <h1 className="text-[#C78700] font-bold lg:text-[22px] lg:leading-6 font-unbounded">
                    <Link href={`/products/${data?.id}`}>
                        {data?.label}
                    </Link>
                </h1>
            
                <button className='w-fit cursor-none font-unbounded px-8 py-2 rounded-[20px] bg-[#292F4A] text-white text-[18px] font-bold'>
                    {countryCode === "NG"
                    ? data?.price !== undefined && data?.price !== null
                      ? `NGN ${parseFloat(data?.price).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"
                    : data?.priceDollar !== undefined && data?.priceDollar !== null
                      ? `$ ${parseFloat(data?.priceDollar).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"}
                </button>
            </div>
        }
    </div>
  )
}

export default ProductKit