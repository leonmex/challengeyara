import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import UsersTable from './table';
import { prisma } from '@/lib/prisma';
import WarehousesTable from "./table";

interface Warehouse {
    id: number;
    Name: string;
    endpoint: string;
    status: number;
    maxstock: number;
    hazardousallow: number;
    porcentagefree: number;
    statustime: string;
}

export default async function IndexPage({
                                          searchParams
                                        }: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const result = await prisma.$queryRaw`
    SELECT
    "id",
    "Name",
    "endpoint",
    "status",
    "maxstock",
    "hazardousallow",
    "porcentagefree",
    "statustime"
    FROM "Warehouses"
    WHERE "status" <> 999
  `;
  const warehouses = result as Warehouse[];
  console.log({ warehouses })
  return (
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <Title>Warehouses</Title>
        <Text>A list of Warehouses.</Text>
        <Search />
        <Card className="mt-6">
          <WarehousesTable Warehouses={warehouses} />
        </Card>
      </main>
  );
}
