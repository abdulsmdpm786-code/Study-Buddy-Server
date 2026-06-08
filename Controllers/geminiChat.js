import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API);

const getChat = async (req, res) => {
  try {
    const { message, history } = req.body;

    const model = genAi.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction:
        "You are a supportive study buddy. Help the student learn without just spoon-feeding answers.",
    });

    const chat = model.startChat({
      history: history || [],
    });

    const result = await chat.sendMessage(message);
    const aiResponse = result.response.text();

    return res.status(200).json({ replay: result });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ errMsg: "The AI is currently unavailable." });
  }
};

export { getChat };
