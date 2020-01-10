import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';

import UserTable from '../layout/UserTable';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const queryParams = Array.from(useQuery().entries());
  const [listStatus, setListStatus] = useState({
    initialLoading: true,
    currPage: 1,
    totalPage: 1,
  });

  useEffect(() => {}, []);

  if (listStatus.initialLoading) {
    return null;
  }

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
      <UserTable />
    </InfiniteScroll>
  );
};

export default Home;
