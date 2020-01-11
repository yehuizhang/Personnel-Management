import React from 'react';

import { SearchAppBar, TableHead, TableBody } from '../components/armyTable';
import { Container, TableContainer, Table } from '@material-ui/core';

const ArmyTable = ({ tableData }) => {
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
          <TableBody tableData={tableData} />
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ArmyTable;
