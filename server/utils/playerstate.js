class PlayerState {
    constructor(username, team) {
        this.score = 0
        this.username = username
        this.team = team
        this.inGame = true
        this.alive = true
    }
    increaseScore(amount) {
        this.score += amount
    }
    eliminatePlayer() {
        this.alive = false
    }
    setPlace
    leaveGame() {
        this.inGame = false
    }
}

export default PlayerState