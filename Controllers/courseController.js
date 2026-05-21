import { courseModel } from "../Models/courseModel.js";
import uploadCloudinary from "../Utilities/cloudinaryUtilities.js";
import fs from "fs"

const courseAdd = async (req, res) => {
  try {
    console.log("in add section.....");
    console.log("body", req.body)    // ← should show all fields
  console.log("file", req.file) 

    const { shortTitle, title, description ,  price, duration } = req.body;
    if (!shortTitle || !title || !description || !price || !duration ) {
      return res.status(400).json({ errMsg: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ errMsg: "Image not provided" });
    }
    console.log(req.file, "image uploaded by multer");

    
    const imageUrl = await uploadCloudinary(req.file.path);

    const newCourse = await courseModel.create({
      shortTitle: req.body.shortTitle,
      title: req.body.title,
      description: req.body.description,
      duration: req.body.duration,
      price: req.body.price,
      Image: imageUrl,
    });

    return res.status(200).json({ message: "All clear...", newCourse });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const listCourse = async (req, res) => {
  try {
    console.log("in list course section...");


    const {search, category} = req.query
    // console.log("search backend..", category);


    let query = {}

    if(search){
      query.title = {$regex: search, $options: 'i'}
    }

    if(category && category !== "All"){
      query.shortTitle = category
    }
    
    const courseList = await courseModel.find(query);
console.log("course...", courseList);

    res.status(200).json({ Courses: courseList });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const courseId = async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseDetail = await courseModel.findById({ _id: courseId });
    if (!courseDetail) {
      return res.status(400).json({ errMsg: "Course not found" });
    }

    return res.status(200).json({ message: "Got the course", courseDetail });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const courseName = async (req, res) => {
  try {
    console.log(req.body);

    const courseName = await courseModel.findOne(req.body);
    if (!courseName) {
      return res.status(404).json({ errMsg: "Course not found" });
    }

    return res.status(200).json({ message: "Course found", courseName });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};


const updateOne = async (req, res) => {
  try {
    console.log("in update one section...");
    
    const { id } = req.params;
    const updateData = { ...req.body };

    let findCourse = await courseModel.findById(id);
    console.log(findCourse);

    if (!findCourse) {
      return res.status(404).json({ errMsg: "Course not found" });
    }
    console.log("request file",req.file);
    
    if (req.file) {
      const courseUrl = await uploadCloudinary(req.file.path);
      updateData.Image = courseUrl;
      fs.unlinkSync(req.file.path);
    }


    const updateItem = await courseModel.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    );

    console.log("data item", updateItem);
    
    return res.status(200).json({ message: "updated", updateItem });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
};

const deleteCourse = async (req, res)=> {
  try {
    const {id} = req.params
    const deleteCourse = await courseModel.findByIdAndDelete(id)
    if(!deleteCourse){
      return res.status(404).json({ errMsg: "Course not found" });
    }

    return res.status(200).json({message: "Course deleted", deleteCourse})
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ errMsg: "internal error", error });
  }
}

export { courseAdd, listCourse, courseId, courseName, updateOne, deleteCourse };
