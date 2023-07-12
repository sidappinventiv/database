# database
1 query
-- SELECT comments.contents, users.username
-- FROM comments
-- JOIN users ON comments.user_id = users.id
-- WHERE comments.photo_id = 3;


-- -- **4th query
-- Find the photo with ID = 10 and get the number of comments attached to it//4
-- SELECT COUNT(*) AS commentc FROM comments WHERE photo_id=10;

-- ***5th query not done
-- SELECT COMMENTS.user_id, COUNT(COMMENTS.photo_id + COMMENTS.id) AS activity
-- FROM COMMENTS
-- GROUP BY COMMENTS.user_id
-- ORDER BY activity DESC
-- LIMIT 1;



-- //2 query
-- SELECT AVG(total_comments) AS average_count FROM(SELECT COUNT(*) as total_comments 
-- FROM COMMENTS GROUP BY photo_id) AS average;

-- //6 query
-- SELECT AVG(LENGTH(contents)) FROM comments;

-- //3rd third query
SELECT photo_id,COUNT(*) as total_count
FROM photos JOIN comments on comments.photo_id=photos.id GROUP BY photo_id
order BY total_count desc LIMIT 1;





