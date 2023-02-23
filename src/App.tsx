// TODO: Refactor, particularly make the simulation more DRY and figure out how to best replicate userInputs in runSingleSimulation

import { useState } from "react";
import Form from "./components/Form";

// PLAN
// COMPONENT STRUCTURE:
// <App>
// <Header/>
// <Form/>
// <Results/>
// </App>

function App() {
  const [userInputs, setUserInputs] = useState<UserInputs>({
    playerCounts: {
      attackerCount: 0,
      defenderCount: 0,
    },
    numSimulations: 0,
  });

  console.log("userInputs in App:", userInputs);

  return (
    <div className="App">
      <h1>Adam Hinton</h1>
      <Form setUserInputs={setUserInputs}></Form>
    </div>
  );
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

export default App;

// TYPE DEFINITIONS
type PlayerCounts = {
  attackerCount: number;
  defenderCount: number;
};

type Results = {
  attackerOccupies: number;
  defenderHolds: number;
  // averageUnitsLeft: {
  //   attackers: number;
  //   defenders: number;
  // }
};

type UserInputs = {
  playerCounts: PlayerCounts;
  numSimulations: number;
};

type PlayerType = "attacker" | "defender";

type AttackerRolls = [number, number?, number?];
type DefenderRolls = [number, number?];
type PlayerRolls = AttackerRolls | DefenderRolls;

// USEFUL VARIABLES
const userInputs: UserInputs = {
  playerCounts: {
    attackerCount: 20,
    defenderCount: 20,
  },
  numSimulations: 1000,
};

const results: Results = {
  attackerOccupies: 0,
  defenderHolds: 0,
};

// UTILS
const randomIntFromInterval = (
  min: Readonly<number>,
  max: Readonly<number>
) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const sortPlayerRolls = (rolls: PlayerRolls): PlayerRolls => {
  return rolls.sort((a, b) => {
    return b! - a!;
  });
};

console.time("a");
for (let i = 0; i < userInputs.numSimulations; i++) {
  runSingleSimulation({ ...userInputs.playerCounts });
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
    } else if (playerCounts.defenderCount === 0) {
      results.attackerOccupies++;
    }
  }
}
