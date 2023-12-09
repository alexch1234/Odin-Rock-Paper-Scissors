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
    playRound(playerChoice, computerChoice, scoresDisplay);
    if (playerScore === 5) {
        finishGame('Player');
    }
    if (computerScore === 5) {
        finishGame('Computer');
    }
}

function finishGame(winner) {
    buttons.forEach(button => button.disabled = true);
    scoresDisplay.textContent = `${winner} wins!`;
    let resetButton = document.createElement('button');
    resetButton.textContent = 'Restart game';
    resetButton.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        buttons.forEach(button => button.disabled = false);
        scoresDisplay.textContent = getScores(playerScore, computerScore);
        document.querySelector('body').removeChild(resetButton);
    });
    document.querySelector('body').appendChild(resetButton);
}

function getScores(playerScore, computerScore) {
    return `Player Score: ${playerScore}\r\nComputer Score: ${computerScore}\r\n`;
}

function getRoundWinner(winner, winningChoice, losingChoice) {
    return `${winner} wins! ${winningChoice} beats ${losingChoice}`;
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
                playerScore++;
                scoresDisplay.textContent = getScores(playerScore, computerScore) + getRoundWinner('Player', playerChoice, computerChoice);
                
            } else if (playerChoice === computerChoice) {
                scoresDisplay.textContent = getScores(playerScore, computerScore) + `Its a draw! Both players chose ${playerChoice}`;
            } else {
                computerScore++;
                scoresDisplay.textContent = getScores(playerScore, computerScore) + getRoundWinner('Computer', computerChoice, playerChoice);
                
            }
        }
    }
}
