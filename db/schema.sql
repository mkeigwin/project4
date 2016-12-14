BEGIN;

DROP TABLE IF EXISTS post_tag_xref CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS usergroups CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL UNIQUE
);

CREATE TABLE users (
  username varchar PRIMARY KEY UNIQUE,
  password varchar NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE usergroups (
  id SERIAL PRIMARY KEY,
  username varchar REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  group_id integer REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  group_id integer REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
  username varchar REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  media text NOT NULL,
  mediatype varchar NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);


CREATE TABLE tags (
  id SERIAL,
  name VARCHAR(32) NOT NULL,
  post_id integer REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  group_id integer REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY(name, post_id, group_id)
);

CREATE TABLE post_tag_xref (
  post_id integer REFERENCES posts(id),
  tag_id integer REFERENCES tags(id),
  PRIMARY KEY(post_id, tag_id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username varchar REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
  group_id integer REFERENCES groups(id) ON DELETE CASCADE ON UPDATE CASCADE,
  post_id integer REFERENCES posts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  textinput text NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COMMIT;
