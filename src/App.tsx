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
}

type UserInputs = {
  playerCounts: PlayerCounts;
  // numSimulations: number;
}

// USEFUL VARIABLES
const userInputs: UserInputs = {
  playerCounts: {
   attackerCount: 15,
   defenderCount: 10
  },
  // numSimulations: 20
} as const

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

runSingleSimulation( userInputs )

console.log('userInputs:', userInputs)

function runSingleSimulation (userInputs: Readonly<UserInputs>): void {

  // this is stupid but it makes the copy of the object. Need to refactor.
  const myUserInputs: UserInputs = {
    playerCounts: {
      ...userInputs.playerCounts
    }
  }

  console.log('myUserInputs === userInputs:', myUserInputs === userInputs)
// This will still alter userInputs, hmm
// One run through of simulation
while ( myUserInputs.playerCounts.attackerCount > 0 && myUserInputs.playerCounts.defenderCount > 0 ){
  
console.log('playerCounts:', myUserInputs.playerCounts)
const attackerFirstRoll= randomIntFromInterval(1, 6)
const attackerSecondRoll = randomIntFromInterval(1, 6)
const attackerThirdRoll = randomIntFromInterval(1, 6)


const defenderFirstRoll = randomIntFromInterval(1, 6)
const defenderSecondRoll = randomIntFromInterval(1, 6)

const attackerRolls = sortPlayerRolls([attackerFirstRoll, attackerSecondRoll, attackerThirdRoll])
const defenderRolls = sortPlayerRolls([defenderFirstRoll, defenderSecondRoll])
// console.log('attackerRolls:', attackerRolls)
// console.log('defenderRolls:', defenderRolls)

// Now for the attack 
if(attackerRolls[0] > defenderRolls[0]){
  myUserInputs.playerCounts.defenderCount --
}
else {
  myUserInputs.playerCounts.attackerCount --
}

if(myUserInputs.playerCounts.attackerCount > 1 && myUserInputs.playerCounts.defenderCount > 1 ){
  if(attackerRolls[1] > defenderRolls[1]){
  myUserInputs.playerCounts.defenderCount --
}
  else {
  myUserInputs.playerCounts.attackerCount --
   }
}

// results
if(myUserInputs.playerCounts.attackerCount === 0){
  console.log('defender holds!')
  // results.defenderHolds ++
}
else if (myUserInputs.playerCounts.defenderCount === 0){
  console.log('attacker occupies!')
  // results.attackerOccupies ++
}
}
}