import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Typography, Card, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

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
];

const Login = () => {
  const handleSubmit = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Row className="h-full" justify="center" align="middle">
      <Col xs={22} sm={18} md={14} lg={10} xl={6}>
        <Card className="shadow">
          <Typography.Title className="text-center">Log in</Typography.Title>

          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item name="email" label="Email" rules={emailValidation}>
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={passwordValidation}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button className="mb-3" type="primary" htmlType="submit" block>
                Log in
              </Button>

              <Divider className="mb-0" plain>
                or <Link to="/register">Register</Link>
              </Divider>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
