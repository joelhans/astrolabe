const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './content/**/*.mdx',
    './pages/**/*.js',
    './src/components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
  ],
  theme: {
    fontFamily: {
      display: ['Ibarra Real Nova', ...defaultTheme.fontFamily.serif],
      serif: ['Ibarra Real Nova', ...defaultTheme.fontFamily.serif],
      mono: ['Inconsolata', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      fontSize: {
        '8x': '8rem',
        title: '10rem',
      },
      colors: {
        cyan: '#69b3a2',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: `${theme('fontFamily.serif')}`,
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.cyan'),
              textDecoration: 'none',
              transition: theme('transition.all'),
              fontWeight: theme('font.semibold'),
              '&:hover': {
                color: theme('colors.cyan'),
              },
              code: { color: theme('colors.blue.400') },
            },
            h1: {
              fontSize: theme('text.2xl'),
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h2: {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.gray.900'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.gray.900'),
            },
            'h4,h5,h6': {
              color: theme('colors.gray.900'),
            },
            code: {
              color: theme('colors.cyan'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.25rem',
            },
            'code:before': {
              content: 'none',
            },
            'code:after': {
              content: 'none',
            },
            hr: { borderColor: theme('colors.gray.200') },
            'ol li:before': {
              fontWeight: '600',
              color: theme('colors.gray.500'),
            },
            'ul li:before': {
              backgroundColor: theme('colors.gray.500'),
            },
            blockquote: {
              color: theme('colors.gray.900'),
              borderLeftColor: theme('colors.gray.200'),
            },
            'blockquote p:first-of-type::before': null,
            'blockquote p:last-of-type::after': null,
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
