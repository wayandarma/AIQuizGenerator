import { Form, Input } from "antd";

const TopicInput = () => (
  <Form.Item
    name="topic"
    label="Topic"
    rules={[{ required: true, message: "Please enter a topic!" }]}
  >
    <Input placeholder="e.g: Global Warming" />
  </Form.Item>
);

export default TopicInput;
