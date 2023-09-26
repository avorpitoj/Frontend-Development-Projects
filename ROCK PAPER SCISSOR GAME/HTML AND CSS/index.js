document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    const resultEl = document.getElementById("result");
    const playerScoreEl = document.getElementById("user-score");
    const computerScoreEl = document.getElementById("computer-score");
    const leaderboardList = document.getElementById("leaderboard-list");

    let playerScore = 0;
    let computerScore = 0;
    let gameStartTime = null;
    

    buttons.forEach((button) => 
    {
        button.addEventListener("click", () => 
        {
            if (gameStartTime === null) 
            {
                gameStartTime = new Date();
            }
            const result = playRound(button.id, computerPlay());
            resultEl.textContent = result;

            // Checking if the game is over (example: first player or computer reaches a certain score)
            if (playerScore >= 10 || computerScore >= 10) 
            {
                const gameEndTime = new Date();
                const gameDuration = (gameEndTime - gameStartTime) / 1000; // Duration in seconds

                // Update the leaderboard
                if (playerScore > computerScore) 
                    addLeaderboardEntry(gameDuration, "User Wins By", playerScore-computerScore, );
                else if (computerScore > playerScore) 
                    addLeaderboardEntry(gameDuration,"Computer Wins By", computerScore-playerScore,);
                else 
                    addLeaderboardEntry(gameDuration, "It's a Tie!", playerScore,);
                
               // Reset scores
                playerScore = 0;
                computerScore = 0;
                playerScoreEl.textContent = "0";
                computerScoreEl.textContent = "0";
                gameStartTime = null;
            }
        });
    });

    function computerPlay() 
    {
        const choices = ["rock", "paper", "scissors"];
        const randomChoice = Math.floor(Math.random() * choices.length);
        return choices[randomChoice];
    }
    
    // Function to add the main logic to the game
    function playRound(playerSelection, computerSelection) 
    {
        if (playerSelection === computerSelection) 
        {
            return "It's a tie!";
        } 
        else if 
            (
            (playerSelection === "rock" && computerSelection === "scissors") ||
            (playerSelection === "paper" && computerSelection === "rock") ||
            (playerSelection === "scissors" && computerSelection === "paper")
            ) 
        {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            return "You win! " + playerSelection + " beats " + computerSelection;
        } 
        else 
        {
            computerScore++;
            computerScoreEl.textContent = computerScore;
            return "You lose! " + computerSelection + " beats " + playerSelection;
        }
    }

    // Function to add a new entry to the leaderboard
    function addLeaderboardEntry(player, score, duration) 
    {   const newRow = document.createElement("tr");
        const playerNameCell = document.createElement("td");
        const playerScoreCell = document.createElement("td");
        const gameDurationCell = document.createElement("td");

        playerNameCell.textContent = "🏆" + player;
        playerScoreCell.textContent = score;
        gameDurationCell.textContent = duration;

        newRow.appendChild(playerNameCell);
        newRow.appendChild(playerScoreCell);
        newRow.appendChild(gameDurationCell);

        leaderboardList.appendChild(newRow);
    }
});
