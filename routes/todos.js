const express = require("express")

const router= express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'GET all tasks'})
})
router.get('/:id', (req, res) => {
    res.json({msg: 'GET a task'})
})
router.post('/', (req, res) => {
    res.json({msg: 'POST a new task'})
})
router.delete('/:id', (req, res) => {
    res.json({msg: 'DELETE a task'})
})
router.patch('/:id', (req, res) => {
    res.json({msg: 'UPDATE a task'})
})

module.exports = router