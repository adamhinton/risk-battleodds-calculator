import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import Form from "../components/Form";
import { darkTheme } from "../App";
import { ThemeProvider } from "styled-components";
const fakeSetState = jest.fn();

// Mocking the Slider component because it messed up my screenshots - and MUI already tests it, I don't need to test it further.
jest.mock("@mui/material/Slider", () => {
	return jest.fn();
});

test("[1] renders without errors", () => {
	render(
		<ThemeProvider theme={darkTheme}>
			<Form setResults={fakeSetState} />
		</ThemeProvider>
	);
});

test("[2] Renders three user input fields as expected", () => {
	render(
		<ThemeProvider theme={darkTheme}>
			<Form setResults={fakeSetState} />
		</ThemeProvider>
	);
	const attackerInput = screen.getByLabelText("Attacking Troops");
	const defenderInput = screen.getByLabelText("Defending Troops");

	expect(attackerInput).toBeVisible();
	expect(defenderInput).toBeVisible();

	expect(attackerInput).toHaveValue(10);
	expect(defenderInput).toHaveValue("10");
});

test("[3] Matches screenshot from 1.29.2023", () => {
	const tree = renderer
		.create(
			<ThemeProvider theme={darkTheme}>
				<Form setResults={fakeSetState} />
			</ThemeProvider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
