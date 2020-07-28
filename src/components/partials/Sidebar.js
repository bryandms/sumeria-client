import React, { useContext } from "react";
import { Layout, Menu } from "antd";
import NewProject from "../projects/NewProject";
import ProjectList from "../projects/ProjectList";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const { Sider } = Layout;

const Sidebar = ({ theme }) => {
  const { selectProject } = useContext(ProjectContext);
  const { getTasks } = useContext(TaskContext);

  const handleSelectProject = (project) => {
    selectProject(project);
    getTasks(project.id);
  };

  return (
    <Sider breakpoint="lg" collapsedWidth="0" theme={theme}>
      <div className="px-4 py-3">
        <img
          src={process.env.PUBLIC_URL + "/logowithtext.png"}
          alt="Logo"
          style={{ height: 32 }}
        />
      </div>

      <div className="p-3">
        <NewProject />
      </div>

      <Menu
        theme={theme}
        mode="inline"
        onClick={({ item }) => handleSelectProject(item.props.project)}
      >
        <ProjectList />
      </Menu>
    </Sider>
  );
};

export default Sidebar;
