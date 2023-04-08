-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profilePicture" TEXT,
    "position" TEXT DEFAULT 'Tech Intern',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "studentFirstName" TEXT NOT NULL,
    "studentMiddleName" TEXT,
    "studentLastName" TEXT NOT NULL,
    "studentEmail" TEXT,
    "studentSchoolName" TEXT NOT NULL,
    "comments" TEXT,
    "userId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_provider_id_key" ON "user"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- CreateIndex
CREATE INDEX "session_user_id_idx" ON "session"("user_id");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
