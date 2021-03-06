import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { loadUserList, updateParams } from '../redux/actions/userList';
import deleteUser from '../redux/actions/userActions/deleteUser';
import { SearchAppBar, TableHead, TableBody } from '../components/armyTable';

import {
  makeStyles,
  Container,
  TableContainer,
  Table,
  Typography,
  Chip,
  Grid,
} from '@material-ui/core';
import Block from '@material-ui/icons/Block';

const useStyles = makeStyles(theme => ({
  end: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const ArmyTable = ({
  params,
  users,
  page,
  totalPages,
  totalDocs,
  tableKey,
  loadUserList,
  updateParams,
  deleteUser,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleSearchText = text => {
    if (text.length === 0 && params.search) {
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
    delete params.search;
    updateParams({ ...params, users: dsList });
  };

  const handleSuperiorClick = id => {
    delete params.search;
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

  const handleEditClick = id => {
    history.push(`/edit-user/${id}`);
  };

  const handleDeleteClick = id => {
    deleteUser(id);
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item>
          <img
            src="https://aoav.org.uk/wp-content/uploads/2016/03/DOD-logo.jpg"
            alt="DOD Seal"
            height="100px"
            width="100px"
          />
        </Grid>
        <Typography variant="h4">US Army Personnel Registry</Typography>
        <Grid item></Grid>
      </Grid>
      <SearchAppBar
        handleSearchText={handleSearchText}
        handleReset={handleReset}
        handleCreateNewSoldier={handleCreateNewSoldier}
      />
      <TableContainer key={tableKey}>
        <InfiniteScroll
          pageStart={0}
          loadMore={() => loadUserList(params, page)}
          hasMore={page <= totalPages}
        >
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
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </Table>
        </InfiniteScroll>
      </TableContainer>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.end}
      >
        {page > totalPages ? (
          <>
            <Grid item xs={12}>
              <Typography color="primary" variant="h6">
                {totalDocs} users are loaded for you...
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Chip icon={<Block />} label="End" />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography color="primary" variant="h6">
              Loading the data for you...
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => {
  const { params, data } = state.userList;
  const { users, page, totalPages, totalDocs, tableKey } = data;
  return { params, users, page, totalPages, totalDocs, tableKey };
};

export default connect(mapStateToProps, {
  loadUserList,
  updateParams,
  deleteUser,
})(ArmyTable);
