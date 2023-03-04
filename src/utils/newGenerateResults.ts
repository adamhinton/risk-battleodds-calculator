export type UserInputs = {
  attackerCount: number;
  defenderCount: number[];
  numSimulations: number;
};

type PlayerType = "attacker" | "defender";

type AttackerRolls = [number, number?, number?];
type DefenderRolls = [number, number?];
type PlayerRolls = AttackerRolls | DefenderRolls;

export type Results = {
  attackerOccupies: number;
  defenderHolds: number;
  averageAttackersLeft?: number | null;
  averageDefendersLeft?: number | null;
};

const newGenerateResults = (userInputs: UserInputs): Results => {
  const results: Results = {
    attackerOccupies: 0,
    defenderHolds: 0,
    averageAttackersLeft: null,
    averageDefendersLeft: null,
  };

  let totalAttackersLeft = 0;
  let totalDefendersLeft = 0;

  return results;
};

export default newGenerateResults;
