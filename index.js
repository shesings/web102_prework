/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)
console.log(GAMES_JSON);
addGamesToPage(GAMES_JSON);
// console.log(GAMES_JSON.length);
// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    var i = 0;
    // loop over each item in the data
        for(i; i < games.length; i++) {
            const game = games[i];
             // create a new div element, which will become the game card
            let gameCard = document.createElement('div');
            // add the class game-card to the list
            gameCard.classList.add("game-card");

         // set the inner HTML using a template literal to display some info 
         const gameInfo = `
         <img class="game-img" src="${game.img}" />
         <h3>${game.name}</h3>
         <p>Number Pledged: ${game.pledged}</p>
        `;
        
        gameCard.innerHTML = gameInfo;
     
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        
        // append the game to the games-container
        document.getElementById("games-container").appendChild(gameCard);
        }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (totalBackers, game) => { 
    return totalBackers + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
console.log(totalContributions.toLocaleString('en-US'));
contributionsCard.innerHTML = totalContributions.toLocaleString('en-US');

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = GAMES_JSON.reduce((totalRaised, game) => {
    return totalRaised + game.pledged;
}, 0);

console.log(totalRaised.toLocaleString('en-US'));
raisedCard.innerHTML = "$" + totalRaised.toLocaleString('en-US');

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
            return game.pledged < game.goal;
    });
    console.log(unfundedGames.length);
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });
    console.log(fundedGames.length);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
});
const numUnfundedGames = unfundedGames.length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedAmount = numUnfundedGames === 1 ? `1 game` :  `${numUnfundedGames} games`;
const displayStr = `A total of ${totalRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} games. Currently, ${unfundedAmount} remains unfunded. We need your help to fund these amazing games!`

console.log(displayStr);

// create a new DOM element containing the template string and append it to the description container
// const element = document.createElement(displayStr);
// descriptionContainer.appendChild(element);

const paraElement = document.createElement("p");
paraElement.textContent = displayStr;
descriptionContainer.appendChild(paraElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameName = document.createElement("p");
topGameName.innerText = firstGame.name;
firstGameContainer.appendChild(topGameName);

// do the same for the runner up item
const secondGameName = document.createElement("p");
secondGameName.innerText = secondGame.name;
secondGameContainer.appendChild(secondGameName);