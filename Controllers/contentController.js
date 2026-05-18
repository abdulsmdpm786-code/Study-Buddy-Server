import { contentModel } from "../Models/contentModel.js";

const addContent = async(req, res)=>{
    try {
        console.log("in add content section");
        
        const {courseId} = req.params
        const {mainTitle , subTitle ,title, content} = req.body
        if(!mainTitle|| !subTitle || !title || !content){
            return res.status(400).json({errMsg: "All fields are required"})
        }

        const newContent = await contentModel.create({
            courseId: courseId,
            subTitle: subTitle,
            mainTitle: mainTitle,
            title: title,
            content: content

        })

        return res.status(200).json({message: "Content added", content: newContent})
    } catch (error) {
          res.status(error.status || 500).json({ errMsg: "internal error", error });
    }
}

const getContent = async (req, res)=>{
    try {
        const {courseId} = req.params
        console.log("course id", courseId);
        
        const contentResponse = await contentModel.find({courseId})
        if(!contentResponse){
            return res.status(404).json({errMsg: "Something error happened"})
        }


        return res.status(200).json({message: "got the items", content: contentResponse})
    } catch (error) {
        res.status(error.status || 500).json({ errMsg: "internal error", error });
    }
}


export {addContent, getContent}