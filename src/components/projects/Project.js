import React from "react";
import { Menu } from "antd";

const Project = ({ project, ...props }) => {
  return (
    <Menu.Item project={project} {...props}>
      {project.name}
    </Menu.Item>
  );
};

export default Project;
