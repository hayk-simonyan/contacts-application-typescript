import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getContacts,
  removeContact,
} from '../../redux/contacts/contact.actions';
import { IContact } from '../../models/Contact';

interface IProps {
  getContacts: () => void;
  removeContact: (id: string) => void;
  contacts: {
    contacts: IContact[];
  };
}

interface IState {
  contacts: {
    contacts: IContact[];
  };
}

const HomePage: React.FC<IProps> = ({
  getContacts,
  removeContact,
  contacts: { contacts },
}) => {
  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [id, setId] = useState<string>('');

  const alertDisplayHandler = (id: string) => {
    setShowAlert(true);
    setId(id);
  };
  const removeContactHandler = () => {
    setShowAlert(false);
    removeContact(id);
  };

  let contactList;
  contactList =
    contacts.length === 0
      ? 'you have no contacts yet'
      : contacts.map((contact) => (
          <ul key={contact.id} className='list pl0 measure center'>
            <li className='lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30'>
              <div>
                <p>Name: {contact.name}</p>
                <p>
                  Phone: {contact.phone}{' '}
                  <button
                    onClick={(event) => alertDisplayHandler(contact.id)}
                    className='fr f6 link dim br3 ph3 pv2 mb2 dib black'
                  >
                    X
                  </button>
                </p>
                <p>Created: {contact.created}</p>
              </div>
            </li>
          </ul>
        ));

  return (
    <div>
      <div className='pa3 pa5-ns'>
        {contactList}
        <div className='tc'>
          <Link
            className='f6 link dim br3 ph3 pv2 mb2 dib white bg-black'
            to='/create-contact'
          >
            Add New Contact
          </Link>
        </div>
        {showAlert && (
          <div className='tc'>
            <p>Are you sure?</p>
            <p className='tc'>
              <a
                onClick={removeContactHandler}
                className='f6 link dim br3 ph3 pv2 mb2 dib black'
                href='#0'
              >
                yes
              </a>
              <a
                onClick={(event) => setShowAlert(false)}
                className='f6 link dim br3 ph3 pv2 mb2 dib black'
                href='#0'
              >
                no
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: IState) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, { getContacts, removeContact })(
  HomePage
);
