import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Form from "../components/Form";
const fakeSetState = jest.fn();

test("[1] renders without errors", () => {
  render(<Form setResults={fakeSetState} />);
});

test("[2] Renders three user input fields as expected", () => {
  render(<Form setResults={fakeSetState} />);
  const attackerInput = screen.getByTestId("attackers-input");
  const defenderInput = screen.getByTestId("defenders-input");
  const simulationsInput = screen.getByTestId("numsimulations-input");

  expect(attackerInput).toBeVisible();
  expect(defenderInput).toBeVisible();
  expect(simulationsInput).toBeVisible();

  expect(attackerInput).toHaveValue(10);
  expect(defenderInput).toHaveValue(10);
  expect(simulationsInput).toHaveValue(1000);
});

test("[3] Matches screenshot from 1.29.2023", () => {
  const tree = renderer.create(<Form setResults={fakeSetState} />).toJSON();
  expect(tree).toMatchSnapshot();
});
