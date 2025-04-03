/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          roboto: ['Roboto']
        },
    },
    backgroundImage: {
      'underConstruction': "url('./src/images/underConstruction/underConstruction.jpg')",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('moment/locale/es.js'), // 🔥 Asegura que Vite incluya el idioma español
  ],
}

