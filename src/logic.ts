// I stole this from Google, don't hate me if it's buggy


export function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

type PlayerCounts = {
  attackerCount: number;
  defenderCount: number;
}

const playerCounts: PlayerCounts = {
  attackerCount: 15,
  defenderCount: 10
} 

const results = {
  attackerOccupies: 0,
  defenderHolds: 0
}


while(playerCounts.attackerCount > 0 && playerCounts.defenderCount > 0){
  console.time('a')

const attackerRollOne = randomIntFromInterval(1, 6)
const attackerRollTwo = randomIntFromInterval(1, 6)
const attackerRollThree = randomIntFromInterval(1, 6)


const defenderRollOne = randomIntFromInterval(1, 6)
const defenderRollTwo = randomIntFromInterval(1, 6)

const attackerRolls = [attackerRollOne, attackerRollTwo, attackerRollThree].sort(
  (a, b) =>{ return b - a })

  const defenderRolls = [defenderRollOne, defenderRollTwo].sort(
  (a, b) =>{ return b - a })

console.log({
  attackerRollOne,
  attackerRollTwo,
  attackerRollThree,
  defenderRollOne,
  defenderRollTwo
})

// console.log('attackerRolls sorted:', attackerRolls)
// console.log('defenderRolls sorted:', defenderRolls)

if(attackerRolls[0] > defenderRolls[0]){
  playerCounts.defenderCount --
}
else {
  playerCounts.attackerCount --
}

if(playerCounts.attackerCount > 1 && playerCounts.defenderCount > 1 ){
  if(attackerRolls[1] > defenderRolls[1]){
  playerCounts.defenderCount --
}
  else {
  playerCounts.attackerCount --
   }
}

console.log("playerCounts:", playerCounts)

  console.timeEnd('a')

}

if(playerCounts.attackerCount === 0){
  console.log('defender holds!')
  results.defenderHolds ++
}
else if (playerCounts.defenderCount === 0){
  console.log('attacker occupies!')
  results.attackerOccupies ++
}

console.log('results:', results)

console.timeEnd()



// NEED:

//INPUTS
// Attacker Count
// Defender Count
  // STRETCH: multiple defending territories
// num of times to run scenario
// STRETCH:
// Dice sides
// Number of attackers used per turn (not always 3)

// LOGIC
// Generate Dice Roll - check
// Compare top A to top D, loser -- 
  // repeat with second A and second D
  // Do this by sorting both arrays. then compare att[0] to def[0] and att[1] to def[1]

// for (scenarioCount){
    // while (attackerCount > stopWhen) {
      // if topA > top B dCount -- , else aCount --
      // if secondTopA > secondTopB dcount--, else aCount --
// }
// }


// REPORTING
// Track what % of time each side prevails
// Track avg # of troops left for each side

// TYPES
// Maybe Attacker and Defender
  // Subtypes of Player
  // Keys: diceSides,rolls ([number, number?, number?]). maybe stopWhen?
// Results
  // {
    // attackerOccupies: number;
    // defenderHolds: number;
  // }