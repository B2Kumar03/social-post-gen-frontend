// services/socialPostGeneratorService.js
import { genAI } from "./constant.js";

export const generateSocialPost = async (platform, topic) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build dynamic prompt
    const prompt = `
You are a professional social media copywriter.
Write a ${platform} post for the topic: "${topic}".
Make sure the tone and format are suitable for the ${platform} audience.
Keep it concise and engaging.
Return only the post text with no extra formatting.
`;

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const raw = await result.response.text();
    const post = raw.trim().replace(/^```[\s\S]*?\n/, "").replace(/```$/, "");

    return {
      platform,
      post,
    };
  } catch (error) {
    console.error("Social post generation error:", error);
    throw error;
  }
};




export default generateSocialPost;
