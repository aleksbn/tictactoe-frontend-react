import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import NavBar from './components/layout/navbar';
import LoginForm from './components/pages/login';
import NotFound from './components/pages/notFound';
import Home from './components/pages/home';
import History from './components/pages/history';
import Games from './components/pages/games';
import Logout from './components/pages/logout';
import Register from './components/pages/register';
import ProtectedRoute from './components/common/protectedRoute';
import RegisterForm from './components/pages/register';

interface AppState {
  [key: string]: any
}
class App extends Component {
  state: AppState = {
    user: undefined

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
        <ToastContainer/>
        <NavBar user={user}/>
        <main className='container'>
          <Switch>
            <Route path="/not-found" component={NotFound}/>
            <ProtectedRoute path='/games' component={Games} />
            <ProtectedRoute path='/history' component={History} />
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/register" component={Register}/>
            <ProtectedRoute path='/profile' component={RegisterForm}/>
            <Route path="/home" component={Home}/>
            <Redirect from='/' exact to='/home'/>
            <Redirect to='/not-found'/>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
