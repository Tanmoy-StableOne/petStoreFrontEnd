/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-color': '#0066ff',
          'secondary-color': '#2ecc71',
        },
      },
    },
    plugins: [],
  }