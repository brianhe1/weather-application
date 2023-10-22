/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    minHeight: {
      800: "800px",
    },
    extend: {
      maxWidth: {
        450: "450px",
      },
    },
  },
  plugins: [],
};
