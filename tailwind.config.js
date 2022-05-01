module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#03438D',
      secondary: '#EEC32A',
      baseBg: '#EFECE7',
      black: '#000400',
      white: '#fff',
      error: '#F57375',
    },
    fontFamily: {
      logo: ['Paytone One'],
      dec: ['Helvetica Neue'],
      input: ['Azeret Mono'],
    },
    extend: {
      boxShadow: {
        base: '-2px 2px 0px #000400',
        card: '-8px 8px 0px #00040029',
      },
    },
  },
  plugins: [],
}
