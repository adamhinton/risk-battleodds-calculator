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
      <h2>Results</h2>
      <div>
        Attacker Occupies: {attackerOccupies} / {totalSimulations} times,{" "}
        {attackerWinPercent}%
      </div>
      <div>
        Defender Holds: {defenderHolds} / {totalSimulations} times,{" "}
        {defenderWinPercent}%
      </div>
    </section>
  );
};

export default ResultsDisplay;
