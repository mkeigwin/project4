const db = require('./db.js');

function getPostsFromGroups(req, res, next) {
  console.log('the queried group_id is:', req.params.group_id )
 db.any('SELECT * FROM posts WHERE group_id = $1;', [req.params.group_id])
 .then((posts) => {
   res.posts = posts;
   next();
 })
 .catch(error => next(error));
}



module.exports = {
  getPostsFromGroups,
};
