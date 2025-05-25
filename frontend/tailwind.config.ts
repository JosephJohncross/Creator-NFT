import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        small: "420px",
        ipad: "700px",
        mini: "900px",
        desktop: "1024px",
        large: "1280px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        'custom-light': '#F2F2F2',
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // primary: "#660403",
        // secondary: "#F8B318",
        heroBg: "#66040366"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'scale-in-out': 'scalePulse 8s ease-in-out infinite',
      },
      fontFamily: {
        poppins : ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-landing": "url('/backgrounds/hero-landing.svg')",
        "attraction-bg": "url('/images/home/attraction-bg.svg')",
        "show-hero": "url('/images/shows/hero-mobile.svg')",
        "show-hero-desktop": "url('/images/shows/hero-desktop.svg')",
        "hero-background-desktop": "url('/images/about/landing-hero.svg')",
        "hero-background-mobile": "url('/images/about/landing-hero-mobile.svg')",
      },
      screens: {
        small: "420px",
        ipad: "700px",
        mini: "900px",
        desktop: "1024px",
        large: "1280px",
      },
    },
    deliciousHamburgers: {
      size: '30px', // must be in px.
      color: '#FFF',
      colorLight: '',
      padding: '0px', // must be in px.
      animationSpeed: 1,
    },
  },
  variant: {},
  plugins: [ require("tailwindcss-animate")],
} satisfies Config

export default config