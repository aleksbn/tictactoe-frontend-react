import { Component, ChangeEvent, FormEvent } from "react";
import Select from "./select";
import Input from "./input";
import { IFormState } from "../../models/common";
const Joi = require("joi-browser");

class Form extends Component<{}, IFormState> {
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      this.state.data,
      (this as any).schema,
      options
    );
    if (!error) return null;
    const errors: { [key: string]: string } = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name: string, value: any) => {
    const obj = { [name]: value };
    const schema = { [name]: (this as any).schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
    const errors: { [key: string]: string } = { ...this.state.errors };
    const errorMessage: string = this.validateProperty(input.name, input.value);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleSelectChange = (name: string, value: any) => {
    const errors: { [key: string]: string } = { ...this.state.errors };
    const errorMessage = this.validateProperty(name, value);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const data: { [key: string]: any } = { ...this.state.data };
    data[name] = value;

    this.setState({ data, errors });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    (this as any).doSubmit();
  };

  /**
   * Renders a button with the provided label.
   *
   * @param {string} label - The label text of the button.
   * @return {JSX.Element} The rendered button component.
   */
  renderButton(label: string) {
    return (
      <button disabled={!!this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  /**
   * Renders a select input with the provided name, label, and options.
   *
   * @param {string} name - The name of the select input.
   * @param {string} label - The label text of the select input.
   * @param {{ _id: string; name: string }[]} options - The array of options for the select input.
   * @return {JSX.Element} The rendered select component.
   */
  renderSelect(
    name: string,
    label: string,
    options: { _id: string; name: string }[]
  ) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name] || ""}
        label={label}
        options={options}
        onChange={(e) => this.handleSelectChange(name, e.target.value)}
        error={errors[name]}
      />
    );
  }

  /**
   * Renders an input component with the specified name, label, type, and disabled state.
   *
   * @param {string} name - The name of the input.
   * @param {string} label - The label text of the input.
   * @param {string} [type="text"] - The type of the input.
   * @param {boolean} [disabled=false] - Whether the input is disabled.
   * @return {JSX.Element} The rendered input component.
   */
  renderInput(name: string, label: string, type = "text", disabled = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        disabled={disabled}
        value={data[name] || ""}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
