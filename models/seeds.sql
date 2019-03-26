USE podHub;

INSERT INTO users(googleId, name, email, profileImage, createdAt, updatedAt) 
VALUES
("g123", "Pogos", "pogos@gmail.com"," ", now(), now()),
("g456", "Petros", "petros@gmail.com"," ", now(), now());

INSERT INTO posts(title, link, details, message, createdAt, updatedAt, postedBy) 
VALUES
("test1", "https://www.test1.link", "ttt test1", "test 1 post", now(), now(), 1),
("test2", "https://www.test2.link", "www test2", "test 2 post", now(), now(), 1),
("test3", "https://www.test3.link", "fff test3", "test 3 post", now(), now(), 2),
("test4", "https://www.test4.link", "ggg test4", "test 4 post", now(), now(), 2);

INSERT INTO comments(comment, createdAt, updatedAt, postId, commentedBy) 
VALUES
("comm1", now(), now(), 1, 1),
("comm1", now(), now(), 1, 2),
("comm1", now(), now(), 2, 1),
("comm1", now(), now(), 3, 2);

INSERT INTO favorites(title,link,imageIcon,details,createdAt,updatedAt,userID)
VALUES
("test1","https://www.test1.link"," ","tech talk1",now(), now(),1),
("test2","https://www.test2.link"," ","tech talk2",now(), now(),1),
("test3","https://www.test3.link"," ","tech talk3",now(), now(),2);

INSERT INTO follow(isFollowing,followedBy,createdAt,updatedAt)
VALUES
(1,2,now(), now()),
(2,1,now(), now());




/*
INSERT INTO posts(title, link, details, message, createdAt, updatedAt) 
VALUES
("test1", "https://www.test1.link", "ttt test1", "test 1 post", now(), now()),
("test2", "https://www.test2.link", "www test2", "test 2 post", now(), now()),
("test3", "https://www.test3.link", "fff test3", "test 3 post", now(), now()),
("test4", "https://www.test4.link", "ggg test4", "test 4 post", now(), now()),
*/