import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
  } from '@tremor/react';
  import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
  import { PrismaClient } from '@prisma/client';
  
  const prisma = new PrismaClient();
  
  interface Warehouses {
    id: number;
    Name: string;
    endpoint: string;
    status: number;
    maxstock: number;
    hazardousallow: number;
    porcentagefree: number;
    statustime: string;
    Warehouse_1: Warehouse[]; // Assuming there's a relation with Warehouse
  }
  
  interface Warehouse {
    productId: number;
    category: number;
    ean: string;
    stock_qty: number;
    date_arrive: Date;
    date_depart: Date;
    warehouse_id: number;
  }

interface Params {
    warehouse: Warehouse[];
}

export default async function Page({ params } : Params){
    params: { id: Number }
    const warehouseId = 'Warehouse_' + params.id;
    console.log("value:" + warehouseId)
    const query = `
    SELECT
    "id",
    "Name",
    "endpoint",
    "status",
    "maxstock",
    "hazardousallow",
    "porcentagefree",
    "statustime",
    "wk"."productId",
    "wk"."category",
    "wk"."ean",
    "wk"."date_arrive",
    "wk"."date_depart"
    FROM "Warehouses" as "wm" 
    JOIN "${warehouseId}" as "wk" on "wk"."warehouse_id" = "wm"."id"
    WHERE status <> 999
    LIMIT 20
  `;
  console.log({ query })

  const result = await prisma.$queryRawUnsafe(query)
  const warehouses = result as Warehouse[];
  const productsURL = 'http://127.0.0.1/products';
  console.log({ warehouses })

  const formatDateTime = (date: Date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };

  const getCategoryLabel = (category: number) => {
    switch (category) {
    case 1:
        return 'Fertilizantes';
    case 2:
        return 'Danger';
    case 3:
        return 'Goods';
    default:
        return 'Unknown';
    }
  };

    return date.toLocaleString('en-US', options);
  };
      function getCategoryLabel(category: number): import("react").ReactNode {
        switch (category) {
            case 1:
                return 'Fertilizantes';
            case 2:
                return 'Danger';
            case 3:
                return 'Goods';
            default:
                return 'Unknown';
            }
        }

    return (
        <div>
        <Table>
          <caption>Warehouse {warehouses[0].id} Details</caption>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>EAN</TableHeaderCell>
              <TableHeaderCell>Date arrive to W</TableHeaderCell>
              <TableHeaderCell>Date depart from W</TableHeaderCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.productId}>
                <TableCell>
                  <Text>{getCategoryLabel(warehouse.category)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{warehouse.ean}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDateTime(warehouse.date_arrive)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDateTime(warehouse.date_depart)}</Text>
                </TableCell>
                <TableCell>
                  <Text>{formatDateTime(warehouse.date_depart)}</Text>
                </TableCell>
                <TableCell>
                      <a className="button-link green" href={`${productsURL}/${warehouse.ean}`}>
                      Track movements
                      </a>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>     
        </div>   
    );
  }
