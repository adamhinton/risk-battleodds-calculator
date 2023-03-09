import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import { Results } from "./utils/resultsCalculator";
import Form from "./components/Form";
import Header from "./components/Header";

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
      <Header />
      <main>
        <Form setResults={setResults} />
        {results && <ResultsDisplay results={results} />}
      </main>
    </div>
  );
}

export default App;
