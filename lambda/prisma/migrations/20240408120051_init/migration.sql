/*
  Warnings:

  - You are about to drop the `ta_club_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ta_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ta_user_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ta_club_profiles" DROP CONSTRAINT "ta_club_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "ta_user_profiles" DROP CONSTRAINT "ta_user_profiles_userId_fkey";

-- DropTable
DROP TABLE "ta_club_profiles";

-- DropTable
DROP TABLE "ta_profiles";

-- DropTable
DROP TABLE "ta_user_profiles";

-- CreateTable
CREATE TABLE "profiles" (
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "biography" TEXT,
    "profileType" TEXT NOT NULL,
    "registrationTimestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatarUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "tiktokUrl" TEXT,
    "twitterUrl" TEXT,
    "linkedinUrl" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "userId" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "postalCode" TEXT,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "club_profiles" (
    "userId" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,
    "foundingYear" INTEGER NOT NULL,
    "website" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "club_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "club_profiles" ADD CONSTRAINT "club_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
