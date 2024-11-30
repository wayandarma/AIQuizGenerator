import { Progress } from "antd";

const ProgressBar = ({ totalQuestions, currentQuestionIndex }) => {
  const progressPercentage = Math.round(
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  );

  return (
    <div style={{ marginBottom: "20px" }}>
      <Progress
        percent={progressPercentage}
        status="active"
        strokeColor="#1890ff"
        showInfo
      />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <strong>
          {currentQuestionIndex + 1 > totalQuestions
            ? "You have completed the quiz"
            : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
        </strong>
      </div>
    </div>
  );
};

export default ProgressBar;
