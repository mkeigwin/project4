const db = require('./db.js');

function createGroup(req, res, next){
  console.log('adding new group to database:', req.body.groupname)
  db.none(`INSERT INTO groups (name) VALUES ($1)`, [req.body.groupname])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function joinGroup(req, res, next){
  console.log('JOINING GROUP', req.body.groupname)
  db.none(`INSERT INTO usergroups (username, groupname) VALUES ($1, $2)`, [req.body.username, req.body.groupname])
    .then(next())
    .catch((err) => {
      console.log(err);
      next(err);
  });
}

function getUserGroups(req, res, next) {
  console.log('the queried username is:', req.params.username )
 db.any('SELECT groups.name, groups.id FROM groups LEFT JOIN usergroups ON (groups.name = usergroups.groupname) WHERE username = $1;', [req.params.username])
 .then((usergroups) => {
   res.usergroups = usergroups;
   next();
 })
 .catch(error => next(error));
}

function searchGroup(req, res, next) {
  console.log('the queried group is:', req.params.groupname )
 db.any('SELECT name, id FROM groups WHERE name = $1;', [req.params.groupname])
 .then((searchgroup) => {
   res.searchgroup = searchgroup;
   next();
 })
 .catch(error => next(error));

}

module.exports = {
  getUserGroups,
  joinGroup,
  createGroup,
  searchGroup
};
