const db = require('./db.js');

function newTags(req, res, next) {
  db.none(`INSERT INTO tags (name) VALUES ($1)`, [req.body.tags])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function newPost(req, res, next) {
  console.log('THE NEW POST BODY IS:', req.body)
  db.none(`INSERT INTO posts (group_id, username, media) VALUES ($1, $2, $3)`, [req.body.group_id, req.body.username, req.body.newPost])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
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
 db.any(`SELECT * FROM comments WHERE post_id = $1;`, [req.params.PostId])
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

module.exports = {
  getPostsFromGroup,
  getComments,
  newPost,
  newTags,
  deletePost
};
