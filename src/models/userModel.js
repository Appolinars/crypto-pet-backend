import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: Object,
      required: false,
      default: null,
    },
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);
