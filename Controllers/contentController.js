import { contentModel } from "../Models/contentModel.js";

const addContent = async (req, res) => {
  try {
    console.log("in add content section");

    const { courseId } = req.params;
    const { mainTitle, subTitle, title, content } = req.body;
    if (!mainTitle || !subTitle || !title || !content) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }

    const newContent = await contentModel.create({
      courseId: courseId,
      subTitle: subTitle,
      mainTitle: mainTitle,
      title: title,
      content: content,
    });

    return res
      .status(200)
      .json({ message: "Content added", content: newContent });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const getContent = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log("course id", courseId);

    const contentResponse = await contentModel.find({ courseId });
    if (!contentResponse) {
      return res.status(404).json({ errMsg: "Something error happened" });
    }

    return res
      .status(200)
      .json({ message: "got the items", content: contentResponse });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const editContent = async (req, res) => {
  try {
    console.log("in edit  section");

    const { contentId } = req.params;
    console.log("id", contentId);

    const updateContent = req.body 
    console.log("content", updateContent);

    if (!updateContent) {
      return res.status(400).json({ errMsg: "Fill all fields" });
    }

    const findContent = await contentModel.find({ _id: contentId });
    if (!findContent) {
      return res.status(400).json({ errMsg: "Content not found" });
    }
    console.log("content find", findContent);

    const updated = await contentModel.findByIdAndUpdate(
      contentId,
      { $set: updateContent },
      { new: true },
    );
    console.log("updated..", updated);
    
    return res.status(200).json({ message: "updated..", updated });
  } catch (error) {
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const deleteContent = async (req, res) => {
  try {
    console.log("in delete section");
    
    const { contentId } = req.params;
    console.log("id", contentId);
    

    const findContent = await contentModel.findByIdAndDelete({_id: contentId});
    if (!findContent) {
      return res.status(400).json({ errMsg: "Content not found" });
    }

    console.log("delete item", findContent);
    
    return res.status(200).json({ message: "Content deleted", findContent });
  } catch (error) {
    return res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};



export { addContent, getContent, editContent, deleteContent };
