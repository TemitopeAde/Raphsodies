// "use client";
// // components/ReviewSection.jsx
// import React, { useEffect, useState } from "react";

// const reviews = [
//   {
//     name: "Mrs. Abiola Williams",
//     image: "/path/to/profile1.jpg",
//     review:
//       "I see a lot of changes in my skin. It is softer and smoother. I was wondering do you have body cream like the skin repair that nourishes, removes blemishes and revives the skin?"
//   },
//   {
//     name: "John Doe",
//     image: "/images/hero-2.png",
//     review:
//       "This product works wonders! My skin feels rejuvenated and looks more vibrant than ever."
//   }
// ];

// const ReviewSection = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex(
//       prevIndex => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1)
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex(
//       prevIndex => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(
//         prevIndex => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1)
//       );
//     }, 35000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative bg-cover bg-center h-[300px] lg:flex lg:items-center lg:justify-center lg:gap-8">
//       <button
//         onClick={handlePrev}
//         className="absolute bottom-0 left-1/3 border border-white text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M15 19l-7-7 7-7"
//           />
//         </svg>
//       </button>

//       <div className="w-full max-w-md overflow-hidden">
//         <div
//           className="flex transition-transform duration-700 ease-in-out"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`
//           }}
//         >
//           {reviews.map((review, index) =>
//             <div
//               key={index}
//               className="w-full px-6 py-6 bg-white rounded-lg shadow-lg"
//             >
//               <div className="flex justify-between mb-">
//                 <div className="rounded-full">
//                   <img
//                     src={review.image}
//                     alt={`${review.name}'s profile`}
//                     className="w-[79px] h-[79px] object-cover rounded-full"
//                   />
//                 </div>

//                 <div className="">
//                   <img
//                     src="/images/quote.png"
//                     alt="quote"
//                     className="w-[82px] h-[57px]"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-4">
//                 <p className="text-primary text-[15px] font-normal font-freize">
//                   {review.review}
//                 </p>
//                 <p className="text-[#C78700] font-bold font-freize">
//                   {review.name}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <button
//         onClick={handleNext}
//         className="absolute bottom-0 right-1/3 border border-white text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white hover:bg-opacity-10 transition"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-6 w-6"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
//         </svg>
//       </button>
//     </div>
//   );
// };

// export default ReviewSection;
