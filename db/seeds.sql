BEGIN;

INSERT INTO groups (name) VALUES
('Freaks'),
('Gems');

INSERT INTO users (username, password) VALUES
('asd', 'asd'),
('123', '123');

INSERT INTO usergroups (user_id, group_id) VALUES
(1, 1),
(2, 1);

INSERT INTO posts (user_id, group_id, media, tags) VALUES
(1, 1, 'https://youtu.be/zISLtdZGsj4', 'Ernestus, Zabo'),
(2, 1, 'https://youtu.be/4SDq2f9mIvI', 'Ernestus, Ngunyuta');

INSERT INTO comments (user_id, post_id, textinput) VALUES
(1, 1, 'Love this track!'),
(1, 2, 'WOWOWWWWEEEEE!!!'),
(2, 2, 'ooooWeee!!');

COMMIT;
