module.exports = {
	purge: [],
	darkMode: 'class',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},

		fontFamily: {
			sans: ['Roboto', 'sans-serif'],
		},

		colors: {
			transparent: 'transparent',
			current: 'currentColor',

			light: {
				50: 'rgb(234, 236, 239)',
			},

			dark: {
				50: 'rgb(37, 41, 48)',
				100: 'rgb(30, 32, 38)',
				150: 'rgb(22, 26, 30)',
				200: 'rgb(20, 21, 26)',
				250: 'rgb(43, 49, 58)',
				300: 'rgba(43, 47, 54, 0.9)',
				350: 'rgb(94, 102, 115)',
				400: 'rgb(30, 35, 41)',
				450: 'rgb(71, 77, 87)',
				500: 'rgb(30, 33, 38)',
				550: 'rgb(43, 49, 57)',
				600: 'rgb(35, 40, 45)',
			},

			black: {
				darkest: 'rgb(71, 77, 87)',
				dark: 'rgb(183, 189, 198)',
				DEFAULT: 'rgb(30, 35, 41)',
				light: 'rgb(198, 202, 208)',
				lightest: 'rgba(0, 0, 0, 0.1)',
			},

			yellow: {
				darkest: 'rgb(60, 46, 16)',
				DEFAULT: 'rgb(201, 148, 0)',
				light: 'rgb(240, 185, 11)',
				lightest: 'rgb(254, 246, 216)',
			},

			gray: {
				darkest: 'rgb(132, 142, 156)',
				dark: 'rgb(238, 240, 242)',
				DEFAULT: 'rgb(112, 122, 138)',
				light: 'rgb(242, 243, 245)',
				lightest: 'rgb(250, 250, 250)',
			},

			green: {
				dark: 'rgb(3, 166, 109)',
				DEFAULT: 'rgb(14, 203, 129)',
				light: 'rgb(127 213 156)',
				lightest: 'rgb(230 245 238)',
			},

			red: {
				dark: 'rgb(207, 48, 74)',
				DEFAULT: 'rgb(246, 70, 93)',
				light: 'rgb(230 101 126)',
				lightest: 'rgb(246 228 233)',
			},

			white: {
				DEFAULT: 'rgb(255, 255, 255)',
			}
		},

		spacing: {
			xs: '12px',
			sm: '14px',
			md: '16px',
			lg: '18px',
			xl: '20px',
			'2xl': '22px',
			'3xl': '24px',
			'4xl': '26px',
			'5xl': '28px',
			0: '0px',
			2: '2px',
			4: '4px',
			6: '6px',
			8: '8px',
			10: '10px',
			12: '12px',
			14: '14px',
			16: '16px',
			20: '20px',
			24: '24px',
			28: '28px',
			32: '32px',
			36: '36px',
			40: '40px',
			44: '44px',
			48: '48px',
			56: '56px',
			60: '60px',
			64: '64px',
			80: '80px',
			96: '96px',
			112: '112px',
			128: '128px',
			144: '144px',
			160: '160px',
			176: '176px',
			192: '192px',
			208: '208px',
			224: '224px',
			240: '240px',
			256: '256px',
			288: '288px',
			300: '300px',
			320: '320px',
			388: '388px',
		},

		fontSize: {
			xs: ['12px', { lineHeight: '1rem' }],
			sm: ['14px', { lineHeight: '1.25rem' }],
			base: ['16px', { lineHeight: '1.5rem' }],
			lg: ['18px', { lineHeight: '1.75rem' }],
			xl: ['20px', { lineHeight: '1.75rem' }],
			'2xl': ['24px', { lineHeight: '2rem' }],
			'3xl': ['30px', { lineHeight: '2.25rem' }],
			'4xl': ['36px', { lineHeight: '2.5rem' }],
			'5xl': ['48px', { lineHeight: '1' }],
			'6xl': ['60px', { lineHeight: '1' }],
			'7xl': ['72px', { lineHeight: '1' }],
			'8xl': ['96px', { lineHeight: '1' }],
			'9xl': ['128px', { lineHeight: '1' }],
		},

		flex: {
			1: '1 1 0%',
			3: '3 1 0%',
			5: '5 1 0%',
			auto: '1 1 auto',
			initial: '0 1 auto',
			none: 'none',
		},
	},
	variants: {
		extend: {},
		textAlign: ['responsive', 'direction'],
		margin: ['responsive', 'direction'],
		padding: ['responsive', 'direction'],
		flexDirection: ['responsive', 'direction'],
		borderWidth: ['responsive', 'direction'],
		backgroundColor: ['responsive', 'dark', 'hover', 'focus', 'disabled', 'checked'],
	},
	plugins: [
		require('tailwindcss-dir')(),
	],
};
