/*
  Warnings:

  - You are about to drop the column `birthday` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_city` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_join` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_region_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_category_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_fkey";

-- DropForeignKey
ALTER TABLE "event_city" DROP CONSTRAINT "event_city_city_id_fkey";

-- DropForeignKey
ALTER TABLE "event_city" DROP CONSTRAINT "event_city_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_join" DROP CONSTRAINT "event_join_event_id_fkey";

-- DropForeignKey
ALTER TABLE "event_join" DROP CONSTRAINT "event_join_user_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_event_id_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_category_id_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_city_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "birthday",
DROP COLUMN "category_id",
DROP COLUMN "city_id";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "city";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_city";

-- DropTable
DROP TABLE "event_join";

-- DropTable
DROP TABLE "region";

-- DropTable
DROP TABLE "review";

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paragraph" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paragraph-like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "paragraphId" INTEGER NOT NULL,

    CONSTRAINT "paragraph-like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "paragraph-like_userId_paragraphId_key" ON "paragraph-like"("userId", "paragraphId");

-- AddForeignKey
ALTER TABLE "paragraph" ADD CONSTRAINT "paragraph_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paragraph-like" ADD CONSTRAINT "paragraph-like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paragraph-like" ADD CONSTRAINT "paragraph-like_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "paragraph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
