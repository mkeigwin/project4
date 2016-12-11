const postData = require('express').Router();
const { getPostsFromGroup, getComments, newPost, newTags, deletePost }  = require('../models/posts');

postData.get('/:GroupId', getPostsFromGroup, (req, res) => {
  res.json(res.postData || []);
});

postData.get('/comments/:PostId', getComments, (req, res) => {
  res.json(res.commentsData || []);
});

postData.post('/newPost', newPost, newTags, (req, res) => {
  res.status(200).end();
});

postData.delete('/delete/:PostId', deletePost, (req, res) => {
  res.json({message: 'removed'})
});

module.exports = postData
