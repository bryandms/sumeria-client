import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import AuthState from "./context/auth/AuthState";
import ProjectState from "./context/projects/ProjectState";
import TaskState from "./context/tasks/TaskState";

ReactDOM.render(
  <AuthState>
    <ProjectState>
      <TaskState>
        <App />
      </TaskState>
    </ProjectState>
  </AuthState>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
