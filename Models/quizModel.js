import mongoose from "mongoose";

const questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);


const quizSchema = mongoose.Schema(
  {
    courseId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      required: true,
    },
  },
  { timestamp: true },
);

export const quizModel = mongoose.model("Quiz", quizSchema);
