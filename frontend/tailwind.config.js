/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          light: '#eef2ff',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          light: '#e0f2fe',
        },
      },
      borderRadius: {
        xl: '16px',
      },
    },
  },
  plugins: [],
};
