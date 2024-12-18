/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "tmp-green": "#0cebeb",
        "tmp-green-secondary": "#0cc9c9",
        tosca: "#0cebb3",
      },
    },
  },
  plugins: [],
};
