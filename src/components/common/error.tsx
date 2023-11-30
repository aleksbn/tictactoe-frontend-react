import React from 'react';

interface ErrorComponentProps {
  error: {
    code: string,
    message: string
  }
}

class ErrorComponent extends React.Component<ErrorComponentProps> {
  state = {
    error: {
      code: '',
      message: ''
    }
  };

  componentDidMount() {
    const { error } = this.props;
    this.setState({error});
  }

  render() {
    const { error} = this.state;
    return (
      <React.Fragment>
        <h1>There was an error!</h1>
        <h1>Status code: {error.code}</h1>
        <h1>Message: {error.message}</h1>
      </React.Fragment>
    );
  }
}

export default ErrorComponent;
