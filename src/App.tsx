import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import newGenerateResults from "./utils/newGenerateResults";
import { Results } from "./utils/resultsCalculator";
import Form from "./components/Form";

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
    <div className="App">
      <h1>Adam Hinton</h1>
      <Form setResults={setResults} />
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

export default App;
