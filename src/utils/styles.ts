export type Colors = {
	primary: string;
	accent: {
		primary: string;
		secondary: string;
	};
	dark: {
		background: string;
		header: string;
		form: string;
		text: string;
		input: string;
		headerText: string;
	};
	light: {
		background: string;
		header: string;
		form: string;
		text: string;
		input: string;
		headerText: string;
	};
};

export const colors: Colors = {
	primary: "#1976d2",
	accent: {
		primary: "#64b5f6",
		secondary: "#4dd0e1",
	},
	dark: {
		background: "#1e272e",
		header: "#263238",
		form: "#2d3c42",
		text: "#ffffff",
		input: "#ffffff",
		headerText: "#ffffff",
	},
	light: {
		background: "#f0f0f0",
		header: "#e0e0e0",
		form: "#ffffff",
		text: "#333333",
		input: "#333333",
		headerText: "#333333",
	},
};

export const typography = {
	fontFamily: "'Roboto', sans-serif",
	h1: {
		fontSize: "2rem",
		fontWeight: 700,
	},
	h2: {
		fontSize: "1.5rem",
		fontWeight: 600,
	},
	h4: {
		fontSize: "1.2rem",
		fontWeight: 600,
	},
	h6: {
		fontSize: "1rem",
		fontWeight: 600,
	},
	body: {
		fontSize: "0.9rem",
		fontWeight: 400,
	},
	small: {
		fontSize: "0.8rem",
		fontWeight: 400,
	},
};

export const spacing = {
	paddingSmall: "8px",
	paddingMedium: "16px",
	paddingLarge: "24px",
	marginSmall: "8px",
	marginMedium: "16px",
	marginLarge: "24px",
	borderRadius: "8px",
};
