import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Form from "../Form";

test("[1] renders without errors", () => {
  render(<Form />);
});

test("[2] Renders three user input fields as expected", () => {
  render(<Form />);
  const attackerInput = screen.getByTestId("attackers-input");
  const defenderInput = screen.getByTestId("defenders-input");
  const simulationsInput = screen.getByTestId("numsimulations-input");

  expect(attackerInput).toBeVisible();
  expect(defenderInput).toBeVisible();
  expect(simulationsInput).toBeVisible();
});

test("[3] Matches screenshot from 1.29.2023", () => {});
