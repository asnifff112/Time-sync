import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6600', // Racing orange
        dark: '#000000',
        light: '#FFFFFF',
        gray: '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Bold like Lando site
      },
    },
  },
  plugins: [],
}
export default config
