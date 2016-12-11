BEGIN;

INSERT INTO groups (name) VALUES
('Freaks'),
('Gems'),
('Jewels');

INSERT INTO users (username, password) VALUES
('asd', 'asd'),
('123', '123');

INSERT INTO usergroups (username, group_id) VALUES
('asd', 1),
('asd', 2),
('123', 1),
('123', 3);

INSERT INTO posts (group_id, username, media) VALUES
(1, '123', 'zISLtdZGsj4'),
(1, '123', 'QZSY7LcUyxI'),
(1, '123', '_6kgC-3s7Xg'),
(3, '123', 'ggLTPyRXUKc'),
(2, '123', 'inUIkqeavmY'),
(2, 'asd', '4SDq2f9mIvI'),
(3, 'asd', 'aBhOdKEY9W8'),
(3, '123', '57apnAamrAY');

INSERT INTO tags (name) VALUES
('Ernestus'),
('Zabo');

INSERT INTO post_tags_xref (post_id, tag_id) VALUES
(1, 1),
(2, 1),
(2, 2);

INSERT INTO comments (username, post_id, textinput) VALUES
('asd', 1, 'Love this track!'),
('asd', 2, 'WOWOWWWWEEEEE!!!'),
('123', 2, 'ooooWeee!!');

COMMIT;
