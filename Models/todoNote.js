import mongoose from "mongoose";

const todoNoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    isCompleted:{
      type: String,
      require: true,
      enum: ["Planned","InProgress", "Done"]
    }
  },
  { timestamp: true },
);

export const noteModel = mongoose.model("Note", todoNoteSchema)

