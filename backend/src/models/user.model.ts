import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<User>("User", UserSchema);

export default User;
