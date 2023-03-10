import { Results } from "../utils/resultsCalculator";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";

type ResultsDisplayProps = {
  results: Results;
};

const ResultsDisplay = (props: ResultsDisplayProps) => {
  const { results } = props;
  const { attackerOccupies, defenderHolds } = results;

  const totalSimulations = attackerOccupies + defenderHolds;
  const attackerWinPercent = attackerOccupies / totalSimulations;
  const defenderWinPercent = defenderHolds / totalSimulations;

  console.log("results:", results);

  return (
    <Card data-testid="results-display-section">
      <CardContent>
        <Typography data-testid="results-h2" component="h2">
          <b>Results</b>
        </Typography>
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
    </Card>
  );
};

export default ResultsDisplay;
