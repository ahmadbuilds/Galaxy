import { defineTable,defineSchema } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    //buy Transactions Schema
    transactions:defineTable({
        TransactionId:v.string(),
        User:v.string(),
    })
    .index("by_transactionId",["TransactionId"])
    .index("by_user",["User"]),

    //entity schema
    entity:defineTable({
        TransactionId:v.id("transactions"),
    })
    .index("by_transactionId",["TransactionId"]),
});
