import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    role: {
        type: String, // TODO: add a validator to have this be one of 'User' or 'System'
        required: true
    }
}, { collection: 'chats' })

// TODO: have AI come up with title of chat from prompt
const conversationPairSchema = new mongoose.Schema({
    user: {
        type: chatSchema
    },
    system: {
        type: chatSchema
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'conversationPair'})

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        default: "New chat"
    },
    conversationPairs: [conversationPairSchema],
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'threads '})


// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    threads: [threadSchema]
}, { collection: 'users' });

// middleware
conversationPairSchema.pre('save', function(next) {
    if (this.isNew) { // TODO: change to instead of new, it is updated
        this.updatedAt = new Date();
    }
    next();
});

threadSchema.pre('save', function(next) {
    if (this.isNew) {
        this.updatedAt = new Date()
    }
    next()
})


export const User = mongoose.model("User", userSchema)
export const ConversationPair = mongoose.model("ConversationPair", conversationPairSchema)
export const Chat = mongoose.model("Chat", chatSchema)
export const Thread = mongoose.model("Thead", threadSchema)