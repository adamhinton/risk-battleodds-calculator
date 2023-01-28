import { ReactElement, useState } from "react";

type Props = {};

type PlayerCounts = {
  attackerCount: number;
  defenderCount: number;
};

type FormValues = {
  playerCounts: PlayerCounts;
  numSimulations: number;
};

const Form = (props: Props): ReactElement => {
  const initialFormValues: FormValues = {
    playerCounts: {
      attackerCount: 10,
      defenderCount: 10,
    },
    numSimulations: 10,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  return (
    <form>
      <label htmlFor="attackers">Attackers:</label>
      <input
        id="attackers"
        type="number"
        min="1"
        value={formValues.playerCounts.attackerCount}
      ></input>
    </form>
  );
};

export default Form;
