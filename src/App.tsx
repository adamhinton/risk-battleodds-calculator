import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/resultsCalculator";
import Form from "./components/Form";
import Header from "./components/Header";
import styled from "styled-components";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

function App() {
  const [results, setResults] = useState<Results | null>(null);

  return (
    <StyledApp className="App">
      <Header />
      <StyledMain>
        <Form setResults={setResults} />
        {results && <ResultsDisplay results={results} />}
      </StyledMain>
    </StyledApp>
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
