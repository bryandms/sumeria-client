import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Projects from "./components/projects/Projects";
import authToken from "./config/authToken";
import AuthContext from "./context/auth/AuthContext";

const PrivateRoute = (props) => {
  const token = localStorage.getItem("token") || null;
  if (token) authToken(token);

  return token ? <Route {...props} /> : <Redirect to="/" />;
};

const App = () => {
  const { setToken, setIsAuth } = useContext(AuthContext);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = () => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    setIsAuth(true);
    setToken(token);
    setAutoLogout(remainingMilliseconds);
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  };

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Login {...props} setAutoLogout={setAutoLogout} />}
        />
        <Route
          exact
          path="/register"
          render={(props) => (
            <Register {...props} setAutoLogout={setAutoLogout} />
          )}
        />
        <PrivateRoute exact path="/projects" component={Projects} />
      </Switch>
    </Router>
  );
};

export default App;
