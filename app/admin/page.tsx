"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { PricingTier } from "@prisma/client";

export default function AdminPage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchPricingTiers();
  }, []);

  const fetchPricingTiers = async () => {
    const response = await fetch("/api/pricing");
    const data = await response.json();
    setPricingTiers(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      features:
        formData.get("features")?.toString().split("\n").filter(Boolean) || [],
      buttonText: formData.get("buttonText"),
      buttonClass: formData.get("buttonClass"),
      discountPrice: parseFloat(formData.get("discountPrice") as string),
      discountOriginal:
        parseFloat(formData.get("discountOriginal") as string) || null,
      standardPrice: parseFloat(formData.get("standardPrice") as string),
      standardOriginal:
        parseFloat(formData.get("standardOriginal") as string) || null,
      premiumPrice: parseFloat(formData.get("premiumPrice") as string),
      premiumOriginal:
        parseFloat(formData.get("premiumOriginal") as string) || null,
      billing: formData.get("billing"),
    };

    if (editingTier) {
      await fetch(`/api/pricing/${editingTier.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    fetchPricingTiers();
    setEditingTier(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this pricing tier?")) {
      await fetch(`/api/pricing/${id}`, { method: "DELETE" });
      fetchPricingTiers();
    }
  };

  const renderForm = (tier?: PricingTier) => (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-neutral-800/40 p-8 rounded-xl shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-white">
            Title
          </label>
          <input
            name="title"
            defaultValue={tier?.title}
            className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white">
            Description
          </label>
          <input
            name="description"
            defaultValue={tier?.description}
            className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white">
            Button Text
          </label>
          <input
            name="buttonText"
            defaultValue={tier?.buttonText}
            className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white">
            Button Class
          </label>
          <input
            name="buttonClass"
            defaultValue={tier?.buttonClass}
            className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white">
            Billing
          </label>
          <input
            name="billing"
            defaultValue={tier?.billing}
            className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-white">
          Features (one per line)
        </label>
        <textarea
          name="features"
          defaultValue={tier?.features.join("\n")}
          className="mt-2 block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3 h-32"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {["Discount", "Standard", "Premium"].map((tierType) => (
          <div key={tierType}>
            <h3 className="text-white font-semibold text-lg mb-3">
              {tierType} Pricing
            </h3>
            <div className="space-y-3">
              <input
                name={`${tierType.toLowerCase()}Price`}
                type="number"
                step="0.01"
                defaultValue={(tier as any)?.[`${tierType.toLowerCase()}Price`]}
                placeholder="Price"
                className="block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
                required
              />
              <input
                name={`${tierType.toLowerCase()}Original`}
                type="number"
                step="0.01"
                defaultValue={(tier as any)?.[`${tierType.toLowerCase()}Original`] || ""}
                placeholder="Original Price (optional)"
                className="block w-full rounded-lg bg-neutral-700 border border-neutral-600 focus:border-blue-500 focus:ring focus:ring-blue-500/50 text-white p-3"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={() => {
            setEditingTier(null);
            setIsCreating(false);
          }}
          className="px-5 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-all shadow-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
        >
          {editingTier ? "Update" : "Create"} Pricing Tier
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            Pricing Management
          </h1>
          {!isCreating && !editingTier && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 hover:bg-blue-500 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Tier
            </button>
          )}
        </div>

        {(isCreating || editingTier) && renderForm(editingTier || undefined)}

        {!isCreating && !editingTier && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className="bg-neutral-800/50 rounded-xl p-6 shadow-lg backdrop-blur-md border border-neutral-700 transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-white">
                      {tier.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {tier.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingTier(tier)}
                      className="p-2 text-blue-400 transition-colors hover:text-blue-300"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier.id)}
                      className="p-2 text-red-400 transition-colors hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-neutral-300 text-lg">
                    Discount:{" "}
                    <span className="font-medium text-green-400">
                      ${tier.discountPrice}
                    </span>
                    {tier.discountOriginal && (
                      <span className="text-neutral-500 line-through ml-2">
                        ${tier.discountOriginal}
                      </span>
                    )}
                  </p>
                  <p className="text-neutral-300 text-lg">
                    Standard:{" "}
                    <span className="font-medium text-yellow-400">
                      ${tier.standardPrice}
                    </span>
                    {tier.standardOriginal && (
                      <span className="text-neutral-500 line-through ml-2">
                        ${tier.standardOriginal}
                      </span>
                    )}
                  </p>
                  <p className="text-neutral-300 text-lg">
                    Premium:{" "}
                    <span className="font-medium text-purple-400">
                      ${tier.premiumPrice}
                    </span>
                    {tier.premiumOriginal && (
                      <span className="text-neutral-500 line-through ml-2">
                        ${tier.premiumOriginal}
                      </span>
                    )}
                  </p>
                </div>

                <div className="space-y-1 text-sm text-neutral-400 border-t border-neutral-700 pt-3">
                  {tier.features.map((feature, index) => (
                    <p key={index} className="flex items-center gap-2">
                      <span className="text-green-400">✔</span> {feature}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
