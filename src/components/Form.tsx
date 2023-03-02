import { useState } from "react";
import generateResults from "../utils/resultsCalculator";
import { UserInputs } from "../utils/resultsCalculator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//www.magicbell.com/blog/react-toast-notifications-made-easy

https: type FormProps = {
  setResults: Function;
};

const Form = (props: FormProps) => {
  const { setResults } = props;

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

        const defenders = userInputs.defenderCount;
        console.log("defenders:", defenders);

        const results = generateResults(userInputs);
        setResults(results);
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
          type="text"
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
        <button type="submit">Run Simulation</button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Form;
