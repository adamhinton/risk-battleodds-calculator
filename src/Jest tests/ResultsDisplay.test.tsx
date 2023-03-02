import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ResultsDisplay from "../components/ResultsDisplay";
import { Results } from "../utils/resultsCalculator";

const fakeResults: Results = {
  attackerOccupies: 100,
  defenderHolds: 120,
  averageAttackersLeft: 9,
  averageDefendersLeft: 20,
};

test("[1] Renders without errors", () => {
  render(<ResultsDisplay results={fakeResults} />);
});

test("[3] Matches screenshot from 1.29.2023", () => {
  const tree = renderer
    .create(<ResultsDisplay results={fakeResults} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
