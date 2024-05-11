-- CreateTable
CREATE TABLE "ta_profiles" (
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

    CONSTRAINT "ta_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ta_user_profiles" (
    "userId" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "city" TEXT,
    "country" TEXT,
    "postalCode" TEXT,

    CONSTRAINT "ta_user_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ta_club_profiles" (
    "userId" TEXT NOT NULL,
    "clubName" TEXT NOT NULL,
    "foundingYear" INTEGER NOT NULL,
    "website" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "ta_club_profiles_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ta_profiles_email_key" ON "ta_profiles"("email");

-- AddForeignKey
ALTER TABLE "ta_user_profiles" ADD CONSTRAINT "ta_user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ta_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ta_club_profiles" ADD CONSTRAINT "ta_club_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "ta_profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
