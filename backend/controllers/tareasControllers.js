const getTareas = (req, res) => {
    res.status(200).json({ message: "Get task" })
}

const setTareas = (req, res) => {
    res.status(201).json({ message: "Task created" })
}

const updateTareas = (req, res) => {
    res.status(200).json({ message: `Update task with id ${req.params.id}` })
}

const deleteTareas = (req, res) => {
    res.status(204).json({ message: `Deleted task with id ${req.params.id}` })
}

module.exports = {
    getTareas,
    setTareas,
    updateTareas,
    deleteTareas
}