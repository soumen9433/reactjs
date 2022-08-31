import {NavLink} from "react-router-dom";
import React from "react";

const MenuNavLink = (props: any) => {
  return <NavLink exact={true} {...props} activeClassName="active" />;
};

export default MenuNavLink;
