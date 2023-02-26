// TYPE DEFINITIONS
type PlayerCounts = {
  attackerCount: number;
  defenderCount: number;
};

export type Results = {
  attackerOccupies: number;
  defenderHolds: number;
  averageAttackersLeft?: number;
  averageDefendersLeft?: number;
};

export type UserInputs = {
  attackerCount: number;
  defenderCount: number;
  numSimulations: number;
};

console.log("don't forget to make all items in Results required");

type PlayerType = "attacker" | "defender";

type AttackerRolls = [number, number?, number?];
type DefenderRolls = [number, number?];
type PlayerRolls = AttackerRolls | DefenderRolls;

const generateResults = (userInputs: UserInputs) => {
  // USEFUL VARIABLES
  const results: Results = {
    attackerOccupies: 0,
    defenderHolds: 0,
  };

  let totalAttackersLeft = 0;
  let totalDefendersLeft = 0;

  // UTILS

  console.time("a");
  for (let i = 0; i < userInputs.numSimulations; i++) {
    runSingleSimulation({
      attackerCount: userInputs.attackerCount,
      defenderCount: userInputs.defenderCount,
    });
  }

  console.log("results:", results);
  console.timeEnd("a");
  console.log("userInputs:", userInputs);

  function runSingleSimulation(playerCounts: PlayerCounts): void {
    // One run through of simulation
    while (playerCounts.attackerCount > 0 && playerCounts.defenderCount > 0) {
      const attackerRolls = generatePlayerRolls(
        "attacker",
        playerCounts.attackerCount
      );
      const defenderRolls = generatePlayerRolls(
        "defender",
        playerCounts.defenderCount
      );

      // Now for the attack
      if (attackerRolls[0] > defenderRolls[0]) {
        playerCounts.defenderCount--;
      } else {
        playerCounts.attackerCount--;
      }

      if (playerCounts.attackerCount > 1 && playerCounts.defenderCount > 1) {
        if (attackerRolls[1]! > defenderRolls[1]!) {
          playerCounts.defenderCount--;
        } else {
          playerCounts.attackerCount--;
        }
      }

      // results
      if (playerCounts.attackerCount === 0) {
        results.defenderHolds++;
        totalDefendersLeft += playerCounts.defenderCount;
      } else if (playerCounts.defenderCount === 0) {
        results.attackerOccupies++;
        totalAttackersLeft += playerCounts.attackerCount;
      }
    }
    // console.log("totalAttackersLeft:", totalAttackersLeft);
    // console.log("totalDefendersLeft:", totalDefendersLeft);
  }

  return results;
};

function sortPlayerRolls(rolls: PlayerRolls): PlayerRolls {
  return rolls.sort((a, b) => {
    return b! - a!;
  });
}

function randomIntFromInterval(min: Readonly<number>, max: Readonly<number>) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePlayerRolls(
  playerType: PlayerType,
  diceRolls: 1 | 2 | number
): PlayerRolls {
  const generateSortedRolls = (diceRolls: 1 | 2 | 3): PlayerRolls => {
    const solution = [];
    for (let i = 0; i < diceRolls; i++) {
      solution.push(randomIntFromInterval(1, 6));
    }
    // TODO: Refactor this, I shouldn't need this type assertion
    return sortPlayerRolls(solution as PlayerRolls);
  };

  // if one unit, doesn't matter if attacker or defender, they get one dice roll
  if (diceRolls === 1) {
    return generateSortedRolls(1);
  }

  // They're a defender and we already know they don't have one unit, so they get two dice rolls
  if (playerType === "defender") {
    return generateSortedRolls(2);
  }

  // We know they're an attacker now. So if they have two units they get two rolls, otherwise they get three rolls
  return diceRolls === 2 ? generateSortedRolls(2) : generateSortedRolls(3);
}

export default generateResults;
