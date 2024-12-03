-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAYED', 'CANCELED');

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);
