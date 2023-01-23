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

type PlayerType = 'attacker' | 'defender'

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
  
type AttackerRolls = [number, number, number]
type DefenderRolls = [number, number]
type PlayerRolls = AttackerRolls | DefenderRolls

const attackerRolls : AttackerRolls = [randomIntFromInterval(1, 6), randomIntFromInterval(1, 6), randomIntFromInterval(1, 6)]
const defenderRolls: DefenderRolls = [randomIntFromInterval(1, 6), randomIntFromInterval(1, 6)]

const attackerRollsSorted = sortPlayerRolls(attackerRolls)
const defenderRollsSorted = sortPlayerRolls(defenderRolls)

// Now for the attack 
if(attackerRollsSorted[0] > defenderRollsSorted[0]){
  playerCounts.defenderCount --
}
else {
  playerCounts.attackerCount --
}

if(playerCounts.attackerCount > 1 && playerCounts.defenderCount > 1 ){
  if(attackerRollsSorted[1] > defenderRollsSorted[1]){
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