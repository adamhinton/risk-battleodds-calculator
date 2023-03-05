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

type SingleSimResults = {
  attackersLeft: number;
  defendersLeft: number;
  attackerOccupies: boolean;
  defenderHolds: boolean;
};

const newGenerateResults = (userInputs: UserInputs): Results => {
  console.log("start of newGenerateResults");
  // console.log("userInputs:", userInputs);
  const results: Results = {
    attackerOccupies: 0,
    defenderHolds: 0,
    averageAttackersLeft: null,
    averageDefendersLeft: null,
  };

  let totalAttackersLeft = 0;
  let totalDefendersLeft = 0;

  for (let i = 0; i < userInputs.numSimulations; i++) {
    const singleSimResults: SingleSimResults = runSingleSimulation({
      attackerCount: userInputs.attackerCount,
      defenderCount: [...userInputs.defenderCount],
    });

    if (singleSimResults.attackerOccupies === true) {
      results.attackerOccupies++;
      totalAttackersLeft += singleSimResults.attackersLeft;
    } else if (singleSimResults.defenderHolds === true) {
      results.defenderHolds++;
      totalDefendersLeft += singleSimResults.defendersLeft;
    }
  }
  results.averageAttackersLeft = totalAttackersLeft / userInputs.numSimulations;
  results.averageDefendersLeft = totalDefendersLeft / userInputs.numSimulations;
  return results;

  // UTILS
  function runSingleSimulation(playerCounts: PlayerCounts): SingleSimResults {
    // console.log("start one simulation");

    let singleSimResults: SingleSimResults = {
      attackersLeft: 0,
      defendersLeft: 0,
      attackerOccupies: false,
      defenderHolds: false,
    };

    // loop through playerCounts.defenderCount

    playerCounts.defenderCount.forEach((defender: number, index) => {
      // console.log("start one dice roll");
      while (playerCounts.defenderCount[index] > 0) {
        const attackerRolls = generatePlayerRolls(
          "attacker",
          playerCounts.attackerCount
        );
        const defenderRolls = generatePlayerRolls(
          "defender",
          playerCounts.defenderCount[index]
        );
        // console.log("playerCounts.attackerCount:", playerCounts.attackerCount);
        // console.log("playerCounts.defenderCount:", playerCounts.defenderCount);

        // console.log("attackerRolls:", attackerRolls);
        // console.log("defenderRolls:", defenderRolls);

        // Now for the attack
        // Attacker wins first dice roll
        if (attackerRolls[0] > defenderRolls[0]) {
          playerCounts.defenderCount[index]--;
        }
        // Attacker loses first dice roll
        else {
          playerCounts.attackerCount--;
        }

        // If there is a second dice roll
        if (
          attackerRolls[1] &&
          // Found the problem. We just potentially did defendercount[index]-- so this may not be accurate. So we were overestimating defenders by doing this.
          defenderRolls[1]
        ) {
          // Attacker wins second dice roll
          if (attackerRolls[1]! > defenderRolls[1]!) {
            playerCounts.defenderCount[index]--;
          }
          // Attacker loses second dice roll
          else {
            playerCounts.attackerCount--;
          }
        }

        // results
        //defender wins entire battle
        if (playerCounts.attackerCount < 1) {
          singleSimResults.defenderHolds = true;
          const totalOfDefenders = playerCounts.defenderCount.reduce(
            (partialSum, a) => partialSum + a,
            0
          );
          singleSimResults.defendersLeft = totalOfDefenders;
          break;
        }
        // defender occupies current territory but there are more defending territories left
        if (
          playerCounts.defenderCount[index] < 1 &&
          index < playerCounts.defenderCount.length - 1
        ) {
          // attacker loses a troop because they have to occupy the conquered territory with one troop
          playerCounts.attackerCount--;
        }
        // Attacker occupies last defending territory and wins the whole battle
        if (
          playerCounts.defenderCount[index] === 0 &&
          index === playerCounts.defenderCount.length - 1
        ) {
          singleSimResults.attackerOccupies = true;
          singleSimResults.attackersLeft = playerCounts.attackerCount;
        }
      }
    });
    // console.log("playerCounts:", playerCounts);
    // console.log("end single dice roll");
    return singleSimResults;
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
