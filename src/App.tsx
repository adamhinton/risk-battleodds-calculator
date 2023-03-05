import { useState } from "react";
// import Form from "./components/Form";
import ResultsDisplay from "./components/ResultsDisplay";
import newGenerateResults from "./utils/newGenerateResults";
import generateResults, {
  generatePlayerRolls,
  Results,
} from "./utils/resultsCalculator";

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
    attackerCount: 10,
    defenderCount: [3, 3, 3],
    numSimulations: 10000,
  })
);

// for (let i = 0; i < 10000; i++) {
//   const attackerRolls = generatePlayerRolls("attacker", 3);
//   const defenderRolls = generatePlayerRolls("defender", 2);
//   // console.log("attackerRolls:", attackerRolls);
//   // console.log("defenderRolls:", defenderRolls);

//   if (
//     attackerRolls[0] > defenderRolls[0] &&
//     attackerRolls[1]! > defenderRolls[1]!
//   ) {
//     console.count("attacker wins");
//   } else if (
//     defenderRolls[0] >= attackerRolls[0]! &&
//     defenderRolls[1]! >= attackerRolls[1]!
//   ) {
//     console.count("defender wins");
//   } else {
//     console.count("tie");
//   }
// }

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
