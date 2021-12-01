import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import jwt from 'jsonwebtoken';

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
    pseudo: String,
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
	pseudo, 
  email,
  password,
  type
) {
  try {
    const user = await this.create({ pseudo, email, password, type });
    return user;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.getUserByPseudo = async function (pseudo) {
  try {
    const user = await this.findOne({ pseudo: pseudo });
    if (!user) throw ({ error: 'No user with this pseudo found' });
    return user;
  } catch (error) {
    throw error;
  }
}

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);