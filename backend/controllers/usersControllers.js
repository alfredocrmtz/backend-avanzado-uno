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

    const user = await User.findOne({ email })

    //verificamos al usuario y a la contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: getToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const ownerData = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30m' })
}

module.exports = {
    registerUser,
    loginUser,
    ownerData
}