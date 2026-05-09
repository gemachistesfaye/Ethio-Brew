const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There isn't a direct listModels in the simple SDK, but we can try common ones
    const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const m of models) {
        try {
            const model = genAI.getGenerativeModel({ model: m });
            const result = await model.generateContent("hi");
            const response = await result.response;
            console.log(`Model ${m} WORKS!`);
            return m;
        } catch (e) {
            console.log(`Model ${m} failed: ${e.message}`);
        }
    }
  } catch (error) {
    console.error(error);
  }
}

listModels();
