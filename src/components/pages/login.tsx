import { ErrorResponse } from '../../models/common';
import { LoginUser } from '../../models/dto/loginUser';
import auth from '../../services/authService';
import Form from '../common/form';
const Joi = require('joi-browser');

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const user: LoginUser = new LoginUser(data.username, data.password);
      await auth.login(user);
      console.log(this.props);
      //@ts-ignore
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        const errors: ErrorResponse = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
