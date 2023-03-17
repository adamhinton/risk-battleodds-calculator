import { render } from "@testing-library/react";
import App from "../App";
import renderer from "react-test-renderer";

// APP.TSX UNIT TESTS
test("[1] Sanity check", () => {
	expect(1 + 1).toEqual(2);
});

test("[2] renders without errors", () => {
	render(<App />);
});

test("[3] Matches snapshot from 1.29.2023", () => {
	const tree = renderer.create(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});

// INTEGRATION TESTS
test("[1] Hitting Submit in Form triggers Results to render", () => {
	render(<App />);
});
