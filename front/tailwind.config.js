/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        turquoise: {
          50: '#64FFDA',
        },
        grey: {
          50: '#8892b0',
          100: '#ccd6f6',
        },
        darkBlue: {
          50: '#2B2E4A',
          100: '#0E2C3E',
        },
        customGray: 'rgba(217, 217, 217, 0.25)',
        customGrayBg: 'rgba(217, 217, 217, 0.30)',
        customGrayBgHover: 'rgba(217, 217, 217, 0.40)',
      },
    },
  },
  plugins: [],
}

