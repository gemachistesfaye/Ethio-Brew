const fetch = require('node-fetch');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

async function findModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    fs.writeFileSync('models_list.json', JSON.stringify(data, null, 2));
    console.log("File saved to models_list.json");
  } catch (err) {
    console.log("Error:", err.message);
  }
}

findModels();
