const asyncHandler = require('express-async-handler')
const Tarea = require('../model/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find()
    res.status(200).json(tareas)
})

const setTareas = asyncHandler(async (req, res) => {
    if (!req.body.texto) {
        res.status(400)
        throw new Error("Por favor teclea una descripcion")
    }
    const tarea = await Tarea.create({
        texto: req.body.texto
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update task with id ${req.params.id}` })
})

const deleteTareas = asyncHandler(async (req, res) => {
    res.status(204).json({ message: `Deleted task with id ${req.params.id}` })
})

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}