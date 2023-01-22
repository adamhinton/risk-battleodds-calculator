function App() {
  return (
    <div className="App">
      <h1>Adam Hinton</h1>
    </div>
  );
}

export default App;


const randomIntFromInterval = (min: number, max: number) =>{ // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

console.log('randomIntFromInterval(1, 6):', randomIntFromInterval(1, 6))
console.log('randomIntFromInterval(1, 6):', randomIntFromInterval(1, 6))
console.log('randomIntFromInterval(1, 6):', randomIntFromInterval(1, 6))
console.log('randomIntFromInterval(1, 6):', randomIntFromInterval(1, 6))