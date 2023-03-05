import { useState } from "react";
import generateResults from "../utils/resultsCalculator";
import { UserInputs } from "../utils/resultsCalculator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//www.magicbell.com/blog/react-toast-notifications-made-easy
// I've tested this and it seems to work
const regEx = /^\s*\d+(\s*,\s*\d+)*\s*$/;

type FormProps = {
  setResults: Function;
};

type FormValues = {
  attackerCount: number;
  defenderCount: string;
  numSimulations: number;
};

const Form = (props: FormProps) => {
  const { setResults } = props;

  const [formValues, setFormValues] = useState<FormValues>({
    attackerCount: 10,
    defenderCount: "10",
    numSimulations: 1000,
  });

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    console.log("evt.target.name:", evt.target.name);
    setFormValues({
      ...formValues,
      [evt.target.name]:
        evt.target.name === "defenderCount" ? value : Number(value),
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Convert user's multiple defender inputs from a string to number[]
        const userInputs: UserInputs = {
          ...formValues,
          defenderCount: formValues.defenderCount.split(",").map((item) => {
            return Number(item);
          }),
        };

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
          value={formValues.attackerCount}
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
          value={formValues.defenderCount}
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
          value={formValues.numSimulations}
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
