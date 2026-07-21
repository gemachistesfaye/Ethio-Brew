const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const SYSTEM_PROMPT = `You are the 'Ethio-Brew Sommelier', an elite AI expert on Ethiopian coffee heritage.

STYLING RULES:
- Use **bolding** for coffee regions and *italics* for flavor notes.
- Use emojis SPARINGLY (max 1 per response, only at the end).
- Be concise and punchy for simple greetings.
- Be deeply detailed and cinematic only when asked for recommendations or history.

Always prioritize Ethiopian varieties (Yirgacheffe, Sidamo, Harar, Guji, Jimma) and cultural traditions.

CRITICAL LANGUAGE RULE:
- If language is 'am', you MUST speak ONLY Amharic.
- If language is 'om', you MUST speak ONLY Afaan Oromoo.
- If language is 'en', you MUST speak ONLY English.`;

const chat = async (req, res) => {
  const { message, language } = req.body;

  if (typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ status: 'error', message: 'A non-empty message is required.' });
  }
  if (message.length > 1000) {
    return res.status(413).json({ status: 'error', message: 'Message too long (max 1000 characters).' });
  }

  const lang = ['am', 'om', 'en'].includes(language) ? language : 'en';

  if (!genAI) {
    return res.status(503).json({ status: 'error', message: 'AI service is not configured.' });
  }

  const langLabel = lang === 'am' ? 'Amharic' : lang === 'om' ? 'Afaan Oromoo' : 'English';
  const prompt = `${SYSTEM_PROMPT}\n\nCurrent Language: ${langLabel}.`;

  const models = ['gemini-2.0-flash', 'gemini-2.5-flash'];
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent([
        { text: prompt },
        { text: `User Query: ${message}` },
      ]);
      const text = result.response.text();
      if (text) return res.json({ response: text });
    } catch {
      continue;
    }
  }

  res.status(502).json({ status: 'error', message: 'AI service is temporarily unavailable.' });
};

module.exports = { chat };
