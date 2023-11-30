const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Place entre your name"]
    },
    email: {
        type: String,
        required: [true, "Place entre email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Place entre password"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)