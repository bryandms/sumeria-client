import React, { useReducer } from "react";
import { notification } from "antd";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";
import { PROJECT_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../../types";
import clientAxios from "../../config/axios";

const TaskState = (props) => {
  const initialState = {
    projectTasks: [],
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = async (projectId) => {
    try {
      const result = await clientAxios.get("/api/tasks", {
        params: { project: projectId },
      });

      dispatch({
        type: PROJECT_TASKS,
        payload: result.data.tasks,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Could not fetch tasks.",
      });
    }
  };

  const addTask = async (task) => {
    try {
      const result = await clientAxios.post("/api/tasks", task);

      dispatch({
        type: ADD_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "The task could not be added.",
      });
    }
  };

  const updateTask = async (task) => {
    try {
      const result = await clientAxios.put(`/api/tasks/${task._id}`, task);

      dispatch({
        type: UPDATE_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "The task could not be updated.",
      });
    }
  };

  const deleteTask = async (taskId, projectId) => {
    try {
      await clientAxios.delete(`/api/tasks/${taskId}`, {
        params: {
          project: projectId,
        },
      });

      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "The task could not be removed.",
      });
    }
  };

  return (
    <TaskContext.Provider
      value={{
        projectTasks: state.projectTasks,
        getTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
