import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import loadOfficers from '../redux/actions/userActions/loadOfficers';

import UserForm from '../components/userForm/UserForm';

const CreateUser = ({ loadOfficers }) => {
  const history = useHistory();
  useEffect(() => {
    loadOfficers();
  }, [loadOfficers]);

  return <UserForm history={history} />;
};

export default connect(null, { loadOfficers })(CreateUser);
