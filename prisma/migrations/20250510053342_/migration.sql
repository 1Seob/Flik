/*
  Warnings:

  - Made the column `birthday` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `login_id` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "login_id" SET NOT NULL;
