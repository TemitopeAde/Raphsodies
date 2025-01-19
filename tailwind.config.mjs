/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primary: "var(--primary)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'custom-bg': "url('/images/bg.png')",
      },
      fontFamily: {
        unbounded: ['Unbounded', 'serif'], 
        freize: ['"Freize"', 'serif'],
        gistesy: ['"Gistesy"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
