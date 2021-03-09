/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name]` on the table `Community`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Community.name_unique" ON "Community"("name");
