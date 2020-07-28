import React, { useState, useContext } from "react";
import { List, Tag, Typography } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const { Text } = Typography;

const Task = ({ task }) => {
  const { id, name, completed } = task;
  const { selectedProject } = useContext(ProjectContext);
  const { getTasks, updateTask, toggleCompletedTask, deleteTask } = useContext(
    TaskContext
  );
  const [taskName, setTaskName] = useState(name);

  const handleDeleteTask = (id) => {
    deleteTask(id);
    getTasks(selectedProject.id);
  };

  const handleToggleCompletedTask = (task) => {
    task.completed = !task.completed;
    toggleCompletedTask(task);
  };

  const handleChange = (value) => {
    if (value.trim() === "") return;

    const newTask = task;
    newTask.name = value;
    setTaskName(value);
    updateTask(newTask);
  };

  return (
    <List.Item
      className="px-3"
      key={id}
      actions={[
        <Tag
          icon={completed ? <CheckCircleOutlined /> : <SyncOutlined spin />}
          color={completed ? "success" : "processing"}
          onClick={() => handleToggleCompletedTask(task)}
        >
          {completed ? "Completed" : "Pending"}
        </Tag>,

        <a href="#!" onClick={() => handleDeleteTask(id)}>
          Delete
        </a>,
      ]}
    >
      <List.Item.Meta
        title={<Text editable={{ onChange: handleChange }}>{taskName}</Text>}
      />
    </List.Item>
  );
};

export default Task;
