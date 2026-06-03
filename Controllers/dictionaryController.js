import axios from "axios"

const getWord = async (req, res) => {
  try {
    console.log("in dicti.....");

    const { word } = req.body;
    console.log("word...",word);
    
    if (!word) {
      return res.status(400).json({ errMsg: "input is empty" });
    }

    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    console.log("res.....",response.data);
    
    return res.status(200).json({ message: "Got the meaning", data: response.data});
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ errMsg: "internal error", error });
  }
};

export { getWord };
