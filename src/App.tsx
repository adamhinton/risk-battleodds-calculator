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
}

const results: Results = {
  attackerOccupies: 0,
  defenderHolds: 0
}

// UTILS
const randomIntFromInterval = (min: number, max: number) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const sortPlayerRolls = (rolls: [rollOne: number, rollTwo: number, rollThree? : number]) =>{
  return rolls.sort((a , b ) =>{ return b!  - a! })
}


// One run through of simulation
while ( userInputs.playerCounts.attackerCount > 0 && userInputs.playerCounts.defenderCount > 0 ){
  
  console.log('playerCounts:', userInputs.playerCounts)
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
  userInputs.playerCounts.defenderCount --
}
else {
  userInputs.playerCounts.attackerCount --
}

if(userInputs.playerCounts.attackerCount > 1 && userInputs.playerCounts.defenderCount > 1 ){
  if(attackerRolls[1] > defenderRolls[1]){
  userInputs.playerCounts.defenderCount --
}
  else {
  userInputs.playerCounts.attackerCount --
   }
}

// results
if(userInputs.playerCounts.attackerCount === 0){
  console.log('defender holds!')
  // results.defenderHolds ++
}
else if (userInputs.playerCounts.defenderCount === 0){
  console.log('attacker occupies!')
  // results.attackerOccupies ++
}

}
