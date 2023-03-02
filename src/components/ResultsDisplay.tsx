import { Results } from "../utils/resultsCalculator";

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
    <section>
      <h2 data-testid="results-h2">Results</h2>
      <div>
        <p data-testid="results-attacker-occupies">
          Attacker Occupies: {attackerWinPercent * 100}%
        </p>
        <p data-testid="results-avg-attackers-left">
          Average Attackers Left: {results.averageAttackersLeft?.toFixed(1)}
        </p>
      </div>
      <div>
        <p data-testid="results-defenderholds">
          Defender Holds: {defenderWinPercent * 100}%
        </p>
        <p data-testid="results-avg-defenders-left">
          Average Defenders Left: {results.averageDefendersLeft?.toFixed(1)}
        </p>
      </div>
    </section>
  );
};

export default ResultsDisplay;
