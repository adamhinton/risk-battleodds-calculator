import { ReactElement } from "react";

type Props = {};

const Form = (props: Props): ReactElement => {
  return (
    <form>
      <label htmlFor="attackers">Attackers:</label>
      <input id="attackers" type="number" min="1"></input>
    </form>
  );
};

export default Form;
