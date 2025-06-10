
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
			padding: '2rem',
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
					// New warm earthy palette
					mainBg: '#faf8f5',          // Main background - warm cream
					forestGreen: 'oklch(0.268 0.059 173.5)', // Earthy green for "about" sections
					richBrown: '#8b4513',       // Deep chocolate brown for headings
					warmCharcoal: '#4a403a',    // Softer, warmer dark text
					lightCream: '#f5f2ed',      // Slightly darker than main bg for cards
					warmBeige: '#e8e3dc',       // For subtle borders and dividers
					softBrown: '#a0826d',       // For secondary text and subtle elements
					accentGold: '#b8860b',      // Warm golden accent for buttons
					
					// Legacy mappings for backward compatibility
					navy: '#8b4513',            // Map to richBrown
					slate: '#4a403a',           // Map to warmCharcoal
					gold: '#b8860b',            // Map to accentGold
					charcoal: '#4a403a',        // Map to warmCharcoal
					coolGray: '#a0826d',        // Map to softBrown
					lightGray: '#f5f2ed',       // Map to lightCream
					white: '#faf8f5',           // Map to mainBg
					blue: 'oklch(0.268 0.059 173.5)', // Map to forestGreen
					
					// Legacy colors for backward compatibility
					sage: 'oklch(0.268 0.059 173.5)',
					coral: '#b8860b',
					lavender: '#4a403a',
					sunshine: '#b8860b',
					cream: '#f5f2ed',
					warmGray: '#a0826d',
					softWhite: '#faf8f5',
					indigo: '#8b4513',
					navy_dark: '#4a403a',
					yellow: '#b8860b',
					yellow_light: '#f5f2ed',
					sand: '#f5f2ed',
					sand_dark: '#e8e3dc',
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
				heading: ["Poppins", "Nunito", "sans-serif"]
			},
			borderRadius: {
				lg: '12px',
				md: '10px',
				sm: '6px',
				xl: '16px',
				'2xl': '20px'
			},
			boxShadow: {
				'soft': '0 4px 20px rgba(139, 69, 19, 0.08)',
				'card': '0 8px 32px rgba(139, 69, 19, 0.12)',
				'warm': '0 6px 24px rgba(184, 134, 11, 0.1)',
				'gentle': '0 2px 12px rgba(74, 64, 58, 0.08)'
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
