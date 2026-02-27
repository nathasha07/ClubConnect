/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E91E63",
        darkPink: "#AD1457",
        lightPink: "#F8BBD0",
        softBg: "#FCE4EC",
        darkText: "#2D2D2D",
      },
      borderRadius: {
        xl2: "20px",
      },
      boxShadow: {
        soft: "0 15px 40px rgba(233, 30, 99, 0.15)",
        glass: "0 8px 32px rgba(31, 38, 135, 0.15)",
      },
    },
  },
  plugins: [],
};
