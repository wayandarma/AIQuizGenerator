import { useState } from "react";
import { Card, Button, Typography } from "antd";
import { motion } from "framer-motion";

const { Paragraph, Title } = Typography;

const QuestionsUI = ({ questions, onQuestionChange }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Tracks the clicked option
  const [isSubmitted, setIsSubmitted] = useState(false); // Tracks if the answer was submitted
  const [feedback, setFeedback] = useState(""); // Tracks feedback (correct/incorrect)
  const [showNext, setShowNext] = useState(false); // Tracks if the "Next" button should be shown

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];

    setIsSubmitted(true);

    if (selectedOption === currentQuestion.correct_answer) {
      setFeedback("Correct!");
      setShowNext(true); // Allow user to proceed to the next question
    } else {
      setFeedback("Incorrect!");
      setShowNext(true);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;
    setFeedback("");
    setSelectedOption(null); // Reset selected option
    setIsSubmitted(false); // Reset submit state
    setShowNext(false); // Hide the next button
    setCurrentQuestionIndex(nextIndex); // Move to the next question
    onQuestionChange(nextIndex); // Notify parent of the change
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      {currentQuestion ? (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card bordered={true} style={{ textAlign: "center" }}>
            <Title level={1} style={{ color: "#1890ff" }}>
              {`Question ${currentQuestionIndex + 1}`}
            </Title>
            <Paragraph style={{ fontSize: "16px", marginBottom: "20px" }}>
              {currentQuestion.question}
            </Paragraph>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  type={selectedOption === option ? "primary" : "default"}
                  block
                  onClick={() => setSelectedOption(option)}
                  style={{
                    backgroundColor:
                      isSubmitted && selectedOption === option
                        ? option === currentQuestion.correct_answer
                          ? "green" // Correct answer turns green
                          : "red" // Wrong answer turns red
                        : undefined,
                    color:
                      isSubmitted && selectedOption === option
                        ? "white"
                        : undefined,
                  }}
                  disabled={isSubmitted} // Disable buttons after submission
                >
                  {option}
                </Button>
              ))}
            </div>
            {isSubmitted && feedback === "Incorrect!" && (
              <div>
                <Paragraph style={{ marginTop: "20px" }}>
                  <strong>Correct Answer:</strong>{" "}
                  {currentQuestion.correct_answer}
                </Paragraph>
              </div>
            )}
            {!isSubmitted ? (
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={handleSubmit}
                disabled={!selectedOption} // Disable submit if no option selected
              >
                Submit
              </Button>
            ) : (
              showNext && (
                <div>
                  <Paragraph>
                    <em>Reason : </em> {currentQuestion.reasoning}
                  </Paragraph>
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              )
            )}
          </Card>
        </motion.div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Title level={3}>Congratulations! You've completed the quiz!</Title>
        </div>
      )}
    </div>
  );
};

export default QuestionsUI;
