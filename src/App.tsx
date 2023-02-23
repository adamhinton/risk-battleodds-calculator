// TODO: Refactor, particularly make the simulation more DRY and figure out how to best replicate userInputs in runSingleSimulation

import { useState } from "react";
import Form from "./components/Form";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

function App() {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    playerCounts: {
      attackerCount: 0,
      defenderCount: 0,
    },
    numSimulations: 0,
  });

  console.log("userInputs in App:", userInputs);

  return (
    <div className="App">
      <h1>Adam Hinton</h1>
      <Form setUserInputs={setUserInputs}></Form>
    </div>
  );
}

export default App;
