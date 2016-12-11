const db = require('./db.js');

function getUserGroups(req, res, next) {
  console.log('the queried username is:', req.params.username )
 db.any('SELECT name, group_id FROM groups LEFT JOIN usergroups ON (groups.id = usergroups.group_id) WHERE username = $1;', [req.params.username])
 .then((usergroups) => {
   res.usergroups = usergroups;
   next();
 })
 .catch(error => next(error));
}

module.exports = {
  getUserGroups
};
