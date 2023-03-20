/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik Puddles', 'cursive'],
      },
    },
  },
  plugins: [],
};
