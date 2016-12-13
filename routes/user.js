const userRouter = require('express').Router()
const { createUser, authenticate } = require('../models/user.js')

userRouter.route('/signup')
  .post(createUser, (req, res, next) => res.json({message: 'user succesfully signed up'}));

userRouter.route('/login')
  .post(authenticate, (req, res, next) => res.json({message: 'user succesfully logged in'}));

module.exports = userRouter;
