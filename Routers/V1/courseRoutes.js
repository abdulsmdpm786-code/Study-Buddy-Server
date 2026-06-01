import express from "express";
import upload from "../../Middlewares/multer.js";
import {
  courseAdd,
  courseId,
  courseName,
  deleteCourse,
  listCourse,
  updateOne,
} from "../../Controllers/courseController.js";
import authAdmin from "../../Middlewares/verifyAdmin.js";
import authUser from "../../Middlewares/verifyUser.js";

const courseRouter = express.Router();


courseRouter.post("/create",  upload.single("Image"), courseAdd);
courseRouter.get("/getList", authUser, listCourse);
courseRouter.get("/getOne/:courseId", authUser, courseId);
courseRouter.get("/getName", authUser, courseName);
courseRouter.patch(
  "/updateOne/:id",
  authAdmin,
  upload.single("image"),
  updateOne,
);
courseRouter.delete("/deleteCourse/:id", authAdmin, deleteCourse);

export default courseRouter;
