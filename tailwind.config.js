const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'test-main': '#550a55',
        'test-bar': '  	 	  	 	#3C415C',
        'test-circle': '#151515',
      },
      backgroundImage:{
        'gradient':'linear-gradient(135deg,#301B3F,45% ,#B4A5A5 );'
      },
      fontFamily:{
        'Amatic': ['Amatic SC', 'cursive']
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Add a `third` variant, ie. `third:pb-0`
      addVariant('next', '&+span')
    })
  ],
}