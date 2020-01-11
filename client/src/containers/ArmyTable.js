import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initialLoad, moreLoad, updateParams } from '../redux/actions/userList';

import { SearchAppBar, TableHead, TableBody } from '../components/armyTable';
import { Container, TableContainer, Table } from '@material-ui/core';

const ArmyTable = ({
  params,
  users,
  page,
  totalPages,
  initialLoad,
  moreLoad,
  updateParams,
}) => {
  useEffect(() => {
    initialLoad(params);
  }, [params]);

  const handleSearchText = text => {
    console.log('search-text', text.trim());
  };

  const handleReset = () => {
    console.log('handleReset is clicked');
  };

  const handleCreateNewSoldier = () => {
    console.log('handleCreateNewSoldier is clicked');
  };

  const handleSort = fieldName => {
    console.log('sort', fieldName);
    //fire up action to cause
  };

  return (
    <Container maxWidth="lg">
      <SearchAppBar
        handleSearchText={handleSearchText}
        handleReset={handleReset}
        handleCreateNewSoldier={handleCreateNewSoldier}
      />
      <TableContainer>
        <Table>
          <TableHead
            handleSort={handleSort}
            sortBy={'phone'}
            sortDirection={'asc'}
          />
          <TableBody tableData={users} />
        </Table>
      </TableContainer>
    </Container>
  );
};

const mapStateToProps = state => {
  const { params, data } = state.userList;
  const { users, page, totalPages } = data;
  return { params, users, page, totalPages };
};

export default connect(mapStateToProps, {
  initialLoad,
  moreLoad,
  updateParams,
})(ArmyTable);
