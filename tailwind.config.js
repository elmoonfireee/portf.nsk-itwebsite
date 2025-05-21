/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify paths to all files that use Tailwind classes
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // Manually preserve classes that might be dynamically used in runtime
  safelist: [
    'animate-slide-in-left',
    'animate-slide-in-right',
    'animate-slide-in-top',
  ],

  theme: {
    extend: {
      // Add a custom color
      colors: {
        basic: '#1e706e',
      },

      // Define custom animations
      animation: {
        fade: 'fadeIn 3s ease-in-out',
        'slide-in-left': 'slideInLeft 1s ease-out forwards',
        'slide-in-right': 'slideInRight 1s ease-out forwards',
        'slide-in-top': 'slideInTop 1s ease-out forwards',
      },

      // Define keyframes for the custom animations
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInTop: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },

  // No additional Tailwind plugins used
  plugins: [],
}
