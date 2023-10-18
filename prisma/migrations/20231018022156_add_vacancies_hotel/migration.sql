/*
  Warnings:

  - Added the required column `vacancies` to the `hoteis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hoteis" ADD COLUMN     "vacancies" INTEGER NOT NULL;
