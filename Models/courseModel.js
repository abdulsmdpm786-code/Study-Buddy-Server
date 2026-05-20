import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    shortTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const courseModel = mongoose.model("Courses", courseSchema);
