// add middlewares here related to projects
const Projects = require('./projects-model')

const validateId = async (req, res, next) => {
    const { id } = req.params
    const validate = await Projects.get(id)
    if(validate === [] || !validate) {
        res.status(404).json({message: `the id "${id}" is not valid`})
    } else {
        req.projects = validate
        next()
    }
}

const validatePost = (req, res, next) => {
    const { name, description} = req.body
    if(!name || !description) {
        res.status(400).json({message: `name and description is required`})
    } else {
        req.changes = req.body
        next()
    }
}

const validateChanges = (req, res, next) => {
    const { name, description, completed } = req.body
    if(!name || !description || !completed) {
        res.status(400).json({message: `name, description, and completed is required`})
    } else {
        req.changes = req.body
        next()
    }
}

module.exports = { validateId, validatePost, validateChanges }
