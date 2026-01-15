// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const dotenv = require("dotenv");

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const analyzeSentiment = async (text) => {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     const prompt = `Analyze the sentiment of the following journal entry. 
//     Provide the response in JSON format with the following fields: 
//     - mood: A single word describing the mood (e.g., Happy, Sad, Anxious, Calm, Angry).
//     - sentimentScore: A number between -1 (negative) and 1 (positive).
//     - analysis: A brief, supportive, non-medical insight or observation about the entry (max 2 sentences).

//     Journal Entry: "${text}"`;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const textResponse = response.text();

//     // Clean up markdown code blocks if present
//     const cleanText = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
    
//     return JSON.parse(cleanText);
//   } catch (error) {
//     console.error("Gemini Sentiment Analysis Error:", error);
//     // Fallback if AI fails
//     return {
//       mood: "Neutral",
//       sentimentScore: 0,
//       analysis: "Unable to analyze sentiment at this moment."
//     };
//   }
// };

// const chatWithGemini = async (message, history = []) => {
//     try {
//         const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//         // Convert history to Gemini format (if needed, simplified here)
//         // Gemini Pro supports chat history
//         const chat = model.startChat({
//             history: history,
//             generationConfig: {
//                 maxOutputTokens: 200,
//             },
//         });

//         const result = await chat.sendMessage(message);
//         const response = await result.response;
//         return response.text();
//     } catch (error) {
//         console.error("Gemini Chat Error:", error);
//         return "I'm having trouble connecting right now. Please try again later.";
//     }
// }

// module.exports = { analyzeSentiment, chatWithGemini };
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * ==============================
 * SENTIMENT ANALYSIS (Journal)
 * ==============================
 */
const analyzeSentiment = async (text) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze the sentiment of the following journal entry.

Return ONLY valid JSON with these fields:
- mood: one word (Happy, Sad, Anxious, Calm, Angry, Exhausted, Neutral)
- sentimentScore: number between -1 and 1
- analysis: short, supportive, non-medical insight (max 2 sentences)

Journal Entry:
"${text}"
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Remove markdown if Gemini adds it
    const cleanText = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("Gemini Sentiment Analysis Error:", error);

    // Safe fallback
    return {
      mood: "Neutral",
      sentimentScore: 0,
      analysis: "Unable to analyze sentiment at the moment.",
    };
  }
};

/**
 * ==============================
 * CHAT WITH AI (STABLE VERSION)
 * ==============================
 * ✔ No streaming
 * ✔ No history bugs
 * ✔ No half responses
 * ✔ Interview-safe
 */
const chatWithGemini = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a calm, supportive mental wellness companion.
- Be empathetic and friendly
- Do NOT give medical or clinical advice
- Keep responses concise (3–5 sentences)
- Offer gentle suggestions, not commands

User message:
"${message}"
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return responseText;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

module.exports = {
  analyzeSentiment,
  chatWithGemini,
};
