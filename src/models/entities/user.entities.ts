import { Schema, model, Document } from 'mongoose';
import bcrypt from "bcrypt";

export interface User extends Document {
    _id: string;
    createdDate: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: string;

}

const userSchema = new Schema<User>({
    createdDate: { type: Date, default: Date.now, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String },
});


export const encryptPassword = async function (password: string): Promise<string> {
const salt = await bcrypt.genSalt(10);
return await bcrypt.hash(password, salt);
};

userSchema.pre<User>("save", async function (next) {
    const user = this;
    if (user.isNew) {
        user.password = await encryptPassword(user.password);
        user.createdDate = new Date();
    }
    next();
});

  


export default model<User>('User', userSchema);;
