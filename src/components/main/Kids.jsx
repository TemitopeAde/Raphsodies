import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const fetchProductsByCategory = async (category, page = 1, limit = 100) => {
  try {
    const response = await fetch(
      `/api/products/products?category=${category}&page=${page}&limit=${limit}`,
      { method: "GET", redirect: "follow" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    const locationHeader = response.headers.get("X-User-Location");
    const location = locationHeader ? JSON.parse(locationHeader) : data?.location ?? null;

    return {
      products: data?.products || [],
      location: location,
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

const useProductsByCategory = (category, setCountryCode, page = 1, limit = 100) => {
  const [products, setProducts] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { products, location } = await fetchProductsByCategory(category, page, limit);
      console.log({ products, location });

      setProducts(products);
      setLocation(location);

      if (location?.countryCode) {
        setCountryCode(location.countryCode);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, location, loading, error, fetchProducts };
};

const Kids = () => {
  const [countryCode, setCountryCode] = useState(null);
  const { products, loading, error, fetchProducts } = useProductsByCategory("Rhapsody for Kids", setCountryCode);
    console.log(products);
    
    
  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }


  const productLink = products.length > 0 && products[0] ? `/products/${products[0].id}` : "/products";
  console.log({productLink});
  
  return (
    <div>
      <div className="flex flex-col lg:gap-8 gap-6">
        <h1 className="font-unbounded lg:text-left text-center font-bold lg:text-[48px] text-[38px] leading-[44px] lg:leading-[55px] text-primary">
          African Rhapsody for Kids
        </h1>
        <div className="flex flex-col gap-1 text-center lg:text-left">
          <h2 className="font-unbounded font-bold lg:text-lg text-[#C78700] lg:leading-[26px]">Nourish & Protect</h2>
          <h2 className="font-freize font-normal lg:text-base text-xs text-primary">Nourish + Protect</h2>
          <h2 className="font-freize font-normal lg:text-base text-xs text-primary">With Kigella & Citrus Hystrix</h2>
          
          {/* Display price properly */}
          <h2 className="lg:text-[20px] font-unbounded text-primary font-bold lg:leading-[26px]">
            {products.length > 0 ? (
              countryCode === "NG"
                ? products[0]?.price
                  ? `NGN ${parseFloat(products[0]?.price).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                  : "Unavailable"
                : products[0]?.priceDollar
                  ? `$ ${parseFloat(products[0]?.priceDollar).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                  : "Unavailable"
            ) : "Unavailable"}
          </h2>
        </div>

        <div className="flex justify-center items-center lg:justify-start lg:block">
          <Link
            href={productLink}
           
            className="w-fit flex items-center gap-3 lg:py-5 lg:px-10 px-4 py-2 text-[10px] rounded-[10px] lg:rounded-[20px] text-base font-normal transition-all duration-300 bg-background text-primary hover:bg-teal-300"
          >
            <span className="flex items-center text-[9px] lg:text-[18px] font-freize text-primary">Shop Now</span>
            <span className="lg:block hidden">
              <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
      </div>
    </div>
  );
};

export default Kids;
