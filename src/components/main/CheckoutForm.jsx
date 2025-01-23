"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const cities = [{ id: 1, name: "New York" }, { id: 2, name: "Los Angeles" }];

const countries = [{ id: 1, name: "USA" }, { id: 2, name: "Canada" }];

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      city: "",
      country: ""
    }
  });

  const onSubmit = data => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="">
      <h1 className="lg:text-[32px] text-[24px] font-unbounded font-semibold text-primary lg:mb-12 mb-8">
        Delivery
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("firstName", { required: "First Name is required" })}
            placeholder="First Name"
            className="w-full p-3 font-freize text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.firstName &&
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.firstName.message}
            </p>}
        </div>

        <div>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            placeholder="Last Name"
            className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.lastName &&
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.lastName.message}
            </p>}
        </div>

        <div>
          <input
            {...register("address", { required: "Address is required" })}
            placeholder="Address"
            className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          {errors.address &&
            <p className="text-red-500 text-sm mt-1 font-freize text-primary">
              {errors.address.message}
            </p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("phoneNumber", {
                required: "Phone Number is required"
              })}
              placeholder="Phone Number"
              className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.phoneNumber &&
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">
                {errors.phoneNumber.message}
              </p>}
          </div>

          <div>
            <Controller
              name="city"
              control={control}
              rules={{ required: "City is required" }}
              render={({ field: { onChange, value } }) =>
                <Listbox
                  value={cities.find(city => city.name === value) || null}
                  onChange={selectedCity => {
                    onChange(selectedCity.name);
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="w-full flex items-center justify-between p-3 border rounded-lg bg-white text-left focus:ring-2 focus:ring-gray-300">
                      <span className="font-freize text-primary">
                        {value || "Select City"}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto z-50 border border-gray-200">
                      {cities.map(city =>
                        <Listbox.Option
                          key={city.id}
                          value={city}
                          className="p-3 hover:bg-gray-100 cursor-pointer font-freize text-primary"
                        >
                          {city.name}
                        </Listbox.Option>
                      )}
                    </Listbox.Options>
                  </div>
                </Listbox>}
            />
            {errors.city &&
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">
                {errors.city.message}
              </p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register("state", { required: "State is required" })}
              placeholder="State"
              className="font-freize text-primary w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            {errors.state &&
              <p className="text-red-500 text-sm mt-1 font-freize text-primary">
                {errors.state.message}
              </p>}
          </div>

          <div>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field: { onChange, value } }) =>
                <Listbox
                  value={
                    countries.find(country => country.name === value) || null
                  }
                  onChange={selectedCountry => {
                    onChange(selectedCountry.name);
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="font-freize text-primary w-full flex items-center justify-between p-3 border rounded-lg bg-white text-left focus:ring-2 focus:ring-gray-300">
                      <span>
                        {value || "Select Country"}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute w-full font-freize text-primary bg-white shadow-lg rounded-lg mt-1 max-h-40 overflow-auto z-50 border border-gray-200">
                      {countries.map(country =>
                        <Listbox.Option
                          key={country.id}
                          value={country}
                          className="p-3 hover:bg-gray-100 cursor-pointer font-freize text-primary"
                        >
                          {country.name}
                        </Listbox.Option>
                      )}
                    </Listbox.Options>
                  </div>
                </Listbox>}
            />
            {errors.country &&
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>}
          </div>
        </div>

        <button
          type="submit"
          className="transition flex text-center justify-center items-center lg:text-[22px] gap-2 py-2 px-4 lg:h-[60px] rounded-[20px] text-base font-normal duration-300 bg-background text-primary w-full"
        >
          <span className="flex items-center text-primary font-freize">Pay now</span>
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
      </form>
    </div>
  );
}
