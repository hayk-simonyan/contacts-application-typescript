import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../Input/Input';
import { createContact } from '../../redux/contacts/contact.actions';
import config from '../../config/contactFormConfig.json';
import { IContact } from '../../models/Contact';
import { IConfigElement, IConfigForm } from '../../config/contactFormConfig';

interface IProps {
  createContact: (formData: IContact) => void;
}

const Form: React.FC<IProps> = ({ createContact }) => {
  const history = useHistory();

  const [contactForm, setContactForm] = useState<IConfigForm>(config);
  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  const formElements: { id: string; config: IConfigElement }[] = [];

  Object.entries(contactForm).forEach(([key, value]) => {
    formElements.push({
      id: key,
      config: value,
    });
  });

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    inputIdentifier: string
  ) => {
    const updatedContactForm = { ...contactForm };

    const updatedFormElement = { ...updatedContactForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedContactForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedContactForm) {
      formIsValid = updatedContactForm[inputIdentifier].valid && formIsValid;
    }

    setContactForm(updatedContactForm);
    setFormIsValid(formIsValid);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {} as any;
    for (let formElementIdentifier in contactForm) {
      formData[formElementIdentifier] =
        contactForm[formElementIdentifier].value;
    }

    createContact(formData);
    history.push('/');
  };

  const checkValidity = (
    value: string,
    rules: { required?: boolean; minLength?: string; maxLength?: string }
  ) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= parseInt(rules.minLength) && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= parseInt(rules.maxLength) && isValid;
    }

    return isValid;
  };

  return (
    <form onSubmit={submitFormHandler} className='measure center'>
      <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
        {formElements.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inputChangeHandler={(event) =>
              inputChangeHandler(event, formElement.id)
            }
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}
        <div className='tc'>
          <input type='submit' disabled={!formIsValid} />
        </div>
      </fieldset>
    </form>
  );
};

export default connect(null, { createContact })(Form);
