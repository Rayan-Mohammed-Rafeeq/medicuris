import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    ...authTables,

    users: defineTable({
      name: v.optional(v.string()),
      image: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      isAnonymous: v.optional(v.boolean()),
      role: v.optional(roleValidator),
    }).index("email", ["email"]),

    medicines: defineTable({
      name: v.string(),
      category: v.string(),
      quantity: v.number(),
      price: v.number(),
      expiryDate: v.string(),
      manufacturer: v.string(),
      userId: v.id("users"),
    }).index("by_user", ["userId"]),

    customers: defineTable({
      name: v.string(),
      contactNumber: v.string(),
      email: v.optional(v.string()),
      address: v.optional(v.string()),
      userId: v.id("users"),
    })
      .index("by_user", ["userId"])
      .index("by_contact", ["userId", "contactNumber"]),

    salesTransactions: defineTable({
      customerId: v.optional(v.id("customers")),
      employeeId: v.id("users"),
      employeeName: v.string(),
      paymentMethod: v.string(),
      totalAmount: v.number(),
      transactionDate: v.number(),
      userId: v.id("users"),
    })
      .index("by_user", ["userId"])
      .index("by_customer", ["customerId"])
      .index("by_date", ["userId", "transactionDate"]),

    saleItems: defineTable({
      transactionId: v.id("salesTransactions"),
      medicineId: v.id("medicines"),
      medicineName: v.string(),
      quantitySold: v.number(),
      unitPrice: v.number(),
      discount: v.number(),
      subtotal: v.number(),
    }).index("by_transaction", ["transactionId"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;