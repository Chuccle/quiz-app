CREATE TABLE `accounts` (
`id` int PRIMARY KEY AUTO_INCREMENT,
`username` varchar(255),
`password` varchar(255)
);

CREATE TABLE `Quizzes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `quizname` text,
  `created_by_userid` int
);

CREATE TABLE `Questions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `QuizID` int,
  `Question` text
);

CREATE TABLE `Question_Options` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `questionID` int,
  `questionText` text,
  `isCorrect` boolean
);

CREATE TABLE `quiz_user_answers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userid` int,
  `quizID` int, 
  `score` int

-- much more practical to query this in terms of performance and also allows us to make a single neat insert at the end of a quiz


--  `questionID` int,
--  `Question_Options` int
);

ALTER TABLE `Quizzes` ADD FOREIGN KEY (`created_by_userid`) REFERENCES `accounts` (`id`);

ALTER TABLE `Questions` ADD FOREIGN KEY (`QuizID`) REFERENCES `Quizzes` (`id`);

ALTER TABLE `Question_Options` ADD FOREIGN KEY (`questionID`) REFERENCES `Questions` (`id`);

ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);

ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`quizID`) REFERENCES `Quizzes` (`id`);

-- ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`Question_Options`) REFERENCES `Question_Options` (`id`);
