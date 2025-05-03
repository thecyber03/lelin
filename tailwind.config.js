/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
        'md': '768px',  // Medium screens start from 768px
        'lg': '1024px', // Large screens start from 1024px
      },
  },
  plugins: [],
}