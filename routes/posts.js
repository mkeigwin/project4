const posts            = require('express').Router();
const { getPostsFromGroups }  = require('../models/posts');

posts.post('/:group_id', getPostsFromGroups, (req, res) => {
  res.json(res.posts || []);
});


module.exports = posts;
