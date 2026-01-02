import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    id: String,
    website: String,
    username: String,
    password: String,
}, { timestamps: true });

export default mongoose.models.Password || mongoose.model("Password", passwordSchema);