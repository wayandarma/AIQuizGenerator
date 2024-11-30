import { useLocation } from "react-router-dom";
import QuestionsUI from "./QuestionsUi";
import ProgressBar from "../ProgressBar";
import { useState, useEffect } from "react";

const Questions = () => {
  const location = useLocation();
  const quizData = location.state?.quizData;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track the current question index

  if (!quizData) {
    return <div>The quiz is not found</div>;
  }

  const handleQuestionChange = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {currentQuestionIndex > quizData.questions.length - 1 ? (
        <>
          <h2>Quiz Completed!</h2>
          <p>Thank you for taking the quiz.</p>
        </>
      ) : (
        <h1>Quiz Questions</h1>
      )}
      {/* Render ProgressBar and pass dynamic data */}
      <ProgressBar
        totalQuestions={quizData.questions.length}
        currentQuestionIndex={currentQuestionIndex}
      />
      {/* Pass the question change handler to QuestionsUI */}
      <QuestionsUI
        questions={quizData.questions}
        onQuestionChange={handleQuestionChange}
      />
    </div>
  );
};

export default Questions;
