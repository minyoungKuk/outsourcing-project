/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2CC4F6',
          hover: '#1FA3D8',
        },
        secondary: {
          DEFAULT: '#C9C9C9',
          hover: '#A8A8A8',
        },
        danger: {
          DEFAULT: '#FF6969',
          hover: '#E55757',
        },
        sub: {
          DEFAULT: '#FFFFFF',
          hover: '#2CC4F6',
        },
      },
      width: {
        600: '600px',
        854: '854px',
        320: '320px',
      },
      maxWidth: {
        1080: '1080px',
      },
      zIndex: {
        9999: '9999',
      },
    },
  },
  plugins: [import('@tailwindcss/line-clamp')],
};
