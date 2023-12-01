import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export interface IUserDocument {
  email: string;
  password: string;
}

export interface IUserModel extends mongoose.Model<IUserDocument> {}

export const User: IUserModel = <IUserModel>(
  mongoose.model<IUserDocument>("User", UserSchema)
);
