import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
      ref: "Courses",
    },
    mainTitle: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    title: {
      type: {
        type: String,
        enum: ["video", "note", "ref"],
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const contentModel = mongoose.model("Contents", contentSchema);
