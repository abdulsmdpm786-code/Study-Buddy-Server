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
      enum: ["toDoList","onGoing", "Completed"]
    }
  },
  { timestamp: true },
);

export const noteModel = mongoose.model("Note", todoNoteSchema)

