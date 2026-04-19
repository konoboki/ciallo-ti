CREATE TABLE `character_ratings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`characterId` varchar(64) NOT NULL,
	`sessionId` varchar(64) NOT NULL,
	`rating` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `character_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`characterId` varchar(64) NOT NULL,
	`matchCount` int NOT NULL DEFAULT 0,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `character_stats_id` PRIMARY KEY(`id`),
	CONSTRAINT `character_stats_characterId_unique` UNIQUE(`characterId`)
);
