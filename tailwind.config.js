/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          sans: ['Roboto', 'roboto'], // Agregar la fuente aquí
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

