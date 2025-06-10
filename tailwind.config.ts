
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
					vibrant: '#00A651',     // Primary vibrant green (August Health inspired)
					emerald: '#006837',     // Deep emerald for contrast
					white: '#FFFFFF',       // Pure white backgrounds
					coral: '#FF6B35',       // Warm coral accent
					'coral-dark': '#E55A2B', // Darker coral for hover
					'light-green': '#E8F5E8', // Subtle green backgrounds
					'soft-gray': '#F8F9FA',  // Alternative neutral
					charcoal: '#2C3E50',    // Professional text
					yellow: '#FFC107',      // Bright yellow accent
					cream: '#FEF9EF',       // Soft cream for section breaks
					// Legacy colors for compatibility
					sage: '#00A651',        // Map to vibrant
					forest: '#006837',      // Map to emerald
					golden: '#FF6B35',      // Map to coral
					beige: '#FFFFFF',       // Map to white
					'soft-sage': '#E8F5E8', // Map to light-green
					// More legacy mappings
					indigo: '#00A651',
					gold: '#FF6B35',
					blue: '#00A651',
					navy: '#2C3E50',
					navy_dark: '#2C3E50',
					yellow_light: '#FEF9EF',
					sand: '#FFFFFF',
					sand_dark: '#F8F9FA',
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
