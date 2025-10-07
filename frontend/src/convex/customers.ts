import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const createCustomer = mutation({
  args: {
    name: v.string(),
    contactNumber: v.string(),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Check if customer with same contact already exists for this user
    const existing = await ctx.db
      .query("customers")
      .withIndex("by_contact", (q) => 
        q.eq("userId", user._id).eq("contactNumber", args.contactNumber)
      )
      .first();

    if (existing) {
      throw new Error("Customer with this contact number already exists");
    }

    return await ctx.db.insert("customers", {
      name: args.name,
      contactNumber: args.contactNumber,
      email: args.email,
      address: args.address,
      userId: user._id,
    });
  },
});

export const searchCustomers = query({
  args: { searchTerm: v.string() },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const allCustomers = await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    if (!args.searchTerm) {
      return allCustomers;
    }

    const searchLower = args.searchTerm.toLowerCase();
    return allCustomers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(searchLower) ||
        customer.contactNumber.includes(searchLower) ||
        (customer.email && customer.email.toLowerCase().includes(searchLower))
    );
  },
});

export const getCustomer = query({
  args: { id: v.id("customers") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const customer = await ctx.db.get(args.id);
    if (!customer || customer.userId !== user._id) {
      throw new Error("Customer not found or unauthorized");
    }

    return customer;
  },
});

export const listCustomers = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    return await ctx.db
      .query("customers")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});
