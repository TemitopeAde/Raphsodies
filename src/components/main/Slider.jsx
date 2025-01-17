'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";

export default function ProductSwiper() {
  const products = [
    { id: 1, img: "/images/product-1.png", alt: "Product 1" },
    { id: 2, img: "/images/product-2.png", alt: "Product 2" },
    { id: 3, img: "/images/product-3.png", alt: "Product 3" },
    { id: 4, img: "/images/product-4.png", alt: "Product 4" },
    { id: 5, img: "/images/product-5.png", alt: "Product 5" },
    { id: 6, img: "/images/product-6.png", alt: "Product 6" }
  ];

  return (
    <section className="bg-gray-50">
      <Swiper
        spaceBetween={0}
        slidesPerView={5}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
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
                className="w-full h-[169px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
