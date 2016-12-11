BEGIN;

DROP TABLE IF EXISTS post_tags_xref CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS usergroups CASCADE;
DROP TABLE IF EXISTS groups CASCADE;
DROP TABLE IF EXISTS users CASCADE;


CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name varchar NOT NULL
);

CREATE TABLE users (
  username varchar PRIMARY KEY,
  password varchar NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE usergroups (
  id SERIAL PRIMARY KEY,
  username varchar REFERENCES users(username),
  group_id integer REFERENCES groups(id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  group_id integer REFERENCES groups(id),
  username varchar REFERENCES users(username),
  media text NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tags VARCHAR(32) NOT NULL
);

CREATE TABLE post_tags_xref (
  post_id integer NOT NULL REFERENCES posts(id),
  tag_id integer NOT NULL REFERENCES tags(id),
  PRIMARY KEY(post_id, tag_id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username varchar REFERENCES users(username),
  post_id integer REFERENCES posts(id),
  textinput text NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COMMIT;
