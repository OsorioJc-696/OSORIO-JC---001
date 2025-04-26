/** @type {import('tailwindcss').Config} */
const config = {
    darkMode: 'class',
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {
        colors: {
          primary: '#1DA1F2',
          secondary: '#14171A',
          accent: '#657786',
          background: '#F5F8FA',
          text: '#14171A',
        },
      },
    },
    variants: {
      extend: {
        backgroundColor: ['active'],
        textColor: ['active'],
      },
    },
    plugins: [],
};

export default config;
