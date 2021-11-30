import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  MEMBER: "member",
  ADMIN: "admin",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    type: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.createUser = async function (
	firstName, 
  lastName, 
  email,
  password,
  type
) {
  try {
    const user = await this.create({ firstName, lastName, email, password, type });
    return user;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);