'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";

export default function ProductSwiper() {
  const products = [
    { id: 1, img: "/images/slider/25.png", alt: "Product 1" },
    { id: 2, img: "/images/slider/26.png", alt: "Product 2" },
    { id: 3, img: "/images/slider/27.png", alt: "Product 3" },
    { id: 4, img: "/images/slider/28.png", alt: "Product 4" },
    { id: 5, img: "/images/slider/29.png", alt: "Product 5" },
    
  ];

  return (
    <section className="bg-gray-50">
     <Swiper
  spaceBetween={0}
  slidesPerView={1} // Default slidesPerView for mobile (smallest screens)
  loop={true}
  speed={1000}
  autoplay={{
    delay: 1000,
    disableOnInteraction: false,
  }}
  breakpoints={{
    // Breakpoints for different screen sizes
    320: { slidesPerView: 1 }, // Mobile screens (smallest)
    640: { slidesPerView: 2 }, // Small tablets
    768: { slidesPerView: 3 }, // Tablets
    1024: { slidesPerView: 4 }, // Laptops
    1280: { slidesPerView: 5 }, // Larger screens
  }}
  modules={[Autoplay]}
  className="product-swiper"
>
  {products.map((product) => (
    <SwiperSlide key={product.id}>
      <div className="shadow-lg overflow-hidden">
        <img
          src={product.img}
          alt={product.alt}
          className="w-full h-[60px] lg:h-[169px] object-cover"
        />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </section>
  );
}