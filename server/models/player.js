import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import Filter from 'bad-words'

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
    stats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stats'
    },
    tokens: [{
        type: String,
        required: true
    }]
},{
    timestamps: true
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
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

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Player = mongoose.model('Player', playerSchema)

export default Player