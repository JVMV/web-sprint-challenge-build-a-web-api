// add middlewares here related to actions
const Actions = require('./actions-model')

const validateId = async (req, res, next) => {
    const { id } = req.params
    const validate = await Actions.get(id)
    if(validate === [] || !validate) {
        res.status(404).json({message: `the id "${id}" is not valid`})
    } else {
        req.actions = validate
        next()
    }
}

const validatePost = (req, res, next) => {
    const { project_id, description, notes } = req.body
    if(!project_id || !description || !notes) {
        console.log(req.body)
        res.status(400).json({message: 'projectID, description, and notes are required'})
    } else {
        req.postedAction = req.body
        next()
    }
}

module.exports = { validateId, validatePost }
