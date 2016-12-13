const usergroups = require('express').Router();
const { getUserGroups, searchGroup, joinGroup, createGroup } = require('../models/usergroups')

usergroups.get('/:username', getUserGroups, (req, res) => {
  res.json(res.usergroups || []);
})

usergroups.post('/joinGroup', joinGroup, (req, res) => {
  res.status(200).end();
})

usergroups.post('/newGroup', createGroup, (req, res) => {
  res.status(200).end();
})

usergroups.get('/groups/:groupname', searchGroup, (req, res) => {
  res.json(res.searchgroup || []);
})

module.exports = usergroups
