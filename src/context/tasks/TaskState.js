import React, { useReducer } from "react";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";
import {
  PROJECT_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  COMPLETED_TASK,
  DELETE_TASK,
} from "../../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      { id: 1, name: "Task 1", completed: true, projectId: 1 },
      { id: 2, name: "Task 2", completed: false, projectId: 1 },
      { id: 3, name: "Task 3", completed: false, projectId: 2 },
      { id: 4, name: "Task 4", completed: true, projectId: 3 },
    ],
    projectTasks: null,
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const getTasks = (projectId) => {
    dispatch({
      type: PROJECT_TASKS,
      payload: projectId,
    });
  };

  const addTask = (task) => {
    dispatch({
      type: ADD_TASK,
      payload: task,
    });
  };

  const updateTask = (task) => {
    dispatch({
      type: UPDATE_TASK,
      payload: task,
    });
  };

  const toggleCompletedTask = (task) => {
    dispatch({
      type: COMPLETED_TASK,
      payload: task,
    });
  };

  const deleteTask = (taskId) => {
    dispatch({
      type: DELETE_TASK,
      payload: taskId,
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        projectTasks: state.projectTasks,
        getTasks,
        addTask,
        updateTask,
        toggleCompletedTask,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
