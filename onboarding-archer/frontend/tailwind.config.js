const colors = Array.from({ length: 18 }, (_, i) => `bg-data${i + 1}`);

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  safelist: colors,
  theme: {
    screens: {
      md: '648px',
      lg: '1256px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.25rem',
        lg: '1.25rem',
      },
    },
    fontFamily: {
      nunito: ['Nunito Sans', 'sans-serif'],
    },
    colors: {
      white: 'white',
      black: 'black',
      transparent: 'transparent',
      primary1: 'var(--primary1)',
      primary2: 'var(--primary2)',
      primary3: 'var(--primary3)',
      scrim1: 'var(--scrim1)',
      line1: 'var(--line1)',
      line2: 'var(--line2)',
      line3: 'var(--line3)',
      bg1: 'var(--bg1)',
      bg2: 'var(--bg2)',
      bg3: 'var(--bg3)',
      bg4: 'var(--bg4)',
      bg5: 'var(--bg5)',
      bg6: 'var(--bg6)',
      bg7: 'var(--bg7)',
      bg8: 'var(--bg8)',
      bg9: 'var(--bg9)',
      text1: 'var(--text1)',
      text2: 'var(--text2)',
      text3: 'var(--text3)',
      text4: 'var(--text4)',
      gain1: 'var(--gain1)',
      gain2: 'var(--gain2)',
      gain3: 'var(--gain3)',
      lose1: 'var(--lose1)',
      lose2: 'var(--lose2)',
      lose3: 'var(--lose3)',
      data1: 'var(--data1)',
      data2: 'var(--data2)',
      data3: 'var(--data3)',
      data4: 'var(--data4)',
      data5: 'var(--data5)',
      data6: 'var(--data6)',
      data7: 'var(--data7)',
      data8: 'var(--data8)',
      data9: 'var(--data9)',
      data10: 'var(--data10)',
      data11: 'var(--data11)',
      data12: 'var(--data12)',
      data13: 'var(--data13)',
      data14: 'var(--data14)',
      data15: 'var(--data15)',
      data16: 'var(--data16)',
      data17: 'var(--data17)',
      data18: 'var(--data18)',
      elevation1: 'var(--elevation1)',
      elevation2: 'var(--elevation2)',
      elevation3: 'var(--elevation3)',
      elevation4: 'var(--elevation4)',
      'elevation-navigation': 'var(--elevation-navigation)',
    },
    keyframes: {
      hide: {
        from: { opacity: 1 },
        to: { opacity: 0 },
      },
      slideInX: {
        from: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateX(0)' },
      },
      slideInY: {
        from: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
        to: { transform: 'translateY(0)' },
      },
      swipeToastX: {
        from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
        to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
      },
      swipeToastY: {
        from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
        to: { transform: 'translateY(calc(100% + var(--viewport-padding)))' },
      },
    },
    animation: {
      hide: 'hide 100ms ease-in',
      'slide-in-y': 'slideInY 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-in-x': 'slideInX 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      'swipe-toast-x': 'swipeToastX 100ms east-out',
      'swipe-toast-y': 'swipeToastY 100ms ease-out',
    },
    extend: {
      transitionProperty: {
        'margin-left': 'margin-left',
      },
      backgroundImage: {
        'main-modal-footer': "url('/images/main_modal_footer.svg')",
      },
      boxShadow: {
        elevation1: 'var(--elevation1)',
        elevation2: 'var(--elevation2)',
        elevation3: 'var(--elevation3)',
        elevation4: 'var(--elevation4)',
        'elevation-navigation': 'var(--elevation-navigation)',
      },
      dropShadow: {
        card: [
          '0px 2px 4px rgba(0, 0, 0, 0.08)',
          '0px 0px 2px rgba(0, 0, 0, 0.08)',
        ],
      },
    },
  },
  plugins: [],
};
