-- Add courseName and intent fields to CallbackRequest table
-- Note: These fields already exist in the database, this migration documents the schema change
-- ALTER TABLE `CallbackRequest` ADD COLUMN `courseName` VARCHAR(191) NULL;
-- ALTER TABLE `CallbackRequest` ADD COLUMN `intent` VARCHAR(191) NOT NULL DEFAULT 'callback';

