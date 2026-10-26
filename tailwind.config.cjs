/** Design tokens from the Opengea / "The Vanguard" design system. */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        bg: '#08131F',
        panel: '#0E1B2A',
        border: '#1E2E42',
        gold: {
          DEFAULT: '#D2A84B',
          hover: '#E2BA5E',
          pressed: '#B88F35',
          subtle: 'rgba(210, 168, 75, 0.14)'
        },
        teal: {
          DEFAULT: '#1EA7E8',
          subtle: 'rgba(30, 167, 232, 0.14)'
        },
        success: {
          DEFAULT: '#23BB56',
          subtle: 'rgba(35, 187, 86, 0.15)'
        },
        warning: {
          DEFAULT: '#F6A11A',
          subtle: 'rgba(246, 161, 26, 0.15)'
        },
        error: {
          DEFAULT: '#EF404E',
          subtle: 'rgba(239, 64, 78, 0.15)'
        },
        txt: {
          primary: '#E8EEF6',
          secondary: '#8FA1B6',
          muted: '#5C6E84'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        'gold-glow': '0 0 24px -2px rgba(210, 168, 75, 0.45), 0 4px 12px rgba(0, 0, 0, 0.6)',
        'gold-glow-lg': '0 0 32px 0px rgba(210, 168, 75, 0.6), 0 8px 20px rgba(0, 0, 0, 0.75)',
        card: '0 10px 30px -5px rgba(3, 9, 16, 0.7)',
        'card-hover': '0 18px 36px -6px rgba(3, 9, 16, 0.85), 0 0 16px -4px rgba(210, 168, 75, 0.2)'
      }
    }
  },
  plugins: []
};
