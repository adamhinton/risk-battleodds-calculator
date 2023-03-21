RISK BATTLEODDS CALCULATOR

`TOOLS: TypeScript, React, HTML/CSS, Styled Components, Material UI, Jest`


# `Introduction`

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

### `App.tsx <App/>`
Standard React App component. Houses all other components. \
ThemeProvider wraps aroudn App to provide darkmode theming.

#### `State:`
  -Passes state in to other components:\
  -[results, setResults] : The risk of the user-inputted Risk boardgame scenario from Form. Passes setResults to Form and passes results to Results.tsx. \
  -[isDark, setIsDark] Dark Mode controller. Uses custom useDarkMode() hook (see documentation on this hook below). Passes setIsDark down to Header.tsx and passes isDark up to ThemeProvider.
  
 #### `Theme Objects:`
   -App.tsx contains lightTheme and darkTheme objects defining light and dark mode CSS properties for various components. These are distributed throughout the app through ThemeProvider.
 
 #### `Types:`
  -CustomTheming: Needed to add, well, custom theming to the ThemeOptions type, so I created this add-on for ThemeOptions. CustomTheming is a sub-object of the return value of darkTheme and lightTheme.

### `Styled Components:`
  -StyledApp: The `div` that is, well, the App. \
  -StyledMain: the `main` tag.
