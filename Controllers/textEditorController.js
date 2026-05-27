import { richTextModel } from "../Models/richText.js";

const createText = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ errMsg: "Input is empty" });
    }

    const addNotes = await richTextModel.create({
      content,
    });
    return res.status(200).json({ message: "text added", note: addNotes });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const editText = async (req, res) => {
  try {
    const { textParam } = req.params;
    const updateText = req.body;
    console.log("update text", updateText);

    const findText = await richTextModel.find({ _id: textParam });
    console.log("found...", findText);

    const updatedText = await richTextModel.findByIdAndUpdate(
      textParam,
      { $set: updateText },
      { new: true },
    );
    console.log("updated", updateText);
    return res.status(200).json({ message: "updated..", updatedText });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};

const deleteText = async (req, res) => {
  try {
    const { textParam } = req.params;

    const deleteText = await richTextModel.findByIdAndDelete({
      _id: textParam,
    });
    console.log("updated", deleteText);
    return res.status(200).json({ message: "deleted..", deleteText });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};

const getText = async (req, res) => {
  try {
    const fetchAll = await richTextModel.find();
    if (!fetchAll) {
      return res.status(404).json({ errMsg: "Something went wrong" });
    }

    return res.status(200).json({ message: "got it", text: fetchAll });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};


export { createText, editText, deleteText, getText };
