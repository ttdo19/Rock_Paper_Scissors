function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3); 
    if (randomNum === 1) return "rock"; 
    else if (randomNum === 2) return "paper"; 
    else return "scissors"; 
}

function playRound(playerSelection, computerSelection) {
    let userChoice = playerSelection.toLowerCase(); 
    //Tie
    if (userChoice === computerSelection) {
        return [0, "It's a tie"]; 
    }
    //User loses
    if ((userChoice === "rock" && computerSelection === "paper") 
        || (userChoice === "paper" && computerSelection === "scissors") 
        || (userChoice === "scissors"  && computerSelection === "rock")) {
            return [-1, "You Lost! " + computerSelection[0].toUpperCase() + computerSelection.slice(1) + " beats " + userChoice[0].toUpperCase() + userChoice.slice(1)] ; 
    }
    //User wins
    return [1, "You Won! " + userChoice[0].toUpperCase() + userChoice.slice(1) + " beats " + computerSelection[0].toUpperCase() + computerSelection.slice(1)] ; 
  }
   
function game() {
    let userScore = 0, computerScore = 0; 
    for (let i = 0; i < 5; i++) {
        let userSelection = prompt("Please make a choice between rock, paper, or scissors!"); 
        let computerSelection = getComputerChoice(); 
        let result = playRound(userSelection, computerSelection); 
        console.log(result[1]);
        if (result[0] === 1) userScore++;  
        else if (result[0] === -1) computerScore++; 
    }
    if (userScore < computerScore) console.log("You lost! Good luck next time"); 
    if (userScore > computerScore) console.log("You won! Good job"); 
}

game(); 