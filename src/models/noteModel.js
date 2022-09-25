import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    coin: {
      type: String,
      required: [true, "Please add a coin type"],
    },
    price: {
      type: Number,
      required: [true, "Please add a coin price"],
    },
    amount: {
      type: Number,
      required: [true, "Please set amount of coins"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    __v: { type: Number, select: false },
  },
  {
    timestamps: true,
  }
);

export const NoteModel = mongoose.model("Note", noteSchema);
