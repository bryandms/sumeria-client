import React, { useState, useContext } from "react";
import { Layout, PageHeader, Button, Divider, Empty } from "antd";
import Sidebar from "../partials/Sidebar";
import Navbar from "../partials/Navbar";
import Footer from "../partials/Footer";
import TaskForm from "../tasks/TaskForm";
import TaskList from "../tasks/TaskList";
import ProjectContext from "../../context/projects/ProjectContext";

const { Content } = Layout;

const Projects = () => {
  const { selectedProject, deleteProject } = useContext(ProjectContext);

  const [theme, setTheme] = useState("dark");

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleDeleteProject = () => {
    deleteProject(selectedProject.id);
  };

  return (
    <Layout className="h-full">
      <Sidebar theme={theme} />

      <Layout>
        <Navbar theme={theme} handleTheme={handleTheme} />

        <Content
          className={`my-0 mx-3 p-4 ${
            !selectedProject &&
            "d-flex align-items-center justify-content-center"
          }`}
        >
          {selectedProject ? (
            <>
              <PageHeader
                className="shadow overflow-hidden"
                ghost={false}
                title={selectedProject.name}
                extra={[
                  <Button
                    key="1"
                    type="primary"
                    danger
                    onClick={handleDeleteProject}
                  >
                    Delete project
                  </Button>,
                ]}
              >
                <Divider orientation="center">Create task</Divider>

                <TaskForm />
              </PageHeader>

              <TaskList />
            </>
          ) : (
            <Empty description="Select a project" />
          )}
        </Content>

        <Footer />
      </Layout>
    </Layout>
  );
};

export default Projects;
