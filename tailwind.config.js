/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        defaultBg: 'rgb(68, 68, 68)',
        mainBg: '#e1e1e1',
        backdrop: 'hsl(0deg 0% 0% / 0.75)',
        link: 'rgb(66, 185, 131)',
      },
    },
  },
  plugins: [require('daisyui')],
};
