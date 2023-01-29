import { render, screen } from "@testing-library/react";
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
