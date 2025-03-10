"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import useCartStore from "@/hooks/store/cartStore";
import { useRouter } from "next/navigation";
import { useStatesByCountry } from "@/hooks/payment/useState";
import useCitiesByState from "@/hooks/payment/useCitiesStates";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/store/useAuth";

export default function CheckOutForm({
  netTotal: initialNetTotal, // Renamed to avoid shadowing
  countryList,
  loadingCountries,
  countryError,
  hasCountryError,
  setDiscount,
  couponCode,
  setCouponCode,
}) {
  const router = useRouter();
  const { cart } = useCartStore();
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false); // New state for coupon loading
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [couponError, setCouponError] = useState("");

  const countryCode = selectedCountry?.iso2 || "";
  const { data: states, isLoading: loadingStates, isError: hasStateError } = useStatesByCountry(countryCode);
  const { data: cities, isLoading: loadingCities, isError: hasCityError } = useCitiesByState(countryCode, selectedState?.iso2);

  // Calculate updated total with discount
  const discount = useState(0)[0]; // Assuming discount is managed via prop/state
  const updatedNetTotal = initialNetTotal - (discount || 0);

  useEffect(() => {
    if (countryList) {
      setCountries(countryList);
    }
  }, [countryList]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: "",
    },
  });

  const handleCountryChange = (selected) => {
    setSelectedCountry(selected);
    setValue("country", selected.name);
    setValue("state", "");
    setValue("city", "");
    setSelectedState(null);
  };

  const handleStateChange = (selected) => {
    setSelectedState(selected);
    setValue("state", selected.name);
    setValue("city", "");
  };

  useEffect(() => {
    if (countryError) {
      setLocationError("Failed to load countries. Please try again later.");
    } else if (hasStateError) {
      setLocationError("Failed to load states. Please try again later.");
    } else if (hasCityError) {
      setLocationError("Failed to load cities. Please try again later.");
    } else {
      setLocationError("");
    }
  }, [countryError, hasStateError, hasCityError]);

  const cartItems = cart.map((item) => ({
    id: item?.id,
    name: item?.name,
    price: item?.currency === "USD" ? item?.priceDollar : item?.price,
    quantity: item?.quantity,
    currency: item?.currency,
  }));

  const applyCoupon = async () => {
    if (!couponCode) {
      setCouponError("Please enter a coupon code.");
      return;
    }

    setIsApplyingCoupon(true); // Disable button and show loader
    setCouponError(""); // Clear previous errors

    try {
      const response = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: couponCode,
          totalCost: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Invalid coupon code");
      }

      setDiscount(data.discountAmount); // Update discount
      toast.success("Coupon applied successfully!");
    } catch (err) {
      setCouponError(err.message);
      setDiscount(0); // Reset discount on error
      toast.error(err.message);
    } finally {
      setIsApplyingCoupon(false); // Re-enable button
    }
  };

  const handlePayment = async (paymentData) => {
    try {
      const response = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Failed to initiate payment");

      const data = await response.json();
      router.push(data.data.authorization_url);
    } catch (err) {
      console.error("Payment initiation failed:", err);
      setLocationError("Payment initialization failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data) => {
    if (!user?.id) {
      toast.error("Please login to continue.");
      return;
    }

    setIsSubmitting(true);

    const paymentData = {
      email: data.email,
      amount: updatedNetTotal, // Use updated total with discount
      cartItems,
      userId: user.id,
      // couponCode: couponCode || null,
      deliveryInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    };

    await handlePayment(paymentData);
  };

  return (
    <div>
      <h1 className="lg:text-[32px] text-[24px] font-unbounded font-semibold text-primary lg:mb-12 mb-8">
        Delivery
      </h1>

      {locationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <ExclamationCircleIcon className="w-5 h-5" />
          <span className="font-freize">{locationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Coupon Code Input */}
        <div className="space-y-2">
          <label htmlFor="couponCode" className="font-freize text-primary">Coupon Code</label>
          <div className="flex gap-2">
            <input
              id="couponCode"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="e.g. SUMMER2025"
              className="w-full p-3 font-freize text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <button
              type="button"
              onClick={applyCoupon}
              disabled={isApplyingCoupon}
              className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 font-freize disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isApplyingCoupon ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Apply"
              )}
            </button>
          </div>
          {couponError && (
            <p className="text-red-500 text-sm mt-1 font-freize">{couponError}</p>
          )}
        </div>

        {/* Display Total Amount */}
        {/* <div className="space-y-2">
          <div className="flex justify-between font-freize text-primary">
            <span>Subtotal:</span>
            <span>₦{initialNetTotal.toLocaleString()}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between font-freize text-green-600">
              <span>Discount:</span>
              <span>-₦{discount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-freize text-primary font-semibold">
            <span>Total:</span>
            <span>₦{updatedNetTotal.toLocaleString()}</span>
          </div>
        </div> */}

        <div>
          <input
            {...register("firstName", { required: "First Name is required" })}
            placeholder="First Name"
            className="w-full p-3 font-freize text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Last Name"
            className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            placeholder="test@gmail.com"
            className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              placeholder="Phone Number"
              className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field: { value } }) => (
                <Listbox
                  value={countries?.find((country) => country.name === value) || null}
                  onChange={handleCountryChange}
                  disabled={loadingCountries}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex items-center font-freize justify-between p-3 border rounded-lg bg-white">
                      <span>{loadingCountries ? "Loading..." : value || "Select Country"}</span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto">
                      {countries?.map((country) => (
                        <Listbox.Option
                          key={country.id}
                          value={country}
                          className="p-3 font-freize hover:bg-gray-100 cursor-pointer"
                        >
                          {country.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1 font-freize">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field: { value } }) => (
                <Listbox
                  value={states?.find((state) => state.name === value) || null}
                  onChange={handleStateChange}
                  disabled={!selectedCountry || loadingStates}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between p-3 border rounded-lg bg-white font-freize">
                      <span>{loadingStates ? "Loading..." : value || "Select State"}</span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto">
                      {states?.map((state) => (
                        <Listbox.Option
                          key={state.id}
                          value={state}
                          className="p-3 hover:bg-gray-100 cursor-pointer font-freize"
                        >
                          {state.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">{errors.state.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field: { onChange, value } }) => (
                <Listbox
                  value={cities?.find((city) => city.name === value) || null}
                  onChange={(selectedCity) => onChange(selectedCity.name)}
                  disabled={!selectedState || loadingCities}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between p-3 border rounded-lg bg-white text-left focus:ring-2 focus:ring-gray-300">
                      <span className="font-freize text-primary">
                        {loadingCities ? "Loading..." : value || "Select City"}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-50 w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto border border-gray-200">
                      {cities?.map((city) => (
                        <Listbox.Option
                          key={city.id}
                          value={city}
                          className="p-3 hover:bg-gray-100 cursor-pointer font-freize text-primary"
                        >
                          {city.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              )}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">{errors.city.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || authLoading}
          className="transition flex text-center justify-center items-center lg:text-[22px] gap-2 py-2 px-4 lg:h-[60px] rounded-[20px] text-base font-normal duration-300 bg-background text-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center text-primary font-freize">Processing...</span>
          ) : (
            <>
              <span className="flex items-center text-primary font-freize">Pay now</span>
              <span className="lg:block hidden">
                <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.17101 2.23247C8.87749 1.94021 8.87646 1.46534 9.16872 1.17181C9.43442 0.904974 9.85103 0.879871 10.1451 1.09709L10.2294 1.16953L16.2794 7.19353C16.547 7.46002 16.5714 7.87813 16.3524 8.1722L16.2794 8.25643L10.2294 14.2814C9.93593 14.5737 9.46105 14.5727 9.16877 14.2792C8.90305 14.0124 8.87971 13.5957 9.09817 13.3025L9.17096 13.2186L14.687 7.7247L9.17101 2.23247Z" fill="#292F4A" />
                  <path d="M0 7.72461C0 7.34491 0.282154 7.03112 0.648229 6.98146L0.75 6.97461L15.75 6.97461C16.1642 6.97461 16.5 7.3104 16.5 7.72461C16.5 8.10431 16.2178 8.4181 15.8518 8.46776L15.75 8.47461L0.75 8.47461C0.335786 8.47461 0 8.13882 0 7.72461Z" fill="#292F4A" />
                </svg>
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}