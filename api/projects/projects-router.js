// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const { validateId, validatePost } = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res) => {
    const reqProjects = await Projects.get()
    res.status(200).json(reqProjects)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.projects)
})

router.post('/', validatePost, (req, res) => {
    res.status(200).json(req.newProject)
})





module.exports = router
