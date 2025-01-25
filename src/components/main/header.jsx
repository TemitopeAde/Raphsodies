'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const pathname = usePathname();
  
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/our-story", text: "Our Story" },
    { href: "/products", text: "Shop", icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 8.5L12 15.5L5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ) },
    { href: "/contact-us", text: "Contact Us" },
    { href: "/blog", text: "Blog" }
  ];

  function Navbar() {
    return (
      <nav className="flex gap-8">
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`text-base font-normal py-2 flex ${
              pathname === link.href ? "text-[#00EEAE]" : "text-white"
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

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Add blur effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 z-50 w-full lg:px-24 px-10 transition-all duration-300 ${isScrolling ? "backdrop-blur-3xl bg-opacity-100" : ""}`}>
        <div className="flex justify-between items-center py-4">
          <div>
            <Image src="/images/logo.png" alt="logo" width={100} height={60} />
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

            <div>
              <button onClick={toggleSidebar} className="md:hidden">
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
                    <path
                      d="M1.29541 11.25H5.29541C5.72991 11.25 6.04541 11.5763 6.04541 12C6.04541 12.4238 5.72991 12.75 5.29541 12.75H1.29541C0.86091 12.75 0.54541 12.4238 0.54541 12C0.54541 11.5763 0.86091 11.25 1.29541 11.25Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_703_1869">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.54541)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
