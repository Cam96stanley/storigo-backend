/*
  Warnings:

  - You are about to drop the column `firebaseUid` on the `User` table. All the data in the column will be lost.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_firebaseUid_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "firebaseUid",
ADD COLUMN     "passwordHash" TEXT NOT NULL;
