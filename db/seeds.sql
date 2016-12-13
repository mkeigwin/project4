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

INSERT INTO posts (group_id, username, media, mediatype) VALUES
(1, '123', 'zISLtdZGsj4', 'youtube'),
(1, '123', 'QZSY7LcUyxI', 'youtube'),
(1, '123', '_6kgC-3s7Xg', 'youtube'),
(3, '123', 'ggLTPyRXUKc', 'youtube'),
(2, '123', 'inUIkqeavmY', 'youtube'),
(2, 'asd', '4SDq2f9mIvI', 'youtube'),
(3, 'asd', 'aBhOdKEY9W8', 'youtube'),
(3, '123', '57apnAamrAY', 'youtube');

INSERT INTO tags (name) VALUES
('Ernestus'),
('Zabo');

INSERT INTO post_tags_xref (post_id, tag_id) VALUES
(1, 1),
(2, 1),
(2, 2);

INSERT INTO comments (username, post_id, textinput, group_id) VALUES
('asd', 1, 'Love this track!', 1),
('asd', 2, 'WOWOWWWWEEEEE!!!', 2),
('123', 2, 'ooooWeee!!', 3);

COMMIT;
