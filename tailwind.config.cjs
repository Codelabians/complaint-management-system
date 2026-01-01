/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
       pastelgrey : "#D4C9BE",
       grey : '#0F1713E5',
       black : '030303',
       orange : '#5A7863',
       lightorange : '#90AB8B',
       red : '#D53030',
       lightred : '#E14A4A',
       green : '#C2D082',
       pink : '#FFBABBB2',
       lightgrey : '#EBF4DD'
      },
      fontFamily: {
           manrope: ['Manrope', 'sans-serif'],
      },
      borderColor: (theme) => ({
        custom: "rgb(176 190 197 / var(--tw-border-opacity))",
      }),
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out forwards',
        'slide-out-right': 'slide-out-right 0.3s ease-in forwards',
      },
    },
  },
  plugins: [
    function ( {addComponents}){
      addComponents({
        ".container" : {
          width : "90%",
          margin : "auto"
        }
      })
    }
  ],
});
