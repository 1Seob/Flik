-- CreateTable
CREATE TABLE "user-reading-activity" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "paragraph_id" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "read_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "daily_goal" INTEGER,

    CONSTRAINT "user-reading-activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-reading-activity_user_id_book_id_paragraph_id_read_at_key" ON "user-reading-activity"("user_id", "book_id", "paragraph_id", "read_at");

-- AddForeignKey
ALTER TABLE "user-reading-activity" ADD CONSTRAINT "user-reading-activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-reading-activity" ADD CONSTRAINT "user-reading-activity_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-reading-activity" ADD CONSTRAINT "user-reading-activity_paragraph_id_fkey" FOREIGN KEY ("paragraph_id") REFERENCES "paragraph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
