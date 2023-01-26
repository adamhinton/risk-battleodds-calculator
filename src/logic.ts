// things are a little messy right now 1.24. I'm working on generateSortedRolls which is mostly good but messy,  and I also have the redundant sortPlayerRolls fxn which is used currently --- generateSortedRolls isn't used yet.

// Average troops left tracking planning
// Have runSingleSimulation return an object or tuple with num troops left for each player
// Add those values to troopsLeft object of some sort
// At end, iterate over object to calc average troops left
// I feel like there's a better way. Recursion? 

export const a = 'I need to export something'


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

