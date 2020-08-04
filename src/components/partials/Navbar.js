import React, { useContext } from "react";
import { Layout, Switch, Menu } from "antd";
import AuthContext from "../../context/auth/AuthContext";

const { Header } = Layout;

const Navbar = ({ theme, handleTheme }) => {
  const { setToken, setIsAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setToken(null);
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  };

  return (
    <Header className={`${theme} px-0`}>
      <div className="float-left pl-3">
        <Switch
          checked={theme === "dark"}
          onChange={handleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>

      <Menu theme={theme} mode="horizontal">
        <Menu.Item className="float-right" onClick={handleLogout}>
          Log out
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
