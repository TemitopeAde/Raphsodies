'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState, useEffect } from "react";

const HeaderTwo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/our-story", text: "Our Story" },
    { href: "/products", text: "Shop"},
    { href: "/contact-us", text: "Contact Us" },
    { href: "/blog", text: "Blog" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  function Navbar() {
    return (
      <nav className="flex gap-8 border border-[#292F4A] rounded-[40px] px-4">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`text-base font-normal py-2 flex ${
              pathname === link.href ? "text-[#00EEAE]" : "text-primary"
            }`}
          >
            <span className="font-freize font-normal text-base leading-4">
              {link.text}
            </span>
            <span>{link.icon}</span>
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-30 w-full lg:px-24 px-8 transition-all duration-300 ${
          isScrolled ? "bg-white/50 backdrop-blur-3xl shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center py-4">
          <div>
            <Image src="/images/logo-two.png" alt="logo" width={100} height={60} />
          </div>

          <div className="hidden lg:block">
            <Navbar />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex bg-background rounded-full px-6 py-2 gap-6">
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.56803 12.0213C7.87909 12.021 9.15237 11.5821 10.1851 10.7745L13.4322 14.0215L14.4766 12.9771L11.2296 9.73006C12.0376 8.6972 12.4768 7.42362 12.4771 6.11222C12.4771 2.85409 9.82615 0.203125 6.56803 0.203125C3.3099 0.203125 0.658936 2.85409 0.658936 6.11222C0.658936 9.37034 3.3099 12.0213 6.56803 12.0213ZM6.56803 1.6804C9.01217 1.6804 10.9998 3.66807 10.9998 6.11222C10.9998 8.55636 9.01217 10.544 6.56803 10.544C4.12388 10.544 2.13621 8.55636 2.13621 6.11222C2.13621 3.66807 4.12388 1.6804 6.56803 1.6804Z"
                    fill="#292F4A"
                  />
                </svg>
              </button>

              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.37222 11.8113C3.58868 11.8113 2.96113 12.472 2.96113 13.2877C2.96113 14.1034 3.58868 14.7641 4.37222 14.7641C5.15577 14.7641 5.7904 14.1034 5.7904 13.2877C5.7904 12.472 5.15577 11.8113 4.37222 11.8113ZM0.117676 0V1.47641H1.53586L4.08504 7.07569L3.12777 8.88429C3.01786 9.09837 2.95404 9.33828 2.95404 9.59665C2.95404 10.4124 3.58868 11.0731 4.37222 11.0731H12.8813V9.59665H4.67358C4.57431 9.59665 4.49631 9.51545 4.49631 9.4121C4.49631 9.37888 4.5034 9.34936 4.51758 9.32352L5.15222 8.12024H10.4349C10.9668 8.12024 11.4312 7.81389 11.6759 7.3599L14.2109 2.56895C14.2676 2.4656 14.2995 2.3438 14.2995 2.21461C14.2995 2.01883 14.2248 1.83106 14.0918 1.69262C13.9588 1.55418 13.7785 1.47641 13.5904 1.47641H3.10649L2.43286 0H0.117676ZM11.4631 11.8113C10.6796 11.8113 10.052 12.472 10.052 13.2877C10.052 14.1034 10.6796 14.7641 11.4631 14.7641C12.2467 14.7641 12.8813 14.1034 12.8813 13.2877C12.8813 12.472 12.2467 11.8113 11.4631 11.8113Z"
                    fill="#292F4A"
                  />
                </svg>
              </button>
            </div>

            <button
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_703_1869)">
                  <path
                    d="M7.79541 9.25H23.5454C24.1642 9.25 24.6704 8.74375 24.6704 8.125C24.6704 7.50625 24.1642 7 23.5454 7H7.79541C7.17666 7 6.67041 7.50625 6.67041 8.125C6.67041 8.74375 7.17666 9.25 7.79541 9.25Z"
                    fill="white"
                  />
                  <path
                    d="M7.79541 13.75H15.6704H23.5454C24.1642 13.75 24.6704 13.2438 24.6704 12.625C24.6704 12.0062 24.1642 11.5 23.5454 11.5H7.79541C7.17666 11.5 6.67041 12.0062 6.67041 12.625C6.67041 13.2438 7.17666 13.75 7.79541 13.75Z"
                    fill="white"
                  />
                  <path
                    d="M7.79541 18.25H23.5454C24.1642 18.25 24.6704 17.7437 24.6704 17.125C24.6704 16.5063 24.1642 16 23.5454 16H7.79541C7.17666 16 6.67041 16.5063 6.67041 17.125C6.67041 17.7437 7.17666 18.25 7.79541 18.25Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_703_1869">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.890137 0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-40 w-3/4 h-full bg-white p-4 transition-transform duration-300"
        >
          <div className="flex items-center justify-between">
            <span>
              <Image 
                alt="logo"
                src="/images/logo-one.png"
                width={100}
                height={60}
              />
            </span>
            <button
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13.4L14.9 16.3C15.0833 16.4833 15.3167 16.575 15.6 16.575C15.8833 16.575 16.1167 16.4833 16.3 16.3C16.4833 16.1167 16.575 15.8833 16.575 15.6C16.575 15.3167 16.4833 15.0833 16.3 14.9L13.4 12L16.3 9.1C16.4833 8.91667 16.575 8.68333 16.575 8.4C16.575 8.11667 16.4833 7.88333 16.3 7.7C16.1167 7.51667 15.8833 7.425 15.6 7.425C15.3167 7.425 15.0833 7.51667 14.9 7.7L12 10.6L9.1 7.7C8.91667 7.51667 8.68333 7.425 8.4 7.425C8.11667 7.425 7.88333 7.51667 7.7 7.7C7.51667 7.88333 7.425 8.11667 7.425 8.4C7.425 8.68333 7.51667 8.91667 7.7 9.1L10.6 12L7.7 14.9C7.51667 15.0833 7.425 15.3167 7.425 15.6C7.425 15.8833 7.51667 16.1167 7.7 16.3C7.88333 16.4833 8.11667 16.575 8.4 16.575C8.68333 16.575 8.91667 16.4833 9.1 16.3L12 13.4ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88334 20.6867 5.825 19.9743 4.925 19.075C4.025 18.1757 3.31267 17.1173 2.788 15.9C2.26333 14.6827 2.00067 13.3827 2 12C1.99933 10.6173 2.262 9.31733 2.788 8.1C3.314 6.88267 4.02633 5.82433 4.925 4.925C5.82367 4.02567 6.882 3.31333 8.1 2.788C9.318 2.26267 10.618 2 12 2C13.382 2 14.682 2.26267 15.9 2.788C17.118 3.31333 18.1763 4.02567 19.075 4.925C19.9737 5.82433 20.6863 6.88267 21.213 8.1C21.7397 9.31733 22.002 10.6173 22 12C21.998 13.3827 21.7353 14.6827 21.212 15.9C20.6887 17.1173 19.9763 18.1757 19.075 19.075C18.1737 19.9743 17.1153 20.687 15.9 21.213C14.6847 21.739 13.3847 22.0013 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="#C78700"/>
              </svg>

            </button>
          </div>
          <nav className="mt-8 space-y-4">
            <Link href="/" className="text-base text-primary font-bold border-b py-2 flex border-primary font-freize">
              Home
            </Link>
            <Link href="/our-story" className="text-base text-primary font-bold border-b py-2 flex border-primary font-freize">
              Our Story
            </Link>
            <Link href="/products" className="text-base text-primary font-bold border-b py-2 flex border-primary font-freize">
              Shop
            </Link>
            <Link href="/contact-us" className="text-base text-primary font-bold border-b py-2 flex border-primary font-freize">
              Contact Us
            </Link>
            <Link href="/blog"  className="text-base text-primary font-bold border-b py-2 flex border-primary font-freize">
              Blog
            </Link>
          </nav>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default HeaderTwo;
