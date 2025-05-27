-- AlterTable
ALTER TABLE "book" ADD COLUMN     "coverImageUrl" TEXT;

-- CreateTable
CREATE TABLE "book-like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "book-like_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "book-like_userId_bookId_key" ON "book-like"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "book-like" ADD CONSTRAINT "book-like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book-like" ADD CONSTRAINT "book-like_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
