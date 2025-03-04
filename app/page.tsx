'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

type PricingTier = {
  id: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonClass: string;
  discountPrice: number;
  discountOriginal: number | null;
  standardPrice: number;
  standardOriginal: number | null;
  premiumPrice: number;
  premiumOriginal: number | null;
  billing: string;
};

export default function Home() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [activePricingType, setActivePricingType] = useState<'discount' | 'standard' | 'premium'>('discount');

  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => res.json())
      .then((data) => setPricingTiers(data));
  }, []);

  return (
    <main className="py-10 bg-black min-h-screen">
      <div className="absolute right-0">
        <div className="hidden md:block absolute h-[600px] w-[600px] opacity-60 -z-2 -top-40 right-0">
          <img
            className="object-cover"
            src="https://imghost.net/ib/VH3hkVb75tAIyK8_1740812785.png"
            alt="Gradient background"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto h-[0px] sm:h-[40px] sticky top-16">
        <h1 className="text-[100px] h-[110px] sm:text-[160px] sm:h-[170px] relative text-left left-4 md:left-[26px]">
          <span className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-b from-white/50 via-white/30 to-white/0">
            Pricing
          </span>
        </h1>
      </div>

    


      <div className="mt-24 pt-40">
        <section className="py-2">
          <div className="max-w-2xl text-white mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl text-white sm:text-4xl lg:text-5xl font-regular mb-12 text-center">
              All-in-one video creation suite. Powered by AI.
            </h2>
            <p className="text-md mb-8 mx-auto text-center">
              Screen Recorder, Video Editor, AI Assistant, Voice Generator, Video and Image Generator - all in one powerful package.
            </p>
            <div className="w-full z-40 mb-6 flex justify-center items-center">
              <div className="flex justify-center items-center space-x-0 bg-gradient-to-r from-blue-500 to-blue-300 p-1 rounded-full w-fit">
                {(['discount', 'standard', 'premium'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setActivePricingType(type)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activePricingType === type ? 'bg-white text-black' : 'text-white'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="p-4 rounded-2xl flex flex-col max-w-sm mx-auto w-full backdrop-blur-md bg-neutral-800/30 animate-fade-in-up overflow-hidden"
              >
                <div className="relative z-1 flex-1 flex flex-col">
                  <h3 className="text-sm font-medium text-white mb-2">
                    {tier.title}
                    {tier[`${activePricingType}Original`] && (
                      <span className="text-xs text-neutral-400 font-light">
                        (30% off during early access)
                      </span>
                    )}
                  </h3>
                  <hr className="border-0 h-[1px] bg-white/5 mb-4" />
                  <p className="text-lg text-neutral-300/50 mb-4">
                    ${tier[`${activePricingType}Price`]}
                    {tier[`${activePricingType}Original`] && (
                      <span className="text-sm line-through opacity-50">
                        ${tier[`${activePricingType}Original`]}
                      </span>
                    )}
                    <span className="text-xs">{tier.billing}</span>
                    <br />
                    <span className="text-xs">{tier.description}</span>
                  </p>

                  <ul className="space-y-4 flex-grow mb-8">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="grid grid-cols-[28px_auto] items-center text-sm text-neutral-300">
                        <Check className="mr-2 opacity-50" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative">
                    <button
                      className={`w-full p-2.5 text-white ${tier.buttonClass} hover:text-black hover:scale-150 hover:bg-opacity-80 bg-opacity bg-gradient-to-r from-blue-500 to-blue-300 rounded-xl transition-all duration-500 ease-in-out shine-large text-xs flex items-center justify-center shadow-strong mt-auto`}
                    >
                      {tier.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}