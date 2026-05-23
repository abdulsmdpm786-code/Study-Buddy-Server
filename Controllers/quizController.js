import { quizModel } from "../Models/quizModel.js";

const quizAdd = async (req, res) => {
  try {
    console.log("in add section....");
    console.log("req.body", req.body);
    console.log("params", req.params);

    const { title, description ,questions } = req.body;
    const { courseId } = req.params;

    if (!title || !questions || !description) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    
    const quizQuestion = await quizModel.create({ courseId, title, description , questions });
    console.log("questions....", quizQuestion);

    return res.status(200).json({ message: "Added", quizQuestion });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const quizFind = async (req, res) => {
  try {
    console.log("in find section");
    
    const { courseId } = req.params;

    const courseQuiz = await quizModel.find({ courseId });
    if (!courseQuiz) {
      return res.status(404).json({ errMsg: "Course not found" });
    }

    return res.status(200).json({ message: "Got the quiz",Quiz: courseQuiz });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};

const quizDelete = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deleteQuiz = await quizModel.findByIdAndDelete({_id: courseId});
    if (!deleteQuiz) {
      return res.status(404).json({ errMsg: "Course not found" });
    }
console.log("delete..", deleteQuiz);

    return res.status(200).json({ message: "Deleted Quiz", deleteQuiz });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};

const getAll = async (req, res) =>{
  try {
    const fetchAll = await quizModel.find()
    if(!fetchAll){
      return res.status(404).json({errMsg: "Something went wrong"})
    }

    return res.status(200).json({message: "got it", Quiz: fetchAll})
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
}

export { quizAdd, quizFind, quizDelete, getAll };
