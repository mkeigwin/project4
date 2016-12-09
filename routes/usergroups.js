const usergroups = require('express').Router();
const { getUserGroups } = require('../models/usergroups')


usergroups.get('/:username', getUserGroups, (req, res) => {
  res.json(res.usergroups || []);
})

module.exports = usergroups
