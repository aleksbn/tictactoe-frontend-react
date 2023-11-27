import React, { Component, ChangeEvent, FormEvent } from 'react';
import Select from './select';
import Input from './input';
import { ErrorResponse } from '../../models/common';
const Joi = require('joi-browser');

interface FormState {
  data: { [key: string]: any };
  errors: ErrorResponse
}

class Form extends Component<{}, FormState> {
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
    const errorMessage = this.validateProperty(input.name, input.value);
    if (errorMessage) errors[input.name as string] = errorMessage;
    else delete errors[input.name as string];

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

  renderButton(label: string) {
    return (
      <button disabled={!!this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(
    name: string,
    label: string,
    options: { _id: string; name: string }[]
  ) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name] || ''}
        label={label}
        options={options}
        onChange={(e) => this.handleSelectChange(name, e.target.value)}
        error={errors[name]}
      />
    );
  }

  renderInput(name: string, label: string, type = 'text') {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name] || ''}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
