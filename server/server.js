import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()
const port = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({ Hello: "World" })
})

mongoose.connect(process.env.DB_URL)
.then(() => {
    server.listen(port, () => {
        console.log(`app is listening at http://localhost:${port}`)
    })
}).catch((e) => {
    console.log(e)
})