import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const recordSale = mutation({
  args: {
    customerId: v.optional(v.id("customers")),
    paymentMethod: v.string(),
    items: v.array(
      v.object({
        medicineId: v.id("medicines"),
        medicineName: v.string(),
        quantitySold: v.number(),
        unitPrice: v.number(),
        discount: v.number(),
        subtotal: v.number(),
      })
    ),
    totalAmount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Validate inventory availability for all items
    for (const item of args.items) {
      const medicine = await ctx.db.get(item.medicineId);
      if (!medicine) {
        throw new Error(`Medicine ${item.medicineName} not found`);
      }
      if (medicine.userId !== user._id) {
        throw new Error("Unauthorized access to medicine");
      }
      if (medicine.quantity < item.quantitySold) {
        throw new Error(
          `Insufficient stock for ${item.medicineName}. Available: ${medicine.quantity}, Required: ${item.quantitySold}`
        );
      }
    }

    // Create sales transaction
    const transactionId = await ctx.db.insert("salesTransactions", {
      customerId: args.customerId,
      employeeId: user._id,
      employeeName: user.name || user.email || "Unknown",
      paymentMethod: args.paymentMethod,
      totalAmount: args.totalAmount,
      transactionDate: Date.now(),
      userId: user._id,
    });

    // Create sale items and update inventory atomically
    for (const item of args.items) {
      await ctx.db.insert("saleItems", {
        transactionId,
        medicineId: item.medicineId,
        medicineName: item.medicineName,
        quantitySold: item.quantitySold,
        unitPrice: item.unitPrice,
        discount: item.discount,
        subtotal: item.subtotal,
      });

      // Update medicine inventory
      const medicine = await ctx.db.get(item.medicineId);
      if (medicine) {
        await ctx.db.patch(item.medicineId, {
          quantity: medicine.quantity - item.quantitySold,
        });
      }
    }

    return transactionId;
  },
});

export const getSalesHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const transactions = await ctx.db
      .query("salesTransactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(args.limit || 50);

    return transactions;
  },
});

export const getTransactionDetails = query({
  args: { transactionId: v.id("salesTransactions") },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const transaction = await ctx.db.get(args.transactionId);
    if (!transaction || transaction.userId !== user._id) {
      throw new Error("Transaction not found or unauthorized");
    }

    const items = await ctx.db
      .query("saleItems")
      .withIndex("by_transaction", (q) => q.eq("transactionId", args.transactionId))
      .collect();

    let customer = null;
    if (transaction.customerId) {
      customer = await ctx.db.get(transaction.customerId);
    }

    return {
      transaction,
      items,
      customer,
    };
  },
});

export const getSalesReport = query({
  args: {
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }

    const allTransactions = await ctx.db
      .query("salesTransactions")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    let filteredTransactions = allTransactions;
    if (args.startDate) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionDate >= args.startDate!
      );
    }
    if (args.endDate) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.transactionDate <= args.endDate!
      );
    }

    const totalSales = filteredTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
    const transactionCount = filteredTransactions.length;

    return {
      totalSales,
      transactionCount,
      averageSale: transactionCount > 0 ? totalSales / transactionCount : 0,
      transactions: filteredTransactions,
    };
  },
});
