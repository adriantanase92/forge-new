export const colors = {
	// `forge-primary` is designed to be used most extensively (60%), such as for backgrounds or large UI elements.
	'forge-primary': {
		50: '#f9f9f9',
		100: '#f4f5f9',
		200: '#dbdeea',
		300: '#c5c9dc',
		400: '#adb0cc',
		500: '#adb0cc',
		600: '#8381aa',
		700: '#716e94',
		800: '#5d5b78',
		900: '#4e4d62',
		950: '#2e2d39'
	},
	// 'forge-secondary' should be used less than the primary color (30%), suitable for secondary elements or smaller areas.
	'forge-secondary': {
		50: '#fdf4ef',
		100: '#fbe6d9',
		200: '#f6c9b2',
		300: '#f0a581',
		400: '#fa844e',
		500: '#e55b33',
		600: '#d53d21',
		700: '#b12d1d',
		800: '#8d261f',
		900: '#72221c',
		950: '#3d0e0d'
	},
	// 'forge-accent' is the least used color (10%), ideal for calls to action, buttons, or highlighting important elements.
	'forge-accent': {
		50: '#f0f2fd',
		100: '#e3e7fc',
		200: '#cdd2f8',
		300: '#aeb5f3',
		400: '#8e8feb',
		500: '#7872e2',
		600: '#6757d4',
		700: '#5847bb',
		800: '#493c97',
		900: '#493c97',
		950: '#252046'
	}
};

export type color = 'forge-primary' | 'forge-secondary' | 'forge-accent';

export const fonts = {
	primary: ['Syne', 'sans-serif'],
	secondary: ['Inter', 'sans-serif']
};

export const breakpoints = {
	'3xs': `360px`,
	'2xs': `420px`,
	xs: `560px`,
	sm: `768px`,
	md: `1024px`,
	lg: `1280px`,
	xl: `1440px`,
	'2xl': `1920px`,
	'3xl': `2560px`,
	'4xl': `3440px`,
	'5xl': `3840px`
};
