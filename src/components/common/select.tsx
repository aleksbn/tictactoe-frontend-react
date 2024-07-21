import { FC } from "react";
import { SelectHTMLAttributes } from "react";
import { IOption, IFormFieldProps } from "../../models/common";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">,
    IFormFieldProps {
  options: IOption[];
}

/**
 * Renders a select input field with options based on the provided props.
 *
 * @param {string} name - The name attribute for the select element.
 * @param {string} label - The label text for the select element.
 * @param {IOption[]} options - The array of options to be displayed in the select element.
 * @param {string} error - The error message to display, if any.
 * @param {...SelectHTMLAttributes<HTMLSelectElement>} rest - Additional attributes for the select element.
 * @return {ReactNode} The rendered select input field.
 */
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
