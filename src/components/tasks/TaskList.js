import React, { useContext } from "react";
import { List, Empty } from "antd";
import Task from "./Task";
import TaskContext from "../../context/tasks/TaskContext";

const TaskList = () => {
  const { projectTasks } = useContext(TaskContext);

  return (
    <List
      className="mt-4 shadow light"
      itemLayout="horizontal"
      locale={{ emptyText: <Empty description="No tasks registered" /> }}
      dataSource={projectTasks}
      renderItem={(item) => <Task key={item._id} task={item} />}
    />
  );
};

export default TaskList;
