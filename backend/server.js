const { generateQuiz } = require("./openAiConnect");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4444;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies

// Routes
app.get("/", (req, res) => {
  res.send("Quiz Backend API is running");
});

// Endpoint to generate quiz questions
app.post("/generate-quiz", async (req, res) => {
  try {
    const {
      topic,
      numberOfQuestions,
      difficulty,
      language,
      description,
      level,
    } = req.body;
    if (!topic) {
      return res
        .status(400)
        .json({ error: "Topic is required to generate a quiz" });
    }

    console.log(`Generating quiz for topic: ${topic}`);

    // Call the OpenAI-based generateQuiz function
    const mockQuestions = await generateQuiz(
      topic,
      numberOfQuestions,
      language,
      difficulty,
      description,
      level
    );

    if (!mockQuestions) {
      return res.status(500).json({ error: "Failed to generate quiz" });
    }

    res.status(200).json({ questions: mockQuestions });
  } catch (error) {
    console.error("Error generating quiz:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while generating the quiz" });
  }
});

// Endpoint to retrieve default questions (static or from OpenAI)
app.get("/api/questions", async (req, res) => {
  try {
    // Call the OpenAI-based generateQuiz function to get default questions
    const questions = await generateQuiz("default topic");

    if (!questions) {
      return res.status(500).json({ error: "Failed to retrieve questions" });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching questions" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
