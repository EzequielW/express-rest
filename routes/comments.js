const express = require('express')
const router = express.Router({ mergeParams: true })
const Comment = require('../model/Comment')

router.post('/', async (req, res) => {
    const comment = new Comment({
        post: req.params.postId,
        parent: req.body.parent,
        author: req.body.author,
        content: req.body.content
    })

    try {
        const savedComment = await comment.save()
        res.json(savedComment)
    } catch(err) {
        res.status(400).send(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId })
        res.json(comments)
    } catch(err){
        res.status(400).send(err)
    }
})

module.exports = router