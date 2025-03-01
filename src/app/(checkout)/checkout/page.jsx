'use client'

import CheckOutForm from "@/components/main/CheckoutForm";
import { useCountries } from "@/hooks/payment/useCountries";
import useCartStore from "@/hooks/store/cartStore";
import { useAuth } from "@/hooks/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const {cart} = useCartStore();
  const router = useRouter()
  const { data: countryList, isLoading: loadingCountries, isError: hasCountryError, error: countryError } = useCountries();
  
  const deliveryFee = 10;
  const totalCost = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const netTotal = totalCost + deliveryFee

  const { user, loading, isAuthenticated } = useAuth();
    
  useEffect(() => {
    console.log({user, loading, isAuthenticated});
    
    if (!loading && !isAuthenticated) {
      router.push("/sign-in"); 
    }
  }, [isAuthenticated, loading, router]);

  
  
  return (
    <section className="bg-custom-bg mt-20">
      <div className="px-10 lg:px-24 flex flex-col gap-20 py-8">
        <div className="lg:flex gap-3 items-center hidden">
          <h2 className="font-freize lg:text-[22px] text-xs leading-[26px] font-normal">
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
          <h2 className="font-freize lg:text-[22px] font-normal text-xs leading-[26px]">
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
          <h2 className="font-freize font-normal lg:text-[22px] text-xs leading-[26px] lg:leading-[35px]">
            <span>Nefertiti Face </span>
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
          <h2 className="font-freize font-bold lg:text-[22px] text-xs leading-[26px] lg:leading-[35px]">
            <span>Checkout</span>
          </h2>
        </div>

        <div>
          

          <div className="flex lg:flex-row lg:justify-between lg:gap-16 flex-col-reverse gap-9">
            <CheckOutForm 
              netTotal={netTotal} 
              countryList={countryList}  
              loadingCountries={loadingCountries}
              countryError={countryError}
              hasCountryError={hasCountryError}

             
            />
            <div className="basis-1/2 flex flex-col gap-4">
              {cart?.map((item, index) => (
                <div key={index} className="flex items-center lg:flex-row h-fit border-dashed border-[#292F4A] border-b-2 pb-8 justify-between">
                  <div className="lg:basis-3/5 gap-2 flex lg:gap-6 items-center">
                    <img
                      src={item?.imageUrl}
                      alt={item?.name}
                      className="lg:h-[77px] w-[72px] h-[72px] lg:w-[72px] rounded-xl"
                    />
                    <h2 className="text-primary lg:text-[18px] font-semibold font-unbounded lg:leading-5">
                      {item?.name}
                    </h2>
                  </div>

                  <div className="lg:basis-2/5 text-end">
                   
                    <h1 className="text-primary lg:text-[18px] font-semibold font-unbounded lg:leading-5">
                      {item?.currency === 'USD' ? `$${item?.priceDollar}` : `NGN ${item?.price}`}
                    </h1>
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-primary font-normal font-freize lg:text-lg lg:leading-[34px]">Sub Total</h2>
                  <h2 className="text-primary font-normal font-freize lg:text-lg lg:leading-[34px]">
                    {/* Handle sub total with currency check */}
                    {cart?.some(item => item.currency === 'USD') ? `$${totalCost}` : `NGN ${totalCost}`}
                  </h2>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-primary font-normal font-freize lg:text-lg lg:leading-[34px]">Delivery</h2>
                  <h2 className="text-primary font-normal font-freize lg:text-lg lg:leading-[34px]">
                    {/* Handle delivery fee with currency check */}
                    {cart?.some(item => item.currency === 'USD') ? `$${deliveryFee}` : `NGN ${deliveryFee}`}
                  </h2>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-primary font-bold font-freize lg:text-[25px] lg:leading-[34px]">Total</h2>
                  <h2 className="text-primary font-bold font-freize lg:text-[25px] lg:leading-[34px]">
                    {/* Handle total cost with currency check */}
                    {cart?.some(item => item.currency === 'USD') ? `$${totalCost + deliveryFee}` : `NGN ${totalCost + deliveryFee}`}
                  </h2>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
