
import { GoogleGenAI, Type } from "@google/genai";
import type { CurriculumModule } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: "The title of the learning module."
      },
      description: {
        type: Type.STRING,
        description: "A brief summary of what this module covers."
      },
      subtopics: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING
        },
        description: "A list of key subtopics or concepts within this module."
      }
    },
    required: ["title", "description", "subtopics"]
  }
};

export const generateCurriculum = async (topic: string): Promise<CurriculumModule[]> => {
  const prompt = `أنت خبير في تصميم المناهج التعليمية. قم بإنشاء منهج تعليمي شامل ومفصل لموضوع: "${topic}". يجب أن يكون المنهج مقسمًا إلى وحدات منطقية. لكل وحدة، قدم عنوانًا واضحًا، ووصفًا موجزًا، وقائمة بالنقاط الفرعية أو المفاهيم الأساسية التي يجب تغطيتها.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation to ensure the response structure is as expected
    if (Array.isArray(parsedJson) && parsedJson.every(item => 'title' in item && 'description' in item && 'subtopics' in item)) {
        return parsedJson as CurriculumModule[];
    } else {
        throw new Error("Invalid JSON structure received from API.");
    }

  } catch (error) {
    console.error("Error generating curriculum:", error);
    throw new Error("Failed to generate curriculum from Gemini API.");
  }
};
