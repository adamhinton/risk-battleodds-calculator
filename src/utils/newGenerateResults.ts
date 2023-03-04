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

type PlayerCounts = {
  attackerCount: number;
  defenderCount: number[];
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

  for (let i = 0; i < userInputs.numSimulations; i++) {
    runSingleSimulation({
      attackerCount: userInputs.attackerCount,
      defenderCount: [...userInputs.defenderCount],
    });
  }
  results.averageAttackersLeft = totalAttackersLeft / userInputs.numSimulations;
  results.averageDefendersLeft = totalDefendersLeft / userInputs.numSimulations;
  return results;

  // UTILS
  function runSingleSimulation(playerCounts: PlayerCounts): void {
    // loop through playerCounts.defenderCount

    playerCounts.defenderCount.forEach((defender: number, index) => {
      while (playerCounts.defenderCount[index] > 0) {
        const attackerRolls = generatePlayerRolls(
          "attacker",
          playerCounts.attackerCount
        );
        const defenderRolls = generatePlayerRolls(
          "defender",
          playerCounts.defenderCount[index]
        );

        // Now for the attack
        if (attackerRolls[0] > defenderRolls[0]) {
          playerCounts.defenderCount[index]--;
        } else {
          playerCounts.attackerCount--;
        }

        if (
          playerCounts.attackerCount > 1 &&
          playerCounts.defenderCount[index] > 1
        ) {
          if (attackerRolls[1]! > defenderRolls[1]!) {
            playerCounts.defenderCount[index]--;
          } else {
            playerCounts.attackerCount--;
          }
        }

        // results
        if (playerCounts.attackerCount < 1) {
          results.defenderHolds++;
          const totalOfDefenders = playerCounts.defenderCount.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          totalDefendersLeft += totalOfDefenders;
          break;
        } else if (
          playerCounts.defenderCount[index] === 0 &&
          index === playerCounts.defenderCount.length - 1
        ) {
          results.attackerOccupies++;
          totalAttackersLeft += playerCounts.attackerCount;
        }
      }
    });
    // console.log("playerCounts at end of singleSimulation:", playerCounts);
  }
};

export default newGenerateResults;

function randomIntFromInterval(min: Readonly<number>, max: Readonly<number>) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortPlayerRolls(rolls: PlayerRolls): PlayerRolls {
  return rolls.sort((a, b) => {
    return b! - a!;
  });
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
