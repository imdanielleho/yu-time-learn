
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
					sage: '#6B9B76',      // Primary - calming sage green
					coral: '#FF8B7A',     // Secondary - warm coral
					lavender: '#B19CD9',  // Accent - gentle lavender
					sunshine: '#FFD166',  // Supporting - joyful yellow
					cream: '#FDF6E3',     // Warm background
					warmGray: '#8B7F72',  // Neutral text
					softWhite: '#FEFCF8', // Soft white background
					indigo: '#6B9B76',    // Map to sage for backward compatibility
					gold: '#FFD166',      // Map to sunshine
					blue: '#6B9B76',      // Map to sage
					navy: '#5A6C57',      // Darker sage for contrast
					navy_dark: '#4A5B47', // Even darker sage
					yellow: '#FFD166',    // Keep sunshine
					yellow_light: '#FFF4D6', // Light sunshine
					sand: '#FDF6E3',      // Map to cream
					sand_dark: '#F5EDD3', // Darker cream
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
				'soft': '0 4px 20px rgba(107, 155, 118, 0.08)',
				'card': '0 8px 32px rgba(107, 155, 118, 0.12)',
				'warm': '0 6px 24px rgba(255, 139, 122, 0.1)',
				'gentle': '0 2px 12px rgba(177, 156, 217, 0.08)'
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
