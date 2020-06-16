CREATE TABLE `draft_info` (
CREATE TABLE `draft_info` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `rounds` int DEFAULT null,
  `teams` int DEFAULT null,
  `updated` datetime
);

CREATE TABLE `position` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `updated` datetime
);

CREATE TABLE `19_captians` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `player_id` int,
  `name` varchar(255) DEFAULT null,
  `pick` int DEFAULT null,
  `updated` datetime
);

CREATE TABLE `19_players` (
  `id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `position_id` int NOT NULL,
  `picked` int DEFAULT null,
  `team_id` int DEFAULT null,
  `updated` datetime
);

ALTER TABLE `19_captians` ADD FOREIGN KEY (`player_id`) REFERENCES `19_players` (`id`);

ALTER TABLE `19_players` ADD FOREIGN KEY (`position_id`) REFERENCES `position` (`id`);

ALTER TABLE `19_players` ADD FOREIGN KEY (`team_id`) REFERENCES `19_captians` (`id`);
