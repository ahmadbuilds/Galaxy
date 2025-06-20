import { mutation, query} from "./_generated/server";
import { v } from "convex/values";

//function for inserting in a new Transactions and Creating a new Entity
export const InsertNewTransaction=mutation({
    args:{
        TransactionId:v.string(),
        User:v.string(),
    },
    handler:async(ctx,{TransactionId,User})=>{
        //checking if the data exists or not
        if(!TransactionId || !User) return null;

        //checking fot existing transactions ID
        const isTransactionIdExist=await ctx.db.query("transactions")
        .withIndex("by_transactionId",(q)=>q.eq("TransactionId",TransactionId))
        .first();
        if(isTransactionIdExist)return null;


        //inserting new Data
        const newTransaction=await ctx.db.insert("transactions",{TransactionId,User});

        if(!newTransaction)return "Failed to create a new transaction!!";


        const newEntity=await ctx.db.insert("entity",{TransactionId:newTransaction});

        if(!newEntity)return "Failed to create a new Entity!!!";

        return {
            newTransaction,
            newEntity,
        };
    }
});

//function for getting a transaction based on its Id
export const GetByTransactionId=query({
    args:{
        TransactionId:v.string(),
    },
    handler:async(ctx,{TransactionId})=>{
        if(!TransactionId)return null;

        const transaction=await ctx.db.query("transactions")
        .withIndex("by_transactionId",(q)=>q.eq("TransactionId",TransactionId))
        .first();

        return transaction;
    }
});

//function for getting a transaction based on User address
export const GetByUserId=query({
    args:{
        User:v.string(),
    },
    handler:async(ctx,{User})=>{
        if(!User)return null;

        const transaction=await ctx.db.query("transactions")
        .withIndex("by_user",(q)=>q.eq("User",User))
        .first();

        return transaction;
    }
});