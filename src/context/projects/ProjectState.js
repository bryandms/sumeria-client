import React, { useReducer } from "react";
import { notification } from "antd";
import ProjectContext from "./ProjectContext";
import ProjectReducer from "./ProjectReducer";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  SELECTED_PROJECT,
  DELETE_PROJECT,
} from "../../types";
import clientAxios from "../../config/axios";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    selectedProject: null,
  };

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const getProjects = async () => {
    try {
      const result = await clientAxios.get("/api/projects");

      dispatch({
        type: GET_PROJECTS,
        payload: result.data.projects,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Could not fetch projects.",
      });
    }
  };

  const addProject = async (project) => {
    try {
      const result = await clientAxios.post("/api/projects", project);

      dispatch({
        type: ADD_PROJECT,
        payload: result.data.project,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "The project could not be added.",
      });
    }
  };

  const selectProject = (project) => {
    dispatch({
      type: SELECTED_PROJECT,
      payload: project,
    });
  };

  const deleteProject = async (projectId) => {
    try {
      await clientAxios.delete(`/api/projects/${projectId}`);

      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "The project could not be removed.",
      });
    }
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
