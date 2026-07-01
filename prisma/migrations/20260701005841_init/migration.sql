/*
  Warnings:

  - The primary key for the `Promotion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Promotion` table. All the data in the column will be lost.
  - The required column `idPromotion` was added to the `Promotion` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_pkey",
DROP COLUMN "id",
ADD COLUMN     "idPromotion" TEXT NOT NULL,
ADD CONSTRAINT "Promotion_pkey" PRIMARY KEY ("idPromotion");
