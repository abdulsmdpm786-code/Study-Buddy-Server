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
  },
  { timestamp: true },
);


const noteModel = mongoose.model("Note", todoNoteSchema)
