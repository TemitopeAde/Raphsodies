'use client'

import CartPage from "@/components/Cart";
import Modals from "@/components/main/modal";
import Product from "@/components/main/Product";
import { DialogCustomAnimation } from "@/components/Modal";
import { useProducts } from "@/hooks/admin/useProducts";
import { useSingleProduct } from "@/hooks/admin/useSingleProduct";
import useCartStore from "@/hooks/store/cartStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({params}) => {
  const [openModal, setOpenModal] = useState(false);
  const {addToCart, cart} = useCartStore();  
  const [quantity, setQuantity] = useState(1)
  const [productId, setProductId] = useState(null)
  const [product, setProduct] = useState({})
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState(null); 
  const [countryCode, setCountryCode] = useState("")
  const router = useRouter()
  const [item, setItem] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [page, setPage] = useState(1);
    const limit = 4;


  

  useEffect(() => {
    (async () => {
      try {
        const resolvedParams = await params; 
        setProductId(resolvedParams?.products); 
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    })();
  }, [params]);
  
  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  

  const handleAddToCart = () => {
    const currency = countryCode === "NG" ? "NGN" : "USD"; 
    const price = countryCode === "NG" ? product.price : product.priceDollar;
  
    addToCart({
      ...product,
      quantity,
      currency, 
      price,
    });
    setOpenModal(true);
    setQuantity(1);
  
    // setTimeout(() => {
    //   setOpenModal(false);
    // }, 6000);
  };

  const {data, isError, isLoading} = useSingleProduct(productId);
  
  // console.log(data);
  
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
    }
  ];

  useEffect(() => {
    setProduct(data?.data.product)
  }, [data])

  useEffect(() => {
      setLocation(data?.location)
      setCountryCode(data?.location?.countryCode)
  }, [data]);

  
  const { data: productData, isLoading: productLoading, isError: productError } = useProducts({
    page: 1,  // Fetch all products
    limit: 1000,  // Set a high limit to get all products
    search: "",
    minPrice: null,
    maxPrice: null,
  });

  const [randomProducts, setRandomProducts] = useState([]);
  
  useEffect(() => {
    if (productData?.products?.products.length > 0) {
      const shuffled = [...productData.products.products].sort(() => 0.5 - Math.random());
      setRandomProducts(shuffled.slice(0, 4)); // Select 4 random products
    }
  }, [productData]);

  console.log({productData, item});
  
  return (
    <section className="bg-custom-bg mt-20">
      <div className="px-10 lg:px-24 flex flex-col gap-20 py-8">
        <div className="flex gap-3 items-center">
          <h2 onClick={() => router.push("/")} className="cursor-pointer font-freize lg:text-[22px] text-base leading-[26px] font-normal">
            Home
          </h2>
          <span>
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.17101 2.23271C8.87749 1.94045 8.87646 1.46558 9.16872 1.17206C9.43442 0.905218 9.85103 0.880116 10.1451 1.09734L10.2294 1.16977L16.2794 7.19377C16.547 7.46026 16.5714 7.87837 16.3524 8.17245L16.2794 8.25667L10.2294 14.2817C9.93593 14.574 9.46105 14.573 9.16877 14.2795C8.90305 14.0127 8.87971 13.5959 9.09817 13.3028L9.17096 13.2188L14.687 7.72494L9.17101 2.23271Z"
                fill="#292F4A"
              />
              <path
                d="M0 7.72559C0 7.34589 0.282154 7.0321 0.648229 6.98243L0.75 6.97559L15.75 6.97559C16.1642 6.97559 16.5 7.31137 16.5 7.72559C16.5 8.10528 16.2178 8.41908 15.8518 8.46874L15.75 8.47559L0.75 8.47559C0.335786 8.47559 0 8.1398 0 7.72559Z"
                fill="#292F4A"
              />
            </svg>
          </span>
          <h2 onClick={() => router.push("/products")} className="cursor-pointer font-freize lg:text-[22px] font-normal text-base leading-[26px]">
            Shop
          </h2>
          <span>
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.17101 2.23271C8.87749 1.94045 8.87646 1.46558 9.16872 1.17206C9.43442 0.905218 9.85103 0.880116 10.1451 1.09734L10.2294 1.16977L16.2794 7.19377C16.547 7.46026 16.5714 7.87837 16.3524 8.17245L16.2794 8.25667L10.2294 14.2817C9.93593 14.574 9.46105 14.573 9.16877 14.2795C8.90305 14.0127 8.87971 13.5959 9.09817 13.3028L9.17096 13.2188L14.687 7.72494L9.17101 2.23271Z"
                fill="#292F4A"
              />
              <path
                d="M0 7.72559C0 7.34589 0.282154 7.0321 0.648229 6.98243L0.75 6.97559L15.75 6.97559C16.1642 6.97559 16.5 7.31137 16.5 7.72559C16.5 8.10528 16.2178 8.41908 15.8518 8.46874L15.75 8.47559L0.75 8.47559C0.335786 8.47559 0 8.1398 0 7.72559Z"
                fill="#292F4A"
              />
            </svg>
          </span>
          <h2 className="font-freize font-bold lg:text-[22px] text-base leading-[26px] lg:leading-[35px]">
            <span>{product?.name}</span>
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : isError ? (
          <div className="text-primary font-semibold font-freize  text-center">
            <p>Failed to load product details. Please try again.</p>
            <button
              onClick={() => router.refresh()}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded font-freize"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="lg:flex-row flex-col flex lg:gap-20 gap-10 text-primary">
            <div className="basis-1/2">
              <img
                src={product?.imageUrl}
                alt={product?.name}
                className="w-full rounded-[30px] h-full object-cover"
              />
            </div>
            <div className="basis-1/2 flex gap-8 flex-col">
              <div className="flex flex-col gap-3">
                <h2 className="font-unbounded font-semibold lg:text-[32px] text-[28px] lg:leading-[34px]">
                {product?.name}
                </h2>
                <span>
                  <h3 className="font-freize lg:text-[20px] text-[15px] font-normal lg:leading-[23px]">
                    {product?.label}
                  </h3>
                  {/* <h3 className="text-[15px] font-freize lg:text-[20px] font-normal lg:leading-[23px]">
                    With Camellia sinensis, Oat extract & Licorice root
                  </h3> */}
                </span>
                <div className="flex lg:flex-col flex-row justify-between items-center lg:items-start gap-2">
                  <span className="text-[28px] font-unbounded font-semibold lg:text-[32px] lg:leading-[34px]">
                  {countryCode === "NG"
                    ? product?.price !== undefined && product?.price !== null
                      ? `NGN ${product?.price?.toLocaleString("en-NG")}`
                      : "Unavailable"
                    : product?.priceDollar !== undefined && product?.priceDollar !== null
                      ? `$ ${product?.priceDollar?.toLocaleString("en-US")}`
                      : "Unavailable"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button onClick={decreaseQuantity} className="">
                      <svg
                        width="47"
                        height="47"
                        viewBox="0 0 47 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.5003 5.38562C33.5035 5.38562 41.6149 13.4951 41.6149 23.5002C41.6149 33.5034 33.5035 41.6148 23.5003 41.6148C13.4952 41.6148 5.38574 33.5034 5.38574 23.5002C5.38574 13.497 13.4972 5.38562 23.5003 5.38562Z"
                          stroke="#292F4A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.9805 23.4796C15.7043 23.4796 15.4805 23.7035 15.4805 23.9796C15.4805 24.2558 15.7043 24.4796 15.9805 24.4796H30.1461C30.4223 24.4796 30.6461 24.2558 30.6461 23.9796C30.6461 23.7035 30.4223 23.4796 30.1461 23.4796H15.9805Z"
                          stroke="#292F4A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="font-freize font-bold text-[20px]">{quantity}</span>
                    <button onClick={increaseQuantity} className="ml-1">
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19 1C28.9399 1 37 9.05816 37 19C37 28.9399 28.9399 37 19 37C9.05816 37 1 28.9399 1 19C1 9.06011 9.06011 1 19 1Z"
                          stroke="#292F4A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M28 19C28 19.1989 27.921 19.3897 27.7803 19.5303C27.6397 19.671 27.4489 19.75 27.25 19.75H19.75V27.25C19.75 27.4489 19.671 27.6397 19.5303 27.7803C19.3897 27.921 19.1989 28 19 28C18.8011 28 18.6103 27.921 18.4697 27.7803C18.329 27.6397 18.25 27.4489 18.25 27.25V19.75H10.75C10.5511 19.75 10.3603 19.671 10.2197 19.5303C10.079 19.3897 10 19.1989 10 19C10 18.8011 10.079 18.6103 10.2197 18.4697C10.3603 18.329 10.5511 18.25 10.75 18.25H18.25V10.75C18.25 10.5511 18.329 10.3603 18.4697 10.2197C18.6103 10.079 18.8011 10 19 10C19.1989 10 19.3897 10.079 19.5303 10.2197C19.671 10.3603 19.75 10.5511 19.75 10.75V18.25H27.25C27.4489 18.25 27.6397 18.329 27.7803 18.4697C27.921 18.6103 28 18.8011 28 19Z"
                          fill="#292F4A"
                          stroke="#292F4A"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 lg:gap-4 items-center">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="font-freize transition flex lg:h-[60px] lg:text-[22px] text-[15px] gap-2 rounded-[20px] px-3 w-fit items-center lg:gap-3 lg:px-4 py-2 text-base font-normal duration-300 bg-background text-primary"
                >
                  <span className="flex items-center text-primary">
                    Add to Cart
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
                </button>

                <button
                  type="button"
                  className="transition flex w-fit items-center lg:text-[22px] gap-2 py-2 px-4 lg:h-[60px] rounded-[20px] text-base font-normal duration-300 bg-white text-primary border-2 border-[#292F4A]"
                >
                  <span className="flex items-center text-primary font-freize font-normal">
                    Checkout
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
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-unbounded font-semibold lg:text-[32px] lg:leading-[51px] text-primary">
              Description
            </h1>
            <p className="font-freize font-normal lg:text-2xl lg:leading-[35px]">
              {product?.description}
            </p>
          </div>
          </div>
        )}


        

        <div className="pb-36">
          <div className="flex flex-col gap-20">
            <h1 className="font-unbounded font-semibold lg:text-[32px] lg:leading-[51px] text-primary">
              Other products
            </h1>

            <div>
              <Product countryCode={countryCode} data={randomProducts} type="other" />
            </div>
          </div>
        </div>
      </div>
      <Modals
        openModal={openModal}
        setOpenModal={setOpenModal}
        content={
          <div>
            <h3 className="mb-5 text-lg font-semibold text-primary font-unbounded">
              1 Item added to Cart
            </h3>

            <div className="flex gap-4 justify-start">
              <div className="basis-24">
                <img
                  className="h-16 object-cover rounded-md w-full"
                  src={product?.imageUrl}
                  alt={product?.name}
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-left font-unbounded text-sm leading-4 text-primary font-bold">
                    {product?.name}
                  </h2>
                  <h2 className="text-left font-unbounded text-sm leading-4 text-primary font-semibold">
                    {countryCode === "NG"
                      ? `NGN ${product?.price?.toLocaleString("en-NG")}`
                      : `$ ${product?.priceDollar?.toLocaleString("en-US")}`}
                  </h2>
                </div>

                
                {/* <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <button className="">
                      <svg
                        width="47"
                        height="47"
                        viewBox="0 0 47 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.5003 5.38562C33.5035 5.38562 41.6149 13.4951 41.6149 23.5002C41.6149 33.5034 33.5035 41.6148 23.5003 41.6148C13.4952 41.6148 5.38574 33.5034 5.38574 23.5002C5.38574 13.497 13.4972 5.38562 23.5003 5.38562Z"
                          stroke="#292F4A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.9805 23.4796C15.7043 23.4796 15.4805 23.7035 15.4805 23.9796C15.4805 24.2558 15.7043 24.4796 15.9805 24.4796H30.1461C30.4223 24.4796 30.6461 24.2558 30.6461 23.9796C30.6461 23.7035 30.4223 23.4796 30.1461 23.4796H15.9805Z"
                          stroke="#292F4A"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <span className="font-freize font-bold text-[20px]">1</span>
                    <button className="ml-1">
                      <svg
                        width="38"
                        height="38"
                        viewBox="0 0 38 38"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19 1C28.9399 1 37 9.05816 37 19C37 28.9399 28.9399 37 19 37C9.05816 37 1 28.9399 1 19C1 9.06011 9.06011 1 19 1Z"
                          stroke="#292F4A"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M28 19C28 19.1989 27.921 19.3897 27.7803 19.5303C27.6397 19.671 27.4489 19.75 27.25 19.75H19.75V27.25C19.75 27.4489 19.671 27.6397 19.5303 27.7803C19.3897 27.921 19.1989 28 19 28C18.8011 28 18.6103 27.921 18.4697 27.7803C18.329 27.6397 18.25 27.4489 18.25 27.25V19.75H10.75C10.5511 19.75 10.3603 19.671 10.2197 19.5303C10.079 19.3897 10 19.1989 10 19C10 18.8011 10.079 18.6103 10.2197 18.4697C10.3603 18.329 10.5511 18.25 10.75 18.25H18.25V10.75C18.25 10.5511 18.329 10.3603 18.4697 10.2197C18.6103 10.079 18.8011 10 19 10C19.1989 10 19.3897 10.079 19.5303 10.2197C19.671 10.3603 19.75 10.5511 19.75 10.75V18.25H27.25C27.4489 18.25 27.6397 18.329 27.7803 18.4697C27.921 18.6103 28 18.8011 28 19Z"
                          fill="#292F4A"
                          stroke="#292F4A"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </button>
                  </div>
                </div>  */}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setOpen(true)}
                type="button"
                className="font-freize transition flex lg:h-[40px] lg:text-[22px] text-[15px] gap-2 rounded-[20px] px-5 w-fit items-center lg:gap-3 lg:px-8 py-2 text-base font-normal duration-300 bg-background text-primary"
              >
                <span className="flex items-center text-primary">
                  Proceed to cart
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
              </button>
              </div>
          </div>
        }
      />

      <DialogCustomAnimation open={open} setOpen={setOpen} content={<CartPage setOpen={setOpen} open={open} />} />
    </section>
  );
};

export default page;
