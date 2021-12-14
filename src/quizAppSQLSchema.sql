CREATE TABLE `accounts` (
`id` int PRIMARY KEY AUTO_INCREMENT,
`username` varchar(255),
`password` varchar(255)
);

CREATE TABLE `Quizzes` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `quizname` text,
  `difficulty` text,
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


);

ALTER TABLE `Quizzes` ADD FOREIGN KEY (`created_by_userid`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;

ALTER TABLE `Questions` ADD FOREIGN KEY (`QuizID`) REFERENCES `Quizzes` (`id`) ON DELETE CASCADE;

ALTER TABLE `Question_Options` ADD FOREIGN KEY (`questionID`) REFERENCES `Questions` (`id`) ON DELETE CASCADE;

ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`) ON DELETE CASCADE;

-- This will delete the score record if the quiz is deleted

ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`quizID`) REFERENCES `Quizzes` (`id`) ON DELETE CASCADE; 

-- Alternatively If we want users to keep scores from deleted quizzes

-- ALTER TABLE `quiz_user_answers` ADD FOREIGN KEY (`quizID`) REFERENCES `Quizzes` (`id`) ON DELETE NO ACTION;