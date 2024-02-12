import mongoose from "mongoose";

// TODO: create a chatbox schema afterwards to store different chat messages just like gpt
const chatSchema = new mongoose.Schema({
    id: mongoose.SchemaTypes.ObjectId,
    content: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

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
}, {collection: 'users'})

export default mongoose.model("Users", userSchema)
