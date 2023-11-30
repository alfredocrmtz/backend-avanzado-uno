const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../model/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("Pleas enter data set")
    }
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("Email is useed in DB")
    }
    const salt = await bcrypt.genSalt(10)

    const hashPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashPassword })

    if (user) {
        res.status(201).json({ _id: user._id, name: user.name, email: user.email, admin: user.isAdmin })
    } else {
        res.status(400)
        throw new Error("Can create User")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error("Pleas enter user and password")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password)

    const user = await User.findOne({ email, password: hashPassword })

    if (!user) {
        res.status(400)
        throw new Error("User or password is wrong")
    }

    res.status(201).json(user)
})

const ownerData = asyncHandler(async (req, res) => {

})

module.exports = {
    registerUser,
    loginUser,
    ownerData
}