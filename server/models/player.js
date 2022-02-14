import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import Filter from 'bad-words'
import jwt from 'jsonwebtoken'
import Stats from './stats.js'

const filter = new Filter()

const playerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (filter.isProfane(value)) {
                throw new Error('username contains bad words')
            } 
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 9,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
       token: {
        type: String,
        required: true
       }
    }]
},{
    timestamps: true
})

playerSchema.virtual('stats', {
    ref: 'Stats',
    localField: '_id',
    foreignField: 'player'
})

playerSchema.methods.generateAuthToken = async function () {
    const player = this
    const token = jwt.sign({ _id: player._id.toString() }, 'thisismynewcourse')
    console.log(token)

    player.tokens = player.tokens.concat({ token })
    await player.save()

    return token
}

playerSchema.statics.findByCredentials = async (username, password) => {
    const user = await Player.findOne({ username })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

playerSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

playerSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

playerSchema.pre('remove', async function(next) {
    const player = this
    await Stats.deleteMany({ player: player._id })
    next()
})

const Player = mongoose.model('Player', playerSchema)

export default Player