import mongoose from "mongoose";

// Define a schema for the counter collection
const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

// Create a model for the counter collection
const Counter = mongoose.model('counter', CounterSchema);

// Define the schema for the chat collection
const chatSchema = new mongoose.Schema({
    chatId: {
        type: String // No need to specify a default value here
    },
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true // TODO: add validator so it is only of "User" or "System"
    },
});

// Define a pre-save middleware for chatSchema to generate auto-incrementing chat IDs
chatSchema.pre('save', async function(next) {
    const doc = this;
    console.log("inside virtual method", doc)
    try {
        if (!doc.chatId) {
            // Find and increment the counter for chat IDs
            let counter = await Counter.findOneAndUpdate({ _id: 'chatId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });
            if (!counter) {
                // If the counter document doesn't exist, create it with seq set to 1
                counter = await Counter.create({ _id: 'chatId', seq: 1 });
            }
            doc.chatId = counter.seq.toString(); // Assign the incremented value as chatId
        }
        next();
    } catch (error) {
        next(error);
    }
});


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
    chats: [chatSchema]
}, { collection: 'users' });

// Create models for User and Chat
export const User = mongoose.model('user', userSchema);
export const Chat = mongoose.model('chat', chatSchema);
