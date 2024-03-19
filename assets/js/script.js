/**
 * Adds event listeners to clickOn elements and assigns functions according to data-type.
 */

document.addEventListener("DOMContentLoaded", function(){
    let clickOns = document.getElementsByClassName("clickOn");

    for (let clickOn of clickOns){
        clickOn.addEventListener("click", function(){
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else if (this.getAttribute("data-type") === "reset") {
                document.getElementById("answer-box").value = '';
                location.reload();
            } else if (this.getAttribute("data-type") === "timer") {
                startTimer(); 
            } else if (this.getAttribute("data-type") === "multiplication") {
                runMultiplicationGame(); 
        }
    })
}
})

/**
* Generates random integers between 1 and 12.
* Creates multiplication questions.
*/

function runMultiplicationGame() {

let firstNumber = Math.floor(Math.random() * 11)+1;
let secondNumber = Math.floor(Math.random() * 11)+1;

document.getElementById('partA').textContent = firstNumber;
document.getElementById('partB').textContent = secondNumber;
document.getElementById('symbol').textContent = "x";

}

/**
 * Compares the users answer with the return from calculateCorrectAnswer()
 * Selects function to increase correct score.
 */

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let userRight = userAnswer === calculatedAnswer[0];

    if (userRight) {
        increasePositiveScore();
    } else {
        increaseNegativeScore();
    }
    document.getElementById("answer-box").value = '';
    runMultiplicationGame(calculatedAnswer[1]);

}

/**
 * Gets the operands and the operator directly from the DOM
 * Returns the correct answer
 */

function calculateCorrectAnswer() {
    let partA = parseInt(document.getElementById('partA').innerText);
    let partB = parseInt(document.getElementById('partB').innerText);
    
    return [partA * partB, "multiplication"];
}

/**
 * Gets the current score from the DOM and adds 1.
 */

function increasePositiveScore() {
    let oldScore = parseInt(document.getElementById("positive-score").innerText);
    document.getElementById("positive-score").innerText = ++oldScore;
}

/**
 * Gets the current tally of incorrect answers from the DOM and increments it by 1
 */

function increaseNegativeScore() {
    let oldScore = parseInt(document.getElementById("negative-score").innerText);
    document.getElementById("negative-score").innerText = ++oldScore;
}

/**
 * Timer to counts down to 0.
 */

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            let positiveScore = document.getElementById("positive-score").innerText;
            let negativeScore = document.getElementById("negative-score").innerText;
            let percent = 100* positiveScore/(positiveScore+negativeScore);
            alert(`Your time is up! You got ${positiveScore} right and ${negativeScore} wrong. Your success rate is ${percent} %.`);
            location.reload();
        }
    }, 1000);
}

/**
 * Novice Timer to start at 80seconds on click
 */

timerDisplayNovice.onclick = function () {
    var time = 80, // time in seconds here
        display = document.querySelector('#timerDisplayNovice');
    startTimer(time, display);
};

/**
 * Intermediate Timer to start at 40 seconds on click
 */

timerDisplayIntermediate.onclick = function () {
    var time = 40, // time in seconds here
        display = document.querySelector('#timerDisplayIntermediate');
    startTimer(time, display);
};

/**
 * Advanced Timer to start at 20 seconds on click
 */

timerDisplayAdvanced.onclick = function () {
    var time = 20, // time in seconds here
        display = document.querySelector('#timerDisplayAdvanced');
    startTimer(time, display);
};