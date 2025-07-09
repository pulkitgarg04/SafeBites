-- CreateEnum
CREATE TYPE "Allergen" AS ENUM ('MILK', 'EGGS', 'PEANUTS', 'TREE_NUTS', 'SOY', 'WHEAT', 'FISH', 'SHELLFISH', 'SESAME', 'SULFITES', 'MUSTARD', 'LUPIN');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('VEG', 'NON_VEG');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "allergens" "Allergen"[],
ADD COLUMN     "bodyWeight" DOUBLE PRECISION,
ADD COLUMN     "customAllergens" TEXT[],
ADD COLUMN     "dietType" "DietType",
ADD COLUMN     "diseases" TEXT[],
ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sex" "Sex";
