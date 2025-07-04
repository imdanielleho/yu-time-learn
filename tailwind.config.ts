
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
					// New elegant color palette
					primary: '#3C3A5B',        // Soft Midnight Indigo
					accent: '#FF805C',         // Warm Apricot Coral  
					highlight: '#F8D57E',      // Golden Sand
					surface: '#FFF8F5',        // Porcelain Blush
					secondary: '#BAC7A7',      // Olive Mist
					body: '#2B2A33',           // Charcoal Ink
					
					// Supporting shades
					plum: '#9E8BAF',           // Soft Plum
					terracotta: '#D96F66',     // Terracotta Rose
					cloud: '#E6E3E0',          // Cloud Gray
					
					// Legacy mappings for backward compatibility
					sage: '#3C3A5B',           // Map to primary
					coral: '#FF805C',          // Map to accent
					sunshine: '#F8D57E',       // Map to highlight
					cream: '#FFF8F5',          // Map to surface
					warmGray: '#2B2A33',       // Map to body
					softWhite: '#FFF8F5',      // Map to surface
					indigo: '#3C3A5B',         // Map to primary
					gold: '#F8D57E',           // Map to highlight
					blue: '#3C3A5B',           // Map to primary
					navy: '#3C3A5B',           // Map to primary
					navy_dark: '#2B2A33',      // Map to body
					yellow: '#F8D57E',         // Map to highlight
					yellow_light: '#FFF8F5',   // Map to surface
					sand: '#E6E3E0',           // Map to cloud
					sand_dark: '#BAC7A7',      // Map to secondary
					lavender: '#9E8BAF',       // Map to plum
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
				sans: ["Inter", "sans-serif"],
				heading: ["Inter", "sans-serif"]
			},
			borderRadius: {
				lg: '12px',
				md: '10px',
				sm: '6px',
				xl: '16px',
				'2xl': '20px'
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(60, 58, 91, 0.08)',
				'card': '0 8px 32px rgba(60, 58, 91, 0.12)',
				'warm': '0 6px 24px rgba(255, 128, 92, 0.1)',
				'gentle': '0 2px 12px rgba(158, 139, 175, 0.08)'
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
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"gentle-scale": {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.02)" },
					"100%": { transform: "scale(1)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"gentle-scale": "gentle-scale 2s ease-in-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
