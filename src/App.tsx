function App() {
  return (
    <div className="App">
      <h1>Adam Hinton</h1>
    </div>
  );
}

export default App;

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
  numSimulations: number;
}

const userInputs: UserInputs = {
  playerCounts: {
   attackerCount: 15,
   defenderCount: 10
  },
  numSimulations: 20
}


const results = {
  attackerOccupies: 0,
  defenderHolds: 0
}



const randomIntFromInterval = (min: number, max: number) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
