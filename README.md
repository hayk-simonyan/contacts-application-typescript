## To run this application

1. `git clone https://github.com/hayk77/contacts-application-typescript`
2. `cd contacts-application-typescript`
3. `npm i`
4. `npm start`

## [Live Version Here](https://contacts-app-9346.web.app/)

## Here is an explanation of how to configure form with config file

The config file inside of `./config/contactFormConfig.json` contains object with information of all the form inputs that need to be displayed.

## TypeScript configuration

After updating the `contactFormConfig.json` file you should also consider to update the `IContact` interface inside of a `models/Contact.ts` to match with the JSON file

```typescript
export interface IContact {
  id: string;
  name: string;
  phone: number;
  created?: Date;
}
```

Each key represents one input with the following attributes

1. `elementType` - can be `input` or `textarea` (by default it is `input`)
2. `elementConfig` - contains all the attributes that you can pass to an input, like this (optional)

```javascript
    "elementConfig": {
      "name": "name",
      "label": "name",
      "type": "text",
      "required": true,
      "errorMessage": "Enter contact name, from 2 to 10 characters",
      "placeholder": "Enter contact name"
    },
```

3. `value` - the initial value for the input element (required)

4. `validation` - object that contains information about input requirements, like this example (optional)

```javascript
    "validation": {
      "required": true,
      "minLength": "2",
      "maxLength": "10"
    },
```

5. `valid` - you can specify if the input is valid initially or not with this boolean property (optional)

6. `touched` - used to add css class for the inputs for better user experience, if its set to true than input will show error right after first load. (optional)

You can just take out `Form` and `Input` components from this project and use them in your application.

## Overall it looks like this

```javascript
    key: {
        "elementType": input | textarea,
        "elementConfig": {
            "name": input name,
            "label": input label,
            "type": input type (text | number | date),
            "required": boolean,
            "errorMessage": message to display on invalid input
            "placeholder": input placeholder
        },
        "value": inputs initial value,
        "validation": {
            "required": boolean,
            "minLength": number,
            "maxLength": number
        },
        "valid": boolean (false when input is required),
        "touched": boolean
    }
```

## Currently config file

```javascript
{
  "name": {
    "elementType": "input",
    "elementConfig": {
      "name": "name",
      "label": "name",
      "type": "text",
      "required": true,
      "errorMessage": "Enter contact name, from 2 to 10 characters",
      "placeholder": "Enter contact name"
    },
    "value": "",
    "validation": {
      "required": true,
      "minLength": "2",
      "maxLength": "10"
    },
    "valid": false,
    "touched": false
  },
  "phone": {
    "elementType": "input",
    "elementConfig": {
      "name": "phone",
      "label": "phone",
      "type": "number",
      "required": true,
      "errorMessage": "Enter phone number, from 2 to 12 digits",
      "placeholder": "Enter phone number"
    },
    "validation": {
      "required": true,
      "minLength": "2",
      "maxLength": "10"
    },
    "value": "",
    "valid": false,
    "touched": false
  },
  "created": {
    "elementType": "input",
    "elementConfig": {
      "type": "date"
    },
    "validation": {
      "name": "date",
      "label": "date",
      "required": false
    },
    "value": "",
    "valid": true,
    "touched": false
  }
}
```
