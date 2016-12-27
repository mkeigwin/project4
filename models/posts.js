const db = require('./db.js');

//------- JOEY PINHAS and Bobby King helped with this next function::

function postTagsandMedia(req, res, next) {
  console.log('%%%%', req.body)

  const media = req.body.newPost;
  const name = req.body.tags;
  const group_id = req.body.group_id;
  const username = req.body.username;
  const mediaType = req.body.mediaType;

  const queryOne = `
    INSERT INTO posts
      (group_id, username, media, mediaType)
    VALUES
      ($1, $2, $3, $4)
    RETURNING id;
  `;

  const splittags = name.split(/[ ,]+/).filter(Boolean);

  let queryTwo = `
    INSERT INTO tags
      (group_id, post_id, name)
    VALUES`

  for(let i = 0; i < splittags.length; i++) {
    if(i < splittags.length - 1) {
      queryTwo += `($1, $2, $${i+3}),`;
    } else {
      queryTwo += `($1, $2, $${i+3})`;
    }
  }

  const values = [
    group_id,
    username,
    media,
    mediaType
  ];

  db.one(queryOne, values)
  .then((inserted) => {

    let values2 = [group_id, parseInt(inserted.id)];
    for(let i = 0; i < splittags.length; i++) {
      values2.push(splittags[i]);
    }

    db.none(queryTwo, values2)
    .then(() => next())
    .catch(err => next(err));

  })
  .catch(err => next(err));
}

// ---------------------------------

function newComment(req, res, next) {
  console.log('adding new comment to database:', req.body)
  db.none(`INSERT INTO comments (textinput, username, post_id, group_id) VALUES ($1, $2, $3, $4)`, [req.body.textinput, req.body.username, req.body.post_id, req.body.group_id])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function getTagData(req, res, next) {
  console.log('getting tag data on backend')
  db.any(`SELECT name FROM tags;`)
   .then((posts) => {
     res.tagData = posts;
     next();
   })
   .catch(error => next(error));
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

function getSearchedTag(req, res, next) {
 db.any(`SELECT * FROM posts LEFT JOIN tags ON (posts.id = tags.post_id) WHERE tags.name = $1;`, [req.params.tag])
 .then((data) => {
   res.TagData = data;
   next();
 })
 .catch(error => next(error));
}


module.exports = {
  getPostsFromGroup,
  getSearchedTag,
  getComments,
  deletePost,
  getTagData,
  deleteComment,
  newComment,
  postTagsandMedia
};
