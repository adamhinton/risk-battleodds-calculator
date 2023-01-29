import { render } from "@testing-library/react";
import App from "../../App";
import renderer from "react-test-renderer";

test("[1] renders without errors", () => {
  render(<App />);
});

test("[2] Matches snapshot from 1.29.2023", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});
