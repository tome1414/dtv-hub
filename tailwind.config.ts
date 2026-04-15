import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        navy: {
          50:  '#eef1f8',
          100: '#d4dbee',
          200: '#a9b7dc',
          300: '#7e92cb',
          400: '#536eb9',
          500: '#2a4fa0',
          600: '#1e3d87',
          700: '#162d6b',
          800: '#0f1e4f',
          900: '#080f33',
          950: '#040920',
        },
        gold: {
          100: '#fdf6dc',
          200: '#faedb9',
          300: '#f5d97a',
          400: '#f0c43c',
          500: '#e8a900',
          600: '#c48d00',
          700: '#9e7000',
          800: '#7a5500',
          900: '#563c00',
        },
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #080f33 0%, #0f1e4f 50%, #1e3d87 100%)',
        'gold-gradient': 'linear-gradient(90deg, #c48d00 0%, #f0c43c 50%, #c48d00 100%)',
      },
    },
  },
  plugins: [],
}

export default config
