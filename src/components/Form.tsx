import { ReactElement, useState } from "react";
import generateResults from "../utils/resultsCalculator";
import { UserInputs } from "../utils/resultsCalculator";

const Form = (): ReactElement => {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    attackerCount: 10,
    defenderCount: 10,
    numSimulations: 1000,
  });

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setUserInputs({
      ...userInputs,
      [evt.target.name]: Number(value),
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUserInputs({ ...userInputs });
        console.log(
          "generateResults(userInputs):",
          generateResults(userInputs)
        );
      }}
    >
      <div>
        <label htmlFor="attackers">Attackers:</label>
        <input
          id="attackers"
          type="number"
          min="1"
          name="attackerCount"
          value={userInputs.attackerCount}
          onChange={handleChange}
          data-testid="attackers-input"
        ></input>
      </div>

      <div>
        <label htmlFor="defenders">Defenders:</label>
        <input
          id="defenders"
          type="number"
          min="1"
          name="defenderCount"
          value={userInputs.defenderCount}
          onChange={(e) => handleChange(e)}
          data-testid="defenders-input"
        ></input>
      </div>

      <div>
        <label htmlFor="simulations">Number of Simulations:</label>
        <input
          id="simulations"
          type="number"
          min="1"
          name="numSimulations"
          value={userInputs.numSimulations}
          onChange={handleChange}
          data-testid="numsimulations-input"
        ></input>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
