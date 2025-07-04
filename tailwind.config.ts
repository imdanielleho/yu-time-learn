
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
					// Primary palette inspired by Headspace - calming blues and teals
					primary: '#2D5A87',        // Deep professional blue
					'primary-light': '#4A7BA7', // Lighter blue
					'primary-dark': '#1E3A5F',  // Darker blue
					
					// Secondary palette inspired by Human Design Collective
					secondary: '#E8725C',       // Warm coral/salmon
					'secondary-light': '#F4A394', // Light coral
					'secondary-dark': '#D1603B', // Dark coral
					
					// Neutral palette inspired by Function Health
					neutral: {
						50: '#FAFAFA',   // Almost white
						100: '#F5F5F5',  // Very light gray
						200: '#E5E5E5',  // Light gray
						300: '#D4D4D4',  // Medium light gray
						400: '#A3A3A3',  // Medium gray
						500: '#737373',  // Medium dark gray
						600: '#525252',  // Dark gray
						700: '#404040',  // Very dark gray
						800: '#262626',  // Almost black
						900: '#171717',  // Very dark
					},
					
					// Accent colors
					accent: '#7B68C4',          // Soft purple
					'accent-light': '#9B8FD4',  // Light purple
					success: '#22C55E',         // Green
					warning: '#F59E0B',         // Amber
					error: '#EF4444',           // Red
					
					// Background variations
					background: '#FFFFFF',      // Pure white
					'background-soft': '#FEFEFE', // Soft white
					'background-muted': '#F8F9FA', // Very light gray
					
					// Legacy color mappings for backward compatibility
					sage: '#2D5A87',
					coral: '#E8725C',
					lavender: '#7B68C4',
					sunshine: '#F59E0B',
					cream: '#FEFEFE',
					warmGray: '#737373',
					softWhite: '#FFFFFF',
					indigo: '#2D5A87',
					gold: '#F59E0B',
					blue: '#2D5A87',
					navy: '#1E3A5F',
					navy_dark: '#1A2F4A',
					yellow: '#F59E0B',
					yellow_light: '#FEF3C7',
					sand: '#F8F9FA',
					sand_dark: '#F1F3F4',
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
				sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Inter", "sans-serif"],
				heading: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Inter", "sans-serif"]
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '6px',
				xl: '16px',
				'2xl': '24px'
			},
			boxShadow: {
				'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'warm': '0 10px 15px -3px rgba(232, 114, 92, 0.1), 0 4px 6px -2px rgba(232, 114, 92, 0.05)',
				'gentle': '0 4px 6px -1px rgba(123, 104, 196, 0.1), 0 2px 4px -1px rgba(123, 104, 196, 0.06)',
				'focus': '0 0 0 3px rgba(45, 90, 135, 0.1)',
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
				"fade-in": "fade-in 0.6s ease-out",
				"gentle-scale": "gentle-scale 3s ease-in-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
