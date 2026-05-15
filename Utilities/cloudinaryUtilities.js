import cloudinary from "../Config/clodinaryConfig.js";


const uploadCloudinary = async(filePath)=>{
    try {
        
        const response = await cloudinary.uploader.upload(filePath, {
            folder: "test"
        })

        return response.secure_url
    } catch (error) {
        console.log("upload error", error);
        throw error
    }

}

export default uploadCloudinary