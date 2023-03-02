import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ResultsDisplay from "../components/ResultsDisplay";
import { Results } from "../utils/resultsCalculator";

const fakeResults: Results = {
  attackerOccupies: 100,
  defenderHolds: 120,
  averageAttackersLeft: 9.758,
  averageDefendersLeft: 20.382,
};

test("[1] Renders without errors", () => {
  render(<ResultsDisplay results={fakeResults} />);
});

test("[2] Displays text of results as expected", () => {
  render(<ResultsDisplay results={fakeResults} />);

  const h2 = screen.getByTestId("results-h2");
  const attackerOccupies = screen.getByTestId("results-attacker-occupies");
  const avgAttackersLeft = 1;
  const defenderHolds = screen.getByTestId("results-defenderholds");

  expect(h2).toHaveTextContent("Results");
});

test("[3] Matches screenshot from 3.1.2023", () => {
  const tree = renderer
    .create(<ResultsDisplay results={fakeResults} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
