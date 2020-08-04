import React, { useContext } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const nameValidation = [
  {
    required: true,
    message: "Please input the task name.",
  },
  {
    whitespace: true,
    message: "Please input a valid task name.",
  },
];

const TaskForm = () => {
  const { selectedProject } = useContext(ProjectContext);
  const { tasks, addTask, getTasks } = useContext(TaskContext);

  const [form] = Form.useForm();

  const handleSubmit = (task) => {
    task.id = tasks.length + 1;
    task.projectId = selectedProject._id;
    task.completed = false;
    addTask(task);

    getTasks(selectedProject._id);
    form.resetFields();
  };

  return (
    <Form form={form} className="mt-3" onFinish={handleSubmit} layout="inline">
      <Row className="w-100 mb-0" gutter={[0, 24]}>
        <Col xs={24} md={20}>
          <Form.Item name="name" label="Name" rules={nameValidation}>
            <Input prefix={<FileDoneOutlined />} placeholder="Task Name" />
          </Form.Item>
        </Col>

        <Col xs={24} md={4}>
          <Form.Item className="w-100">
            <Button className="mb-3" type="primary" htmlType="submit" block>
              Create
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
