import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Form from "../components/Form";

test("[1] renders without errors", () => {
  render(<Form />);
});

test("[2] Renders three user input fields as expected with default values", () => {
  render(<Form />);
  const attackerInput = screen.getByTestId("attackers-input");
  const defenderInput = screen.getByTestId("defenders-input");
  const simulationsInput = screen.getByTestId("numsimulations-input");

  expect(attackerInput).toBeVisible();
  expect(defenderInput).toBeVisible();
  expect(simulationsInput).toBeVisible();

  expect(attackerInput).toHaveValue(10);
  expect(defenderInput).toHaveValue(10);
  expect(simulationsInput).toHaveValue(10);
});

test("[3] Matches screenshot from 1.29.2023", () => {
  const tree = renderer.create(<Form />).toJSON();
  expect(tree).toMatchSnapshot();
});
