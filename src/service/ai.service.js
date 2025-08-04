
require("dotenv").config()
const  { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


 async function generateCaption(base64ImageFile){

    
    const contents = [
    {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
},
{ text: "Caption this image." },
];
//give prompt to ai for generate coaption 
const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      You are an expert in generating captions for images.
      You generate single caption for this image.
      Your caption Should be short and concise.
      Use Tapori Language with asthetic style,
      Using dark humor in it,
      You Use hashtags and emojis in your caption.
      `
    },
});
return response.text;
}


module.exports = generateCaption
