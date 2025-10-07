import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return await ctx.db
      .query("medicines")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const search = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    const allMedicines = await ctx.db
      .query("medicines")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    
    if (!args.searchTerm) {
      return allMedicines;
    }
    
    const searchLower = args.searchTerm.toLowerCase();
    return allMedicines.filter(
      (med) =>
        med.name.toLowerCase().includes(searchLower) ||
        med.category.toLowerCase().includes(searchLower) ||
        med.manufacturer.toLowerCase().includes(searchLower)
    );
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    quantity: v.number(),
    price: v.number(),
    expiryDate: v.string(),
    manufacturer: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    return await ctx.db.insert("medicines", {
      name: args.name,
      category: args.category,
      quantity: args.quantity,
      price: args.price,
      expiryDate: args.expiryDate,
      manufacturer: args.manufacturer,
      userId: user._id,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("medicines"),
    name: v.string(),
    category: v.string(),
    quantity: v.number(),
    price: v.number(),
    expiryDate: v.string(),
    manufacturer: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    // Verify the medicine belongs to the current user
    const medicine = await ctx.db.get(args.id);
    if (!medicine || medicine.userId !== user._id) {
      throw new Error("Unauthorized: You can only update your own medicines");
    }
    
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("medicines") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    // Verify the medicine belongs to the current user
    const medicine = await ctx.db.get(args.id);
    if (!medicine || medicine.userId !== user._id) {
      throw new Error("Unauthorized: You can only delete your own medicines");
    }
    
    await ctx.db.delete(args.id);
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    
    const medicines = await ctx.db
      .query("medicines")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
    
    const totalMedicines = medicines.length;
    const lowStock = medicines.filter((m) => m.quantity > 0 && m.quantity <= 10).length;
    const outOfStock = medicines.filter((m) => m.quantity === 0).length;
    const totalValue = medicines.reduce((sum, m) => sum + m.price * m.quantity, 0);
    
    return {
      totalMedicines,
      lowStock,
      outOfStock,
      totalValue,
      totalValueFormatted: `₹${totalValue.toFixed(2)}`,
    };
  },
});
