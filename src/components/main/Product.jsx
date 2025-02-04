import Link from 'next/link'
import React from 'react'


const Product = ({data, type}) => {
    
  return (
    <div className={`grid grid-cols-1  ${type==="other"? "": "px-8 lg:px-24"} md:grid-cols-2 lg:grid-cols-4 gap-10 lg:justify-between`}>
        {data?.map((item, index) => (
            <div key={index} className='bg-white rounded-[20px] p-3 text-center flex flex-col gap-5'>
            <img src={item?.image} alt={item?.name} className='rounded-[20px]' />

            <div className='flex flex-col flex-grow justify-between gap-3 h-full'>
                <div className='mt-3'>
                  <h1 className="text-[#C78700] font-bold lg:text-base lg:leading-5 font-unbounded text-[15px]">
                      <Link href={`/products/${index}`}>
                        {item?.name}
                      </Link>
                  </h1>
                  <h3 className='font-freize text-xs mt-1 lg:text-sm lg:leading-4'>{item?.label}</h3>
                </div>
                <button className='mt-3 cursor-none font-unbounded w-full py-2 rounded-[20px] bg-[#292F4A] text-white lg:text-[18px] font-bold'>
                NGN {item?.price?.toLocaleString('en-NG')}
                </button>
            </div>
            </div>
        ))}
    </div>
  )
}

export default Product