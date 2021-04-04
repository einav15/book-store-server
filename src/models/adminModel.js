const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value, {minSymbols: 0, minLowercase: 0}))
                throw new Error('Invalid Password')
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})
//hide pass and tokens
adminSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//token
adminSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisisthesecretkey', { expiresIn: '7d'})
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

//login
adminSchema.statics.findByCredentials = async (username, pass) => {
    const user = await Admin.findOne({ username })
    if (!user)
        throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(pass, user.password)

    if (!isMatch)
        throw new Error('Unable to login')

    return user
}
//hash password
adminSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 8)

    next()
})


const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin

