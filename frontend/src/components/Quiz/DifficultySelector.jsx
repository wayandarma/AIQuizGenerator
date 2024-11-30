import { Form, Select } from "antd";

const { Option } = Select;

const DifficultySelector = () => (
  <Form.Item
    name="difficulty"
    label="Difficulty"
    rules={[{ required: true, message: "Please select a difficulty level!" }]}
  >
    <Select>
      <Option value="Easy">Easy</Option>
      <Option value="Medium">Medium</Option>
      <Option value="Hard">Hard</Option>
    </Select>
  </Form.Item>
);

export default DifficultySelector;
