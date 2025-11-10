// alert("running external JS code!")

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
const maxAttempts = 7;
let attemptsLeft = maxAttempts;
let wins = 0;
let losses = 0;

console.log(randomNumber);

// document.querySelector("h1").style.color = "red";

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
    attempts = 0;
    attemptsLeft = maxAttempts;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to the textbox
   playerGuess.value = ""; //clearing the textbox   

   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; //clearing the feedback

   //resetting attempts remaining
   document.querySelector("#guessesRemaining").textContent = attemptsLeft;

   //clearing previous guesses
   document.querySelector("#guesses").textContent = "";

   //updateing wins and losses
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#losses").textContent = losses;

   //resetting outcome to show question mark
   document.querySelector("#questionMark").style.display = "inline-block";
   document.querySelector("#outcomeImg").style.display = "none";
}


function checkGuess() {
   let feedback = document.querySelector("#feedback");
   feedback.textContent = "";
   let guess = document.querySelector("#playerGuess").value;
   console.log("Player guess: " + guess);
   if (guess < 1 || guess > 99) {
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "red";
    return;
   }

   attempts++;
   attemptsLeft = maxAttempts - attempts;
   console.log("Attempts: " + attempts);
   document.querySelector("#guessesRemaining").textContent = attemptsLeft;
   feedback.style.color = "orange";
   if (guess == randomNumber) {
      feedback.textContent = "Right on the money! You win!";
      feedback.style.color = "darkgreen";
      wins++;
      document.querySelector("#questionMark").style.display = "none";
      let winImg = document.querySelector("#outcomeImg");
      winImg.src = "img/win.gif";
      winImg.style.display = "inline-block";
      gameOver();
   } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts >= maxAttempts) {
            feedback.textContent = "Sorry, better luck next time.";
            feedback.style.color = "red";
            losses++;
            document.querySelector("#questionMark").style.display = "none";
            let loseImg = document.querySelector("#outcomeImg");
            loseImg.src = "img/lose.gif";
            loseImg.style.display = "inline-block";
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Your guess is too high.";
        } else {
            feedback.textContent = "Your guess is too low.";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides Guess button
    resetBtn.style.display = "inline"; //displays Reset button
    
    //updating wins and losses display
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}
