import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pricingTiers = [
    {
      title: "Free",
      description: "Free for all users",
      features: [
        "3 Projects",
        "Record & Export",
        "1080p, High quality, 30 FPS",
        "Up to 5 mins recordings",
        "10 MB video/audio clips",
        "500 MB storage"
      ],
      buttonText: "Join Waitlist",
      buttonClass: "bg-neutral-950",
      discountPrice: 0,
      discountOriginal: 0,
      standardPrice: 0,
      standardOriginal: 0,
      premiumPrice: 0,
      premiumOriginal: 0,
      billing: ""
    },
    {
      title: "Pro",
      description: "billed monthly",
      features: [
        "Unlimited Projects",
        "Record & Export",
        "4K, Perfect quality, 60 FPS",
        "Unlimited recordings",
        "500 MB video/audio clips",
        "50 GB storage",
        "AI Voices (120 mins per month)",
        "Image/Video Generation, Chat, Notes (1,000,000 tokens per month)",
        "Remove background noise",
        "Transcribe Audio/Video",
        "Premium backgrounds and videos"
      ],
      buttonText: "Become an Early Supporter",
      buttonClass: "bg-indigo-600",
      discountPrice: 17.50,
      discountOriginal: 25,
      standardPrice: 25,
      standardOriginal: null,
      premiumPrice: 30,
      premiumOriginal: null,
      billing: "/ month / user"
    },
    {
      title: "Pro+",
      description: "billed monthly",
      features: [
        "Unlimited Projects",
        "Record & Export",
        "4K, Perfect quality, 60 FPS",
        "Unlimited recordings",
        "1 GB video/audio clips",
        "100 GB storage",
        "AI Voices (240 mins per month)",
        "Image/Video Generation, Chat, Notes (2,000,000 tokens per month)",
        "Remove background noise",
        "Transcribe Audio/Video",
        "Premium backgrounds and videos"
      ],
      buttonText: "Become an Early Supporter",
      buttonClass: "bg-purple-600",
      discountPrice: 35,
      discountOriginal: 50,
      standardPrice: 50,
      standardOriginal: null,
      premiumPrice: 60,
      premiumOriginal: null,
      billing: "/ month / user"
    }
  ];

  for (const tier of pricingTiers) {
    await prisma.pricingTier.create({
      data: tier
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });