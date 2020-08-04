import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Typography,
  Card,
  Divider,
  notification,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import AuthContext from "../../context/auth/AuthContext";
import clientAxios from "../../config/axios";

const nameValidation = [
  { required: true, message: "Please input your name." },
  {
    whitespace: true,
    message: "Please input a valid name.",
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

const Register = (props) => {
  const [form] = Form.useForm();
  const { setToken, setIsAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    clientAxios
      .post("/api/users", values)
      .then((response) => {
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        setLoading(false);
        setToken(response.data.token);
        setIsAuth(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        props.setAutoLogout(remainingMilliseconds);

        return props.history.push("/projects");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response?.status === 422) {
          form.setFields([
            {
              name: "email",
              errors: [error.response.data.message],
            },
          ]);
          return;
        }

        console.log(error.response);

        notification.error({
          message: "Error",
          description: "Could not create user",
        });
      });
  };

  return (
    <Row className="h-full" justify="center" align="middle">
      <Col xs={22} sm={18} md={14} lg={10} xl={6}>
        <Card className="shadow">
          <Typography.Title className="text-center">Register</Typography.Title>

          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="name" label="Name" rules={nameValidation}>
              <Input prefix={<UserOutlined />} placeholder="Name" />
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
              <Button
                className="mb-3"
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
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
