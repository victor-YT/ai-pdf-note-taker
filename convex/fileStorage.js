import { mutation } from "./_generated/server";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
})

export const AddFileEntryToDb = mutation({
    args: {
        fileId: v.string(),
        storageId: v.string(),
        fileName: v.string(),
        createdBy: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('pdfFiles', {
            fileId: args.fileId,
            fileName: args.fileName,
            storageId: args.storageId,
            createdBy: args.createdBy
        })
        return 'Inserted new file'
    }
})
















