import React, { useEffect, useContext } from "react";
import { Menu } from "antd";
import Project from "./Project";
import ProjectContext from "../../context/projects/ProjectContext";

const ProjectList = (props) => {
  const { projects, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    getProjects();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (projects.length === 0) return null;

  return (
    <Menu.ItemGroup title="Projects" {...props}>
      {projects.map((project) => (
        <Project key={project._id} project={project} {...props} />
      ))}
    </Menu.ItemGroup>
  );
};

export default ProjectList;
