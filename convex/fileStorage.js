import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl()
})

export const AddFileEntryToDb = mutation({
    args: {
        fileId: v.string(),
        storageId: v.string(),
        fileUrl: v.string(),
        fileName: v.string(),
        createdBy: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert('pdfFiles', {
            fileId: args.fileId,
            fileName: args.fileName,
            storageId: args.storageId,
            fileUrl: args.fileUrl,
            createdBy: args.createdBy
        })
        return 'Inserted new file'
    }
})

export const getFileUrl = mutation({
    args: {
        storageId: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const GetFileRecord = query({
    args: {
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('pdfFiles').filter((q) => q.eq(q.field('fileId'), args.fileId))
            .collect()

        console.log(result)
        return result[0]
    }
})

export const GetUserFiles = query({
    args: {
        userEmail: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('pdfFiles')
            .filter((q) => q.eq(q.field('createdBy'), args.userEmail)).collect()

        return JSON.stringify(result)
    }
})














