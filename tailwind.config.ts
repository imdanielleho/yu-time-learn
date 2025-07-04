
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
					// Updated sophisticated color palette
					sage: '#6B8E6B',        // Muted sage green - primary
					coral: '#E8A598',       // Soft terracotta coral - accent
					lavender: '#E6E0E9',    // Very light lavender - subtle backgrounds
					sunshine: '#F4E4C1',    // Soft cream yellow - highlights
					cream: '#FAF7F2',       // Warm cream - main background
					warmGray: '#6B6B6B',    // Sophisticated gray - text
					softWhite: '#FEFEFE',   // Pure soft white
					indigo: '#6B8E6B',      // Map to sage
					gold: '#D4B896',        // Muted gold
					blue: '#6B8E6B',        // Map to sage
					navy: '#4A5D4A',        // Darker sage for contrast
					navy_dark: '#3A4D3A',   // Even darker sage
					yellow: '#F4E4C1',      // Soft cream yellow
					yellow_light: '#FAF8F0', // Very light cream
					sand: '#F5F1E8',        // Light sand
					sand_dark: '#EDE7DA',   // Darker sand
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
				script: ["Dancing Script", "cursive"] // Add elegant script font
			},
			borderRadius: {
				lg: '12px',
				md: '10px',
				sm: '6px',
				xl: '16px',
				'2xl': '24px',
				'3xl': '32px'
			},
			boxShadow: {
				'soft': '0 2px 20px rgba(107, 142, 107, 0.08)',
				'card': '0 4px 32px rgba(107, 142, 107, 0.12)',
				'warm': '0 4px 24px rgba(232, 165, 152, 0.15)',
				'gentle': '0 2px 12px rgba(230, 224, 233, 0.2)',
				'elegant': '0 8px 40px rgba(107, 142, 107, 0.06)'
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
