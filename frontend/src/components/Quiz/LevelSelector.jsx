import { Form, Select } from "antd";

const { Option } = Select;

const LevelSelector = () => (
  <Form.Item name="level" label="Level">
    <Select>
      <Option value="None">None</Option>
      <Option value="Beginner">Beginner</Option>
      <Option value="Intermediate">Intermediate</Option>
      <Option value="Advanced">Advanced</Option>
    </Select>
  </Form.Item>
);

export default LevelSelector;
