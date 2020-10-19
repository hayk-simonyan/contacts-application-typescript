import React from 'react';

import './Input.css';

interface IProps {
  elementType: string;
  elementConfig: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    errorMessage?: string;
    placeholder?: string;
  };
  value: string;
  touched: boolean;

  inputChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  invalid: boolean;
  shouldValidate: {
    required: boolean;
    minLength?: string;
    maxLength?: string;
  };
}

const Input: React.FC<IProps> = (props) => {
  let element = null;
  const inputClasses = [
    'pa2',
    'input-reset',
    'ba',
    'bg-transparent',
    'hover-bg-black',
    'hover-white',
    'w-100',
  ];

  const invalid = props.invalid && props.shouldValidate && props.touched;

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push('invalid');
  }

  const inputElement = (
    <div>
      <div>{invalid ? props.elementConfig.errorMessage : null}</div>
      <label>{props.elementConfig.label}</label>
      <input
        name={props.elementConfig.name}
        type={props.elementConfig.type}
        placeholder={props.elementConfig.placeholder}
        required={props.elementConfig.required}
        value={props.value}
        onChange={props.inputChangeHandler}
        className={inputClasses.join(' ')}
      />
    </div>
  );
  const textareaElement = (
    <div>
      <div>{invalid ? props.elementConfig.errorMessage : null}</div>
      <label>{props.elementConfig.label}</label>
      <textarea
        name={props.elementConfig.name}
        placeholder={props.elementConfig.placeholder}
        required={props.elementConfig.required}
        value={props.value}
        onChange={props.inputChangeHandler}
        className={inputClasses.join(' ')}
      />
    </div>
  );

  switch (props.elementType) {
    case 'input':
      element = inputElement;
      break;
    case 'textarea':
      element = textareaElement;
      break;
    default:
      element = inputElement;
      break;
  }

  return <div className='mt3'>{element}</div>;
};

export default Input;
