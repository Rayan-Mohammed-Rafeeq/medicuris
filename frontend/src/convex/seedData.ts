import { mutation } from "./_generated/server";
import { getCurrentUser } from "./users";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized: Must be logged in to seed data");
    }

    const medicines = [
      {
        name: "Paracetamol 500mg",
        category: "Pain Relief",
        quantity: 150,
        price: 5.99,
        expiryDate: "2025-12-31",
        manufacturer: "PharmaCorp",
        userId: user._id,
      },
      {
        name: "Amoxicillin 250mg",
        category: "Antibiotic",
        quantity: 8,
        price: 12.50,
        expiryDate: "2025-06-30",
        manufacturer: "MediLife",
        userId: user._id,
      },
      {
        name: "Ibuprofen 400mg",
        category: "Pain Relief",
        quantity: 0,
        price: 7.25,
        expiryDate: "2025-09-15",
        manufacturer: "HealthPlus",
        userId: user._id,
      },
      {
        name: "Cetirizine 10mg",
        category: "Antihistamine",
        quantity: 75,
        price: 8.99,
        expiryDate: "2026-03-20",
        manufacturer: "AllergyFree",
        userId: user._id,
      },
      {
        name: "Metformin 500mg",
        category: "Diabetes",
        quantity: 5,
        price: 15.00,
        expiryDate: "2025-11-10",
        manufacturer: "DiabetesCare",
        userId: user._id,
      },
    ];

    for (const medicine of medicines) {
      await ctx.db.insert("medicines", medicine);
    }

    return { success: true, count: medicines.length };
  },
});