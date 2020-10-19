import { IContact } from './../../models/Contact';

export interface IAction {
  type: string;
  payload: IContact[] | string | null;
}

export interface IState {
  contacts: IContact[];
  loading: boolean;
  error: { msg?: string };
}
