import { ReactElement, useState } from "react";

type Props = {
  setUserInputs: Function;
};

type FormValues = {
  attackerCount: number;
  defenderCount: number;
  numSimulations: number;
};

const Form = (props: Props): ReactElement<Props> => {
  const { setUserInputs } = props;

  const initialFormValues: FormValues = {
    attackerCount: 10,
    defenderCount: 10,
    numSimulations: 10,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  console.log("formValues:", formValues);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const value = evt.target.value;
    setFormValues({
      ...formValues,
      [evt.target.name]: Number(value),
    });
  }

  return (
    <form
      onSubmit={() => {
        setUserInputs({ ...formValues });
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
          type="number"
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
        {/* <label htmlFor="submit">Submit</label> */}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Form;
