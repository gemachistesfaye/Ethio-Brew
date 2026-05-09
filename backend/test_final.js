const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

async function deepScan() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("Starting Deep Scan for models...");

  // 1. Try to list all models available to this key
  try {
    const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
    const res = await fetch(listUrl);
    const data = await res.json();
    
    if (data.models) {
      console.log("AVAILABLE MODELS FOR YOUR KEY:");
      data.models.forEach(m => console.log(` - ${m.name}`));
    } else {
      console.log("Could not list models directly. Data:", JSON.stringify(data));
    }
  } catch (e) {
    console.log("List models failed:", e.message);
  }

  // 2. Try common model names with a simple prompt
  const modelsToTry = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-pro",
    "gemini-1.0-pro"
  ];

  console.log("\nTesting specific models...");
  for (const modelName of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: "hi" }] }] })
      });
      const result = await response.json();
      if (result.candidates) {
        console.log(`✅ SUCCESS: ${modelName} is WORKING!`);
      } else {
        console.log(`❌ FAILED: ${modelName} - ${result.error?.message || "Unknown error"}`);
      }
    } catch (err) {
      console.log(`❌ ERROR: ${modelName} - ${err.message}`);
    }
  }
}

deepScan();
