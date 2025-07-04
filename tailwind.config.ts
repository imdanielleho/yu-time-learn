
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
					// Sophisticated navy as primary - elegant and trustworthy
					navy: '#2C3E50',      // Deep sophisticated navy
					navyLight: '#34495E', // Lighter navy variant
					
					// Warm bronze/gold as secondary - aspirational and refined
					bronze: '#B08D57',    // Sophisticated bronze
					bronzeLight: '#C9A876', // Lighter bronze
					
					// Elegant sage green as accent - calming and mature
					sage: '#7A8471',      // Muted sage green
					sageLight: '#95A085', // Lighter sage
					
					// Warm terracotta as supporting - inviting and sophisticated
					terracotta: '#C97D60', // Refined terracotta
					terracottaLight: '#D49B7D', // Lighter terracotta
					
					// Neutral backgrounds - sophisticated and accessible
					stone: '#F7F5F3',     // Warm stone background
					stoneLight: '#FEFCFA', // Lighter stone
					stoneDark: '#E8E4E0',  // Darker stone for borders
					
					// Text colors - high contrast for accessibility
					charcoal: '#2D2D2D',  // Primary text - high contrast
					slate: '#5A5A5A',     // Secondary text
					slateLight: '#787878', // Tertiary text
					
					// Backward compatibility mappings
					indigo: '#2C3E50',    // Map to navy
					gold: '#B08D57',      // Map to bronze
					blue: '#7A8471',      // Map to sage
					coral: '#C97D60',     // Map to terracotta
					lavender: '#95A085',  // Map to light sage
					sunshine: '#C9A876',  // Map to light bronze
					cream: '#F7F5F3',     // Map to stone
					warmGray: '#5A5A5A',  // Map to slate
					softWhite: '#FEFCFA', // Map to light stone
					navy_dark: '#1A252F', // Darker navy
					yellow: '#C9A876',    // Light bronze
					yellow_light: '#E6D4B7', // Very light bronze
					sand: '#F7F5F3',      // Stone background
					sand_dark: '#E8E4E0', // Dark stone
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
				'soft': '0 4px 20px rgba(44, 62, 80, 0.06)',
				'card': '0 8px 32px rgba(44, 62, 80, 0.08)',
				'warm': '0 6px 24px rgba(176, 141, 87, 0.08)',
				'elegant': '0 4px 16px rgba(122, 132, 113, 0.06)',
				'subtle': '0 2px 8px rgba(44, 62, 80, 0.04)'
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
					"50%": { transform: "scale(1.01)" },
					"100%": { transform: "scale(1)" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"gentle-scale": "gentle-scale 3s ease-in-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
