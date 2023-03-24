import { render, screen } from "@testing-library/react";
import App from "../App";
import renderer from "react-test-renderer";
// import Slider from "@mui/material/Slider";

// Mocking the Slider component because it messed up my screenshots,
// and MUI already tests this component, I don't need to test it further.
jest.mock("@mui/material/Slider", () => {
	return jest.fn();
});

// APP.TSX UNIT TESTS
test("[1] Sanity check", () => {
	expect(1 + 1).toEqual(2);
});

test("[2] renders without errors", () => {
	render(<App />);

	expect(screen.getByText(/run simulations/i)).toBeInTheDocument();
});

test("[3] Matches snapshot from 1.29.2023", () => {
	const tree = renderer.create(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});
