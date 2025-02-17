"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useCartStore from "@/hooks/store/cartStore";
import { useRouter } from "next/navigation";
import { useStatesByCountry } from "@/hooks/payment/useState";

export default function ContactForm({
  netTotal, 
  countryList,
  loadingCountries,
  countryError,
}) {
  const router = useRouter();
  const { cart } = useCartStore();

  // State for countries and selected country
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Get states based on selected country's ISO2 code
  const countryCode = selectedCountry?.iso2 || "";
  const { data: states, isLoading: loadingStates, isError: hasStateError } = useStatesByCountry(countryCode);

  useEffect(() => {
    setCountries(countryList);
  }, [countryList]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: ""
    }
  });

  const cartItems = cart.map((item) => ({
    id: item?.id,
    name: item?.name,
    price: item?.price,
    quantity: item?.quantity
  }));

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
    }
  };

  const onSubmit = (data) => {
    const paymentData = {
      email: data.email,
      amount: netTotal,
      cartItems,
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
    handlePayment(paymentData);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary">Delivery</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("firstName", { required: "First Name is required" })} placeholder="First Name" className="w-full p-3 border rounded-lg" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input {...register("lastName", { required: "Last Name is required" })} placeholder="Last Name" className="w-full p-3 border rounded-lg" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <input {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full p-3 border rounded-lg" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("address", { required: "Address is required" })} placeholder="Address" className="w-full p-3 border rounded-lg" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, value } }) => (
              <Listbox
                value={countries?.find((country) => country.name === value) || null}
                onChange={(selected) => {
                  setSelectedCountry(selected);
                  setValue("country", selected.name);
                }}
              >
                <div className="relative">
                  <Listbox.Button className="w-full flex items-center justify-between p-3 border rounded-lg bg-white">
                    <span>{value || "Select Country"}</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto">
                    {countries?.map((country) => (
                      <Listbox.Option key={country.id} value={country} className="p-3 hover:bg-gray-100 cursor-pointer">
                        {country.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}

          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field: { onChange, value } }) => (
              <Listbox
                value={states?.find((state) => state.name === value) || null}
                onChange={(selected) => setValue("state", selected.name)}
              >
                <div className="relative">
                  <Listbox.Button className="w-full flex items-center justify-between p-3 border rounded-lg bg-white">
                    <span>{value || "Select State"}</span>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  </Listbox.Button>
                  <Listbox.Options className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto">
                    {states?.map((state) => (
                      <Listbox.Option key={state.id} value={state} className="p-3 hover:bg-gray-100 cursor-pointer">
                        {state.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            )}
          />
          {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-primary text-white rounded-lg">Pay Now</button>
      </form>
    </div>
  );
}
