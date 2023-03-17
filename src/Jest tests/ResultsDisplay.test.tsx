import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import ResultsDisplay from "../components/ResultsDisplay";
import { Results } from "../utils/resultsCalculator";
import { darkTheme } from "../App";
import { ThemeProvider } from "styled-components";

const fakeResults: Results = {
	attackerOccupies: 1234,
	defenderHolds: 1343,
	averageAttackersLeft: 18.9545,
	averageDefendersLeft: 28.5454,
};

const secondFakeResults: Results = {
	attackerOccupies: 100,
	defenderHolds: 100,
	averageAttackersLeft: 16,
	averageDefendersLeft: 8,
};

test("[1] Renders without errors", () => {
	render(
		<ThemeProvider theme={darkTheme}>
			<ResultsDisplay results={fakeResults} />
		</ThemeProvider>
	);
});

test("[2] Displays text of results as expected", () => {
	render(
		<ThemeProvider theme={darkTheme}>
			<ResultsDisplay results={fakeResults} />
		</ThemeProvider>
	);

	const h2 = screen.getByTestId("results-h2");
	const attackerOccupies = screen.getByTestId("results-attacker-occupies");
	const avgAttackersLeft = screen.getByTestId("results-avg-attackers-left");
	const defenderHolds = screen.getByTestId("results-defenderholds");
	const avgDefendersLeft = screen.getByTestId("results-avg-defenders-left");

	expect(h2).toHaveTextContent("Results");
	expect(attackerOccupies).toHaveTextContent("Attacker Occupies: 47.9%");
	expect(avgAttackersLeft).toHaveTextContent("Average Attackers Left: 19.0");
	expect(defenderHolds).toHaveTextContent("Defender Holds: 52.1%");
	expect(avgDefendersLeft).toHaveTextContent("Average Defenders Left: 28.5");
});

test("[3] Updates when passed new props", () => {
	const { rerender } = render(
		<ThemeProvider theme={darkTheme}>
			<ResultsDisplay results={fakeResults} />
		</ThemeProvider>
	);

	rerender(
		<ThemeProvider theme={darkTheme}>
			<ResultsDisplay results={secondFakeResults} />
		</ThemeProvider>
	);

	const avgAttackersLeft = screen.getByTestId("results-avg-attackers-left");
	expect(avgAttackersLeft).toHaveTextContent("Average Attackers Left: 16.0");
	expect(avgAttackersLeft).not.toHaveTextContent(
		"Average Attackers Left: 19.0"
	);
});

test("[4] Matches screenshot from 3.1.2023", () => {
	const tree = renderer
		.create(
			<ThemeProvider theme={darkTheme}>
				<ResultsDisplay results={secondFakeResults} />
			</ThemeProvider>
		)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
