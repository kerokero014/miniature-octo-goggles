/*
  Warnings:

  - You are about to drop the column `file_path` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `image_path` on the `images` table. All the data in the column will be lost.
  - Added the required column `file_data` to the `files` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_data` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `files` DROP COLUMN `file_path`,
    ADD COLUMN `file_data` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `images` DROP COLUMN `image_path`,
    ADD COLUMN `image_data` LONGBLOB NOT NULL;
