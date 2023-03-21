RISK BATTLEODDS CALCULATOR

`TOOLS: TypeScript, React, HTML/CSS, Styled Components, Material UI, Jest`


# `Introduction`

-NOTE: This app calcultes the odds of success, and the average results, in certain scenario for the board game Risk. It assumes each dice has six sides, and that the attacker throws a maximum of three dice and the defender rolls a maximum of two dice. \
  -This link explains Risk battles in better detail than I could, so please check it out. 
    -https://www.kent.ac.uk/smsas/personal/odl/riskfaq.htm#2.6

-A scalable, maintainable application for players of the classical board game Risk. This project calculates odds of success in user-inputted scenarios and provides useful data such as average attackers/defenders remaining. 

-I invested in my codebase with thorough documentation, strong unit testing suites and good git practices with small, clean commits and descriptive, small PRs. 

`HTML/CSS is highly semantic, accessible and responsive for readers of all screen sizes and abilities`

`Persistent Dark/Light Mode preference is stored in localStorage and remembered across sessions`

Requirements:
For development, you will only need Node.js installed on your environement. And please use the appropriate Editorconfig plugin for your Editor (not mandatory).

Install
$ git clone https://github.com/ORG/pokemon-project.git
$ cd PROJECT
$ npm install


$ git pull
$ npm prune
$ npm install
To run those 3 commands you can just do

$ npm run pull


# `Technical Information:`

## `Component Structure`
```
<ThemeProvider> --- controls dark/light mode theming
- <App>
- - <Header />
- - <Form />
- - <Results />  --- only displays if user has submitted Form
- <App/>
<ThemeProvider />
```

## `Components`

### `ThemeProvider <ThemeProvider/>`
  -Wraps around App \
  -Controls theming (aka light or dark mode) for the whole app. Passes dark/light CSS properties down to subcomponent without having to use prop drilling

### `App.tsx <App/>`
  -Standard React App component. Houses all other components. \
  -ThemeProvider wraps aroudn App to provide darkmode theming.

#### `App State:`
  -Passes state in to other components:\
  -[results, setResults] : The risk of the user-inputted Risk boardgame scenario from Form. Passes setResults to Form and passes results to Results.tsx. \
  -[isDark, setIsDark] Dark Mode controller. Uses custom useDarkMode() hook (see documentation on this hook below). Passes setIsDark down to Header.tsx and passes isDark up to ThemeProvider.
  
 #### `Theme Objects:`
   -App.tsx contains lightTheme and darkTheme objects defining light and dark mode CSS properties for various components. These are distributed throughout the app through ThemeProvider.
 
 #### `Types:`
  -CustomTheming: Needed to add, well, custom theming to the ThemeOptions type, so I created this add-on for ThemeOptions. CustomTheming is a sub-object of the return value of darkTheme and lightTheme.

### `Header.tsx <Header />`

#### `Header Info`
  -Fairly straightforward Header component. Relies on MUI components for some styling, mixed with my own additions through styled-components

#### `Header props:`
  ```
  {
  isDark: boolean; --- dark or light mode
  setIsDark: Function;  --- sets dark mode to true or false
  }
  ```
  
#### `Header Features:`
  -Dark Mode button \
  -Nav bar worked through MUI
  
### `Form.tsx <Form />`

Again, see this link for an explanation of Risk dice rolls: https://www.kent.ac.uk/smsas/personal/odl/riskfaq.htm#2.6

#### `Form Intro:`
  
  NOTE: See documentation for generateResults.ts to see logic on how results are generated.

  User inputs Risk board game scenario in to this Form 
  
  Attackers: \
    -How many troops occupy the attacking territory \
    -Subtract 1 if abandonment is off (i.e. if you have to leave one troop behind in the territory you attacked from) 
  
  Defenders: \
    -How many troops are in the defending territories \
    -User can input one or more defenders separated by commas \
      -ex. 5, 3, 3, 6, 18 
  
  Number of simulations:
    -How many times the app should simulate the battle \
    -More simulations takes more time, but this is usually all done in 1-2 seconds so not much to worry about there \
    -Max 10,000 simulations \
    -Could run one simulation if you're playing a real game of Risk and don't want to manually roll the dice
    
 #### `Form state:`
  -[formValues, setFormValues]
  
 ##### formValues typing:
 ```
  {
    attackerCount: number;
    defenderCount: string;
    numSimulations: number;
    }
```

#### `Form Features`
  -Inputs \
    -Attackers: Integer \
    -Defenders: Single integer or list of integers (defenders) separated by commas (5, 4, 8, 9, 2, 1) \
    -Number of Simulations Slider: See Slider info below for more detail \
    -Submit: See generateResults.ts documentation for explanation of how results are calculated
    
#### `Slider Component`
  -Utilizes MUI's Slider component \
  -Sleek Slider input to let user choose number of simulations: 1, 10, 100, 1_000, or 10_000 \
  -In internal HTML, had to label these choices as 1, 2, 3, 4, and 5 to space them evenly on the slider \
  -See the function calculateValue and the const marks which convert the 1, 2, 3, 4, 5 in to numbers of simulations

### `ResultsDisplay.tsx <ResultsDisplay />`

Again, see this link for an explanation of Risk dice rolls: https://www.kent.ac.uk/smsas/personal/odl/riskfaq.htm#2.6

#### `ResultsDisplay Introduction`

  -Fairly simple component. Takes in Results object and displays it \
  -Updates whenever new Results are passed to it \
  -Uses some components from MUI, supplemented by styled components
  
#### `Results Type`
 
```
    {
    attackerOccupies: number;
    defenderHolds: number;
    averageAttackersLeft: number;
    averageDefendersLeft: number;
    }
```

#### `ResultsDisplay Features`

  -Displays the percentage of simulations in which the attacker or defender wins \
  -Displays average number of attackers and defenders remaining at the end of simulations
  
## `Utils`

### `generateResults.ts /utils/generateResults`

#### `Intro to generateResults()`

  -Again, see this link for an explanation of Risk dice rolls: https://www.kent.ac.uk/smsas/personal/odl/riskfaq.htm#2.6 \
  -This takes a user-inputted number of attackers and defenders (defenders can have multiple territories) and runs a simulation of this (default 10,000 simulations) to calculate the average/expected results. \
  -This is tested fairly thoroughly at generateResults.test.ts
  
#### `generateResults Functions`

##### `runSingleSimulation()`
  
   -Produces a Results object for one run-through of the battle. Tells whether the attacker or defender won, and how many troops were left for each side. \
    -This is the smallest single unit that could run once and the app would still work. Runs 10,000 times by default. \
    -in this function, the attacker attacks the defender until one of them is out of troops. Whoever survives is the winner of that simulation.
    
##### `randomIntFromInterval()`
  
  -Generates a random number from 1-6 to simulate a dice roll
  
##### `generatePlayerRolls()`
  -generates an array of dice rolls for an attacker (max 3 rolls) or defender (max 2 rolls) \
  -If there is only one defender currently in the territory being attacked, they get one dice roll. If more than one defender, they get 2 dice rolls. \
  -If there is only one attacker, attacker gets 1 dice roll. If two attackers, they get two dice rolls. If more than 2 attackers, they get three dice rolls.
  
##### `sortPlayerRolls()`
  -Dice rolls need to be sorted from highest to lowest. So this takes the results of generatePlayerRolls() and sorts it highest to lowest.
