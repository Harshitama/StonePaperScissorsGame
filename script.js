const choices = ['Rock', 'Paper', 'Scissors']; // Changed to 'Rock' for consistency
let playerScore = 0;
let computerScore = 0;

const playerChoiceElem = document.getElementById('player-choice');
const computerChoiceElem = document.getElementById('computer-choice');
const playerScoreElem = document.getElementById('player-score');
const computerScoreElem = document.getElementById('computer-score');
const resultElem = document.getElementById('result');
const resetButton = document.getElementById('reset-button');
const promptElem = document.getElementById('prompt');

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    let playerInput;
    if (event.key.toLowerCase() === 'r') { // Changed 's' to 'r' for Rock
        playerInput = 'Rock';
    } else if (event.key.toLowerCase() === 'p') {
        playerInput = 'Paper';
    } else if (event.key.toLowerCase() === 's') { // Changed 'c' to 's' for Scissors
        playerInput = 'Scissors';
    } else {
        return; // Ignore other keys
    }
    playRound(playerInput);
});

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(playerChoice) {
    // Clear previous result styling
    resultElem.classList.remove('win', 'lose', 'tie');

    const computerChoice = getComputerChoice();
    playerChoiceElem.textContent = `Your choice: ${playerChoice}`;
    computerChoiceElem.textContent = `Computer's choice: ${computerChoice}`;

    let resultText;
    if (playerChoice === computerChoice) {
        resultText = 'It\'s a tie!';
        resultElem.classList.add('tie');
    } else if (
        (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
        (playerChoice === 'Paper' && computerChoice === 'Rock') ||
        (playerChoice === 'Scissors' && computerChoice === 'Paper')
    ) {
        resultText = 'You win!';
        playerScore++;
        resultElem.classList.add('win');
    } else {
        resultText = 'You lose!';
        computerScore++;
        resultElem.classList.add('lose');
    }

    resultElem.textContent = resultText;
    updateScore();
}

function updateScore() {
    playerScoreElem.textContent = `Player: ${playerScore}`;
    computerScoreElem.textContent = `Computer: ${computerScore}`;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    playerChoiceElem.textContent = 'Your choice: -';
    computerChoiceElem.textContent = 'Computer\'s choice: -';
    resultElem.textContent = 'Waiting for your move...';
    resultElem.classList.remove('win', 'lose', 'tie'); // Clear styling on reset
    promptElem.textContent = "Press 'R' for Rock, 'P' for Paper, or 'S' for Scissors."; // Reset prompt
}

// Initialize on load
resetGame(); // Set initial state