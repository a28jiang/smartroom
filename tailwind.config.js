module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      display: ["typeface-playfair-display"],
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar")],
  variants: {
    scrollbar: ["rounded"],
  },
};
