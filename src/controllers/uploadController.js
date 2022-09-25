import cloudinary from "../config/cloudinary.js";
import asyncHandler from "express-async-handler";

export const uploadFile = asyncHandler(async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({
        message: req.fileValidationError,
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "crypto-app" });

    if (!result) {
      return res.status(500).json({
        message: "Upload error",
      });
    }

    const uploadedFile = {
      public_id: result.public_id,
      url: result.url,
      filename: result.original_filename,
      size: result.bytes,
      ext: result.format,
    };

    res.status(201).json(uploadedFile);
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});

export const deleteFile = asyncHandler(async (req, res) => {
  try {
    const result = await cloudinary.uploader.destroy(req.body.public_id);

    if (result?.result === "not found") {
      return res.status(400).json({
        message: "Image not found",
      });
    }

    if (result?.result === "ok") {
      return res.status(201).json({
        message: "success",
      });
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(500);
    throw new Error(err.message ? err.message : "Delete error");
  }
});
