export const theme = {
  colors: {
    primary: {
      50: '#eff9ff',
      100: '#daf2ff',
      200: '#bee8ff',
      300: '#91dbff',
      400: '#5dc4ff',
      500: '#4DACF2', // Brand Primary
      600: '#1d8ee8',
      700: '#1675d4',
      800: '#185fab',
      900: '#1a5188',
      950: '#143253',
    },
    dark: {
      50: '#f6f6f6',
      100: '#e7e7e7',
      200: '#d1d1d1',
      300: '#b0b0b0',
      400: '#888888',
      500: '#6d6d6d',
      600: '#5d5d5d',
      700: '#4f4f4f',
      800: '#454545',
      900: '#3d3d3d',
      950: '#1A1A1A', // Brand Dark
    },
    medical: {
      blue: '#4DACF2',
      green: '#10B981',
      purple: '#8B5CF6',
      orange: '#F59E0B',
      red: '#EF4444',
    },
    semantic: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#8B5CF6',
    }
  },

  typography: {
    fontFamily: {
      sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px', letterSpacing: '0.05em' }],
      sm: ['14px', { lineHeight: '20px', letterSpacing: '0.025em' }],
      base: ['16px', { lineHeight: '24px', letterSpacing: '0' }],
      lg: ['18px', { lineHeight: '28px', letterSpacing: '-0.025em' }],
      xl: ['20px', { lineHeight: '32px', letterSpacing: '-0.025em' }],
      '2xl': ['24px', { lineHeight: '36px', letterSpacing: '-0.05em' }],
      '3xl': ['30px', { lineHeight: '42px', letterSpacing: '-0.05em' }],
      '4xl': ['36px', { lineHeight: '48px', letterSpacing: '-0.075em' }],
      '5xl': ['48px', { lineHeight: '60px', letterSpacing: '-0.075em' }],
      '6xl': ['67px', { lineHeight: '80px', letterSpacing: '-0.1em' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
  },

  spacing: {
    0: '0px',
    0.5: '2px',
    1: '8px',  // Base unit
    1.5: '12px',
    2: '16px', // 2 * base
    2.5: '20px',
    3: '24px', // Standard gap
    3.5: '28px',
    4: '32px', // Card padding
    5: '40px',
    6: '48px',
    7: '56px',
    8: '64px', // Section margins
    9: '72px',
    10: '80px',
    11: '88px',
    12: '96px',
    14: '112px',
    16: '128px',
    20: '160px',
    24: '192px',
    28: '224px',
    32: '256px',
  },

  borderRadius: {
    none: '0px',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    full: '9999px',
  },

  boxShadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    base: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 4px 8px -2px rgba(0, 0, 0, 0.06)',
    lg: '0 16px 32px -8px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
    xl: '0 24px 48px -12px rgba(0, 0, 0, 0.15)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    medical: '0 4px 20px 0 rgba(77, 172, 242, 0.25)',
    hover: '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000',
  },

  backdropBlur: {
    none: 'blur(0)',
    sm: 'blur(4px)',
    base: 'blur(8px)',
    md: 'blur(12px)',
    lg: 'blur(16px)',
    xl: 'blur(24px)',
    '2xl': 'blur(40px)',
    '3xl': 'blur(64px)',
  },

  animation: {
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
      slideUp: {
        '0%': { transform: 'translateY(100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideDown: {
        '0%': { transform: 'translateY(-100%)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
      slideInLeft: {
        '0%': { transform: 'translateX(-100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      slideInRight: {
        '0%': { transform: 'translateX(100%)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      scaleIn: {
        '0%': { transform: 'scale(0.95)', opacity: '0' },
        '100%': { transform: 'scale(1)', opacity: '1' },
      },
      scaleOut: {
        '0%': { transform: 'scale(1)', opacity: '1' },
        '100%': { transform: 'scale(0.95)', opacity: '0' },
      },
      pulse: {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.5' },
      },
      bounce: {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
        },
        '50%': {
          transform: 'none',
          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
        },
      },
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      ping: {
        '75%, 100%': {
          transform: 'scale(2)',
          opacity: '0',
        },
      },
    },
    durations: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    timingFunctions: {
      ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Glass morphism effects
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
    },
    dark: {
      background: 'rgba(26, 26, 26, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    primary: {
      background: 'rgba(77, 172, 242, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(77, 172, 242, 0.2)',
    },
  },

  // Background patterns
  patterns: {
    dots: {
      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(77, 172, 242, 0.3) 1px, transparent 0)',
      backgroundSize: '20px 20px',
    },
    grid: {
      backgroundImage: `
        linear-gradient(rgba(77, 172, 242, 0.2) 1px, transparent 1px),
        linear-gradient(90deg, rgba(77, 172, 242, 0.2) 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
    },
    medical: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234DACF2' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 0v40M0 20h40' stroke='%234DACF2' stroke-width='1' stroke-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")`,
    },
    waves: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z' fill='%23ffffff' opacity='0.1'/%3E%3C/svg%3E")`,
    },
  },
};

export default theme;