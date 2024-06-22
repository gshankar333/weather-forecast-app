/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,tsx}",
    './pages/**/*.{html,js,jsx,tsx}',
    './Components/**/*.{html,js,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        's':'320px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px', // Example custom screen size
      },
      spacing: {
        'img-size-clear': '1.375rem',
        'img-size-logo': '3.75rem',
        'img-size-search': '1.375rem',
        'img-size-500': '4.375rem',
        'img-size-300': '3rem',
        'img-size-200': '2rem',
        'img-size-100': '1.565rem',
      },
      fontSize:{
        '900': '7.5rem',
        '700': '3rem',
        '500': '1.5rem',
        '400': '1.125rem',
        '300': '1.125rem',
        '200': '1rem',
        '100': '0.5rem'
      }
    },
  },
  plugins: [],
}

