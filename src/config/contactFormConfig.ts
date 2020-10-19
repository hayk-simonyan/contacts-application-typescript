export interface IConfigElement {
  elementType: string;
  elementConfig: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    errorMessage?: string;
    placeholder?: string;
  };
  validation: {
    required: boolean;
    minLength?: string;
    maxLength?: string;
  };
  value: string;
  valid: boolean;
  touched: boolean;
}

export interface IConfigForm {
  [key: string]: IConfigElement;
}
