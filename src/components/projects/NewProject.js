import React, { useState, useContext } from "react";
import { Form, Input, Button, Modal } from "antd";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import ProjectContext from "../../context/projects/ProjectContext";

const nameValidation = [
  {
    required: true,
    message: "Please input the project name.",
  },
  {
    whitespace: true,
    message: "Please input a valid project name.",
  },
];

const ProjectForm = ({ visible, handleSubmit, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="New project"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleSubmit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Name" rules={nameValidation}>
          <Input
            prefix={<FundProjectionScreenOutlined />}
            placeholder="Project Name"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const NewProject = () => {
  const { addProject } = useContext(ProjectContext);

  const [visible, setVisible] = useState(false);

  const handleSubmit = (project) => {
    addProject(project);
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" block onClick={() => setVisible(true)}>
        New Project
      </Button>

      <ProjectForm
        visible={visible}
        handleSubmit={handleSubmit}
        onCancel={() => setVisible(false)}
      />
    </div>
  );
};

export default NewProject;
