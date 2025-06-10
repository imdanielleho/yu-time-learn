
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
					navy: '#1A365D',          // Deep Navy Blue - Primary
					slate: '#4A5568',         // Soft Slate - Secondary  
					gold: '#D69E2E',          // Warm Gold - Accent
					charcoal: '#2D3748',      // Warm Charcoal - Text
					coolGray: '#718096',      // Cool Gray - Subtle elements
					lightGray: '#F7FAFC',     // Light Blue-Gray - Backgrounds
					white: '#FFFFFF',         // Pure White
					// Legacy mappings for backward compatibility
					sage: '#1A365D',          // Map to navy
					coral: '#D69E2E',         // Map to gold
					lavender: '#4A5568',      // Map to slate
					sunshine: '#D69E2E',      // Map to gold
					cream: '#F7FAFC',         // Map to lightGray
					warmGray: '#718096',      // Map to coolGray
					softWhite: '#FFFFFF',     // Map to white
					indigo: '#1A365D',        // Map to navy
					blue: '#1A365D',          // Map to navy
					navy_dark: '#1A202C',     // Even darker navy
					yellow: '#D69E2E',        // Map to gold
					yellow_light: '#FAF5FF', // Light gold
					sand: '#F7FAFC',          // Map to lightGray
					sand_dark: '#EDF2F7',     // Darker lightGray
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
				'soft': '0 4px 20px rgba(26, 54, 93, 0.08)',
				'card': '0 8px 32px rgba(26, 54, 93, 0.12)',
				'warm': '0 6px 24px rgba(214, 158, 46, 0.1)',
				'gentle': '0 2px 12px rgba(74, 85, 104, 0.08)'
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
