import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import auth from "./services/authService";
import { getnickname } from "./services/userService";
import { toCapitalCase } from "./utils/helpers";

import "jquery";
import "popper.js";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import NavBar from "./components/layout/navbar";
import LoginForm from "./components/pages/login";
import NotFound from "./components/pages/notFound";
import Home from "./components/pages/home";
import History from "./components/pages/history";
import Games from "./components/pages/games";
import Logout from "./components/pages/logout";
import Register from "./components/pages/register";
import ProtectedRoute from "./components/common/protectedRoute";
import RegisterForm from "./components/pages/register";
import CreateGame from "./components/pages/createGame";
import PlayGame from "./components/pages/playGame";

interface AppState {
  [key: string]: any;
}

class App extends Component {
  state: AppState = {
    userId: undefined,
    nickname: "",
  };
  /**
   * Asynchronously fetches the current user and their nickname upon component mount.
   *
   * This function first retrieves the current user using the `auth.getCurrentUser()` method.
   * If a user is found, it then calls the `getnickname()` function to fetch the user's nickname.
   * The fetched nickname is then capitalized using the `toCapitalCase()` function.
   * Finally, the component's state is updated with the user and nickname.
   *
   * @return {Promise<void>} A Promise that resolves when the component's state has been updated.
   */
  async componentDidMount() {
    const user = auth.getCurrentUser();
    let nickname = "";
    if (user) {
      const currentUser = await getnickname(user._id!);
      nickname = toCapitalCase(currentUser.data);
    }
    this.setState({ user, nickname });
  }

  render() {
    const { user, nickname } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} nickname={nickname} />
        <main className="container">
          <Switch>
            <Route path="/not-found" component={NotFound} />
            <ProtectedRoute
              path="/games/againstpc"
              render={(props) => <CreateGame {...props} opponent={"pc"} />}
            />
            <ProtectedRoute
              path="/games/againstplayer"
              render={(props) => <CreateGame {...props} opponent={"player"} />}
            />
            <ProtectedRoute path="/games/play/:id" component={PlayGame} />
            <ProtectedRoute path="/games" component={Games} />
            <ProtectedRoute path="/history" component={History} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/profile" component={RegisterForm} />
            <Route path="/home" component={Home} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
