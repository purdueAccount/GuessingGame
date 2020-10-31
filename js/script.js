/*
  JavaScript
  version: 1.0.0
  date: 10/30/2020 m/d/y
  author: Robert Charles
*/

/***

// number 50
Guess a number between 1 and 100, you get 7 tries.
Your guess --> 23
The number is too small, you have 6 guesses left.
Your guess --> 77
The number is too large, you have 5 guesses left.

::: Correct
Your guess --> 50
CONGRADULATIONS, 50 is the correct number, you guessed in 3 tries.

::: Failed
Your guess --> 51
SORRY, the number was 50, you have no more guesses left.

Would you like to play again?
->Button-< Play Again

***/

var answer = 0;
var tries = 7;
var gameover = 0;
var result = 0;

/* start the game */
function start() {
  /* get a random number */
  answer = Math.floor(Math.random() * 100) + 1;
} /* end start */


/* print text to the screen within a 'p' tag */
function printText(text) {
  /* Create a <p> node */
  var node = document.createElement("p");
  /* Add text to the node */
  node.innerHTML = text;
  /* Append <p> to <main> */
  document.getElementById("main").appendChild(node);
} /* end printText */


/* input for the guess, provide form for input and button */
function inputGuess() {
  /* create a form tag */
  var nodeForm = document.createElement("form");
  var form = document.getElementById("main").appendChild(nodeForm);
  /* Add text label to the form */
  var nodeP = document.createElement("span");
  var text = form.appendChild(nodeP);
  text.innerHTML = "Your guess: ";
  /* Add input to the form */
  var nodeInput = document.createElement("input");
  var input = form.appendChild(nodeInput);
  /* Add button to the form */
  var nodeBtn = document.createElement("button");
  var btn = form.appendChild(nodeBtn);
  /* set attribute */
  input.setAttribute("id", "guessinput" + tries);
  btn.addEventListener("click", function(event){
    event.preventDefault();
  });
  btn.setAttribute("id", "guessbtn" + tries);
  btn.setAttribute("onclick", "guessing();");
  btn.innerHTML = "Guess";
  document.getElementById("guessinput" + tries).focus();
} /* end inputGuess */


/* disable the prior guess input */
function disableGuess() {
  document.getElementById("guessinput" + tries).disabled = true;
  document.getElementById("guessbtn" + tries).disabled = true;
} /* disableGuess */


/* number guessing logic */
function guessing() {
  /* check the guess */
  var checkNum = document.getElementById("guessinput" + tries).value; 
  /* not a number */
  if(isNaN(checkNum)) {
    printText("Not a Number, please try again.");
    return;
  }
  /* outside the bounds */
  if(checkNum > 100 || checkNum < 1) {
    printText("That number is outside the bounds, please try again.");
    return;
  }
  /* correct answer */
  if(checkNum == answer) {
    endsuccess();
    return;
  }
  /* incorrect answer over */
  if(checkNum > answer) {
    disableGuess(tries);
    tries--;
    if(tries < 1) {
      endfailed();
      return;
    }
    printText("The number is too large, you have " + tries + " guesses left.");
    inputGuess();
    return;
  }
  /* incorrect answer under */
  if(checkNum < answer) {
    disableGuess(tries);
    tries--;
    if(tries < 1) {
      endfailed();
      return;
    }
    printText("The number is too small, you have " + tries + " guesses left.");
    inputGuess();
    return;
  }
} /* end guessing */


/* looser */
function endfailed() {
  disableGuess(tries++);
  printText("SORRY, the number was " + answer + ", <br/>you have no more guesses left.");
  playagain();
} /* end endfailed*/


/* winner */
function endsuccess() {
  disableGuess(tries);
  printText("CONGRADULATIONS, <br/>" + answer + " is the correct number, you guessed in " + tries + " tries.");
  playagain();
} /* end endsuccess */


/* play again */
function playagain() {
  var nodeBtn = document.createElement("button");
  document.getElementById("main").appendChild(nodeBtn);
  nodeBtn.innerHTML = "Play Again ?";
  nodeBtn.setAttribute("onclick", "window.location.reload();");
  nodeBtn.setAttribute("id", "playagin");
  nodeBtn.focus();
} /* end playagain */


/* start the game running */
start();
printText("ANSWER: " + answer);
printText("Guess a number between 1 and 100, you get " + tries + " tries.");
inputGuess();
document.getElementById("guessinput" + tries).focus();

/* EOF */
