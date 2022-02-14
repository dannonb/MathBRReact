import { generateQuestion } from "./gamefunctions.js"

const gameloop = (gamestate, io) => {
    console.log('setting events')
    // setting client events for all connected players
    gamestate.players.forEach((player) => {
        player.socket.on('submit', ({ answer }, callback) => {
            player.increaseGuesses()
            if (player.checkAnswer(answer)) {
                player.increaseScore(1)
                callback({
                    isCorrect: true
                })
            }
            callback({
                isCorrect: false
            })
            const newQuestion = generateQuestion(gamestate.currentRound, gamestate.type, gamestate.difficulty)
            player.setCurrentAnswer(newQuestion.answer)
            io.to(player.socket.id).emit('question', { expression: newQuestion.expression})
        })
        
        player.socket.on('skip', () => {
            const newQuestion = generateQuestion(gamestate.currentRound, gamestate.type, gamestate.difficulty)
            player.setCurrentAnswer(newQuestion.answer)
            player.resetStreak()
            io.to(player.socket.id).emit('question', { expression: newQuestion.expression})
        })
    })
    console.log('starting game')
    let currentTime = gamestate.rounds * 60
    const timer = setInterval(() => {
        console.log(currentTime)
        io.in(gamestate.room).emit('state', { timeRemaining: currentTime, playerCount: gamestate.players.length })
        currentTime--
        if (currentTime <= 0) {
            clearInterval(timer)
        }
    }, 1000)
}

export default gameloop

