'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react';

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
    console.log({products, location});
    
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
  

const ProductHome = ({ type }) => {
  const [countryCode, setCountryCode] = useState(null);
  const { products, loading, error, fetchProducts } = useProductsByCategory("Beautifying Oil", setCountryCode);

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

  console.log({countryCode});
  

  return (
    <div className={`px-8 lg:px-24`}>
      {error ? (
        <div className="text-center py-10">
          <h1 className="text-red-600 text-lg font-semibold font-freize">Unable to load products.</h1>
          <button
            className="mt-4 px-4 py-2 bg-[#050505] text-white rounded-md font-unbounded"
            onClick={fetchProducts}
          >
            Retry
          </button>
        </div>
      ) : products.length > 0 ? (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10`}>
          {products.map((item, index) => (
            <div key={index} className="bg-white rounded-[20px] p-3 text-center flex flex-col gap-5">
              <Link href={`/products/${item.id}`}>
                <img src={item.imageUrl} alt={item.name} className="rounded-[20px]" />
              </Link>
              <div className="flex flex-col flex-grow justify-between gap-3 h-full">
                <div className="mt-3">
                  <h1 className="text-[#C78700] font-bold lg:text-base lg:leading-5 font-unbounded text-[15px]">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h1>
                  <div>
                    {item.attributes.map((attr, index) => (
                      <h3 key={index} className="font-freize text-xs mt-1 lg:text-sm lg:leading-4">{attr}</h3>
                    ))}
                  </div>
                </div>
                <button className="mt-3 cursor-pointer font-unbounded w-full py-2 rounded-[20px] bg-[#292F4A] text-white lg:text-[18px] font-bold">
                  {countryCode === "NG"
                    ? item?.price
                      ? `NGN ${parseFloat(item?.price).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"
                    : item?.priceDollar
                      ? `$ ${parseFloat(item?.priceDollar).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                      : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="font-freize font-semibold text-base text-center">No products</h1>
      )}
    </div>
  );
};

export default ProductHome;
