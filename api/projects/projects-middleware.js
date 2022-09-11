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

const validatePost = async (req, res, next) => {
    const { name, description } = req.body
    if(!name || !description) {
        res.status(400).json({message: `name and description is required`})
    } else {
        const newProject = await Projects.insert(req.body)
        req.newProject = newProject
        next()
    }
}

module.exports = { validateId, validatePost }
