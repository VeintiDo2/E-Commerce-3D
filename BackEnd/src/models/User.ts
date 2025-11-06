import { Schema, model, Document } from "mongoose";

export interface InterfaceUser extends Document {
    username: string;
    name: string;
    password: string;
    email: string;
    role: "cliente" | "admin";
    userImageUrl?: string;
}

const userSchema = new Schema<InterfaceUser>(
    {
        username: { type: String, required: true, trim: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, enum: ["cliente", "admin"], default: "cliente" },
        userImageUrl: { type: String, required: false },
    },
    { timestamps: true }
);

const User = model<InterfaceUser>("User", userSchema);
export default User;
