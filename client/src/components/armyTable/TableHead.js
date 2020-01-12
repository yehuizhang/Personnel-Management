import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  sortLabel: {
    fontWeight: 600,
  },
}));

const headCells = [
  { id: 'avatar', label: 'Avatar', sort: false },
  { id: 'name', label: 'Name', sort: true },
  { id: 'sex', label: 'Sex', sort: true },
  { id: 'rank', label: 'Rank', sort: true },
  { id: 'startDate', label: 'StartDate', sort: true },
  { id: 'phone', label: 'Phone', sort: true },
  { id: 'email', label: 'Email', sort: true },
  { id: 'superior', label: 'Superior', sort: false },
  { id: 'numOfDs', label: '# of D.S.', sort: false },
  { id: 'edit', label: 'Edit', sort: false },
  { id: 'delete', label: 'Delete', sort: false },
];

const ArmyTableHead = ({ handleSort, sortBy, sortDirection }) => {
  const classes = useStyles();

  const handleFieldClick = fieldName => {
    if (fieldName !== sortBy) {
      handleSort(fieldName, 'asc');
      return;
    }
    if (sortDirection === 'asc') {
      handleSort(fieldName, 'desc');
      return;
    }
    handleSort(fieldName);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell =>
          headCell.sort ? (
            <TableCell
              key={headCell.id}
              sortDirection={sortBy === headCell.id ? sortDirection : false}
            >
              <TableSortLabel
                active={sortBy === headCell.id} // true | false
                direction={sortDirection} //asc | desc
                onClick={() => handleFieldClick(headCell.id)}
                className={classes.sortLabel}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ) : (
            <TableCell key={headCell.id}>{headCell.label}</TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default ArmyTableHead;
