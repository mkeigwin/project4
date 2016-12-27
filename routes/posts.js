const postData = require('express').Router();
const {
  getPostsFromGroup,
  getSearchedTag,
  getComments,
  deletePost,
  getTagData,
  deleteComment,
  newComment,
  postTagsandMedia }  = require('../models/posts');


postData.get('/comments/:GroupId', getComments, (req, res) => {
  res.json(res.commentsData || []);
});

postData.get('/tagsearch/:tag', getSearchedTag, (req, res) => {
  res.json(res.TagData || []);
});

postData.get('/gettags', getTagData, (req, res) => {
  res.json(res.tagData || []);
})

postData.post('/newPost', postTagsandMedia, (req, res) => {
  res.status(200).end();
});

postData.delete('/delete/:PostId', deletePost, (req, res) => {
  res.json({message: ' post removed'})
});

postData.delete('/comment/:CommentId', deleteComment, (req, res) => {
  res.json({message: 'comment removed'})
});

postData.post('/newComment', newComment, (req, res) => {
  res.status(200).end();
})

postData.get('/:GroupId', getPostsFromGroup, (req, res) => {
  res.json(res.postData || []);
});

module.exports = postData
