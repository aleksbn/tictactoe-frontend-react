import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/pages/home';
import NavBar from './components/layout/navbar';
import NotFound from './components/pages/notFound';
import LoginForm from './components/pages/login';
import Games from './components/pages/games';
import History from './components/pages/history';
import Register from './components/pages/register';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/common/protectedRoute';
import Logout from './components/pages/logout';

class App extends Component {
  state = {
    user: null
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/home" component={Home} />
            <ProtectedRoute path="/games" component={Games}/>
            <ProtectedRoute path="/history" component={History}/>
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
