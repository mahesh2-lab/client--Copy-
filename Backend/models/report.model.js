import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    lat: {
        type: String,
        required: true,
    },
    lng: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    intensity: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true });

const User = mongoose.model("Report", userSchema);
export default User;