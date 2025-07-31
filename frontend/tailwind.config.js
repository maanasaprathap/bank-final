/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in': 'slideIn 1s ease-out forwards',
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif']
      }, 
      minWidth: {
        '500': '500px'
      },
      width: {
        '500': '500px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '250': '250px',
        '200': '200px'
      },
      padding: {
        '500': '500px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '250': '250px',
        '200': '200px'
        
      }, 
      margin: {
        '500': '500px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '250': '250px',
        '200': '200px'
      }, 
      minWidth: {
        '500': '500px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '250': '250px',
        '200': '200px'
      },
      maxWidth: {
        '500': '500px',
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '250': '250px',
        '200': '200px'
      },
      colors: {
        'golden': '#ffbf56'
      }
    },
  },

  plugins: [],
}

