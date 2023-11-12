import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    warehouses: async () => {
      const warehouses = await prisma.warehouses.findMany();
      return warehouses;
    },
    products: async () => {
      const products = await prisma.products.findMany();
      return products;
    },
    stockAmount: async (_, { warehouseId }) => {
      const stockAmount = prisma.products.findMany();
      return stockAmount;
    },
    freeStockSpace: async (_, { warehouseId }) => {
      const freeStockSpace = prisma.products.findMany();
      return freeStockSpace;
    },
    stockHistory: async (_, { startDate, endDate, warehouseId }) => {
      const stockHistory = await prisma.warehouseProductsActivity.findMany({
        where: {
            Id: stockHistory.warehouseId,
        },
      });
      return stockHistory;
    },
  },
  Warehouse: {
    Warehouse_1: async (warehouse) => {
      const warehouse1Data = await prisma.warehouse1.findMany({
        where: {
          warehouseId: warehouse.id,
        },
      });
      return warehouse1Data;
    },
    Warehouse_2: async (warehouse) => {
      const warehouse2Data = await prisma.warehouse2.findMany({
        where: {
          warehouseId: warehouse.id,
        },
      });
      return warehouse2Data;
    },
  },
  Warehouse_1: {
    Warehouses: async (warehouse_1) => {
      const warehousesData = await prisma.warehouses.findMany({
        where: {
          id: warehouse_1.warehousesId,
        },
      });
      return warehousesData[0]; 
    },
  },
  Warehouse_2: {
    Warehouses: async (warehouse_2) => {
      const warehousesData = await prisma.warehouses.findMany({
        where: {
          id: warehouse_2.warehousesId,
        },
      });
      return warehousesData[0];
    },
  },
};
