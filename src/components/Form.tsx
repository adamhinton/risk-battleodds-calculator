import { useState } from "react";
import generateResults, { Results } from "../utils/resultsCalculator";
import { UserInputs } from "../utils/resultsCalculator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import styled from "styled-components";
// Thanks to this site for the toast help:
//www.magicbell.com/blog/react-toast-notifications-made-easy

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

  function handleChange(evt: Readonly<React.ChangeEvent<HTMLInputElement>>) {
    const value = evt.target.value;
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

        const defenderValidationRegex = /^\s*\d+(\s*,\s*\d+)*\s*$/;
        // Check to make sure defender input is a list of integers
        if (!formValues.defenderCount.match(defenderValidationRegex)) {
          toast(
            "Invalid Defenders input. Please separate multiple defenders with commas, eg 10, 5, 5, 3"
          );
        } else {
          // Convert user's multiple defender inputs from a string to number[]
          const userInputs: UserInputs = {
            ...formValues,
            defenderCount: formValues.defenderCount.split(",").map((item) => {
              return Number(item);
            }),
          };

          const results: Results = generateResults(userInputs);
          setResults(results);
        }
      }}
    >
      <div>
        <label htmlFor="attackers">Attackers:</label>
        <StyledInput
          id="attackers"
          type="number"
          inputComponent="input"
          // min="1"
          inputProps={{ min: "1" }}
          name="attackerCount"
          value={formValues.attackerCount}
          onChange={handleChange}
          data-testid="attackers-input"
        ></StyledInput>
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
        <Button type="submit" data-testid="submit-btn" variant="outlined">
          Run Simulation
        </Button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Form;

const StyledInput = styled(Input)`
  && {
    border: 3px solid blue;
  }
`;
