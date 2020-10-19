import {
  GET_CONTACTS,
  CREATE_CONTACT,
  REMOVE_CONTACT,
  CONTACT_ERROR,
} from './contact.types';
import { IContact } from './../../models/Contact';
import { IAction, IState } from './contact.model';

const initialState: IState = {
  contacts: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action: IAction) {
  const { type, payload } = action;

  switch (type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case CREATE_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, payload],
        loading: false,
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact: IContact) => contact.id !== payload
        ),
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
