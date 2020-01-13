import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import UserForm from '../components/userForm/UserForm';
import { loadUserById } from '../redux/actions/userActions/loadUserByID';

const EditUser = ({ loadUserById }) => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadUserById(id, history);
  }, [id]);

  return <UserForm history={history} />;
};

export default connect(null, { loadUserById })(EditUser);
