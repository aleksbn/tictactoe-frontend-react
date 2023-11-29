import React from 'react';
//@ts-ignore
import Joi from 'joi-browser';
import Form from '../common/form';
import auth from '../../services/authService';
import { register, get, edit } from '../../services/userService';
import { ErrorResponse } from '../../models/common';

class RegisterForm extends Form {
  state = {
    data: {
      _id: ' ',
      username: '',
      password: '',
      nickname: '',
    },
    errors: {},
  };

  async componentDidMount() {
    await this.populateData();
  }

  schema = {
    _id: Joi.string(),
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().min(5).label('Password'),
    nickname: Joi.string().required().min(3).label('Nickname'),
  };

  async populateData() {
    if (auth.getCurrentUser()) {
      try {
        const { data } = await get();
        delete data.password;
        data.username = data.email;
        delete data.email;
        delete data.__v;
        this.setState({ data: data });
      } catch (ex: any) {
        if (ex.response && ex.response.status === 404)
          //@ts-ignore
          this.props.history?.replace('not-found');
      }
    }
  }

  doSubmit = async () => {
    try {
      const userData = { ...this.state.data };
      let response: any = undefined;
      if (userData._id === ' ') {
        response = await register(
          userData.username,
          userData.password,
          userData.nickname
        );
      } else {
        response = await edit(
          userData._id,
          userData.username,
          userData.password,
          userData.nickname
        );
      }
      auth.loginWithJwt(response.headers['x-auth-token']);
      console.log(response);
      window.location.href = '/';
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const errors: ErrorResponse = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data } = this.state;
    const isNew = data._id === ' ';
    return (
      <div>
        <h1>{isNew ? 'Register a new user' : 'Edit your data'}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'email')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('nickname', 'Nickname')}
          {this.renderButton(isNew ? 'Register' : 'Edit')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
