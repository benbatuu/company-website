/*
  Warnings:

  - Changed the type of `description` on the `service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "offers"."offer" ALTER COLUMN "salepriceperiod" SET DATA TYPE TEXT,
ALTER COLUMN "discountamount" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "services"."service" DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL;
