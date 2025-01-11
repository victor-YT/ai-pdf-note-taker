import {mutation, query} from "./_generated/server"
import {v} from "convex/values"

export const createUser = mutation({
    args: {
        email: v.string(),
        userName: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, args) => {
        // if user already exist
        const user = await ctx.db.query('users')
            .filter((q) => q.eq(q.field('email'), args.email))
            .collect()
        // if not
        if (user?.length===0) {
            await ctx.db.insert('users', {
                email: args.email,
                imageUrl: args.imageUrl,
                userName: args.userName,
                upgrade: false
            })

            return 'Inserted new user'
        }

        return 'User already exist'
    }
})

export const userUpgradePlan = mutation({
    args: {
        userEmail: v.string()
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.query('users')
            .filter(q => q.eq(q.field('email'), args.userEmail)).collect()

        if (result) {
            await ctx.db.patch(result[0]._id, {upgrade:true})
            return 'Success'
        }
        return 'Error'
    }
})

export const GetUserInfo = query({
    args: {
        userEmail: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        if (!args.userEmail) {
            return ;
        }
        const result = await ctx.db.query('users')
            .filter(q => q.eq(q.field('email'), args.userEmail)).collect()
        return result[0]
    }
})