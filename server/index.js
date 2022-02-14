import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import playerRouter from './routers/player.js'
import statsRouter from './routers/stats.js'

//testing 
import GameState from './utils/classes/gamestate.js'
import PlayerState from './utils/classes/playerstate.js'

import gameloop from './utils/functions/gameloop.js'
import { createGame, updateGame, removeGame, getGame } from './utils/games.js'

dotenv.config()
const port = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.use(playerRouter)
app.use(statsRouter)

app.get('/', (req, res) => {
    res.send({ Hello: "World" })
})

io.of('/game').on('connection', (socket) => {
    console.log(socket.id)
})




// TESTING ++++++++ NEEDS REFACTORING
io.of('/custom-game').on('connection', (socket) => {
    socket.on('create', ({ username, room }) => {
        if (io.of('/custom-game').adapter.rooms.has(room)) {
            socket.send('error', { detail: 'Room already exists' })
            console.log('Room exists')
            return
        }
        socket.join(room)
        createGame(room, username, socket)
        socket.send('created new room')

    })

    socket.on('join', ({ username, room }) => {
        if (!io.of('/custom-game').adapter.rooms.has(room)) {
            socket.send('error', { detail: 'Room does not exist' })
            console.log('Room does not exist')
            return
        }

        socket.join(room)
        const game = updateGame(room, username, socket)
        console.log(game)

        io.to(room).emit('new join', { username })

    })

    socket.on('start', ({ room, rules }) => {
        const game = getGame(room)
        if (!game) return
        const playerStates = game.players.map((player) => {
            return new PlayerState(player.username, room, socket)
        })
        const gameState = new GameState(room, playerStates, rules.rounds, rules.difficulty, rules.time, socket.id)
        gameloop(gameState, io)

    })
})












io.on('connection', (socket) => {
    console.log(`${socket.id} connected to server`)
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        server.listen(port, () => {
            console.log(`app is listening at http://localhost:${port}`)
        })
    }).catch((e) => {
        console.log(e)
    })