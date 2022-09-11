// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')

const { validateId, validatePost } = require('./actions-middlware')

const router = express.Router()

router.get('/', async (req, res) => {
const actions = await Actions.get()
res.status(200).json(actions)
})

router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.actions)
})

router.post('/', validateId, validatePost, async (req, res) => {
    const newAction = await Actions.insert(req.postedAction)
    res.status(201).json(newAction)
})

router.put('/:id', validateId, validatePost, async (req, res) => {
    const updatedAction = await Actions.update(req.params.id, req.postedAction)
    res.status(201).json(updatedAction)
})

router.delete('/:id', validateId, async (req, res) => {
    const deletedAction = await Actions.remove(req.params.id)
    res.status(200).json(deletedAction)
})

module.exports = router