import { noteModel } from "../Models/todoNote.js";

const addTodo = async (req, res) => {
  try {
    const { title, description, isCompleted } = req.body;
    if (!title || !description || !isCompleted) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const newNote = await noteModel.create({ title, description, isCompleted });

    return res.status(200).json({ note: newNote, message: "note created" });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const editTodo = async (req, res) => {
  try {
    const { noteId } = req.params;
    const { title, description, isCompleted } = req.body;

    const editNote = await noteModel.findByIdAndUpdate(
      noteId,
      { $set: req.body },
      { new: true },
    );

    return res.status(200).json({ edited: editNote, message: "updated" });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { noteId } = req.params;

    const deleted = await noteModel.findByIdAndDelete(noteId);
    return res.status(200).json({ note: deleted, message: "deleted" });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const getTodo = async (req, res) => {
  try {
    const notes = await noteModel.find();
    return res.status(200).json({ note: notes, message: "got it" });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

export { addTodo, editTodo, deleteTodo, getTodo };
