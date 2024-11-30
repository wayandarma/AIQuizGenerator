const OpenAI = require("openai");

// Extract JSON from response
function extractJsonFromText(input) {
  try {
    const jsonStart = input.indexOf("{");
    const jsonEnd = input.lastIndexOf("}");
    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = input.slice(jsonStart, jsonEnd + 1);
      return JSON.parse(jsonString);
    } else {
      console.error("No valid JSON found in the input text.");
    }
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
  }
  return null;
}

// Generate quiz with response format
const generateQuiz = async (
  quizTopic,
  numberOfQuestions,
  language,
  difficulty,
  description,
  level
) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates gaming quizzes.",
        },
        {
          role: "user",
          content: `Make ${numberOfQuestions} quiz questions about ${quizTopic}, in ${language} language, with ${difficulty}, more detail description : ${description}, the level of complexity : ${level} in the following JSON format:
        {
          "questions": [
            {
              "question": "The question text",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "correct_answer": "The correct option text",
              "reasoning": "Explanation for the correct answer"
            }
          ]
        }`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // Extract JSON content from the response
    const jsonData = extractJsonFromText(response.choices[0].message.content);

    if (jsonData) {
      console.log("Generated Quiz JSON:", JSON.stringify(jsonData, null, 2));
      console.log(`making quiz for ${quizTopic}, in ${language} language`);
      return jsonData;
    } else {
      console.error("Failed to parse JSON data.");
    }
  } catch (error) {
    console.error("Error generating quiz:", error.message);
  }
};

module.exports = {
  generateQuiz,
};
