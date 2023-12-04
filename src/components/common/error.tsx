import React from 'react';
import '../../style/errorStyle.css';
import Button from './button';
interface ErrorComponentProps {
  error: {
    code: string;
    message: string;
  };
  onClose: any;
}

class ErrorComponent extends React.Component<ErrorComponentProps> {
  state = {
    error: {
      errorCode: '',
      message: '',
    },
  };

  componentDidMount() {
    const { error } = this.props;
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    return (
      <div className='errorBackDrop' onClick={this.props.onClose}>
        <div className="errorContainer">
          <h1 style={{textAlign: 'center'}}>There was an error!</h1>
          <p className='errorCode'>Status code: <span>{error.errorCode}</span></p>
          <p className='errorMessage'><span>{error.message}</span></p>
          <Button name="errorBtn" label="Close" onClick={this.props.onClose} />
        </div>
      </div>
    );
  }
}

export default ErrorComponent;
