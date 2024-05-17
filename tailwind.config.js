/** @type {import('tailwindcss').Config} */
const path = require("path")

const uiPath = path.resolve(
  require.resolve("@medusajs/ui"),
  "../..",
  "\*_/_.{js,jsx,ts,tsx}"
)

module.exports = {
  content: [
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require("@medusajs/ui-preset")],
}

