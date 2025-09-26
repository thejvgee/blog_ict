/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./FrontendLogic/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily : {
        primary : ["Ubuntu", "sans-serif"],
        secondary: ["Roboto", "sans-serif"],
        third: ["Cabin", "sans-serif"],
        fourth: ["Signika Negative", "sans-serif"],
        fifth: ["Arimo", "sans-serif"],
        heading : ["Rubik", "sans-serif"]
      }
    },
  },
  plugins: [],
};