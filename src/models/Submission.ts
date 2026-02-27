import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  submissionId: string;
  name: string;
  values: Record<string, string>;
  location: {
    latitude: number;
    longitude: number;
  };
  images: string[];
  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    submissionId: {
      type: String,
      required: true,
      unique: true, // 🔥 This gives us idempotency at DB level
    },
    name: {
      type: String,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ISubmission>("Submission", SubmissionSchema);
