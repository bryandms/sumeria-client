import { PROJECT_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case PROJECT_TASKS:
      return {
        ...state,
        projectTasks: action.payload,
      };

    case ADD_TASK:
      return {
        ...state,
        projectTasks: [...state.projectTasks, action.payload],
      };

    case UPDATE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };

    case DELETE_TASK:
      return {
        ...state,
        projectTasks: state.projectTasks.filter(
          (task) => task._id !== action.payload
        ),
      };

    default:
      return state;
  }
};
