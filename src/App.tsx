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
	inputTextColor: "black";
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
		mainBGC: "rgb(45, 60, 66)",
		formAndInputsBGC: "rgb(17, 16, 16)",
		formTextColor: "#1976d2",
		inputTextColor: "black",
	},
});
const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
	customTheming: {
		mainBGC: "#3c9893",
		formAndInputsBGC: "#bef8f8",
		formTextColor: "black",
		inputTextColor: "black",
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
  }
  `;

const StyledApp = styled("div")`
	display: flex;
	align-items: center;
	flex-direction: column;
	background-color: ${({ theme }) => {
		return theme.customTheming.mainBGC;
	}};
`;

const StyledMain = styled("main")`
	display: flex;
	align-items: center;
	margin-top: 20px;
	flex-direction: column;
`;
