import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/generateResults";
import Form from "./components/Form";
import Header from "./components/Header";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import useDarkMode from "./hooks/useDarkMode";
import { createTheme } from "@mui/material/styles";
import { colors, spacing } from "./utils/styles";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

type CustomTheming = {
	mainBGC: string;
	formBGC: string;
	inputBGC: string;
	formTextColor: string;
	inputTextColor: string;
	headerBGC: string;
	headerTextColor: string;
	accentColor: string;
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
		mainBGC: colors.dark.background,
		headerBGC: colors.dark.header,
		formBGC: colors.dark.form,
		inputBGC: colors.dark.inputBGC,
		formTextColor: colors.dark.text,
		inputTextColor: colors.dark.input,
		headerTextColor: colors.dark.headerText,
		accentColor: colors.accent.primary,
	},
});

export const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
	customTheming: {
		mainBGC: colors.light.background,
		formBGC: colors.light.form,
		inputBGC: colors.dark.inputBGC,
		formTextColor: colors.light.text,
		inputTextColor: colors.light.input,
		headerBGC: colors.light.header,
		headerTextColor: colors.light.headerText,
		accentColor: colors.accent.primary,
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
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s;
  }
`;

const StyledApp = styled("div")`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	background-color: ${({ theme }) => theme.customTheming.mainBGC};
	min-height: 100vh;
	padding: 0px;
	box-sizing: border-box;
`;

const StyledMain = styled("main")`
	display: flex;
	align-items: center;
	margin-top: 20px;
	flex-direction: column;
	width: 100%;
	max-width: 800px;
	gap: 20px;
	padding: 0 ${spacing.paddingSmall};
	box-sizing: border-box;
	@media (min-width: 768px) {
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-between;
	}
`;
