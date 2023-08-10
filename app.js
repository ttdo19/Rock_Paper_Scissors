window.onload = beginAnimation(); 

let computerSelection; 
let playerSelection; 
let computerScore = 0; 
let playerScore = 0; 

let buttons = document.querySelectorAll(".button"); 
let body = document.querySelector("body"); 
let main = document.querySelector("main"); 

body.addEventListener("click", skipAnime()); 
body.addEventListener("mouse", skipAnime()); 

function skipAnime() {
    const spans = document.querySelectorAll("span"); 
    spans.forEach((span) => span.classList.add("skip")); 
}

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
    fadeIn();
    const desc1 = document.querySelector("#desc1");
    const desc2 = document.querySelector("#desc2");
    const desc3 = document.querySelector("#desc3"); 
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
                const choice = document.querySelector("#choice"); 
                choice.classList.add("drop-down"); 
                choice.addEventListener("animationend", () => {
                    const game = document.querySelector("#game-container"); 
                    setTimeout((() => game.classList.add("fade-in")), 300); 
                })
            }
        }
    }

    
}

