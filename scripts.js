let coinCount = 0;

// Load leaderboard from local storage
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Update the coin count display
function updateCoinCount() {
    document.getElementById('coin-count').innerText = `Coins: ${coinCount}`;
}

// Update the leaderboard display
function updateLeaderboard() {
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = ''; // Clear previous leaderboard
    leaderboard.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.innerText = `${entry.name}: ${entry.coins} coins`;
        leaderboardDiv.appendChild(entryDiv);
    });
}

// Handle click button
document.getElementById('click-button').addEventListener('click', () => {
    coinCount += 5; // Earn 5 coins per click
    updateCoinCount();

    // Update the leaderboard
    const name = prompt('Enter your name:');
    if (name) {
        const existingEntry = leaderboard.find(entry => entry.name === name);
        if (existingEntry) {
            existingEntry.coins += 5; // Update existing entry
        } else {
            leaderboard.push({ name: name, coins: 5 }); // Add new entry
        }
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // Save to local storage
        updateLeaderboard();
    }
});

// Initial call to display
updateCoinCount();
updateLeaderboard();
