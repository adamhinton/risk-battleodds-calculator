import styled from "styled-components";
import { Results } from "../utils/generateResults";
import { spacing, typography } from "../utils/styles";

type ResultsDisplayProps = {
	results: Results;
};

const ResultsDisplay = (resultsProps: ResultsDisplayProps) => {
	const { results } = resultsProps;
	console.log("results:", results);

	const {
		attackerOccupies,
		averageAttackersLeft,
		defenderHolds,
		averageDefendersLeft,
	} = results;

	const totalSimulations = attackerOccupies + defenderHolds;

	const attackerOccupiesPercent = (attackerOccupies / totalSimulations) * 100;
	const defenderHoldsPercent = (defenderHolds / totalSimulations) * 100;

	return (
		<StyledResultsDisplay data-testid="results-display">
			<StyledHeader>
				<StyledHeaderText style={{ ...typography.h2 }} data-testid="results-h2">
					Simulation Results
				</StyledHeaderText>
			</StyledHeader>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Attacker Wins:
				</StyledResultLabel>
				<StyledResultValue
					data-testid="results-attacker-occupies"
					style={{ ...typography.body }}
				>
					{attackerOccupiesPercent.toFixed(1) + "%"}
				</StyledResultValue>
			</StyledResultItem>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Defender Holds:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="results-defenderholds"
				>
					{defenderHoldsPercent.toFixed(1) + "%"}
				</StyledResultValue>
			</StyledResultItem>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Average Attackers Remaining:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="results-avg-attackers-left"
				>
					{averageAttackersLeft!.toFixed(1)}
				</StyledResultValue>
			</StyledResultItem>

			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Average Defenders Remaining:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="results-avg-defenders-left"
				>
					{averageDefendersLeft!.toFixed(1)}
				</StyledResultValue>
			</StyledResultItem>
		</StyledResultsDisplay>
	);
};

export default ResultsDisplay;

const StyledResultsDisplay = styled("div")`
	background-color: ${({ theme }) => theme.customTheming.formBGC};
	color: ${({ theme }) => theme.customTheming.formTextColor};
	padding: ${spacing.paddingMedium};
	border-radius: 10px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
	width: 100%;
	max-width: 500px;
	box-sizing: border-box;
	flex: 1;
	min-width: 300px;

	@media (max-width: 768px) {
		padding: ${spacing.paddingSmall};
	}
`;

const StyledHeader = styled.div`
	margin-bottom: ${spacing.marginSmall};
`;

const StyledHeaderText = styled.h2`
	margin: 5px;
`;

const StyledResultItem = styled("div")`
	display: flex;
	justify-content: space-between;
	margin-bottom: ${spacing.marginSmall};
`;

const StyledResultLabel = styled("span")`
	font-weight: 600;
`;

const StyledResultValue = styled("span")`
	font-weight: 400;
`;
