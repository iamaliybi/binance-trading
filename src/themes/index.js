import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	direction: 'ltr',

	palette: {
		mode: 'light',

		common: {
			black: 'rgb(30, 35, 41)',
			white: 'rgb(255, 255, 255)',
		},

		primary: {
			main: 'rgb(240, 185, 11)',
			light: 'rgb(201, 148, 0)',
		},

		green: {
			dark: 'rgb(3, 166, 109)',
			main: 'rgb(14, 203, 129)',
			light: 'rgb(127 213 156)',
		},

		error: {
			dark: 'rgb(207, 48, 74)',
			main: 'rgb(246, 70, 93)',
			light: 'rgb(230 101 126)',
		},

		grey: {
			50: 'rgb(250, 250, 250)',
			100: 'rgb(242, 243, 245)',
			200: 'rgb(238, 240, 242)',
			300: 'rgb(132, 142, 156)',
			400: 'rgb(112, 122, 138)',
			500: 'rgba(0, 0, 0, 0.1)',
			600: 'rgb(183, 189, 198)',
			700: 'rgb(71, 77, 87)',
			800: 'rgb(30, 35, 41)',
			900: 'rgb(0, 0, 0)',
		}
	},

	overrides: {
		MuiButton: {
			label: {
				fontFamily: 'Roboto',
			},
		},
	},

	typography: {
		fontFamily: 'Roboto',
	},
});

export default theme;
