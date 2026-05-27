import mongoose from "mongoose";

const richTextSchema = mongoose.Schema({
  content: {
    type: String,
    require: true,
  },
},{ timestamps: true },);


export const richTextModel = mongoose.model("textEditor", richTextSchema)
