import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import auth from "../../auth/authentication";
import RouteEnum from "./../../models/RouteEnum";
import I18nSelector from "views/i18nSelector/i18nSelector";
import I18n from "utilities/i18n";

import {ReactComponent as Logo} from "../../assets/images/hazgo-logo-white.svg";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const MainNav = (props: any) => {
  // const currentUser = auth.getCurrentUser();
  const currentUser = "rushil";
  // const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    async function getPayload() {
      if (currentUser) {
        const currentUserPayload: any = await auth.getIdTokenPayLoad();
        if (currentUserPayload) {
          // setUserEmail(currentUserPayload.email);
        }
      }
    }
    getPayload();
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const cognitoGroups = props.cognitoGroups;

  // const isAdmin = _.includes(cognitoGroups, "Admin") ? true : false;
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="navbar-outer">
        <Container fixed>
          <nav className="navbar navbar-expand-lg">
            <div>
              <Logo />
            </div>
            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                {currentUser && (
                  <React.Fragment>
                    <NavLink className="nav-item nav-link" to={RouteEnum.Home}>
                      {I18n("Nav.Home")}
                    </NavLink>
                    <NavLink className="nav-item nav-link" to={RouteEnum.Link1}>
                      {I18n("Nav.Link1")}
                    </NavLink>
                    <NavLink className="nav-item nav-link" to={RouteEnum.Link2}>
                      {I18n("Nav.Link2")}
                    </NavLink>
                    <Button
                      className="nav-item nav-link has-submenu"
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    >
                      Dashboard
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button"
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
                {!currentUser && (
                  <React.Fragment>
                    <NavLink
                      className="nav-item nav-link"
                      to={RouteEnum.Signup}
                    >
                      {I18n("Nav.SignUp")}
                    </NavLink>
                    <NavLink className="nav-item nav-link" to={RouteEnum.Login}>
                      {I18n("Nav.Login")}
                    </NavLink>
                  </React.Fragment>
                )}
                <NavLink className="nav-item nav-link" to={RouteEnum.ApiSample}>
                  {I18n("Nav.APISample")}
                </NavLink>
                <NavLink className="nav-item nav-link" to={RouteEnum.UsersList}>
                  {I18n("Nav.Crud")}
                </NavLink>
                {currentUser && (
                  <NavLink
                    className="nav-item nav-link logout-link"
                    to={RouteEnum.Logout}
                  >
                    {/* {I18n("Nav.Logout")} */}

                    <PowerSettingsNewIcon fontSize="small" />
                  </NavLink>
                )}
              </div>
            </div>
            <div className="language">
              <I18nSelector />
            </div>
          </nav>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MainNav;
