"use client";

import AccordionSection from "@/components/main/Accordion";
import AnimateOnScroll from "@/components/main/AnimateOnScroll";
import HeroSection from "@/components/main/hero";
import ImageGrid from "@/components/main/ImageGrid";
import Kids from "@/components/main/Kids";
import Product from "@/components/main/Product";
import ProductHome from "@/components/main/ProductHome";
import ProductSwiper from "@/components/main/Slider";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const page = () => {
  const products = [
    {
      id: 1,
      name: "Senna Alata",
      label: "",
      attributes: ["Healing + Beautifying Oil", "Senna Alata Palm Kernel"],
      price: "15,000",
      imageUrl: "/images/grandma/5.jpg"
    },
    {
      id: 2,
      name: "Euphorbia  L. Genus",
      label: "For Acne-Prone Skin",
      attributes: [
        "Healing + Beautifying Oil",
        "Euphorbia L. Genus Palm Kernel"
      ],
      price: "15,000",
      imageUrl: "/images/grandma/6.png"
    },
    {
      id: 3,
      name: "Elaeophorbia Genus",
      label: "Repair & Hydrate",
      attributes: ["Healing + Beautifying Oil", "Elaeophorbia Genus Root"],
      price: "15,000",
      imageUrl: "/images/grandma/7.png"
    },
    {
      id: 4,
      name: "Helitropium",
      label: "Smooth & Even Tone",
      attributes: ["Healing + Beautifying Oil", "Helitropium Herb Palm Kernel"],
      price: "15,000",
      imageUrl: "/images/grandma/8.png"
    }
  ];
  const carouselData = [
    {
      id: 1,
      imageSrc: "/images/image-5.png",
      altText: "Product 1",
      description:
        "I see a lot of changes in my skin. It is softer and smoother.",
      svgPath:
        "M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z",
      svgColor: "#C78700",
      name: "Mr Abiola"
    },
    {
      id: 2,
      imageSrc: "/images/image-5.png",
      altText: "Product 2",
      description: "This product has improved my skin texture drastically.",
      svgPath:
        "M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z",
      svgColor: "#C78700",
      name: "Mrs Ayodele"
    },
    {
      id: 3,
      imageSrc: "/images/image-5.png",
      altText: "Product 2",
      description:
        "I’m thrilled to share my honest review of this incredible natural herbal product! After trying numerous products that only damaged my skin, I was blown away by the real-time results I experienced with this product. The team’s expertise in curating products with the best of nature is truly impressive. Their personalized recommendations were spot on! Even though I’ve always been a lover of natural stuff, I never really knew how to go about it for my skin. Although my skin wasn’t damaged, it was dull with a few discolorations, but since I started using your products for the last four months, I haven’t touched my makeup. My face, which was riddled with micro-needling, acne scars, and patches of hyperpigmentation, has been completely restored. I even had the boldness to go for a wedding without wearing makeup one particular day. I’ve regained my facial glow, and almost all discoloration has disappeared. The natural glow of the skin tone is being preserved, and I’ve gotten lots of compliments. I’m struggling to find words to express just how ecstatic I am about my results! Nature has truly worked its magic in healing my skin, and I’m eager to see the continued progress. Thank you for taking the time today to create this body of work centering on rejuvenating the skin through natural products and for creating such an amazing solution. I’m so grateful to have found a product that truly works.",
      svgPath:
        "M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z",
      svgColor: "#C78700",
      name: "@stephfads"
    },
    {
      id: 4,
      imageSrc: "/images/image-5.png",
      altText: "Product 2",
      description:
        "Thank you for taking the time today to create this body of work centered on rejuvenating the skin through natural products. Even though I’ve always loved natural products, I never really knew how to incorporate them into my skincare routine. My skin wasn’t damaged, but it was dull with a few discolorations. However, since I started using your products four months ago, I haven’t touched my makeup. I even had the confidence to attend a wedding without wearing any makeup one day. My skin’s natural glow is being preserved, and I’ve received lots of compliments!",
      svgPath:
        "M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z",
      svgColor: "#C78700",
      name: "@stephfads"
    },
    {
      id: 5,
      imageSrc: "/images/image-5.png",
      altText: "Product 2",
      description:
        "Good afternoon ma I just wanted to thank you for giving me confidence back I'm not there yet but I know with your continuation and religious usage melasma would be forgotten issue in my life My almost 4 years melasma is clearing up in less than 4 months using so many things from organic to four sessions of chemical peels but nothing worked it would clear up but return darker and even worse than before I bless the day I found you Each time I look at both sides of my face in the mirror now I always feel happy and pray for you Ah you will never fail nor fall I pray you keep getting better and God will bless you more in all you do If I search files and I see my before and after photos I will send it to you alongside the after Thank you so much",
      svgPath:
        "M0 16.8C0 22 1.2 25.8 3.6 28.2C5.6 30.2 8 31.6 10.8 32.4C13.6 33.2 16.2 34 18.6 34.8C20.6 35.6 21.6 37.2 21.6 39.6C21.6 42.4 21 45 19.8 47.4C18.6 49.8 17.2 52 15.6 54L18.6 57C23.4 52.6 27.4 47 30.6 40.2C33.8 33.4 35.4 26.6 35.4 19.8C35.4 14.2 33.8 9.6 30.6 5.99999C27.4 2 22.8 0 16.8 0C12.4 0 8.59999 1.8 5.39999 5.4C1.8 8.6 0 12.4 0 16.8ZM47.4 16.8C47.4 22 48.6 25.8 51 28.2C53 30.2 55.4 31.8 58.2 33C61 33.8 63.6 34.6 66 35.4C68 35.8 69 37.2 69 39.6C69 42.4 68.4 45 67.2 47.4C66 49.8 64.6 52 63 54L66 57C70.8 52.6 74.8 47 78 40.2C81.2 33.4 82.8 26.6 82.8 19.8C82.8 14.2 81.2 9.6 78 5.99999C74.8 2 70.2 0 64.2 0C59.8 0 56 1.8 52.8 5.4C49.2 8.6 47.4 12.4 47.4 16.8Z",
      svgColor: "#C78700",
      name: "@mobola78"
    }
  ];
  const router = useRouter();

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const MyCarousel = () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {carouselData.map(
          ({ id, imageSrc, altText, description, svgPath, svgColor, name }) => (
            <CarouselItem key={id}>
              <div className="p-1">
                <Card>
                  <CardContent className="bg-white rounded-[30px]">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center py-6">
                        <img src={imageSrc} alt={altText} />
                        <div>
                          <svg
                            width="83"
                            height="57"
                            viewBox="0 0 83 57"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d={svgPath} fill={svgColor} />
                          </svg>
                        </div>
                      </div>
                      <div className="max-h-[100px] overflow-y-auto">
                        <AnimateOnScroll animation="fade-up">
                          <p className="text-primary font-freize leading-[28px] text-[15px]">
                            {description}
                          </p>
                        </AnimateOnScroll>
                      </div>
                    </div>
                    <div className="py-3">
                      <AnimateOnScroll animation="fade-up">
                        <h2 className="text-[#C78700] text-lg font-freize font-bold lg:leading-[35px] text-left">
                          {name}
                        </h2>
                      </AnimateOnScroll>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <div className="absolute -bottom-16 left-1/2 lg:static">
        <CarouselPrevious className="bg-white dark:bg-white border-2 border-white text-black rounded-full p-2" />
        <CarouselNext className="bg-white dark:bg-white border-2 border-white text-black rounded-full p-2" />
      </div>
    </Carousel>
  );

  return (
    <section>
      <HeroSection />

      <section className="grid lg:grid-cols-2 lg:items-center gap-12 lg:px-32 lg:py-40 py-16 px-8 bg-custom-bg bg-cover bg-center bg-no-repeat">
        <div className="flex gap-4 flex-col h-full">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-medium text-2xl lg:text-[36px] text-primary font-unbounded">
              An Era of African Inspired Beauty
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="font-normal lg:text-lg text-xs leading-[28px] text-primary font-freize">
              Inspired by Africa’s rich botanical heritage, African Rhapsody
              combines ancient wisdom with modern cosmetic science to create
              revolutionary beauty products. Through research and innovation, we
              harness the natural power of African plants to craft products that
              reflect the continent’s beauty and offer exceptional care.
            </p>
          </AnimateOnScroll>
          <div className="justify-start hidden lg:flex">
            <AnimateOnScroll animation="fade-up">
              <span
                href="/our-story"
                className="flex items-center gap-2 underline text-[22px] font-normal text-primary"
              >
                <Link href="/our-story">Our Story</Link>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="30"
                    height="30"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="black"
                      strokeWidth="5"
                      fill="none"
                    />
                    <polygon points="40,30 70,50 40,70" fill="black" />
                  </svg>
                </button>
              </span>
            </AnimateOnScroll>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-full relative">
          <span className="absolute z-30 right-[-25px] top-[-35px] lg:right-[-61px] lg:top-[-73px]">
            <span className="lg:hidden">
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG content unchanged */}
              </svg>
            </span>
            <span className="hidden lg:block">
              <svg
                width="152"
                height="152"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* SVG content unchanged */}
              </svg>
            </span>
          </span>
          <span className="absolute z-40 top-[39%] right-[33%]">
            <div onClick={toggleVideo} className="cursor-pointer">
              <span>
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="130"
                    height="65"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="white"
                      strokeWidth="5"
                      fill="none"
                    />
                    <rect x="30" y="25" width="15" height="50" fill="white" />
                    <rect x="55" y="25" width="15" height="50" fill="white" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="130"
                    height="65"
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
                )}
              </span>
            </div>
          </span>
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-[13px]"
            src="/videos/video.mp4"
            loop
            poster="https://res.cloudinary.com/dtdpgrdhr/image/upload/v1740898551/uo475bsfn6afbwdx19pi.png"
          />
          <div className="flex justify-center lg:hidden">
            <AnimateOnScroll animation="fade-up">
              <span
                href="/our-story"
                className="flex items-center gap-2 underline text-[22px] font-normal text-primary"
              >
                <span className="font-freize">
                  <Link
                    className="font-freize lg:text-[22px] leading-[35px] font-normal text-primary"
                    href="/our-story"
                  >
                    Our Story
                  </Link>
                </span>
                <button onClick={toggleVideo}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    width="30"
                    height="30"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="black"
                      strokeWidth="5"
                      fill="none"
                    />
                    <polygon points="40,30 70,50 40,70" fill="black" />
                  </svg>
                </button>
              </span>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="lg:items-center flex flex-col gap-16 lg:flex-row-reverse lg:px-32 lg:py-40 py-16 px-8 bg-read5m lg:bg-green-bg bg-cover bg-no-repeat lg:bg-bottom">
        <div className="flex-1 basis-1/2 flex flex-col gap-6">
          <AnimateOnScroll animation="fade-up">
            <h1 className="text-primary font-medium text-2xl lg:text-[36px] lg:leading-[40px] font-unbounded">
              Africa is the true home of Wellness and Beauty
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-up">
            <p className="text-[12px] lg:text-[18px] font-normal text-primary font-unbounded">
              From Cleopatra’s milk baths to the century old beauty rituals of
              Local Nigerian tribes. The thing is its always been here in
              Africa. Throughout the ages, from the reigns of Queen Amina,
              Cleopatra, Nefertiti, to the majestic kingdoms of Ashanti, Benin,
              Mali, and ancient Egypt, Africa has been the timeless custodian
              of integral wellness and ageless beauty secrets.
            </p>
          </AnimateOnScroll>
          <button
            onClick={() => router.push("/our-story")}
            className="items-center bg-primary py-2 px-2 rounded-2xl w-40 lg:py-5 lg:w-48"
          >
            <AnimateOnScroll animation="fade-up">
              <span className="flex gap-2 items-center justify-center">
                <span className="text-lg font-normal text-white rounded-[15px]">
                  Read more
                </span>
                <svg
                  width="24"
                  height="23"
                  viewBox="0 0 24 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.171 5.97213C12.8775 5.69205 12.8765 5.23696 13.1687 4.95567C13.4344 4.69995 13.851 4.67589 14.1451 4.88406L14.2294 4.95348L20.2794 10.7265C20.547 10.9819 20.5714 11.3826 20.3524 11.6644L20.2794 11.7451L14.2294 17.519C13.9359 17.7992 13.4611 17.7982 13.1688 17.5169C12.9031 17.2612 12.8797 16.8619 13.0982 16.581L13.171 16.5005L18.687 11.2355L13.171 5.97213Z"
                    fill="white"
                  />
                  <path
                    d="M4 11.2363C4 10.8725 4.28215 10.5717 4.64823 10.5241L4.75 10.5176H19.75C20.1642 10.5176 20.5 10.8394 20.5 11.2363C20.5 11.6002 20.2178 11.9009 19.8518 11.9485L19.75 11.9551L4.75 11.9551C4.33579 11.9551 4 11.6333 4 11.2363Z"
                    fill="white"
                  />
                </svg>
              </span>
            </AnimateOnScroll>
          </button>
        </div>
        <div className="flex-1 basis-1/2 h-[400px] lg:h-full relative">
          <span className="absolute left-[-18px] top-[-23px] lg:left-[-70px] lg:top-[-66px] z-30">
            <img
              alt=""
              src="/images/layer-1.png"
              className="w-[65px] lg:w-[152px]"
            />
          </span>
          <img
            alt=""
            className="h-full w-full object-cover rounded-[30px]"
            src="/images/hero-2.png"
          />
        </div>
      </section>

      <section className="grid lg:grid-cols-1 lg:items-center gap-12 lg:px-32 lg:py-40 py-16 px-6 bg-custom-bg bg-cover bg-center bg-no-repeat">
        <div className="flex gap-4 lg:gap-20 flex-col h-full">
          <AnimateOnScroll animation="fade-up">
            <h1 className="font-medium text-lg lg:text-[36px] lg:leading-[55px] text-center text-primary font-unbounded">
              More than a beauty brand, every product is a celebration that
              transcends time
            </h1>
          </AnimateOnScroll>
          <div>
            <ImageGrid />
          </div>
          <div className="flex flex-col gap-2 lg:gap-8">
            <AnimateOnScroll animation="fade-up">
              <h2 className="lg:tracking-[0.85px] font-bold text-lg md:text-[35px] lg:leading-[48px] lg:text-[65px] text-primary font-unbounded">
                the clearest, stunning skin
              </h2>
            </AnimateOnScroll>
            <span className="flex justify-between gap-4 items-center">
              <AnimateOnScroll animation="fade-up">
                <p className="lg:tracking-[0.83px] text-xs text-primary font-unbounded lg:text-[41px] lg:leading-[43px]">
                  find the perfect product for you
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll animation="fade-up">
                <Link
                  href="/products"
                  className="flex items-center gap-1 lg:py-5 lg:px-10 px-2 py-2 text-[10px] rounded-[10px] lg:rounded-[20px] text-base font-normal transition-all duration-300 bg-background text-primary hover:bg-teal-300 whitespace-nowrap"
                >
                  <span className="flex items-center text-[9px] lg:text-[18px] font-freize text-primary whitespace-nowrap">
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
              </AnimateOnScroll>
            </span>
          </div>
        </div>
      </section>

      <section className="flex justify-between items-center lg:py-40 py-20 bg-grandma2 lg:bg-grandma bg-top bg-cover bg-no-repeat lg:bg-bottom">
        <div className="flex flex-col lg:gap-16 gap-16">
          <div className="flex flex-col lg:gap-4 gap-2 px-6">
            <AnimateOnScroll animation="fade-up">
              <h1 className="text-primary font-unbounded lg:font-semibold lg:text-[48px] font-medium text-2xl lg:leading-[55px] text-center">
                African Rhapsody for skin Disorders: Grandma’s Secrets Collection
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-up">
              <h4 className="font-freize font-normal lg:text-lg text-[15px] text-primary lg:leading-9 text-center">
                Unveil the secrets of African botanical healing rituals
              </h4>
            </AnimateOnScroll>
          </div>
          <div>
            <div className="px-8 lg:px-24">
              <div className="grid grid-cols-1 gap-10">
                <div className="rounded-[20px] p-3 text-center flex flex-col gap-5 mx-auto">
                  <img
                    src="images/grandma/5.jpg"
                    alt="Rhapsody"
                    className="rounded-[20px] w-full max-h-[500px] object-cover max-w-2xl"
                  />
                  <div className="flex flex-col flex-grow justify-between gap-3 h-full">
                    <div className="mt-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <AnimateOnScroll animation="fade-up">
              <Link
                href="/products"
                className="w-fit flex items-center gap-3 lg:py-5 lg:px-10 px-4 py-2 text-[10px] rounded-[10px] lg:rounded-[20px] text-base font-normal transition-all duration-300 bg-[#292F4A] text-primary"
              >
                <span className="flex items-center text-[9px] lg:text-[18px] font-freize text-white">
                  Shop Now
                </span>
                <span className="lg:block hidden">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.171 6.23271C12.8775 5.94045 12.8765 5.46558 13.1687 5.17206C13.4344 4.90522 13.851 4.88012 14.1451 5.09734L14.2294 5.16977L20.2794 11.1938C20.547 11.4603 20.5714 11.8784 20.3524 12.1724L20.2794 12.2567L14.2294 18.2817C13.9359 18.574 13.4611 18.573 13.1688 18.2795C12.9031 18.0127 12.8797 17.5959 13.0982 17.3028L13.171 17.2188L18.687 11.7249L13.171 6.23271Z"
                      fill="white"
                    />
                    <path
                      d="M4 11.7256C4 11.3459 4.28215 11.0321 4.64823 10.9824L4.75 10.9756H19.75C20.1642 10.9756 20.5 11.3114 20.5 11.7256C20.5 12.1053 20.2178 12.4191 19.8518 12.4687L19.75 12.4756L4.75 12.4756C4.33579 12.4756 4 12.1398 4 11.7256Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="block lg:hidden">
                  <svg
                    width="10"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.171 6.23271C12.8775 5.94045 12.8765 5.46558 13.1687 5.17206C13.4344 4.90522 13.851 4.88012 14.1451 5.09734L14.2294 5.16977L20.2794 11.1938C20.547 11.4603 20.5714 11.8784 20.3524 12.1724L20.2794 12.2567L14.2294 18.2817C13.9359 18.574 13.4611 18.573 13.1688 18.2795C12.9031 18.0127 12.8797 17.5959 13.0982 17.3028L13.171 17.2188L18.687 11.7249L13.171 6.23271Z"
                      fill="white"
                    />
                    <path
                      d="M4 11.7256C4 11.3459 4.28215 11.0321 4.64823 10.9824L4.75 10.9756H19.75C20.1642 10.9756 20.5 11.3114 20.5 11.7256C20.5 12.1053 20.2178 12.4191 19.8518 12.4687L19.75 12.4756L4.75 12.4756C4.33579 12.4756 4 12.1398 4 11.7256Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="lg:px-32 lg:py-40 py-28 px-8 bg-custom-bg">
        <div className="flex lg:justify-between lg:items-center lg:gap-16 lg:flex-row flex-col gap-9">
          <div className="flex-1 basis-1/2 h-[400px] relative">
            <span className="absolute left-[-18px] top-[-23px] lg:left-[-70px] lg:top-[-66px] z-30">
              <img
                alt=""
                src="/images/layer-1.png"
                className="w-[65px] lg:w-[152px]"
              />
            </span>
            <img
              alt=""
              className="h-full w-full object-cover rounded-[30px]"
              src="/images/bottle.png"
            />
          </div>
          <Kids />
        </div>
      </section>

      <section className="h-screen flex justify-center items-center bg-dark-bg bg-no-repeat bg-cover relative">
        <div className="absolute inset-0 bg-black bg-opacity-80" />
        <div className="z-10">
          <MyCarousel />
        </div>
      </section>

      <section className="lg:px-32 lg:py-40 py-16 px-10 bg-read4 bg-cover bg-no-repeat lg:bg-read4m">
        <div className="grid grid-rows-[auto_auto] gap-4 px-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-[40px] mx-auto p-4">
              <div id="acne">
                <img
                  src="https://res.cloudinary.com/dtdpgrdhr/image/upload/v1740899090/ojqt1kwnkbtjmljcs5cl.png"
                  alt="acne"
                  className="rounded-[30px] w-full object-cover"
                />
                <AnimateOnScroll animation="fade-up">
                  <h2 className="text-center font-bold leading-[22px] md:leading-[26px] font-unbounded text-[18px] md:text-[22px] my-3 md:my-6">
                    Acne Treatment Kit
                  </h2>
                </AnimateOnScroll>
              </div>
            </div>
            <div className="bg-white rounded-[40px] mx-auto p-4">
              <div>
                <img
                  src="https://res.cloudinary.com/dtdpgrdhr/image/upload/v1740899186/r0maohzhf6amhusr6su1.png"
                  alt="hyperpigmentation"
                  className="rounded-[30px] w-full object-cover"
                />
                <AnimateOnScroll animation="fade-up">
                  <h2 className="text-center font-bold leading-[22px] md:leading-[26px] font-unbounded text-[18px] md:text-[22px] my-3 md:my-6">
                    Hyperpigmentation + <br /> Dark Spots Repair kit
                  </h2>
                </AnimateOnScroll>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-[40px] mx-auto p-4">
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                <img
                  src="/images/face/37.png"
                  alt=""
                  className="w-full object-cover rounded-[10px]"
                />
                <img
                  src="/images/face/38.png"
                  alt=""
                  className="w-full object-cover rounded-[10px]"
                />
                <img
                  src="/images/face/39.png"
                  alt=""
                  className="w-full object-cover rounded-[10px]"
                />
                <img
                  src="/images/face/40.png"
                  alt=""
                  className="w-full object-cover rounded-[10px]"
                />
                <img
                  src="/images/face/41.png"
                  alt=""
                  className="w-full object-cover rounded-[10px]"
                />
              </div>
              <AnimateOnScroll animation="fade-up">
                <h2 className="font-unbounded font-bold text-[18px] md:text-[22px] leading-[22px] md:leading-[26px] text-primary my-3 md:my-6 text-center">
                  Face & Body Rejuvenation Kit
                </h2>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center lg:my-14 my-6">
          <AnimateOnScroll animation="fade-up">
            <Link
              href="/products?category=african"
              className="w-fit flex items-center lg:py-5 lg:px-10 gap-3 px-4 py-2 text-[10px] rounded-[10px] lg:rounded-[20px] text-base font-normal transition-all duration-300 bg-[#292F4A] hover:bg-[#121521] text-primary"
            >
              <span className="flex items-center text-[9px] lg:text-[18px] font-freize text-white">
                Shop Now
              </span>
              <span className="lg:block hidden">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.171 6.23271C12.8775 5.94045 12.8765 5.46558 13.1687 5.17206C13.4344 4.90522 13.851 4.88012 14.1451 5.09734L14.2294 5.16977L20.2794 11.1938C20.547 11.4603 20.5714 11.8784 20.3524 12.1724L20.2794 12.2567L14.2294 18.2817C13.9359 18.574 13.4611 18.573 13.1688 18.2795C12.9031 18.0127 12.8797 17.5959 13.0982 17.3028L13.171 17.2188L18.687 11.7249L13.171 6.23271Z"
                    fill="white"
                  />
                  <path
                    d="M4 11.7256C4 11.3459 4.28215 11.0321 4.64823 10.9824L4.75 10.9756H19.75C20.1642 10.9756 20.5 11.3114 20.5 11.7256C20.5 12.1053 20.2178 12.4191 19.8518 12.4687L19.75 12.4756L4.75 12.4756C4.33579 12.4756 4 12.1398 4 11.7256Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span className="block lg:hidden">
                <svg
                  width="10"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.171 6.23271C12.8775 5.94045 12.8765 5.46558 13.1687 5.17206C13.4344 4.90522 13.851 4.88012 14.1451 5.09734L14.2294 5.16977L20.2794 11.1938C20.547 11.4603 20.5714 11.8784 20.3524 12.1724L20.2794 12.2567L14.2294 18.2817C13.9359 18.574 13.4611 18.573 13.1688 18.2795C12.9031 18.0127 12.8797 17.5959 13.0982 17.3028L13.171 17.2188L18.687 11.7249L13.171 6.23271Z"
                    fill="white"
                  />
                  <path
                    d="M4 11.7256C4 11.3459 4.28215 11.0321 4.64823 10.9824L4.75 10.9756H19.75C20.1642 10.9756 20.5 11.3114 20.5 11.7256C20.5 12.1053 20.2178 12.4191 19.8518 12.4687L19.75 12.4756L4.75 12.4756C4.33579 12.4756 4 12.1398 4 11.7256Z"
                    fill="white"
                  />
                </svg>
              </span>
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="lg:px-32 lg:py-24 py-16 px-8 bg-custom-bg bg-no-repeat bg-cover">
        <div className="lg:mb-16 mb-10">
          <AnimateOnScroll animation="fade-up">
            <h1 className="lg:text-[36px] font-semibold lg:leading-[55px] text-[23px] leading-[31px] text-center text-primary font-unbounded">
              Got Questions? We’ve got answers
            </h1>
          </AnimateOnScroll>
        </div>
        <AccordionSection />
      </section>
    </section>
  );
};

export default page;