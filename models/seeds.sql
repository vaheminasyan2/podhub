USE podHub;

INSERT INTO users(googleId, name, email, profileImage, createdAt, updatedAt) 
VALUES
("g123", "Pogos", "pogos@gmail.com", now(), now()),
("g456", "Petros", "petros@gmail.com", now(), now());

INSERT INTO posts(title, link, details, message, createdAt, updatedAt, postedBy) 
VALUES
("test1", "https://www.test1.link", "ttt test1", "test 1 post", now(), now(), 1),
("test2", "https://www.test2.link", "www test2", "test 2 post", now(), now(), 1),
("test3", "https://www.test3.link", "fff test3", "test 3 post", now(), now(), 2),
("test4", "https://www.test4.link", "ggg test4", "test 4 post", now(), now(), 2);

INSERT INTO comments(comment, createdAt, updatedAt, postId, commentedBy) 
VALUES
("comm1", now(), now(), 5, 1),
("comm1", now(), now(), 5, 2),
("comm1", now(), now(), 6, 1),
("comm1", now(), now(), 7, 2);


/*
INSERT INTO posts(title, link, details, message, createdAt, updatedAt) 
VALUES
("test1", "https://www.test1.link", "ttt test1", "test 1 post", now(), now()),
("test2", "https://www.test2.link", "www test2", "test 2 post", now(), now()),
("test3", "https://www.test3.link", "fff test3", "test 3 post", now(), now()),
("test4", "https://www.test4.link", "ggg test4", "test 4 post", now(), now()),
*/