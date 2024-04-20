import React, { FC } from "react";
import { IFormFieldProps } from "../../models/common";

interface InputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">,
		IFormFieldProps {}

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
