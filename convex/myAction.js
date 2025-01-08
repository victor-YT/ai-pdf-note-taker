import { ConvexVectorStore } from "@langchain/community/vectorstores/convex"
import { action } from "./_generated/server.js"
import {GoogleGenerativeAIEmbeddings} from "@langchain/google-genai"
import {TaskType} from "@google/generative-ai"
import {v} from "convex/values"

export const ingest = action({
    args: {
        splitText: v.any(),
        fileId: v.string()
    },
    handler: async (ctx, args) => {
        await ConvexVectorStore.fromTexts(
            args.splitText, // array
            { fileId: args.fileId }, // string for metadata
            new GoogleGenerativeAIEmbeddings({
                apiKey: "AIzaSyBME15D5ubnFoLWK8YzwazfUs6Nbh5Q0qQ",
                model: "text-embedding-004", // 768 dimensions
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title"
            }),
            { ctx }
        );
        return "finished"
    },
})


export const search = action({
    args: {
        query: v.string(),
        fileID: v.string()
    },
    handler: async (ctx, args) => {
        const vectorStore = new ConvexVectorStore(
            new GoogleGenerativeAIEmbeddings({
                apiKey: "AIzaSyBME15D5ubnFoLWK8YzwazfUs6Nbh5Q0qQ",
                model: "text-embedding-004", // 768 dimensions
                taskType: TaskType.RETRIEVAL_DOCUMENT,
                title: "Document title"
            }),
            { ctx });

        const resultOne = await vectorStore.similaritySearch(args.query, 1)
            .filter(q => q.metadata.fileId)
        console.log(resultOne);
    }
})
