const express = require('express');
const router = express.Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');

const commentsRoute = require('./comments')

router.use('/:postId/comments', commentsRoute)

router.get('/', async (req, res) => {
    try{
        const posts = await Post.find().populate('author_id');
        res.json(posts);
    } catch (err){
        res.status(400).send(err);
    }
});

router.get('/:postId', async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err){
        res.status(400).send(err);
    }
})

router.post('/', verify,  async (req, res) =>{
    const post = new Post({
        title: req.body.title,
        intro: req.body.intro,
        content: req.body.content,
        author_id: req.body.author_id
    });    

    try{
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err){
        res.status(400).send(err);
    }
});

router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch(err){
        res.status(400).send(err);
    }
})

router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch(err){
        res.status(400).send(err);
    }
})

module.exports = router

