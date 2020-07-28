import React from "react";
import { Layout, Switch, Menu } from "antd";

const { Header } = Layout;

const Navbar = ({ theme, handleTheme }) => {
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
        <Menu.Item className="float-right">Log out</Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
