const courseAdd = (req, res)=> {
    try {

        const {title, description, price, duration} = req.body
        if(!title || !description || !price || !duration){
            return res.status(400).json({errMsg: "All fields are required"})
        }
        console.log(req.file, "image uploaded by multer");
        
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({errMsg: "internal error"})
    }
}

export {
    courseAdd
}