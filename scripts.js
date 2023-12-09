const POSSIBLE_CHOICES = [ "Rock", "Paper", "Scissors" ];

function getComputerChoice() {
    
    randomNumber = Math.floor(Math.random() * POSSIBLE_CHOICES.length);
    return POSSIBLE_CHOICES[randomNumber];
}

function isPlayerChoiceValid(playerChoice) {
    return POSSIBLE_CHOICES.filter(choice => choice.toLowerCase() == playerChoice).length != 0;
}

function playRound(playerChoice, computerChoice) {
    const outcomes = {
        "rock": "scissors",
        "paper": "rock",
        "scissors": "paper" 
    }

    for (let winner in outcomes) {
        if (playerChoice == winner) {
            if (computerChoice == outcomes[winner]) {
                console.log(`Player wins! ${playerChoice} beats ${computerChoice}`)
                return "Player";
            } else {
                console.log(`Computer wins! ${computerChoice} beats ${playerChoice}`)
                return "Computer";
            }
        }
    }
}

function playGame() {
    playerScore = 0;
    computerScore = 0;
    while(playerScore < 3 && computerScore < 3) {
        playerChoice = prompt(`Score: ${playerScore}-${computerScore} Please choose Rock, Paper, or Scissors: `).toLowerCase();
        while (!isPlayerChoiceValid(playerChoice)) {
            playerChoice = prompt("Invalid choice. Please choose Rock, Paper, or Scissors: ").toLowerCase();
        }
        computerChoice = getComputerChoice().toLowerCase();
        
        while(playerChoice == computerChoice || !isPlayerChoiceValid(playerChoice)) {
            computerChoice = getComputerChoice().toLowerCase();
            if (!isPlayerChoiceValid(playerChoice)) {
                playerChoice = prompt("Invalid choice. Please choose Rock, Paper, or Scissors: ").toLowerCase();
            } else {
                playerChoice = prompt("It's a Draw! Please choose again: ");
            }
        }

        if (playRound(playerChoice, computerChoice) == "Player") {
            playerScore++;
        } else {
            computerScore++;
        }
    }

    console.log(`${playerScore === 3 ? "Player" : "Computer"} wins ${playerScore}-${computerScore}!`);
}

playGame();