import { Form, Select } from "antd";

const { Option } = Select;

const LanguageSelector = () => (
  <Form.Item
    name="language"
    label="Output Language"
    rules={[{ required: true, message: "Please select an output language!" }]}
  >
    <Select>
      <Option value="English">English</Option>
      <Option value="Spanish">Spanish</Option>
      <Option value="French">French</Option>
      <Option value="German">German</Option>
      <Option value="Indonesia">Indonesia</Option>
      <Option value="Japanese">Japanese</Option>
    </Select>
  </Form.Item>
);

export default LanguageSelector;
