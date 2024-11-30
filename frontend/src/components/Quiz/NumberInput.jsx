import { Form, InputNumber } from "antd";

const NumberInput = ({ label, name, min, max }) => (
  <Form.Item
    name={name}
    label={label}
    rules={[
      { required: true, message: `Please enter ${label.toLowerCase()}!` },
    ]}
  >
    <InputNumber min={min} max={max} style={{ width: "100%" }} />
  </Form.Item>
);

export default NumberInput;
