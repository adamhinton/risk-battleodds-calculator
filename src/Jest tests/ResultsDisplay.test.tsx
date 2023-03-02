import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ResultsDisplay from "../components/ResultsDisplay";
import { Results } from "../utils/resultsCalculator";

const fakeResults: Results = {
  attackerOccupies: 1234,
  defenderHolds: 1343,
  averageAttackersLeft: 18.9545,
  averageDefendersLeft: 28.5454,
};

test("[1] Renders without errors", () => {
  render(<ResultsDisplay results={fakeResults} />);
});

test("[2] Displays text of results as expected", () => {
  render(<ResultsDisplay results={fakeResults} />);

  const h2 = screen.getByTestId("results-h2");
  const attackerOccupies = screen.getByTestId("results-attacker-occupies");
  const avgAttackersLeft = screen.getByTestId("results-avg-attackers-left");
  const defenderHolds = screen.getByTestId("results-defenderholds");
  const avgDefendersLeft = screen.getByTestId("results-avg-defenders-left");

  expect(h2).toHaveTextContent("Results");
  expect(attackerOccupies).toHaveTextContent("Attacker Occupies: 47.9%");
  expect(avgAttackersLeft).toHaveTextContent("Average Attackers Left: 19.0");
  expect(defenderHolds).toHaveTextContent("Defender Holds: 52.1%");
  expect(avgDefendersLeft).toHaveTextContent("Average Defenders Left: 28.5");
});

test("[3] Matches screenshot from 3.1.2023", () => {
  const tree = renderer
    .create(<ResultsDisplay results={fakeResults} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
