import { Results } from "../utils/generateResults";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styled from "styled-components";

type ResultsDisplayProps = {
	results: Results;
};

const ResultsDisplay = (props: ResultsDisplayProps) => {
	const { results } = props;
	const { attackerOccupies, defenderHolds } = results;

	const totalSimulations = attackerOccupies + defenderHolds;
	const attackerWinPercent = attackerOccupies / totalSimulations;
	const defenderWinPercent = defenderHolds / totalSimulations;

	return (
		<StyledCard data-testid="results-display-section">
			<CardContent>
				<h2 data-testid="results-h2">Results</h2>
				<div>
					<Typography data-testid="results-attacker-occupies" component="p">
						Attacker Occupies: {(attackerWinPercent * 100).toFixed(1)}%
					</Typography>
					<Typography data-testid="results-avg-attackers-left" component="p">
						Average Attackers Left: {results.averageAttackersLeft?.toFixed(1)}
					</Typography>
				</div>
				<div>
					<Typography data-testid="results-defenderholds" component="p">
						Defender Holds: {(defenderWinPercent * 100).toFixed(1)}%
					</Typography>
					<Typography data-testid="results-avg-defenders-left" component="p">
						Average Defenders Left: {results.averageDefendersLeft?.toFixed(1)}
					</Typography>
				</div>
			</CardContent>
		</StyledCard>
	);
};

export default ResultsDisplay;

const StyledCard = styled(Card)`
	&& {
		margin-top: 20px;
		padding: 30px 50px;
		background-color: ${({ theme }) => {
			return theme.customTheming.formAndInputsBGC;
		}};
		color: ${({ theme }) => {
			return theme.customTheming.formTextColor;
		}};

		h2 {
			margin: 0 0 10px;
			text-align: center;
		}
	}
`;
