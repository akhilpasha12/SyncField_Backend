import { Request, Response } from "express";
import Submission from "../models/Submission";

export const createSubmission = async (req: Request, res: Response) => {
  try {
    const { submissionId, name, values, latitude, longitude } = req.body;

    // 🔥 Check duplicate manually (extra safety)
    const existing = await Submission.findOne({ submissionId });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Duplicate submission ignored",
      });
    }

    const imagePaths = (req.files as Express.Multer.File[]).map(
      (file) => file.path,
    );

    const submission = await Submission.create({
      submissionId,
      name,
      values: JSON.parse(values),
      location: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      images: imagePaths,
    });

    return res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error("Submission Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
