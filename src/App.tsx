import { ResourceLimits } from 'worker_threads';

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

const {playerCounts} = userInputs
const {attackerCount, defenderCount} = playerCounts

const results: Results = {
  attackerOccupies: 0,
  defenderHolds: 0
}

// UTILS
const randomIntFromInterval = (min: number, max: number) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// One run through of simulation
while ( attackerCount > 0 && defenderCount > 0 ){
const attackerFirstRoll= randomIntFromInterval(1, 6)
const attackerSecondRoll = randomIntFromInterval(1, 6)
const attackerThirdRoll = randomIntFromInterval(1, 6)


const defenderFirstRoll = randomIntFromInterval(1, 6)
const defenderSecondRoll = randomIntFromInterval(1, 6)

}


const sortPlayerRolls = (rolls: [rollOne: number, rollTwo: number, rollThree? : number]) =>{
  return rolls.sort((a , b ) =>{ return b!  - a! })
}


