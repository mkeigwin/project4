'use strict'
require('dotenv').config({ silent: true });
const express       = require('express');
const logger        = require('morgan');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const app           = express();
const PORT          = process.argv[2] || process.env.PORT || 3000;

const usergroups    = require('./routes/usergroups');
const posts         = require('./routes/posts');
const usersRouter   = require('./routes/api/users');
const authRouter    = require('./routes/api/auth');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'dist')));

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/posts', posts);
app.use('/usergroups', usergroups);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log('listening on', PORT));
