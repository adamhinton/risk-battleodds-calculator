import { ReactElement, useState } from "react";

type Props = {};

type FormValues = {
  attackerCount: number;
  defenderCount: number;
  numSimulations: number;
};

const Form = (props: Props): ReactElement => {
  const initialFormValues: FormValues = {
    attackerCount: 10,
    defenderCount: 10,
    numSimulations: 10,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  console.log("formValues:", formValues);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    console.log("typeof evt:", typeof evt);
    const value = evt.target.value;
    console.log("evt.target.name:", evt.target.name);
    setFormValues({
      ...formValues,
      [evt.target.name]: Number(value),
    });
  }

  return (
    <form>
      <div>
        <label htmlFor="attackers">Attackers:</label>
        <input
          id="attackers"
          type="number"
          min="1"
          name="attackerCount"
          value={formValues.attackerCount}
          onChange={handleChange}
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
        ></input>
      </div>
    </form>
  );
};

export default Form;
