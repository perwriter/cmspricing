-- CreateTable
CREATE TABLE "PricingTier" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT[],
    "buttonText" TEXT NOT NULL,
    "buttonClass" TEXT NOT NULL,
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "discountOriginal" DOUBLE PRECISION,
    "standardPrice" DOUBLE PRECISION NOT NULL,
    "standardOriginal" DOUBLE PRECISION,
    "premiumPrice" DOUBLE PRECISION NOT NULL,
    "premiumOriginal" DOUBLE PRECISION,
    "billing" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PricingTier_pkey" PRIMARY KEY ("id")
);
