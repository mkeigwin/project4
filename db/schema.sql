BEGIN;

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
  username varchar REFERENCES users(username),
  group_id integer REFERENCES groups(id)
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  group_id integer REFERENCES groups(id),
  username varchar REFERENCES users(username),
  media text NOT NULL,
  mediatype varchar NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(32) NOT NULL,
  post_id integer REFERENCES posts(id),
  group_id integer REFERENCES groups(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  username varchar REFERENCES users(username),
  group_id integer REFERENCES groups(id),
  post_id integer REFERENCES posts(id),
  textinput text NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COMMIT;
