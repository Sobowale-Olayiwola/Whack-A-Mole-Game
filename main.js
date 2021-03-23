// View object deals with updating the display to the user
const view = {
    displayHit: function(successfulHits) {
        let numOfHits = document.querySelector('span');
        numOfHits.innerHTML = successfulHits;      
    },
    displayMole: function(location) {
        let grid = document.getElementById(location);
        grid.classList.add('mole');
    },
    removeMole: function() { 
        let cell = document.querySelectorAll('.square');
        cell.forEach(element => {
            element.classList.remove('mole')
        });
    }
}
// The model object deals  with handling the state of the game and some logic

const model = {
    numberOfHits: 0,
    positionOfMole: function() { // closure: A function with a reference environment
        let randomNumber;
        function coordinateMoleActions(){
            randomNumber = Math.floor(Math.random() * 9) + 1
            view.removeMole();
            view.displayMole(randomNumber);
            return randomNumber;
        }
        return coordinateMoleActions;
    }
}
// Controller object deals with taking the user input and the whole logic of the game
const controller = {
    playerGuess: function() {
        let guess = document.querySelectorAll(".square")
        for ( var i = 0; i < guess.length; i++ ) {
            guess[i].addEventListener("mouseover", this.getId);
            }
    },
    getId: function (eventObj) {
        let userGuessId = eventObj.target.id;
        let getRandomNumber = model.positionOfMole();
         if ( userGuessId == getRandomNumber() ){
            model.numberOfHits = model.numberOfHits + 1;
            view.displayHit(model.numberOfHits);
            }
        }
}

// event handlers

function moveMole() {
    let timerId = null;
    timerId = setInterval( model.positionOfMole(),1000 );
}

function gameInitiator() {
    model.positionOfMole();
    moveMole();
    controller.playerGuess();
}
// init gets called after the page loads

window.onload = init;
function init() {
        let startButton = document.getElementById("startButton");
        startButton.addEventListener("click", gameInitiator);
}





