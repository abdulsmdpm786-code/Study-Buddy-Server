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
    isCompleted: {
      type: String,
      enum: ["Planned", "InProgress", "Done"],
      default: "Planned"
    },
    date:{
      type: String,
      require: true,
    }
  },
  { timestamp: true },
);

export const noteModel = mongoose.model("Note", todoNoteSchema);
