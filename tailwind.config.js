/** @type {import('tailwindcss').Config} */
const path = require("path")

const uiPath = path.resolve(
  require.resolve("@medusajs/ui"),
  "../..",
  "**/*.{js,jsx,ts,tsx}"
)

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    uiPath
  ],
  presets: [require("@medusajs/ui-preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
