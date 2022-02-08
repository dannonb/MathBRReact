class GameState {
    constructor(players, roundNumber, difficulty, increaseDifficultyAfterRound, creator = null) {
        this.players = players;
        this.playerCount = players.length;
        this.rounds = roundNumber;
        this.difficulty = difficulty;
        this.status = true;
        this.currentRound = 1;
        this.increaseDifficultyAfterRound = increaseDifficultyAfterRound;
        this.creator = creator;
    }
    increaseRound() {
        if (this.currentRound < this.rounds) {
            this.currentRound++
        }
    }
    increaseDifficulty() {
        if (!this.increaseDifficulty) {
            return 
        } else if (this.difficulty < 3) {
            this.difficulty++
        }
    }
    calculateScores() {
        console.log('calculating scores')
    }
    eliminatePlayers() {
        console.log('eliminating players')
    }
    rankPlayers() {
        console.log('ranking players')
    }
    startGame() {
        console.log('game starting')
    }
    endGame() {
        console.log('game ending')
    }
    
}

export default GameState