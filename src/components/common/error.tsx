import React, { useEffect, useState } from 'react';
import '../../style/containerStyle.css';
import Button from './button';

interface ErrorComponentProps {
  error: {
    code: string;
    message: string;
  };
  onClose: () => void;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({error, onClose}) => {
  const [errorCode, setErrorCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setErrorCode(error.code);
    setErrorMessage(error.message);
  }, [error]);

    return (
      <React.Fragment>
        <div className="backdrop" onClick={onClose}></div>
        <div className="containerStyle">
          <h1 style={{ textAlign: 'center' }}>There was an error!</h1>
          <p className="errorCode">
            Status code: <span>{errorCode}</span>
          </p>
          <p className="message">
            <span>{errorMessage}</span>
          </p>
          <Button
            style={{ backgroundColor: 'red', width: '100%', padding: '25px' }}
            name="errorBtn"
            label="Close"
            onClick={onClose}
          />
        </div>
      </React.Fragment>
    );

}

export default ErrorComponent;
