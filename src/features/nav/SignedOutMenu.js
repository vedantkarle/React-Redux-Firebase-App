import React from "react";
import { Button, Menu } from "semantic-ui-react";

const SignedOutMenu = ({ setAuthenticated }) => {
  return (
    <Menu.Item position="right">
      <Button
        onClick={() => setAuthenticated(true)}
        basic
        inverted
        content="Login"
      />
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

export default SignedOutMenu;
