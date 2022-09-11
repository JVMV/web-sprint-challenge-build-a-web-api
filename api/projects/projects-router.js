// Write your "projects" router here!
const express = require('express')

const Projects = require('./projects-model')

const { validateId, validatePost, validateChanges } = require('./projects-middleware')

const router = express.Router()

router.get('/', async (req, res) => {
    const reqProjects = await Projects.get()
    res.status(200).json(reqProjects)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.projects)
})

router.post('/', validatePost, async (req, res) => {
    const newProject = await Projects.insert(req.body)
    req.newProject = newProject
    res.status(200).json(req.newProject)
})

router.put('/:id', validateId, validateChanges, async (req, res) => {
    const updatedProject = await Projects.update(req.params.id, req.changes)
    res.status(201).json(updatedProject)
})

router.delete('/:id', validateId, async (req, res) => {
    const deletedProject = await Projects.remove(req.params.id)
    res.status(200).json(deletedProject)
})

router.get('/:id/actions', validateId, async (req, res) => {
    const reqActions = await Projects.getProjectActions(req.params.id)
    res.status(200).json(reqActions)
})




module.exports = router
