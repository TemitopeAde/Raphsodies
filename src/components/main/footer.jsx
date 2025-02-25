import Link from "next/link";
import React from "react";

const Footer = () => {
  const Links = [
    {
      id: "1",
      href: "/",
      label: "Home"
    },
    {
      id: "2",
      href: "/our-story",
      label: "Our story"
    },
    {
      id: "3",
      href: "/products",
      label: "Shop"
    },
    {
      id: "4",
      href: "/contact-us",
      label: "Contact Us"
    },
    {
      id: "5",
      href: "/blog",
      label: "Blog"
    }
  ];

  const Shops = [
    {
      id: "1",
      href: "/products",
      label: "African Rhapsody Products"
    },
    {
      id: "2",
      href: "/products",
      label: "African Rhapsody For Kids"
    },
    {
      id: "3",
      href: "/products",
      label: "Grandma’s Secrets Collection"
    },
    {
      id: "4",
      href: "/products",
      label: "Skin Care Combo Collection"
    }
  ];
  const currentYear = new Date().getFullYear();
  return (
    <section>
      <div className="bg-[#292F4A] text-white flex justify-center items-center h-[63px] lg:h-[167px]">
        <h1 className="text-xs font-medium leading-3 text-center font-unbounded lg:text-[32px] lg:leading-[35px]">
          Close your eyes, feel the{" "}
          <span className="text-[#C78700] font-gistesy lg:text-[96px] lg:leading-[35px] text-[36px]">
            rhapsody
          </span>
        </h1>
      </div>

      <div className="bg-custom-bg py-16">
        <div className=" lg:flex-row bg-white w-[90%] rounded-[30px] mx-auto px-8 py-8 ">
          <div className="flex flex-col gap-16 lg:flex-row mb-4">
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <ul>
                <li className="text-[20px] text-[#C78700] font-bold font-freize">
                  Navigation
                </li>
              </ul>
              <ul>
                {Links.map((item, index) =>
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-primary text-base leading-[32px] font-freize"
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-4 text-center lg:text-left">
              <ul>
                <li className="text-[20px] text-[#C78700] font-bold font-freize">
                  Shop
                </li>
              </ul>
              <ul>
                {Shops.map((item, index) =>
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-primary text-base leading-[32px] font-freize"
                    >
                      {item.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <div className="flex flex-col gap-4 items-center justify-center lg:flex-row lg:items-start">
                <span>
                  <svg
                    width="17"
                    height="22"
                    viewBox="0 0 17 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.37544 11.5C6.91444 11.5 5.72544 10.311 5.72544 8.85C5.72544 7.389 6.91444 6.2 8.37544 6.2C9.83644 6.2 11.0254 7.389 11.0254 8.85C11.0254 10.311 9.83644 11.5 8.37544 11.5ZM13.8064 3.119C12.3254 1.591 10.3964 0.75 8.37444 0.75C6.35244 0.75 4.42244 1.592 2.94044 3.121C1.43644 4.672 0.610442 6.756 0.675442 8.838C0.779442 12.182 3.04144 14.623 5.03744 16.776C6.56044 18.418 7.87444 19.836 7.87444 21.25H8.87444C8.87444 19.792 10.1914 18.392 11.7154 16.77C13.7094 14.649 15.9704 12.245 16.0744 8.838C16.1384 6.755 15.3114 4.67 13.8064 3.119Z"
                      fill="#C78700"
                    />
                  </svg>
                </span>
                <span className="text-primary text-center text-base leading-[32px] lg:leading-6 font-freize lg:text-left">
                  5 Olakunle Ajibade Street, Off Ogudu Road, Ojota
                </span>
              </div>
            </div>

            <div className="flex justify-center items-center lg:self-baseline lg:text-left lg:basis-1/3">
              <div className="flex justify-center items-center">
                <img alt="logo" src="images/footer.png" />
              </div>
            </div>
          </div>
          <div className="py-6 flex flex-col gap-8 lg:flex-row lg:justify-between items-center mt-8 lg:mt-10 border-[#C78700] border-t">
            <div className="flex gap-4 items-center justify-center">
              <div>
                <Link href="https://wa.me/message/LHXK3SHVMU6YC1">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_708_2521)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.1775 0.25C7.22914 0.25 0.762956 6.71739 0.762956 14.6687C0.75836 17.7057 1.71991 20.6654 3.50852 23.1199L1.7122 28.477L7.25379 26.7059C9.60515 28.2646 12.3649 29.0931 15.1859 29.0874C23.1342 29.0874 29.6004 22.6194 29.6004 14.6687C29.6004 6.71799 23.1348 0.25 15.1859 0.25H15.1775ZM11.1523 7.57351C10.8723 6.90424 10.6608 6.87901 10.2373 6.86158C10.0765 6.8514 9.91536 6.84598 9.75423 6.84536C9.20271 6.84536 8.62656 7.00638 8.2793 7.36204C7.85576 7.7946 6.805 8.80269 6.805 10.8712C6.805 12.9397 8.31296 14.9403 8.51662 15.2202C8.7287 15.4996 11.4575 19.8054 15.6942 21.5603C19.0075 22.9336 19.9909 22.8063 20.7449 22.6453C21.8467 22.408 23.2279 21.5939 23.5752 20.611C23.923 19.6275 23.923 18.7883 23.8215 18.6104C23.7193 18.4326 23.4394 18.3311 23.0165 18.119C22.5923 17.9069 20.5328 16.8898 20.1429 16.754C19.762 16.6098 19.398 16.6609 19.1096 17.0676C18.7029 17.636 18.3045 18.2121 17.9825 18.5594C17.7284 18.8309 17.3126 18.8652 16.9654 18.7204C16.4992 18.5257 15.1943 18.0679 13.5842 16.6357C12.3382 15.5248 11.4911 14.1436 11.2454 13.7279C10.999 13.3043 11.2201 13.0586 11.4148 12.8297C11.6268 12.5666 11.8299 12.3804 12.042 12.1346C12.2535 11.8883 12.3724 11.7615 12.5082 11.4738C12.6524 11.1938 12.5503 10.9054 12.4481 10.6927C12.3472 10.4813 11.4995 8.4128 11.1523 7.57411V7.57351Z"
                        fill="#C78700"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_708_2521">
                        <rect
                          width="28.8374"
                          height="28.8374"
                          fill="white"
                          transform="translate(0.762939 0.25)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <svg
                    width="30"
                    height="31"
                    viewBox="0 0 30 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_708_2518)">
                      <path
                        d="M15.377 30.0874C23.4459 30.0874 29.9871 23.5462 29.9871 15.4773C29.9871 7.40836 23.4459 0.867188 15.377 0.867188C7.30802 0.867188 0.766846 7.40836 0.766846 15.4773C0.766846 23.5462 7.30802 30.0874 15.377 30.0874Z"
                        fill="#C78700"
                      />
                      <path
                        d="M20.1274 5.35156H16.8909C14.9703 5.35156 12.834 6.15936 12.834 8.94342C12.8434 9.91349 12.834 10.8425 12.834 11.8881H10.6121V15.4239H12.9027V25.6027H17.112V15.3567H19.8903L20.1416 11.8782H17.0395C17.0395 11.8782 17.0464 10.3308 17.0395 9.88144C17.0395 8.78124 18.1843 8.84425 18.2531 8.84425C18.7979 8.84425 19.8571 8.84583 20.129 8.84425V5.35156H20.1274Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_708_2518">
                        <rect
                          width="29.2202"
                          height="29.2202"
                          fill="white"
                          transform="translate(0.766846 0.867188)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
              </div>
              <div>
                <Link href="/">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5751 29.9184C22.6206 29.9184 29.1427 23.3962 29.1427 15.3508C29.1427 7.30533 22.6206 0.783203 14.5751 0.783203C6.5297 0.783203 0.00756836 7.30533 0.00756836 15.3508C0.00756836 23.3962 6.5297 29.9184 14.5751 29.9184Z"
                      fill="#C78700"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.8358 8.00293H10.6122C8.77445 8.00293 7.27039 9.507 7.27039 11.3448V19.6557C7.27039 21.4934 8.77445 22.9975 10.6122 22.9975H18.8358C20.6736 22.9975 22.1777 21.4934 22.1777 19.6557V11.3448C22.1777 9.507 20.6736 8.00293 18.8358 8.00293ZM20.7968 18.8857C20.7968 20.3795 19.5699 21.6063 18.0761 21.6063H11.3771C9.87815 21.6063 8.6564 20.3795 8.6564 18.8857V12.1199C8.6564 10.621 9.87815 9.3992 11.3771 9.3992H18.0761C19.5699 9.3992 20.7968 10.621 20.7968 12.1199V18.8857Z"
                      fill="white"
                    />
                    <path
                      d="M14.724 11.8018C12.6861 11.8018 11.028 13.465 11.028 15.5029C11.028 17.5408 12.686 19.1989 14.724 19.1989C16.7619 19.1989 18.4251 17.5408 18.4251 15.5029C18.4251 13.465 16.7619 11.8018 14.724 11.8018ZM14.724 17.9515C13.3739 17.9515 12.2754 16.853 12.2754 15.5029C12.2754 14.1529 13.3739 13.0543 14.724 13.0543C16.0741 13.0543 17.1726 14.1529 17.1726 15.5029C17.1726 16.853 16.0741 17.9515 14.724 17.9515Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.428 12.1589C18.8489 12.1589 19.1877 11.8201 19.1877 11.4043C19.1877 10.9833 18.8489 10.6445 18.428 10.6445C18.0122 10.6445 17.6733 10.9833 17.6733 11.4043C17.6733 11.8201 18.0122 12.1589 18.428 12.1589Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h6 className="text-center font-freize text-primary text-base leading-[24px]">
                © {currentYear} African Rhapsody
              </h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
