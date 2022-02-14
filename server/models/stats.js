import mongoose from 'mongoose';


const statsSchema = new mongoose.Schema({
    player: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Player'
    },
    gamesPlayed: {
        type: Number,
        default: 0,
    },
    wins: {
        type: Number,
        default: 0,
    },
    totalPlacement: {
        type: Number,
        default: 0,
    },
    totalScore: {
        type: Number,
        default: 0
    },
    totalGuesses: {
        type: Number,
        default: 0
    }


})

const Stats = mongoose.model('Stats', statsSchema)

export default Stats;