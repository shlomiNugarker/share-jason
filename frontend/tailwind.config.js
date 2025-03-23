import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables toggling dark mode based on a 'class' added to the root element
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6", // Purple-500
          foreground: "#ffffff",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        secondary: {
          DEFAULT: "#0D9488", // Teal-600
          foreground: "#ffffff",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
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
        chart: {
          1: "hsl(var(--chart-1))", // Color for the first chart series
          2: "hsl(var(--chart-2))", // Color for the second chart series
          3: "hsl(var(--chart-3))", // Color for the third chart series
          4: "hsl(var(--chart-4))", // Color for the fourth chart series
          5: "hsl(var(--chart-5))", // Color for the fifth chart series
        },
      },
      fontFamily: {
        sans: [
          "Inter", // Default sans-serif font for modern designs
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Georgia", // Serif font for formal or traditional designs
          "serif",
        ],
        mono: [
          "Courier New", // Monospace font for coding or technical text
          "monospace",
        ],
      },
      screens: {
        xs: "480px", // Extra small screens
        sm: "640px", // Small screens (e.g., phones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px", // Extra large screens (e.g., desktops)
        "2xl": "1536px", // Extra-extra large screens (e.g., large desktops)
      },
      spacing: {
        1: "4px", // Small padding or margin
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        8: "32px", // Medium padding or margin
        10: "40px", // Large padding or margin
      },
      zIndex: {
        0: "0", // Default stack level
        10: "10",
        50: "50",
        100: "100", // High stack level
        "-5": "-5", // Negative stack level
      },
      width: {
        "screen-90": "90vw", // 90% of the viewport width
        card: "300px", // Fixed width for card components
      },
      height: {
        "screen-80": "80vh", // 80% of the viewport height
        banner: "500px", // Fixed height for banner components
      },
      transitionDuration: {
        0: "0ms", // No transition
        200: "200ms", // Short transition
        500: "500ms", // Long transition
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
        fadeIn: {
          "0%": {
            opacity: "0", // Fully transparent
          },
          "100%": {
            opacity: "1", // Fully visible
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1s ease-in-out", // Smooth fade-in effect
      },
      borderRadius: {
        none: "0", // No border radius
        sm: "calc(var(--radius) - 4px)", // Slightly smaller than the default radius
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)", // Default radius
        full: "9999px", // Fully rounded corners (e.g., circles)
      },
      opacity: {
        0: "0", // Fully transparent
        20: "0.2",
        50: "0.5", // 50% opacity
        80: "0.8",
        100: "1", // Fully opaque
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 5px rgba(0, 0, 0, 0.1)',
        'hover': '0 8px 25px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
