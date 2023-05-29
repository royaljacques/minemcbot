/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Player` table. All the data in the column will be lost.
  - Added the required column `discordId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemInHand` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lang` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `map_name` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pseudo` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xp` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "discordId" TEXT NOT NULL,
ADD COLUMN     "itemInHand" INTEGER NOT NULL,
ADD COLUMN     "lang" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "map_name" TEXT NOT NULL,
ADD COLUMN     "pseudo" TEXT NOT NULL,
ADD COLUMN     "xp" INTEGER NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("discordId");
