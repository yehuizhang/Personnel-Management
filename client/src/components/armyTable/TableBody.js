import React from 'react';

import { rankMap } from '../../util/staticData';

import {
  TableBody,
  TableRow,
  TableCell,
  Button,
  Avatar,
  Link,
} from '@material-ui/core';

const ArmyTableBody = ({ tableData, handleDSClick, handleSuperiorClick }) => {
  return (
    <TableBody>
      {tableData.map(row => (
        <TableRow key={row.id} hover>
          <TableCell>
            <Avatar
              src={row.avatar || rankMap.get(row.rank)[1]}
              alt={row.name}
            />
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
          <TableCell>
            {row.superior && (
              <Link
                href="#"
                onClick={() => handleSuperiorClick(row.superior.id)}
              >
                {row.superior.name}
              </Link>
            )}
          </TableCell>
          <TableCell>
            {row.dsList.length > 0 && (
              <Link href="#" onClick={() => handleDSClick(row.dsList)}>
                {row.dsList.length}
              </Link>
            )}
          </TableCell>
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
