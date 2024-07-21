import React, { FC } from "react";
import { IFormFieldProps } from "../../models/common";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
    IFormFieldProps {}

/**
 * Renders an input field component with the provided props.
 *
 * @param {string} name - The name of the input field.
 * @param {string} label - The label of the input field.
 * @param {string | null | undefined} error - The error message for the input field.
 * @param {any} rest - Additional props for the input field.
 * @return {JSX.Element} The rendered input field component.
 */
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
