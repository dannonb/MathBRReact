import mongoose from 'mongoose'
import validator from 'validator'

const playerSchema = new mongoose.Schema({
    
})

const Player = mongoose.model('Player', playerSchema)

export default Player