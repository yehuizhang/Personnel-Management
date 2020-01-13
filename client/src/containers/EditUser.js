import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import UserForm from '../components/userForm/UserForm';

import { loadUserById } from '../redux/actions/userActions/loadUserByID';
import loadOfficers from '../redux/actions/userActions/loadOfficers';
import { resetCurrentUser } from '../redux/actions/user';

const EditUser = ({ loadUserById, loadOfficers, resetCurrentUser }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserById(id, history);
    loadOfficers();
    return () => {
      resetCurrentUser();
    };
  }, []);

  return <UserForm history={history} />;
};

export default connect(null, { loadUserById, loadOfficers, resetCurrentUser })(
  EditUser
);
