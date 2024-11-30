import { Form, Input } from "antd";

const DescriptionInput = () => (
  <Form.Item name="description" label="Description (Optional)">
    <Input.TextArea placeholder="Specify key knowledge points or skills this quiz aims to assess." />
  </Form.Item>
);

export default DescriptionInput;
