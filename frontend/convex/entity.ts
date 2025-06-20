import { query } from "./_generated/server";
import { v } from "convex/values";

//function to get the Entity based on the Entity Id
export const getByEntityId=query({
    args:{
        entity:v.id("entity"),
    },
    handler:async(ctx,{entity})=>{
        if(!entity)return null;

        const response=await ctx.db.query("entity")
        .withIndex("by_id",(q)=>q.eq("_id",entity))
        .first();

        return response;
    }
});

//function to get the Entity based on the unique document Ids of Transactions Table
export const getByTransactionId=query({
    args:{
        TransactionId:v.id("transactions"),
    },
    handler:async(ctx,{TransactionId})=>{
        if(!TransactionId)return null;

        const response=await ctx.db.query("entity")
        .withIndex("by_transactionId",(q)=>q.eq("TransactionId",TransactionId))
        .first();

        return response;
    }
});