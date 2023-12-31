/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,svg}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: 'black',
              background: 'transparent',
              padding: 0,
              margin: 0
            }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
