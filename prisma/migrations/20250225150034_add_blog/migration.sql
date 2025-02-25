/*
  Warnings:

  - You are about to drop the column `subject` on the `ContactUs` table. All the data in the column will be lost.
  - Added the required column `phone` to the `ContactUs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContactUs" DROP COLUMN "subject",
ADD COLUMN     "phone" INTEGER NOT NULL;
