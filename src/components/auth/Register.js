import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Typography, Card, Divider } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

const usernameValidation = [
  { required: true, message: "Please input your username." },
  {
    whitespace: true,
    message: "Please input a valid username.",
  },
];
const emailValidation = [
  {
    required: true,
    message: "Please input your email.",
  },
  {
    type: "email",
    message: "Please input a valid email.",
  },
];
const passwordValidation = [
  {
    required: true,
    message: "Please input your password.",
  },
  {
    whitespace: true,
    message: "Please input a valid password.",
  },
  {
    min: 6,
    message: "The password must contain at least 6 characters.",
  },
];
const confirmPassword = [
  {
    required: true,
    message: "Please confirm your password.",
  },
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("The two passwords that you entered do not match.");
    },
  }),
];

const Register = () => {
  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="h-full" justify="center" align="middle">
      <Col xs={22} sm={18} md={14} lg={10} xl={6}>
        <Card className="shadow">
          <Typography.Title className="text-center">Register</Typography.Title>

          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="username"
              label="Username"
              rules={usernameValidation}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={emailValidation}>
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={passwordValidation}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              rules={confirmPassword}
              hasFeedback
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button className="mb-3" type="primary" htmlType="submit" block>
                Register
              </Button>

              <Divider className="mb-0" plain>
                or <Link to="/">Log in</Link>
              </Divider>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Register;
