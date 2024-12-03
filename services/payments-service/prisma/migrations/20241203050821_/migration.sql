-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PaymentStatus" NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);
