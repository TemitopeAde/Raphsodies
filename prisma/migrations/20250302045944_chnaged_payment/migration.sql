-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "delivery" JSONB,
ADD COLUMN     "totalItems" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'completed';
