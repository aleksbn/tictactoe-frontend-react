import { FC } from "react";
import { SelectHTMLAttributes } from "react";
import { IOption, IFormFieldProps } from "../../models/common";

interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">,
		IFormFieldProps {
	options: IOption[];
}

const Select: FC<SelectProps> = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<select name={name} id={name} {...rest} className="form-control">
				<option value="" disabled selected={true}>
					Select a {name}
				</option>
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
