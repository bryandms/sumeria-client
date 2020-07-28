import {
  GET_PROJECTS,
  ADD_PROJECT,
  SELECTED_PROJECT,
  DELETE_PROJECT,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case SELECTED_PROJECT:
      return {
        ...state,
        selectedProject: action.payload,
      };

    case DELETE_PROJECT:
      return {
        ...state,
        selectedProject: null,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
