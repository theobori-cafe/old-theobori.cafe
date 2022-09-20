/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.ts",
    "./components/**/*.ts",
    "./pages/**/*.tsx",
    "./components/**/*.tsx"
  ],

  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
};
