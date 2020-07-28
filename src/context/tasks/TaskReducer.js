import {
  PROJECT_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  COMPLETED_TASK,
  DELETE_TASK,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTasks: state.tasks.filter(
          (task) => task.projectId === action.payload
        ),
      };

    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case UPDATE_TASK:
    case COMPLETED_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
};
