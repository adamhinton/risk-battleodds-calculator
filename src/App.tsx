import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import newGenerateResults from "./utils/newGenerateResults";
import generateResults, { Results } from "./utils/resultsCalculator";

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
      {/* <Form setResults={setResults} /> */}
      {results && <ResultsDisplay results={results} />}
    </div>
  );
}

console.log(
  "newGenerateResults:",
  newGenerateResults({
    attackerCount: 20,
    defenderCount: [15, 8],
    numSimulations: 100,
  })
);

export default App;

// PLAN
// take in userInputs:
//attackerCount,
// defenderCount: number[],
// numSimulations

// while attackerCount < 0 ,
// loop through defenderCount.
// for each: run single simulation with attackerCount and defenderCount. The original version of runSingleSimulation.
// Will need to tweak rSS() a bit to make this happen
// wrap rSS() in a broader function to help tabulate the results
