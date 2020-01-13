import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import UserForm from '../components/userForm/UserForm';

import { loadUserById } from '../redux/actions/userActions/loadUserByID';
import loadOfficers from '../redux/actions/userActions/loadOfficers';

const EditUser = ({ loadUserById, loadOfficers }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserById(id, history);
    loadOfficers();
  }, [id, history, loadUserById, loadOfficers]);

  return <UserForm history={history} />;
};

export default connect(null, { loadUserById, loadOfficers })(EditUser);
