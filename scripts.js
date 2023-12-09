const POSSIBLE_CHOICES = [ "rock", "paper", "scissors" ];

let playerScore = 0;
let computerScore = 0;

const buttons = document.querySelectorAll('button');
const scoresDisplay = document.querySelector('#scores');

scoresDisplay.textContent = getScores(playerScore, computerScore);

buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

function handleButtonClick(event) {
    let computerChoice = getComputerChoice();
    let playerChoice = event.target.id;
    playRound(playerChoice, computerChoice);
    scoresDisplay.textContent = getScores(playerScore, computerScore);
    if (playerScore === 5) {
        finishGame(scoresDisplay, 'Player');
    }
    if (computerScore === 5) {
        finishGame(scoresDisplay, 'Computer');
    }
}

function finishGame(display, winner) {
    buttons.forEach(button => button.disabled = true);
    display.textContent = `${winner} wins!`;
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Restart game';
    resetButton.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        buttons.forEach(button => button.disabled = false);
        display.textContent = getScores(playerScore, computerScore);
        document.querySelector('body').removeChild(resetButton);
    });
    document.querySelector('body').appendChild(resetButton);
}

function getScores(playerScore, computerScore) {
    return `Player Score: ${playerScore}\nComputer Score: ${computerScore}\n`;
}

function getComputerChoice() {
    randomNumber = Math.floor(Math.random() * POSSIBLE_CHOICES.length);
    return POSSIBLE_CHOICES[randomNumber];
}

function playRound(playerChoice, computerChoice) {
    const outcomes = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper" 
    }

    for (let winner in outcomes) {
        if (playerChoice === winner) {
            if (computerChoice === outcomes[winner]) {
                console.log(`Player wins! ${playerChoice} beats ${computerChoice}`)
                playerScore++;
            } else if (playerChoice === computerChoice) {
                console.log('draw!');
                playerScore++;
                computerScore++;
            } else {
                console.log(`Computer wins! ${computerChoice} beats ${playerChoice}`);
                computerScore++;
            }
        }
    }
}
