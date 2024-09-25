import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
} from '@tremor/react';
//import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface WarehouseProduct {
    id: number;
    warehouse_id: number;
    comment: string;
    ean: string;
    date_activity: Date;
    type_activity: number;
}

interface PageProps {
    products: WarehouseProduct[];
}

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
//     const productEan = params?.ean as string;
//     console.log("value:" + productEan);
//
//     const query = `
//     SELECT
//     "id",
//     "warehouse_id",
//     "comment",
//     "ean",
//     "date_activity",
//     "type_activity"
//     FROM "Warehouse_products_activity"
//     WHERE "ean" = '${productEan}'
//     LIMIT 20
//   `;
//
//     console.log({ query });
//
//     const result = await prisma.$queryRawUnsafe(query);
//     const products = result as WarehouseProduct[];
//     console.log({ products });
//
//     return {
//         props: {
//             products,
//         },
//     };
// };

export default function Page({ products }: PageProps) {
    const formatDateTime = (date: Date) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return date.toLocaleString('en-US', options);
    };

    const getActivityLabel = (type_activity: number) => {
        switch (type_activity) {
            case 1:
                return "Reload";
            case 2:
                return "Out of Stock";
            case 3:
                return "Move to Another WH";
            default:
                return "Please check!";
        }
    };

    const getWHLabel = (warehouse_id: number) => {
        switch (warehouse_id) {
            case 1:
                return "warehouse I - North";
            case 2:
                return "warehouse II - France (north)";
            default:
                return "Please check!";
        }
    };

    return (
        <div>
            <Table>
                <caption>Warehouse {products[0]?.ean} Products</caption>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>EAN</TableHeaderCell>
                        <TableHeaderCell>Warehouse Id</TableHeaderCell>
                        <TableHeaderCell>Comments</TableHeaderCell>
                        <TableHeaderCell>Date Of Activity</TableHeaderCell>
                        <TableHeaderCell>Type Activity</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Text>{product.ean}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{getWHLabel(product.warehouse_id)}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{product.comment}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{formatDateTime(new Date(product.date_activity))}</Text>
                            </TableCell>
                            <TableCell>
                                <Text>{getActivityLabel(product.type_activity)}</Text>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
