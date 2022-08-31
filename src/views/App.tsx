import React, {Suspense, lazy} from "react";
// import {Route, Switch, Redirect} from "react-router-dom";
import {Route, Routes, Navigate} from "react-router-dom";
import MainNav from "./main-nav/MainNav";
import RouteEnum from "../models/RouteEnum";
import auth from "../auth/authentication";
import {ToastContainer} from "react-toastify";
import Image from "../assets/images/hazgo-bg.png";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const Login = lazy(() => import("./login/Login"));
const Logout = lazy(() => import("./logout/Logout"));
const NotFound = lazy(() => import("./not-found/NotFound"));
const ProtectedRoute = lazy(() => import("../utilities/protectedRoute"));

const ApiSample = lazy(() => import("./api-sample/apiSample"));
const UsersList = lazy(() => import("./crud/usersList"));
const UsersAdd = lazy(() => import("./crud/usersAdd"));
const UserDetails = lazy(() => import("./crud/userDetails"));
const UsersEdit = lazy(() => import("./crud/usersEdit"));

const Home = lazy(() => import("./home/Home"));
const Component1 = lazy(() => import("./component1/component1"));
const Component2 = lazy(() => import("./component2/component2"));

const Signup = lazy(() => import("./signup/Signup"));
const Authorize = lazy(() => import("./authorize/Authorize"));
const styles = {
  paperContainer: {
    // height: 70,
    backgroundImage: `url(${Image})`
  }
};
export default class App extends React.Component {
  state = {
    cognitoGroups: []
  };

  async componentDidMount() {
    const userPayLoad: any = await auth.getUserPayLoad();
    if (userPayLoad) {
      const cognitoGroups = userPayLoad["cognito:groups"];
      this.setState({cognitoGroups});
    }
  }
  render() {
    const {cognitoGroups} = this.state;
    // const isAdmin = _.includes(cognitoGroups, "Admin") ? true : false;

    return (
      <React.Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            pauseOnHover
          />
          <div className="main-nav-wrap" style={styles.paperContainer}>
            <MainNav cognitoGroups={cognitoGroups} />
          </div>
          <CssBaseline />
          <Container fixed>
            <main>
              <div className="nav-offset">
                <Routes>
                  <Route path={RouteEnum.Signup} element={<Signup />} />
                  <Route path={RouteEnum.Authorize} element={<Authorize />} />
                  <Route path={RouteEnum.Login} element={<Login />} />
                  <Route path={RouteEnum.ApiSample} element={<ApiSample />} />
                  <Route path={RouteEnum.UsersList} element={<UsersList />} />
                  <Route
                    path={RouteEnum.UsersEdit + "/:id"}
                    element={<UsersEdit />}
                  />
                  <Route path={RouteEnum.AddUser} element={<UsersAdd />} />
                  <Route
                    path={RouteEnum.UserDetails + "/:id"}
                    element={<UserDetails />}
                  />
                  <Route path={RouteEnum.NotFound} element={<NotFound />} />

                  <Route element={<ProtectedRoute roles={["ROLE_USER"]} />}>
                    <Route path={RouteEnum.Home} element={<Home />} />
                    <Route path={RouteEnum.Root} element={<Home />} />
                    <Route path={RouteEnum.Link1} element={<Component1 />} />
                    <Route path={RouteEnum.Logout} element={<Logout />} />
                  </Route>

                  <Route element={<ProtectedRoute roles={["ROLE_ADMIN"]} />}>
                    <Route path={RouteEnum.Link2} element={<Component2 />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </Container>
        </Suspense>
      </React.Fragment>
    );
  }
}
