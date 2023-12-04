import React from 'react';
import '../../style/containerStyle.css';
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
      <React.Fragment>
        <div className="backdrop" onClick={this.props.onClose}></div>
        <div className="containerStyle">
          <h1 style={{ textAlign: 'center' }}>There was an error!</h1>
          <p className="errorCode">
            Status code: <span>{error.errorCode}</span>
          </p>
          <p className="message">
            <span>{error.message}</span>
          </p>
          <Button
            style={{ backgroundColor: 'red', width: '100%', padding: '25px' }}
            name="errorBtn"
            label="Close"
            onClick={this.props.onClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ErrorComponent;
