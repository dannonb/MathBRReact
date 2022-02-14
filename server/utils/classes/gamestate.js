// Gametypes: 
//   0: classic
//   1: addition
//   2: subtraction
//   3: multiplication
//   4: exponents
//   5: random

// Difficulties
//    1: easy
//    2: medium
//    3: hard

class GameState {
    constructor(room, playerStates, rounds, difficulty = 1, type = 0, creator = null) {
        this.room = room
        this.players = playerStates;
        this.playerCount = this.players.length;
        this.rounds = rounds
        this.type = type
        this.difficulty = difficulty;
        this.status = 0
        this.currentRound = 1;
        this.creator = creator;
    }
    addPlayer(playerState) {
        this.players.push(playerState)
    }
    increaseRound() {
        if (this.currentRound < this.rounds) {
            this.currentRound++
            this.difficulty = 1
        }
    }
    calculateScores() {
        console.log('calculating scores')
    }
    eliminatePlayers() {
        
    }
    rankPlayers() {
        console.log('ranking players')
    }
    
}

export default GameState