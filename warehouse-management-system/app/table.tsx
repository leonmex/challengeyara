import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

import PercentageBar from './PercentageBar';

interface Warehouse {
  id: number;
  Name: string;
  endpoint: string;
  status: number;
  maxstock: number;
  hazardousallow: number;
  porcentagefree: number;
  statustime: string; // Adjust the type if it's not a string
}

export default function WarehousesTable({ warehouses }: { Warehouses: Warehouse[] }) {
    const getStatusLabel = (status: number) => {
        switch (status) {
            case 1:
                return "available for Stock";
            case 2:
                return "No available for Stock";
            case 3:
                return "Both";
            default:
                return "Verified Stock";
        }
    };

    const getHazardLabel = (hazardousallow: number) => {
        switch (hazardousallow) {
            case 1:
                return "Hazard";
            case 2:
                return "No Hazard";
            case 3:
                return "Both";
            default:
                return "Please check!";
        }
    };
return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Warehouse Name</TableHeaderCell>
          <TableHeaderCell>Warehouse Status</TableHeaderCell>
          <TableHeaderCell>Warehouse Hazard Type</TableHeaderCell>
          <TableHeaderCell>% Free space in the W.</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          warehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell>{warehouse.Name}</TableCell>
                <TableCell>
                  <Text>{getStatusLabel(warehouse.status)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{getHazardLabel(warehouse.hazardousallow)}</Text>
                </TableCell>
                <TableCell>
                   <PercentageBar value={warehouse.porcentagefree} />
                </TableCell>
                  <TableCell>
                      <a className="button-link green" href={`${warehouse.endpoint}/${warehouse.id}`}>
                          Details
                      </a>
                      <a className="button-link orange" href={`${warehouse.endpoint}/${warehouse.id}`}>
                          Imp. products
                      </a>
                      <a className="button-link orange" href={`${warehouse.endpoint}/${warehouse.id}`}>
                          Exp. products
                      </a>
                  </TableCell>
              </TableRow>
          ))
        }
      </TableBody>
    </Table>
);
}
