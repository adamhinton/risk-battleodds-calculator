import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/generateResults";
import Form from "./components/Form";
import Header from "./components/Header";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import useDarkMode from "./hooks/useDarkMode";
import { createTheme } from "@mui/material/styles";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

type CustomTheming = {
	mainBGC: string;
	formAndInputsBGC: string;
	formTextColor: string;
	inputTextColor: string;
	headerBGC: string;
	headerTextColor: string;
};

declare module "@mui/material/styles" {
	export interface ThemeOptions {
		customTheming?: CustomTheming;
	}
	interface DefaultTheme {
		customTheming: CustomTheming;
	}
}

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	customTheming: {
		mainBGC: "#2d3c42",
		headerBGC: "#263238",
		formAndInputsBGC: "rgb(17, 16, 16)",
		formTextColor: "#1976d2", // Vibrant cyan color
		inputTextColor: "#1976d2", // Vibrant cyan color
		headerTextColor: "#1976d2", // Vibrant cyan color for Header text
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
	customTheming: {
		mainBGC: "#e0e0e0", // Slightly darker background color
		formAndInputsBGC: "#c2f0f0", // Adjusted background color for form and inputs
		formTextColor: "black",
		inputTextColor: "black",
		headerBGC: "#f5f5f5",
		headerTextColor: "#333333", // Dark gray color for Header text in light mode
	},
});

function App() {
	const [results, setResults] = useState<Results | null>(null);
	const [isDark, setIsDark] = useDarkMode();

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<GlobalStyle />
			<StyledApp className="App" data-testid="app">
				<Header isDark={isDark} setIsDark={setIsDark} />
				<StyledMain>
					<Form setResults={setResults} />
					{results && <ResultsDisplay results={results} />}
				</StyledMain>
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => {
			// I don't like this ts-ignore hacky solution but I added mainBGC to this DefaultTheme interface, not sure why TS still complains. TODO: Look at this again later.
			// @ts-ignore
			return theme.customTheming.mainBGC;
		}};
    font-family: 'Open Sans', sans-serif;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s;
  }
`;

const StyledApp = styled("div")`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${({ theme }) => theme.customTheming.mainBGC};
	min-height: 100vh;
`;

const StyledMain = styled("main")`
	display: flex;
	align-items: center;
	margin-top: 20px;
	flex-direction: column;
`;
