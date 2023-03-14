import { MouseEvent, useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/resultsCalculator";
import Form from "./components/Form";
import Header from "./components/Header";
import styled, { ThemeProviderProps } from "styled-components";
import useDarkMode from "./hooks/useDarkMode";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ThemeProvider } from "styled-components";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

declare module "@mui/material/styles" {
	interface ThemeOptions {
		customTheming?: {
			mainBGC: string;
			formAndInputsBGC?: string;
			formAndInputTextColor?: string;
		};
	}
}

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
	customTheming: {
		mainBGC: "rgb(45, 60, 66)",
		formAndInputsBGC: "rgb(17, 16, 16)",
		formAndInputTextColor: "rgba(255, 255, 255, 0.721)",
	},
});
const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
	customTheming: {
		mainBGC: "#3c9893",
		formAndInputsBGC: "#bef8f8",
		formAndInputTextColor: "black",
	},
});

function App() {
	const [results, setResults] = useState<Results | null>(null);
	const [isDark, setIsDark] = useDarkMode();

	console.log("isDark:", isDark);

	return (
		<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
			<StyledApp className="App">
				<button
					onClick={(e: MouseEvent) => {
						e.preventDefault();
						setIsDark(!isDark);
					}}
				>
					Dark Mode Test
				</button>
				<Header />
				<StyledMain>
					<Form setResults={setResults} />
					{results && <ResultsDisplay results={results} />}
				</StyledMain>
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;

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
	margin-top: 50px;
	flex-direction: column;
`;
