import { render } from "@testing-library/react";
import Header from "../components/Header";

test("[1] Renders without errors", () => {
  render(<Header />);
});
