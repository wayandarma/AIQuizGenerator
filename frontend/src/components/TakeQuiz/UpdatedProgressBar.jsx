import { Progress } from "antd";

const ProgressBar = ({ questionStatuses }) => {
  const totalQuestions = questionStatuses.length;

  return (
    <div style={{ marginBottom: "20px" }}>
      <Progress
        percent={
          (questionStatuses.filter((status) => status !== null).length /
            totalQuestions) *
          100
        }
        status="active"
        strokeColor={{
          "0%": "#1890ff", // Default blue gradient
          "100%": "#1890ff",
        }}
        steps={totalQuestions} // Create segments based on total questions
        trailColor="#f0f0f0" // Background color of the remaining segments
        strokeLinecap="square" // Square edges for clear sections
        format={() =>
          `${
            questionStatuses.filter((status) => status === "correct").length
          }/${totalQuestions} Correct`
        }
      />
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {questionStatuses.map((status, index) => (
          <span
            key={index}
            style={{
              margin: "0 5px",
              color:
                status === "correct"
                  ? "#1890ff"
                  : status === "incorrect"
                  ? "red"
                  : "gray",
              fontWeight: "bold",
            }}
          >
            {status ? `Q${index + 1}` : "-"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
