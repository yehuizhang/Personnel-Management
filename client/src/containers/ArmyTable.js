import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();

  useEffect(() => {
    initialLoad(params);
  }, [params]);

  const handleSearchText = text => {
    if (text.length == 0 && params.search) {
      const newParams = { ...params };
      delete newParams.search;
      updateParams(newParams);
      return;
    }
    updateParams({ ...params, search: text });
  };

  const handleReset = () => {
    updateParams({});
  };

  const handleCreateNewSoldier = () => {
    history.push('/create-user');
  };

  const handleDSClick = dsList => {
    updateParams({ ...params, users: dsList });
  };

  const handleSuperiorClick = id => {
    updateParams({ ...params, users: [id] });
  };

  const handleSort = (fieldName, direction) => {
    if (!direction) {
      const newParams = { ...params };
      delete newParams.sortBy;
      delete newParams.sortDirection;
      updateParams(newParams);
      return;
    }
    updateParams({ ...params, sortBy: fieldName, sortDirection: direction });
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
            sortBy={params.sortBy}
            sortDirection={params.sortDirection}
          />
          <TableBody
            tableData={users}
            handleDSClick={handleDSClick}
            handleSuperiorClick={handleSuperiorClick}
          />
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
