const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

async function findModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Checking API for available models...");

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("\n✅ SUCCESS! YOUR KEY CAN USE THESE MODELS:");
      data.models.forEach(m => {
        console.log(` - ${m.name} (Supports: ${m.supportedGenerationMethods.join(", ")})`);
      });
    } else if (data.error) {
      console.log("\n❌ API ERROR:");
      console.log(JSON.stringify(data.error, null, 2));
    } else {
      console.log("\n❓ UNKNOWN RESPONSE:");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.log("\n💥 NETWORK ERROR:", err.message);
  }
}

findModels();
