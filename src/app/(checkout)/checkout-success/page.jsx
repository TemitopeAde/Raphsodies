import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  return (
    <section className="bg-custom-bg mt-20 flex justify-center items-center h-[70vh] text-center">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center items-center">
          <svg
            width="83"
            height="83"
            viewBox="0 0 83 83"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="41.6562" cy="41.2188" r="41.2188" fill="#B1FFEA" />
            <path
              d="M9.91748 41.2189C9.91748 23.6902 24.1273 9.48047 41.6559 9.48047C59.1846 9.48047 73.3944 23.6902 73.3944 41.2189C73.3944 58.7476 59.1846 72.9573 41.6559 72.9573C24.1273 72.9573 9.91748 58.7476 9.91748 41.2189Z"
              fill="#00EEAE"
            />
            <path
              d="M54.0787 32.3504C53.9066 32.1768 53.7018 32.0391 53.4762 31.9451C53.2506 31.8511 53.0086 31.8027 52.7642 31.8027C52.5198 31.8027 52.2778 31.8511 52.0522 31.9451C51.8266 32.0391 51.6218 32.1768 51.4497 32.3504L37.6567 46.1619L31.8618 40.3485C31.6831 40.1758 31.4721 40.0401 31.241 39.949C31.0098 39.8579 30.763 39.8132 30.5145 39.8175C30.2661 39.8218 30.021 39.875 29.7931 39.9741C29.5652 40.0731 29.3591 40.216 29.1865 40.3948C29.0139 40.5735 28.8781 40.7844 28.787 41.0156C28.6959 41.2467 28.6513 41.4936 28.6556 41.742C28.6599 41.9904 28.713 42.2355 28.8121 42.4634C28.9111 42.6913 29.0541 42.8974 29.2328 43.07L36.3422 50.1794C36.5143 50.353 36.7191 50.4907 36.9447 50.5847C37.1703 50.6787 37.4123 50.7271 37.6567 50.7271C37.9011 50.7271 38.1431 50.6787 38.3687 50.5847C38.5943 50.4907 38.7991 50.353 38.9712 50.1794L54.0787 35.0719C54.2666 34.8986 54.4166 34.6882 54.5192 34.454C54.6217 34.2198 54.6747 33.9668 54.6747 33.7112C54.6747 33.4555 54.6217 33.2026 54.5192 32.9684C54.4166 32.7342 54.2666 32.5237 54.0787 32.3504Z"
              fill="#F2F3F0"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-unbounded font-semibold text-[28px] leading-[31px]">Order Successful</h1>
          <p className="text-center w-[90%] mx-auto font-freize font-normal text-base leading-6">
            Thank you for your purchase. You will receive an email confirming
            your order shortly.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            onclick={() => router.push("/products")}
            type="submit"
            className="transition flex text-center justify-center items-center lg:text-[22px] gap-2 py-2 px-4 lg:h-[60px] rounded-[20px] text-base font-normal duration-300 bg-background text-primary w-fit"
          >
            <span className="flex items-center text-primary font-freize">
              Shop now
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
