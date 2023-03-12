import { MouseEvent, useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/resultsCalculator";
import Form from "./components/Form";
import Header from "./components/Header";
import styled from "styled-components";
import useDarkMode from "./hooks/useDarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme({
  palette: {
    mode: "light",
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
`;

const StyledMain = styled("main")`
  display: flex;
  align-items: center;
  margin-top: 50px;
  flex-direction: column;
`;
