'use strict'
require('dotenv').config({ silent: true });
const express       = require('express');
const jwt           = require('jsonwebtoken');
const expressJWT    = require('express-jwt');
const bcrypt        = require('bcryptjs');
const logger        = require('morgan');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const app           = express();
const PORT          = process.argv[2] || process.env.PORT || 3000;

const usergroups    = require('./routes/usergroups');
const posts         = require('./routes/posts');
const userRouter   = require('./routes/user');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(expressJWT({secret: process.env.SECRET}).unless({path: ['/favicon.ico', '/user/login', '/user/signup']}))

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/posts', posts);
app.use('/usergroups', usergroups);
app.use('/user', userRouter);

app.listen(PORT, () => console.log('listening on', PORT));
