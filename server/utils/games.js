import { v4 as uuid4 } from 'uuid'
const games = []

export const createGame = (room, username, socket) => {
    
    const index = games.findIndex((game) => {
        return game.room === room
    })
    if (index !== -1) {
        return 
    }
    const game = { room, players: [] }
    game.players.push({ username, socket })
    games.push(game)
}

export const updateGame = (room, username, socket) => {
    const index = games.findIndex((game) => {
        return game.room === room
    })
    if (index !== -1) {
        games[index].players.push({ username, socket })
    }
    return games[index]
}

export const removeGame = (room) => {
    const index = games.findIndex((game) => game.room === room)
    if (index !== -1) {
        return games.splice(index, 1)[0]
    }
}

export const getGame = (room) => {
    return games.find((game) => game.room === room)
}