import { Results } from "../utils/generateResults";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import styled from "styled-components";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type ResultsDisplayProps = {
	results: Results;
};

const ResultsDisplay = (props: ResultsDisplayProps) => {
	const { results } = props;
	const { attackerOccupies, defenderHolds } = results;

	const totalSimulations = attackerOccupies + defenderHolds;
	const attackerWinPercent = (attackerOccupies / totalSimulations) * 100;
	const defenderWinPercent = (defenderHolds / totalSimulations) * 100;

	return (
		<StyledCard data-testid="results-display-section">
			<CardContent>
				<StyledHeader>
					<h2>Results</h2>
					<StyledEmojiIcon />
				</StyledHeader>
				<StyledResult>
					<Typography component="p">
						Attacker Occupies:{" "}
						<StyledPercent>{attackerWinPercent.toFixed(1)}%</StyledPercent>
					</Typography>
					<Typography component="p">
						Average Attackers Left:{" "}
						<StyledValue>
							{results.averageAttackersLeft?.toFixed(1)}
						</StyledValue>
					</Typography>
				</StyledResult>
				<StyledResult>
					<Typography component="p">
						Defender Holds:{" "}
						<StyledPercent>{defenderWinPercent.toFixed(1)}%</StyledPercent>
					</Typography>
					<Typography component="p">
						Average Defenders Left:{" "}
						<StyledValue>
							{results.averageDefendersLeft?.toFixed(1)}
						</StyledValue>
					</Typography>
				</StyledResult>
			</CardContent>
		</StyledCard>
	);
};

export default ResultsDisplay;

const StyledCard = styled(Card)`
	&& {
		margin-top: 20px;
		padding: 20px 30px;
		background-color: ${({ theme }) => theme.customTheming.formAndInputsBGC};
		color: ${({ theme }) => theme.customTheming.formTextColor};
	}
`;

const StyledHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15px;
`;

const StyledEmojiIcon = styled(EmojiEventsIcon)`
	color: ${({ theme }) => theme.customTheming.formTextColor};
	font-size: 2rem;
`;

const StyledResult = styled.div`
	margin-top: 15px;
	text-align: center;

	p {
		margin-bottom: 10px;
	}
`;

const StyledPercent = styled.span`
	font-size: 1.1rem;
	color: ${({ theme }) => theme.customTheming.headerTextColor};
`;

const StyledValue = styled.span`
	font-size: 1.1rem;
`;
