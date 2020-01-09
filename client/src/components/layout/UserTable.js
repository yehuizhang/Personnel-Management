import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';

import { loadMoreUser } from '../../redux/actions/list';

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

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={currpage < maxPage}
      loader={
        <div className="loader" key={0}>
          Loading ...
        </div>
      }
    >
      {users.forEach(user => (
        <span>{user.id}</span>
      ))}
    </InfiniteScroll>
  );
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
