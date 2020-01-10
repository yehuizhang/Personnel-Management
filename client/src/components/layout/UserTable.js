import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { loadMoreUser } from '../../redux/actions/userListActions';

const UserTable = ({ userList, searchParams, totalPages, loadMoreUser }) => {
  const [users, setUsers] = useState([]);
  const [currpage, setCurrPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setUsers([...userList]);
  }, [userList]);
  const loadMore = page => {
    loadMoreUser(page, searchParams);
    setCurrPage(page);
  };

  useEffect(() => {
    setMaxPage(totalPages);
  }, [totalPages]);

  return <div>Here is the table</div>;
};

const mapStateToProps = state => ({
  userList: state.list.userList,
  searchParams: state.list.searchParams,
  totalPages: state.list.totalPages,
});

export default connect(mapStateToProps, { loadMoreUser })(UserTable);

{
  /* <div>
      <TableCell>{row.avatar}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.carbs}</TableCell>
      <TableCell>{row.protein}</TableCell>
    </div> */
}
