
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1140px',
				'2xl': '1440px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				yutime: {
					sage: '#7C9885',     // Primary sage green (August Health inspired)
					forest: '#4A5D23',   // Deep forest green for emphasis
					cream: '#FAF7F0',    // Warm cream background
					brown: '#8B4513',    // Rich brown for text
					'soft-sage': '#A8C09A', // Lighter sage for backgrounds
					beige: '#F5F2E8',    // Card backgrounds
					charcoal: '#2D3436', // Professional dark text
					golden: '#D4A574',   // Warm gold for accents
					// Legacy colors for compatibility
					indigo: '#7C9885',   // Map to sage
					gold: '#D4A574',     // Map to golden
					blue: '#A8C09A',     // Map to soft-sage
					navy: '#4A5D23',     // Map to forest
					navy_dark: '#2D3436', // Map to charcoal
					yellow: '#D4A574',   // Map to golden
					yellow_light: '#F5F2E8', // Map to beige
					sand: '#FAF7F0',     // Map to cream
					sand_dark: '#F5F2E8', // Map to beige
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			fontFamily: {
				sans: ["Inter", "Noto Sans", "sans-serif"],
				heading: ["Nunito", "sans-serif"]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
				'card': '0 8px 16px rgba(0, 0, 0, 0.08)'
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
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
