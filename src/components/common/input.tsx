import React, { FC, InputHTMLAttributes } from 'react';
import { FormFieldProps } from '../../models/common';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'>,
    FormFieldProps {}

const Input: FC<InputProps> = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
