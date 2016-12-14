const db = require('./db.js');

function newComment(req, res, next) {
  console.log('adding new comment to database:', req.body)
  db.none(`INSERT INTO comments (textinput, username, post_id, group_id) VALUES ($1, $2, $3, $4)`, [req.body.textinput, req.body.username, req.body.post_id, req.body.group_id])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function newTags(req, res, next) {
  db.none(`INSERT INTO tags (name, group_id, post_id) VALUES ($1, $2, $3)`, [req.body.tags, req.body.post_id, req.body.group_id])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function newPost(req, res, next) {
  console.log(req.body)
  db.none(`INSERT INTO posts (group_id, username, media, mediatype) VALUES ($1, $2, $3, $4)`, [req.body.group_id, req.body.username, req.body.newPost, req.body.mediaType])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function getTagsData(req, res, next) {
 db.any(`SELECT * FROM tags WHERE group_id = $1 AND tag = $2 ORDER BY id DESC;`, [req.params.GroupId, req.params.tags])
 .then((posts) => {
   res.postData = posts;
   next();
 })
 .catch(error => next(error));
}

function getPostsFromGroup(req, res, next) {
 db.any(`SELECT * FROM posts WHERE group_id = $1 ORDER BY id DESC;`, [req.params.GroupId])
 .then((posts) => {
   res.postData = posts;
   next();
 })
 .catch(error => next(error));
}

function getComments(req, res, next) {
 db.any(`SELECT * FROM comments WHERE group_id = $1;`, [req.params.GroupId])
 .then((data) => {
   res.commentsData = data;
   next();
 })
 .catch(error => next(error));
}

function deletePost(req, res, next) {
  console.log('the delete post params is:', req.params.PostId)
  db.none(`DELETE FROM posts WHERE id = $1;`, [req.params.PostId])
  .then(next())
  .catch(err => next(err));
}

function deleteComment(req, res, next) {
  console.log('the delete comment params is:', req.params.CommentId)
  db.none(`DELETE FROM comments WHERE id = $1;`, [req.params.CommentId])
  .then(next())
  .catch(err => next(err));
}


module.exports = {
  getPostsFromGroup,
  getComments,
  newPost,
  newTags,
  deletePost,
  deleteComment,
  newComment,
};
