// TODO: Refactor, particularly make the simulation more DRY and figure out how to best replicate userInputs in runSingleSimulation

import { useState } from "react";
import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/resultsCalculator";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

function App() {
  const [results, setResults] = useState<Results | undefined>(undefined);

  return (
    <div className="App">
      <h1>Adam Hinton</h1>
      <Form setResults={setResults} />
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default App;
