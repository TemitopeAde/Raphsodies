"use client";

import React from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    console.log("Form Data: ", data);
  };

  return (
    <div className="flex justify-center items-center lg:w-[43rem] mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-6 rounded-lg w-full"
      >
        
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="h-[55px] text-sm font-freize text-primary w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.name &&
            <p className="text-red-500 text-right text-xs mt-1">
              {errors.name.message}
            </p>}
        </div>

        
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            className="h-[55px] text-sm font-freize text-primary w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email &&
            <p className="text-red-500 text-right text-xs mt-1">
              {errors.email.message}
            </p>}
        </div>

        
        <div>
          <input
            type="tel"
            placeholder="Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Phone number must be 10 digits"
              }
            })}
            className="h-[55px] text-sm font-freize text-primary w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.phone &&
            <p className="text-red-500 text-right text-xs mt-1">
              {errors.phone.message}
            </p>}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            placeholder="Message"
            {...register("message", { required: "Message is required" })}
            className="h-[209px] text-sm font-freize text-primary w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            rows="4"
          />
          {errors.message &&
            <p className="text-red-500 text-right text-xs mt-1">
              {errors.message.message}
            </p>}
        </div>

        <div className="flex justify-center items-center">
          <button type="submit" className="transition">
            <span
              href="/products"
              className={`flex w-fit items-center gap-3 px-4 py-2 text-[10px] rounded-[10px] text-base font-normal transition-all duration-300 bg-background text-primary hover:bg-teal-300"
                    }`}
            >
              <span className="flex items-center text-[9px] lg:text-[18px]">
                Send
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
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
