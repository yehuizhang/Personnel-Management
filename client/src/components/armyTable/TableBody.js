import React from 'react';

import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Link,
} from '@material-ui/core';

const ArmyTableBody = ({ tableData }) => {
  return (
    <TableBody>
      {tableData.map(row => (
        <TableRow key={row.id} hover>
          <TableCell>
            <Avatar src={row.avatar} alt={row.name} />
          </TableCell>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.sex}</TableCell>
          <TableCell>{row.rank}</TableCell>
          <TableCell>{row.startDate}</TableCell>
          <TableCell>
            <Link href={`tel:${row.phone}`}>{row.phone}</Link>
          </TableCell>
          <TableCell>
            <Link href={`mailto:${row.email}`}>{row.email}</Link>
          </TableCell>
          <TableCell>superior</TableCell>
          <TableCell>{row.dsList && row.dsList.length}</TableCell>
          <TableCell>
            <Button color="primary" variant="contained">
              Edit
            </Button>
          </TableCell>
          <TableCell>
            <Button color="primary" variant="contained">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default ArmyTableBody;
