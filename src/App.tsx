// TODO: Refactor, particularly make the simulation more DRY and figure out how to best replicate userInputs in runSingleSimulation

function App() {
  return (
    <div className="App">
      <h1>Adam Hinton</h1>
    </div>
  );
}

export default App;

// TYPE DEFINITIONS
type PlayerCounts = {
  attackerCount: number;
  defenderCount: number;
}

type Results = {
  attackerOccupies: number;
  defenderHolds: number;
  // averageUnitsLeft: {
  //   attackers: number;
  //   defenders: number;
  // }
}

type UserInputs = {
  playerCounts: PlayerCounts;
  numSimulations: number;
}

// USEFUL VARIABLES
const userInputs: UserInputs = {
  playerCounts: {
   attackerCount: 20,
   defenderCount: 20
  },
  numSimulations: 1000
} 

const results: Results = {
  attackerOccupies: 0,
  defenderHolds: 0
}

// UTILS
const randomIntFromInterval = (min: Readonly<number>, max: Readonly<number>) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const sortPlayerRolls = (rolls: [rollOne: Readonly<number>, rollTwo: Readonly<number>, rollThree? : Readonly<number>]) =>{
  return rolls.sort((a , b ) =>{ return b!  - a! })
}

console.time('a')
for(let i=0; i<userInputs.numSimulations; i++){
  runSingleSimulation( {...userInputs.playerCounts })
}

console.log('results:', results)
console.timeEnd('a')
console.log('userInputs:', userInputs)

function runSingleSimulation (playerCounts: PlayerCounts): void {
  
// One run through of simulation
while ( playerCounts.attackerCount > 0 && playerCounts.defenderCount > 0 ){
  
const attackerFirstRoll= randomIntFromInterval(1, 6)
const attackerSecondRoll = randomIntFromInterval(1, 6)
const attackerThirdRoll = randomIntFromInterval(1, 6)


const defenderFirstRoll = randomIntFromInterval(1, 6)
const defenderSecondRoll = randomIntFromInterval(1, 6)

const attackerRolls = sortPlayerRolls([attackerFirstRoll, attackerSecondRoll, attackerThirdRoll])
const defenderRolls = sortPlayerRolls([defenderFirstRoll, defenderSecondRoll])

// Now for the attack 
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

// results
if(playerCounts.attackerCount === 0){
  results.defenderHolds ++
}
else if (playerCounts.defenderCount === 0){
  results.attackerOccupies ++
}
}
}