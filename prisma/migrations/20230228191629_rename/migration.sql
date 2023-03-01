/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "User_info" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
