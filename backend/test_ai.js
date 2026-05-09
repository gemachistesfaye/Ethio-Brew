const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

async function testAI() {
  console.log("Testing Gemini AI with key:", process.env.GEMINI_API_KEY ? "FOUND" : "MISSING");
  
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY is not set in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    console.log("Attempting to connect to gemini-1.5-flash...");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello, are you working?");
    const response = await result.response;
    console.log("SUCCESS! Response:", response.text());
  } catch (error) {
    console.error("FAILED! Detailed Error:");
    console.error(error);
  }
}

testAI();
