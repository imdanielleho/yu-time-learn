
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
					// Headspace-inspired wellness palette
					sage: '#5A7C65',        // Deep forest green
					coral: '#F4A261',       // Warm terracotta
					lavender: '#A8DADC',    // Soft blue-green
					sunshine: '#E9C46A',    // Warm gold
					cream: '#F1FAEE',       // Clean off-white
					warmGray: '#457B9D',    // Professional blue-gray
					softWhite: '#FFFFFF',   // Pure white
					charcoal: '#264653',    // Deep navy-green
					
					// Health/wellness inspired palette
					primary: '#264653',     // Professional dark teal
					secondary: '#2A9D8F',   // Medical teal
					accent: '#E76F51',      // Warm accent
					neutral: '#F8F9FA',     // Light neutral
					text: '#343A40',        // Dark gray text
					
					// Legacy mappings for compatibility
					indigo: '#264653',
					gold: '#E9C46A',
					blue: '#2A9D8F',
					navy: '#264653',
					navy_dark: '#1A3A42',
					yellow: '#E9C46A',
					yellow_light: '#FFF3CD',
					sand: '#F1FAEE',
					sand_dark: '#E8F4F8',
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
				heading: ["Inter", "sans-serif"],
				serif: ["Playfair Display", "serif"]
			},
			borderRadius: {
				lg: '16px',
				md: '12px',
				sm: '8px',
				xl: '20px',
				'2xl': '24px'
			},
			boxShadow: {
				'soft': '0 2px 20px rgba(38, 70, 83, 0.06)',
				'card': '0 4px 32px rgba(38, 70, 83, 0.08)',
				'warm': '0 8px 40px rgba(231, 111, 81, 0.12)',
				'gentle': '0 3px 16px rgba(42, 157, 143, 0.08)',
				'wellness': '0 6px 24px rgba(90, 124, 101, 0.1)'
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
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				},
				"gentle-scale": {
					"0%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.01)" },
					"100%": { transform: "scale(1)" }
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(40px)" },
					"100%": { opacity: "1", transform: "translateY(0)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.6s ease-out",
				"gentle-scale": "gentle-scale 3s ease-in-out infinite",
				"slide-up": "slide-up 0.8s ease-out"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
