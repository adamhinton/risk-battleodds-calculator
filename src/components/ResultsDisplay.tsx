import styled from "styled-components";
import { Results } from "../utils/generateResults";
import { spacing, typography } from "../utils/styles";
import { useTheme } from "@mui/material/styles";

type ResultsDisplayProps = {
	results: Results;
};

const ResultsDisplay = (resultsProps: ResultsDisplayProps) => {
	const { results } = resultsProps;
	const theme = useTheme();

	return (
		<StyledResultsDisplay data-testid="results-display">
			<StyledHeader>
				<StyledHeaderText style={{ ...typography.h2 }}>
					Simulation Results
				</StyledHeaderText>
			</StyledHeader>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Attacker Wins:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="attacker-wins"
				>
					{results.attackerOccupies}
				</StyledResultValue>
			</StyledResultItem>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Defender Wins:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="defender-wins"
				>
					{results.defenderHolds}
				</StyledResultValue>
			</StyledResultItem>
			<StyledResultItem>
				<StyledResultLabel style={{ ...typography.body }}>
					Average Attackers Remaining:
				</StyledResultLabel>
				<StyledResultValue
					style={{ ...typography.body }}
					data-testid="average-attackers"
				>
					{results.averageAttackersLeft!.toFixed(2)}
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
