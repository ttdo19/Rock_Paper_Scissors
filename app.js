let computerSelection; 
let playerSelection; 
let computerScore = 0; 
let playerScore = 0; 

const buttons = document.querySelectorAll(".button"); 
const body = document.querySelector("#body"); 
const main = document.querySelector("main"); 
const resetBtn = document.querySelector(".reset-button"); 
const finalResult = document.querySelector(".final-result"); 
const losingAnimation = document.querySelector("#lose"); 
const winningAnimation = document.querySelector("#win"); 
const game = document.querySelector("#game-container"); 
const choice = document.querySelector("#choice"); 
const skipButton = document.querySelector(".skipBtn"); 
const desc1 = document.querySelector("#desc1");
const desc2 = document.querySelector("#desc2");
const desc3 = document.querySelector("#desc3"); 
const resultCtn = document.querySelector("#results-container"); 


window.onload = beginAnimation(); 

function fadeIn() {
    let text = document.querySelector(".animate"); 
    let splitText = text.textContent.split(""); 
    text.textContent = ""; 

    //append span tags to each character in the string
    for (let char of splitText) {
        text.innerHTML += `<span>${char}</span>`; 
    }

    let timer = setInterval(onTick, 50); 
    let cur = 0; 
    function onTick() {
        const span = text.querySelectorAll("span")[cur]; 
        span.classList.add("fade"); 
        cur++; 
        if (cur === splitText.length) {
            clearInterval(timer);
            timer = null; 
            return; 
        }
    }
}


function beginAnimation() {
    skipButton.addEventListener("click", skipAnime); 

    fadeIn();
    
    //need to turn nodelist of spans into an array so that we can access last value for ontransitionend
    let desc1Span = desc1.querySelectorAll("span"); 
    desc1Span = Array.from(desc1Span); 

    desc1Span[desc1Span.length - 1].ontransitionend = () => {
        desc1.classList.add("disappear"); 
        desc1.classList.remove("animate"); 
        desc2.classList.add("animate"); 
        desc2.classList.remove("disappear"); 
        fadeIn(); 

        let desc2Span = desc2.querySelectorAll("span"); 
        desc2Span = Array.from(desc2Span); 

        desc2Span[desc2Span.length - 1].ontransitionend = () => {
            desc2.classList.add("disappear"); 
            desc2.classList.remove("animate"); 
            desc3.classList.add("animate"); 
            desc3.classList.remove("disappear"); 
            fadeIn(); 

            let desc3Span = desc3.querySelectorAll("span"); 
            desc3Span = Array.from(desc3Span); 

            desc3Span[desc3Span.length - 1].ontransitionend = () => {
                choice.classList.add("drop-down"); 
                skipButton.classList.add("disappear"); 
                choice.addEventListener("animationend", () => {
                    setTimeout((() => game.classList.add("fade-in")), 300); 
                })
            }
        }
    }
}

function getComputerChoice() {
    let randomNum = Math.floor(Math.random() * 3); 
    if (randomNum === 1) return "rock"; 
    else if (randomNum === 2) return "paper"; 
    else return "scissors"; 
}

function skipAnime() {
    desc1.classList.add("disappear"); 
    desc1.classList.remove("animate"); 
    desc2.classList.remove("animate"); 
    desc2.classList.add("disappear"); 
    desc3.classList.remove("disappear"); 
    
    choice.classList.add("drop-down"); 
    skipButton.classList.add("disappear"); 
    choice.addEventListener("animationend", () => {
        setTimeout((() => game.classList.add("fade-in")), 300); 
    })
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playerSelection = button.id.toLowerCase(); 
        computerSelection = getComputerChoice(); 
        playRound(playerSelection, computerSelection); 
    })
})

function playRound(playerSelection, computerSelection) {
    console.log(playerSelection); 
    console.log(computerSelection); 
    //Tie
    if (playerSelection === computerSelection) {
        playerScore++; 
        computerScore++; 
        displayResult("It's a tie!"); 
    } else if ((playerSelection === "rock" && computerSelection === "paper") 
        || (playerSelection === "paper" && computerSelection === "scissors") 
        || (playerSelection === "scissors"  && computerSelection === "rock")) {
            //User loses
            computerScore++; 
            displayResult("You Lost! " + computerSelection[0].toUpperCase() + computerSelection.slice(1) + " beats " + playerSelection[0].toUpperCase() + playerSelection.slice(1)) ; 
    } else {
        //User wins
        playerScore++; 
        displayResult("You Won! " + playerSelection[0].toUpperCase() + playerSelection.slice(1) + " beats " + computerSelection[0].toUpperCase() + computerSelection.slice(1)) ; 
    }
    updateScore("#player-score"); 
    updateScore("#computer-score"); 
    if (playerScore === 5 || computerScore === 5) displayFinal(); 

  }
   
function updateScore(person) {
    const scoreCtn = document.querySelector(person); 
    scoreCtn.animate([{opacity: 0}, {opacity: 1}], {
        duration: 300,
        delay: 0, 
        fill: "forwards",  
        iterations: 1, 
        easing: "ease-in", 
    }); 
    scoreCtn.textContent = (person === "#player-score") ? playerScore : computerScore;  
}

function displayResult(message) {
    resultCtn.animate([{opacity: 0}, {opacity: 1}], {
        duration: 300,
        delay: 0, 
        fill: "forwards",  
        iterations: 1, 
        easing: "ease-out", 
    })
    resultCtn.textContent = message; 
}

function displayFinal() {
    resetBtn.addEventListener("click", reset); 
    finalResult.classList.remove("disappear"); 
    desc3.classList.add("disappear"); 
    choice.classList.add("disappear"); 
    game.classList.add("disappear"); 
    finalResult.animate([{opacity: 0}, {opacity: 1}], {
        duration: 300, 
        delay: 0, 
        fill: "forwards", 
        iterations: 1, 
        easing: "ease-in", 
    })
    if (playerScore === 5) {
        //player wins
        finalResult.textContent = "Great job🎉 You have beaten the machines and saved the planet!"; 
        winningAnimation.classList.remove("disappear"); 
        resetBtn.textContent = "Play Again";
    } else {
        //computer wins
        finalResult.textContent = "Oh no! The machines have taken over the planet!"; 
        losingAnimation.classList.remove("disappear"); 
        resetBtn.textContent = "Try Again";
    }
    resetBtn.classList.remove("disappear"); 
}

function reset() {
    computerScore = 0; 
    playerScore = 0; 
    updateScore("#player-score"); 
    updateScore("#computer-score"); 

    finalResult.classList.add("disappear"); 
    desc3.classList.remove("disappear"); 
    desc3.classList.add("animate"); 
    choice.classList.remove("disappear"); 
    choice.classList.add("drop-down"); 
    winningAnimation.classList.add("disappear"); 
    losingAnimation.classList.add("disappear"); 
    resetBtn.classList.add("disappear"); 
    game.classList.add("fade-in");
    game.classList.remove("disappear"); 
    fadeIn(); 
}


