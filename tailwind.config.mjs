/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			primary: 'var(--primary)',
  			foreground: 'var(--foreground)'
  		},
  		backgroundImage: {
  			'custom-bg': "url('/images/bg.png')",
  		},
  		fontFamily: {
  			unbounded: [
  				'Unbounded',
  				'serif'
  			],
  			freize: [
  				'Freize"',
  				'serif'
  			],
  			gistesy: [
  				'Gistesy"',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [],
};

export default tailwindConfig;
