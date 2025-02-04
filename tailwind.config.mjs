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
		  'dark-bg': "url('/images/image-6.png')",
		  'green-bg': "url('/images/read.png')",
		  'green-bg-two': "url('/images/read-2.png')",
		  'grandma': "url('/images/grandma.png')",
		  'grandma2': "url('/images/grandma2.png')",
		  'read4': "url('/images/read-4.png')",
		  'read4m': "url('/images/read4m.png')",
		  'read5m': "url('/images/read5m.png')",
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