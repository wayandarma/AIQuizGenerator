import axios from "axios";
import { useState } from "react";
import { Form, Button, Row, Col, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import TopicInput from "./TopicInput";
import NumberInput from "./NumberInput";
import LevelSelector from "./LevelSelector";
import DifficultySelector from "./DifficultySelector";
import LanguageSelector from "./LanguageSelector";
import DescriptionInput from "./DescriptionInput";

const { Title } = Typography;

const QuizForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Spinner state
  const [messageApi, contextHolder] = message.useMessage(); // Message API
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    // Simulate loading for 5 seconds
    setLoading(true);
    axios
      .post("http://localhost:4444/generate-quiz", values)
      .then((response) => {
        setLoading(false); // Stop the spinner
        messageApi.open({
          type: "success",
          content:
            response.data.message ||
            "Quiz results have been successfully generated!",
        });
        console.log(response.data);
        navigate("/quiz", { state: { quizData: response.data.questions } });
      })
      .catch((error) => {
        setLoading(false); // Stop the spinner
        console.error("Error generating quiz:", error);
        messageApi.open({
          type: "error",
          content: "Failed to generate quiz. Please try again.",
        });
      });
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "20px",
        border: "5px solid #ccc",
        borderRadius: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      {contextHolder} {/* Context for notifications */}
      <Title level={2}>Generate a Quiz</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          contentType: "Topic",
          questions: 5,
          options: 4,
          level: "Beginner",
          difficulty: "Medium",
          language: "Indonesia",
        }}
      >
        <Row gutter={[8, 8]}>
          {/* Topic Input */}
          <Col span={24}>
            <TopicInput />
          </Col>

          {/* Number of Questions and Options */}
          <Col xs={24} sm={12}>
            <NumberInput
              label="How Many Questions? (1-10, up to 60 for Paid Users)"
              name="numberOfQuestions"
              min={1}
              max={60}
            />
          </Col>
          <Col xs={24} sm={12}>
            <NumberInput
              label="Number of Options"
              name="options"
              min={2}
              max={10}
            />
          </Col>

          {/* Level Selector and Difficulty */}
          <Col xs={24} sm={12}>
            <LevelSelector />
          </Col>
          <Col xs={24} sm={12}>
            <DifficultySelector />
          </Col>

          {/* Language Selector */}
          <Col span={24}>
            <LanguageSelector />
          </Col>

          {/* Description Input */}
          <Col span={24}>
            <DescriptionInput />
          </Col>

          {/* Submit Button */}
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" block disabled={loading}>
                {loading ? "Generating..." : "Generate"}
              </Button>
            </Form.Item>
          </Col>

          {/* Spinner */}
          {loading && (
            <Col span={24} style={{ textAlign: "center", marginTop: "20px" }}>
              <Spin size="large" tip="Processing..." />
            </Col>
          )}
        </Row>
      </Form>
    </div>
  );
};

export default QuizForm;
