import React from 'react';
import '../../style/containerStyle.css';
import Button from './button';

interface DialogComponentProps {
  title: string;
  message: string;
  onClose: any;
}

class DialogComponent extends React.Component<DialogComponentProps> {
  state = {
    title: '',
    message: '',
  };

  componentDidMount() {
    const { title, message } = this.props;
    this.setState({ title, message });
  }

  render() {
    const { title, message } = this.state;
    return (
      <React.Fragment>
        <div className="backdrop" onClick={this.props.onClose}></div>
        <div className="containerStyle">
          <h1 style={{ textAlign: 'center' }}>{title}</h1>
          <p className="message">
            <span>{message}</span>
          </p>
          <Button
            style={{ width: '100%', padding: '25px' }}
            name="dialogBtn"
            label="Close"
            onClick={this.props.onClose}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default DialogComponent;
