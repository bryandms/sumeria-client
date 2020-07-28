import React, { useReducer } from "react";
import ProjectContext from "./ProjectContext";
import ProjectReducer from "./ProjectReducer";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  SELECTED_PROJECT,
  DELETE_PROJECT,
} from "../../types";

const ProjectState = (props) => {
  const projects = [
    { id: 1, name: "Project 1" },
    { id: 2, name: "Project 2" },
    { id: 3, name: "Project 3" },
    { id: 4, name: "Project 4" },
  ];

  const initialState = {
    projects: [],
    selectedProject: null,
  };

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const getProjects = () => {
    dispatch({
      type: GET_PROJECTS,
      payload: projects,
    });
  };

  const addProject = (project) => {
    project.id = state.projects.length + 1;

    dispatch({
      type: ADD_PROJECT,
      payload: project,
    });
  };

  const selectProject = (project) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: project,
    });
  };

  const deleteProject = (projectId) => {
    dispatch({
      type: DELETE_PROJECT,
      payload: projectId,
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        selectedProject: state.selectedProject,
        getProjects,
        addProject,
        selectProject,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
