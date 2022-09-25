import asyncHandler from "express-async-handler";
import { NoteModel } from "../models/noteModel.js";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json(notes);
});

export const createNote = asyncHandler(async (req, res) => {
  const { coin, price, amount } = req.body;

  if (!coin || !price || !amount) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const note = await NoteModel.create({
    coin,
    price,
    amount,
    user: req.user.id,
  });

  res.status(200).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You have no access to this note");
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedNote);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("You have no access to this note");
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
});

export const getStatistic = asyncHandler(async (req, res) => {
  const notes = await NoteModel.find({ user: req.user.id }).sort({ createdAt: -1 });

  const totalExpances = notes.reduce(
    (partialSum, note) => partialSum + note.price * note.amount,
    0
  );

  const generateTotalByCoin = (coin) => {
    let coinAmount = 0;
    let coinExpances = 0;
    notes.forEach((note) => {
      if (note.coin === coin) {
        coinAmount = coinAmount + note.amount;
        coinExpances = coinExpances + note.price * note.amount;
      }
    });

    return { coinAmount: +coinAmount.toFixed(3), coinExpances: +coinExpances.toFixed(2) };
  };

  const totalCoins = [
    { coin: "BTC", statistic: generateTotalByCoin("BTC") },
    { coin: "ETH", statistic: generateTotalByCoin("ETH") },
  ];

  res.status(200).json({ totalExpances: +totalExpances.toFixed(2), totalCoins });
});
